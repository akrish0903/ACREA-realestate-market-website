const mongoose = require('mongoose');

const propertyBidSchema = new mongoose.Schema({
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userproperties',
        required: true
    },
    agentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'All User',
        required: true
    },
    biddingEndTime: {
        type: Date,
        required: true
    },
    minimumBid: {
        type: Number,
        required: true
    },
    bids: [{
        buyerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'All User'
        },
        bidAmount: {
            type: Number,
            required: true
        },
        bidTime: {
            type: Date,
            default: Date.now
        }
    }],
    status: {
        type: String,
        enum: ['active', 'completed', 'cancelled'],
        default: 'active'
    },
    winner: {
        buyerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'All User'
        },
        bidAmount: Number,
        bidTime: Date
    }
}, {
    timestamps: true
});

const PropertyBidModel = mongoose.model('propertybids', propertyBidSchema);
module.exports = PropertyBidModel; 