const PropertyBidModel = require('../models/PropertyBidModel');
const UserAuthModel = require('../models/UserAuthModel');
const nodemailer = require('nodemailer');
const httpErrors = require('http-errors');
const UserPropertiesModel = require('../models/UserPropertiesModel');

// Setup nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const PropertyBidController = {
    startBidding: async (req, res, next) => {
        try {
            const agentId = req.payload.aud;
            const { propertyId, biddingEndTime, minimumBid } = req.body;

            // Verify user is agent/owner
            const user = await UserAuthModel.findById(agentId);
            if (!['agent', 'owner'].includes(user.usrType)) {
                return next(httpErrors.Unauthorized('Only agents/owners can start bidding'));
            }

            // Create new bidding
            const newBidding = new PropertyBidModel({
                propertyId,
                agentId,
                biddingEndTime: new Date(biddingEndTime),
                minimumBid,
                bids: []
            });

            await newBidding.save();

            res.status(201).json({
                success: true,
                message: 'Bidding started successfully',
                bidding: newBidding
            });

        } catch (error) {
            next(error);
        }
    },

    placeBid: async (req, res, next) => {
        try {
            const buyerId = req.payload.aud;
            const { propertyId, bidAmount } = req.body;

            // Verify user is buyer
            const buyer = await UserAuthModel.findById(buyerId);
            if (buyer.usrType !== 'buyer') {
                return next(httpErrors.Unauthorized('Only buyers can place bids'));
            }

            // Get bidding details with property information
            const bidding = await PropertyBidModel.findOne({ propertyId, status: 'active' })
                .populate({
                    path: 'propertyId',
                    select: 'usrListingName location',
                    model: 'userproperties'
                });

            if (!bidding) {
                return next(httpErrors.NotFound('No active bidding found for this property'));
            }

            // Check if bid is higher than minimum and current highest
            const currentHighestBid = bidding.bids.length > 0 
                ? Math.max(...bidding.bids.map(b => b.bidAmount))
                : 0;

            if (bidAmount <= currentHighestBid || bidAmount < bidding.minimumBid) {
                return next(httpErrors.BadRequest('Bid amount must be higher than current highest bid and minimum bid'));
            }

            // Add new bid
            bidding.bids.push({
                buyerId,
                bidAmount,
                bidTime: new Date()
            });

            await bidding.save();

            // Get property details for email
            const propertyName = bidding.propertyId.usrListingName;
            const propertyLocation = `${bidding.propertyId.location.street}, ${bidding.propertyId.location.city}`;
            const biddingEndTime = new Date(bidding.biddingEndTime).toLocaleString();

            // Send notifications
            const agent = await UserAuthModel.findById(bidding.agentId);

            // Notify agent
            await sendEmail(
                agent.usrEmail,
                'New Bid Placed',
                `A new bid of ₹${bidAmount.toLocaleString()} has been placed on your property "${propertyName}" (${propertyLocation}).
                
Bid Details:
- Property: ${propertyName}
- Location: ${propertyLocation}
- Bid Amount: ₹${bidAmount.toLocaleString()}
- Bidder: ${buyer.usrFullName}
- Bid Time: ${new Date().toLocaleString()}
- Bidding Ends: ${biddingEndTime}`
            );

            // Notify the bidder
            await sendEmail(
                buyer.usrEmail,
                'Bid Placed Successfully',
                `Your bid has been successfully placed!

Bid Details:
- Property: ${propertyName}
- Location: ${propertyLocation}
- Your Bid Amount: ₹${bidAmount.toLocaleString()}
- Bid Time: ${new Date().toLocaleString()}
- Bidding Ends: ${biddingEndTime}

You will be notified if someone places a higher bid or when the bidding ends.

Note: The current highest bid for this property is ₹${bidAmount.toLocaleString()}.`
            );

            // Notify other bidders
            const allBidders = [...new Set(bidding.bids.map(b => b.buyerId.toString()))];
            for (const bidderId of allBidders) {
                if (bidderId !== buyerId.toString()) {
                    const bidder = await UserAuthModel.findById(bidderId);
                    await sendEmail(
                        bidder.usrEmail,
                        'New Higher Bid Placed',
                        `A new higher bid has been placed on the property "${propertyName}" that you're interested in.

Bid Details:
- Property: ${propertyName}
- Location: ${propertyLocation}
- New Highest Bid: ₹${bidAmount.toLocaleString()}
- Bid Time: ${new Date().toLocaleString()}
- Bidding Ends: ${biddingEndTime}

You can place a higher bid if you're still interested in this property.`
                    );
                }
            }

            res.status(200).json({
                success: true,
                message: 'Bid placed successfully',
                bid: bidding.bids[bidding.bids.length - 1]
            });

        } catch (error) {
            console.error('Error in placeBid:', error);
            next(error);
        }
    },

    getPropertyBids: async (req, res, next) => {
        try {
            const { propertyId } = req.params;
            
            if (!propertyId) {
                return res.status(400).json({
                    success: false,
                    message: 'Property ID is required'
                });
            }

            const bidding = await PropertyBidModel.findOne({ propertyId });

            // If no bidding exists, return a default state
            if (!bidding) {
                return res.status(200).json({
                    success: true,
                    bidding: null
                });
            }

            // If bidding exists, populate all necessary fields including winner
            const populatedBidding = await PropertyBidModel.findOne({ propertyId })
                .populate({
                    path: 'bids.buyerId',
                    select: 'usrFullName usrEmail',
                    model: 'All User'
                })
                .populate({
                    path: 'agentId',
                    select: 'usrFullName usrEmail',
                    model: 'All User'
                })
                .populate({
                    path: 'winner.buyerId',
                    select: 'usrFullName usrEmail',
                    model: 'All User'
                });

            // Check if bidding should be ended
            await checkAndEndBidding(populatedBidding);

            // Transform the data to ensure winner details are included
            const transformedBidding = populatedBidding.toObject();
            
            // Ensure winner details are properly formatted if they exist
            if (transformedBidding.winner && transformedBidding.winner.buyerId) {
                transformedBidding.winner = {
                    ...transformedBidding.winner,
                    buyerId: {
                        _id: transformedBidding.winner.buyerId._id,
                        usrFullName: transformedBidding.winner.buyerId.usrFullName,
                        usrEmail: transformedBidding.winner.buyerId.usrEmail
                    }
                };
            }

            res.status(200).json({
                success: true,
                bidding: transformedBidding
            });

        } catch (error) {
            console.error('Error in getPropertyBids:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message
            });
        }
    },

    endBidding: async (req, res, next) => {
        try {
            const { propertyId } = req.params;
            const bidding = await PropertyBidModel.findOne({ propertyId, status: 'active' });

            if (!bidding) {
                return next(httpErrors.NotFound('No active bidding found'));
            }

            // Find winner (highest bid)
            const winner = bidding.bids.reduce((prev, current) => 
                (prev.bidAmount > current.bidAmount) ? prev : current
            , { bidAmount: 0 });

            // Update bidding status
            bidding.status = 'completed';
            bidding.winner = {
                buyerId: winner.buyerId,
                bidAmount: winner.bidAmount
            };

            await bidding.save();

            // Send notifications
            const agent = await UserAuthModel.findById(bidding.agentId);
            const winnerUser = await UserAuthModel.findById(winner.buyerId);

            // Notify agent
            await sendEmail(
                agent.usrEmail,
                'Bidding Ended',
                `The bidding has ended. Winner: ${winnerUser.usrFullName} with bid amount: ${winner.bidAmount}`
            );

            // Notify winner
            await sendEmail(
                winnerUser.usrEmail,
                'Congratulations! You won the bid',
                `You won the bidding with your bid of ${winner.bidAmount}`
            );

            res.status(200).json({
                success: true,
                message: 'Bidding ended successfully',
                winner
            });

        } catch (error) {
            next(error);
        }
    }
};

