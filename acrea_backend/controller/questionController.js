// controllers/questionController.js
const Question = require('../models/Question');
const UserAuthModel = require('../models/UserAuthModel');
const createError = require('http-errors');

// Add a new question
exports.addQuestion = async (req, res) => {
    try {
        console.log('Request payload:', req.payload);
        console.log('Request body:', req.body);
        console.log('Request params:', req.params);

        const { propertyId, question } = req.body;
        
        // Check if user is authenticated via payload
        if (!req.payload || !req.payload.aud) {
            return res.status(401).json({
                success: false,
                message: 'User not authenticated'
            });
        }

        // Validate inputs
        if (!propertyId || !question) {
            return res.status(400).json({ 
                success: false, 
                message: 'Property ID and question are required' 
            });
        }

        // Create and save the question
        const newQuestion = new Question({
            propertyId,
            userId: req.payload.aud,
            questionText: question,
        });

        const savedQuestion = await newQuestion.save();
        
        // Populate user information before sending response
        const populatedQuestion = await Question.findById(savedQuestion._id)
            .populate('userId', 'usrFullName')
            .populate('answeredBy', 'usrFullName');

        res.status(201).json({ 
            success: true, 
            message: 'Question posted successfully',
            newQuestion: populatedQuestion
        });
    } catch (error) {
        console.error('Error adding question:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error adding question',
            error: error.message
        });
    }
};

// Get questions for a specific property
exports.getPropertyQuestions = async (req, res) => {
    try {
        console.log('Request payload:', req.payload);
        console.log('Request body:', req.body);
        console.log('Request params:', req.params);

        const { propertyId } = req.params;

        if (!propertyId) {
            return res.status(400).json({
                success: false,
                message: 'Property ID is required'
            });
        }

        const questions = await Question.find({ propertyId })
            .populate('userId', 'usrFullName')
            .populate('answeredBy', 'usrFullName')
            .sort({ createdAt: -1 });

        console.log('Found questions:', questions);

        res.status(200).json({ 
            success: true, 
            message: 'Questions fetched successfully',
            questions 
        });
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error fetching questions',
            error: error.message 
        });
    }
};

// Answer a question (agent or owner)
exports.answerQuestion = async (req, res) => {
    try {
        console.log('Request payload:', req.payload);
        console.log('Request body:', req.body);
        console.log('Request params:', req.params);

        const { questionId } = req.params;
        const { answer } = req.body;

        if (!req.payload || !req.payload.aud) {
            return res.status(401).json({
                success: false,
                message: 'User not authenticated'
            });
        }

        const answeredBy = req.payload.aud;

        const question = await Question.findById(questionId);

        if (!question) {
            return res.status(404).json({ 
                success: false,
                message: 'Question not found' 
            });
        }

        question.answer = answer;
        question.answeredBy = answeredBy;
        await question.save();

        const updatedQuestion = await Question.findById(questionId)
            .populate('userId', 'usrFullName')
            .populate('answeredBy', 'usrFullName');

        res.status(200).json({ 
            success: true, 
            message: 'Answer posted successfully',
            question: updatedQuestion 
        });
    } catch (error) {
        console.error('Error answering question:', error);
        res.status(500).json({ 
            success: false,
            message: 'Error answering question',
            error: error.message 
        });
    }
};
