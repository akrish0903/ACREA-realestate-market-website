// routes/questionRoutes.js
const express = require('express');
const router = express.Router();
const questionController = require('../controller/questionController');
const { jwt_verify_token } = require('../utils/jwt_utils');

// Route to add a question (requires user authentication)
router.post('/post-question', jwt_verify_token, questionController.addQuestion);

// Route to get questions for a specific property
router.get('/get-property-questions/:propertyId', questionController.getPropertyQuestions);

// Route to answer a question (requires agent authentication)
router.post('/post-answer/:questionId', jwt_verify_token, questionController.answerQuestion);

module.exports = router;
