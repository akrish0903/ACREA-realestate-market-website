const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: process.env.MONGO_TABLE_USERS || 'All Users',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const chatSchema = new mongoose.Schema(
    {
        senderId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: process.env.MONGO_TABLE_USERS || 'All Users', 
            required: true 
        },
        receiverId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: process.env.MONGO_TABLE_USERS || 'All Users', 
            required: true 
        },
        propertyId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: process.env.MONGO_TABLE_PROPERTIES || 'userproperties', 
            required: true 
        },
        messages: [messageSchema],
        lastMessage: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ['active', 'archived'],
            default: 'active'
        }
    },
    { timestamps: true }
);

// Export as 'chats' collection
module.exports = mongoose.model('chats', chatSchema);