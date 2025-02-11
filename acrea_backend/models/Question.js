// models/Question.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserAuthModel = require('./UserAuthModel');

const questionSchema = new Schema({
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: process.env.MONGO_TABLE_PROPERTIES || 'userproperties',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: process.env.MONGO_TABLE_USERS || 'All Users',
        required: true,
    },
    questionText: {
        type: String,
        required: true,
        trim: true,
    },
    answer: {
        type: String,
        trim: true,
    },
    answeredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: process.env.MONGO_TABLE_USERS || 'users',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model(process.env.MONGO_TABLE_QUESTION, questionSchema);
