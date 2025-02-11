const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: process.env.MONGO_TABLE_PROPERTIES || 'userproperties',
        required: true,
    },
    buyerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: process.env.MONGO_TABLE_USERS || 'All Users',
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    review: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const ReviewModel = mongoose.model('Review', reviewSchema);
module.exports = ReviewModel; 