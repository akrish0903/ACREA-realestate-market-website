const ScheduleModel = require('../models/ScheduleModel');
const UserAuthModel = require("../models/UserAuthModel");
const httpErrors = require("http-errors");

exports.scheduleVisit = async (req, res) => {
    const { propertyData, agentData, date, time, buyerName, contact, notes } = req.body;
        console.log({propertyData, agentData, date, time, buyerName, contact, notes})
        var userId = req.payload.aud;
    try {
        var fetchedUserData = await UserAuthModel.findById(userId);
        const newSchedule = new ScheduleModel({
            propertyId: propertyData._id,agentId: propertyData.agentId, buyerId: userId, date, time, buyerName, contact, notes
        });
        
        await newSchedule.save();
        console.log(process.env.razorlink)
        res.status(200).json({ redirectUrl: process.env.razorlink });
    } catch (error) {
        console.error('Error details:', error.message);
        console.error('Error stack:', error.stack);
        res.status(500).json({ message: 'Internal Server Error - Unable to schedule visit.' });
    }
};
