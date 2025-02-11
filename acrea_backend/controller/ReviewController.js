const ReviewModel = require("../models/ReviewModel");
const UserAuthModel = require("../models/UserAuthModel.js");
const httpErrors = require("http-errors");

const addReviewController = async (req, res, next) => {
    const buyerId = req.payload.aud; // Assuming JWT payload contains the user ID
    const { propertyId, rating, review } = req.body;

    try {
        const fetchedUserData = await UserAuthModel.findById(buyerId);
        if (fetchedUserData.usrType !== "buyer") {
            return next(httpErrors.Unauthorized("Only buyers can submit reviews"));
        }

        // Check if the user has already reviewed this property
        const existingReview = await ReviewModel.findOne({ propertyId, buyerId });
        if (existingReview) {
            return next(httpErrors.BadRequest("You can only submit one review per property"));
        }

        const newReview = new ReviewModel({
            propertyId,
            buyerId,
            rating,
            review: review || "No review provided",
        });
        await newReview.save();

        res.status(201).json({ message: "Review added successfully", newReview });
    } catch (error) {
        console.error("Error adding review:", error);
        next(httpErrors.InternalServerError("Error adding review"));
    }
};

const getReviewsByPropertyController = async (req, res, next) => {
    console.log("Received request body:", req.body);
    var { propertyId } = req.body;
    console.log("Review Property:", propertyId);

    if (!propertyId) {
        return res.status(400).json({ success: false, message: "Property ID is required" });
    }

    try {
        const reviews = await ReviewModel.find({ propertyId })
            .populate('buyerId', 'usrFullName usrEmail')
            .sort({ createdAt: -1 });

        const averageRating = reviews.length > 0
            ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
            : 0;

        res.status(200).json({ 
            success: true, 
            message: 'Reviews fetched successfully', 
            reviews, 
            averageRating 
        });
    } catch (error) {
        console.error("Error fetching reviews:", error);
        next(httpErrors.InternalServerError("Error fetching reviews"));
    }
};


module.exports = {
    addReviewController,
    getReviewsByPropertyController,
}; 