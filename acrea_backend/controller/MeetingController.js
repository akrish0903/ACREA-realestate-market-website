const MeetingModel = require('../models/MeetingModel');
const PropertyBidModel = require('../models/PropertyBidModel');
const nodemailer = require('nodemailer');
const httpErrors = require('http-errors');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const MeetingController = {
    requestMeeting: async (req, res, next) => {
        try {
            const buyerId = req.payload.aud;
            const { propertyId, biddingId } = req.body;

            // Verify this buyer is the winner
            const bidding = await PropertyBidModel.findById(biddingId);
            if (!bidding || !bidding.winner || bidding.winner.buyerId.toString() !== buyerId) {
                throw httpErrors.Unauthorized('Only the winning bidder can request a meeting');
            }

            // Generate unique meeting ID
            const meetingId = `meeting_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

            // Create meeting
            const meeting = new MeetingModel({
                propertyId,
                biddingId,
                buyerId,
                agentId: bidding.agentId,
                meetingId
            });

            await meeting.save();

            // Send email to agent
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: bidding.agentId.usrEmail,
                subject: 'New Meeting Request from Winning Bidder',
                text: `The winning bidder has requested a meeting for property discussion.
                \nMeeting ID: ${meetingId}
                \nPlease log in to the platform to accept the meeting request.`
            });

            res.status(200).json({
                success: true,
                message: 'Meeting request sent successfully',
                meetingId
            });

        } catch (error) {
            next(error);
        }
    },

    getMeetings: async (req, res, next) => {
        try {
            const userId = req.payload.aud;

            const meetings = await MeetingModel.find({
                $or: [
                    { buyerId: userId },
                    { agentId: userId }
                ]
            }).populate('propertyId agentId buyerId');

            res.status(200).json({
                success: true,
                meetings
            });

        } catch (error) {
            next(error);
        }
    },

    updateMeetingStatus: async (req, res, next) => {
        try {
            const userId = req.payload.aud;
            const { meetingId, status } = req.body;

            const meeting = await MeetingModel.findOne({
                meetingId,
                agentId: userId
            });

            if (!meeting) {
                throw httpErrors.NotFound('Meeting not found');
            }

            meeting.status = status;
            await meeting.save();

            res.status(200).json({
                success: true,
                message: 'Meeting status updated successfully'
            });

        } catch (error) {
            next(error);
        }
    }
};

module.exports = MeetingController; 