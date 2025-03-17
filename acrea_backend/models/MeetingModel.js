const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userproperties',
        required: true
    },
    biddingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'propertybids',
        required: true
    },
    buyerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'All User',
        required: true
    },
    agentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'All User',
        required: true
    },
    meetingId: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected', 'completed'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const MeetingModel = mongoose.model('meetings', meetingSchema);
module.exports = MeetingModel; 