async function sendEmail(to, subject, text) {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text
        });
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

const checkAndEndBidding = async (bidding) => {
    try {
        if (bidding.status === 'active' && new Date(bidding.biddingEndTime) <= new Date()) {
            // Find winner (highest bid)
            const winner = bidding.bids.length > 0 
                ? bidding.bids.reduce((prev, current) => 
                    (prev.bidAmount > current.bidAmount) ? prev : current
                  , { bidAmount: 0 })
                : null;

            // Update bidding status
            bidding.status = 'completed';
            if (winner) {
                // Save winner with full details
                bidding.winner = {
                    buyerId: winner.buyerId._id || winner.buyerId, // Handle both populated and unpopulated cases
                    bidAmount: winner.bidAmount,
                    bidTime: winner.bidTime
                };
            }

            await bidding.save();

            // Get all necessary user details
            const agent = await UserAuthModel.findById(bidding.agentId);
            const property = await UserPropertiesModel.findById(bidding.propertyId);

            if (winner) {
                const winnerUser = await UserAuthModel.findById(winner.buyerId);
                
                // Notify agent/owner
                await sendEmail(
                    agent.usrEmail,
                    'Bidding Ended - Winner Announced',
                    `The bidding for your property "${property.usrListingName}" has ended.

Winner Details:
- Name: ${winnerUser.usrFullName}
- Email: ${winnerUser.usrEmail}
- Winning Bid: ₹${winner.bidAmount.toLocaleString()}
- Contact Number: ${winnerUser.usrMobileNumber}

You can contact the winner to proceed with the transaction.`
                );

                // Notify winner
                await sendEmail(
                    winnerUser.usrEmail,
                    'Congratulations! You Won the Bid',
                    `Congratulations! You've won the bidding for "${property.usrListingName}".

Property Details:
- Name: ${property.usrListingName}
- Location: ${property.location.street}, ${property.location.city}
- Your Winning Bid: ₹${winner.bidAmount.toLocaleString()}

Agent/Owner Details:
- Name: ${agent.usrFullName}
- Email: ${agent.usrEmail}
- Contact: ${agent.usrMobileNumber}

Please contact the agent/owner to proceed with the transaction.`
                );

                // Notify other bidders
                const otherBidders = [...new Set(bidding.bids
                    .filter(bid => bid.buyerId.toString() !== winner.buyerId.toString())
                    .map(bid => bid.buyerId.toString()))];

                for (const bidderId of otherBidders) {
                    const bidder = await UserAuthModel.findById(bidderId);
                    await sendEmail(
                        bidder.usrEmail,
                        'Bidding Ended - Results',
                        `The bidding for "${property.usrListingName}" has ended.

Unfortunately, your bid was not the highest.

Winning Bid: ₹${winner.bidAmount.toLocaleString()}

Thank you for participating. We hope you'll find another property that matches your interests.`
                    );
                }
            } else {
                // Notify agent if no bids were placed
                await sendEmail(
                    agent.usrEmail,
                    'Bidding Ended - No Winners',
                    `The bidding for your property "${property.usrListingName}" has ended with no bids.

You can start a new bidding cycle if you wish to try again.`
                );
            }

            return true;
        }
        return false;
    } catch (error) {
        console.error('Error in checkAndEndBidding:', error);
        return false;
    }
};

// Export the entire controller object
module.exports = PropertyBidController; 