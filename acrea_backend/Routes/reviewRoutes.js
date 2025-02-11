const express = require('express');
const { jwt_verify_token } = require('../utils/jwt_utils');
const ReviewController = require("../controller/ReviewController");
const router = express.Router();

// Route to add a review (requires user authentication)
router.post('/add-review', jwt_verify_token, ReviewController.addReviewController);

// Route to get reviews for a specific property
router.post('/get-reviews', ReviewController.getReviewsByPropertyController);

module.exports = router; 