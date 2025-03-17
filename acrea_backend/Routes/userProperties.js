const express = require('express');
const httpErrors = require("http-errors");
const router = express.Router();
const { jwt_verify_token } = require('../utils/jwt_utils');
const UserPropertiesController = require("../controller/UserPropertiesController")
const upload = require('../config/propertyMulterStorage');

// To add property redirect to AddProperty Page
router.post("/add-properties", jwt_verify_token, UserPropertiesController.addPropertyController)

// show buyer four recent properties in Dashboard when Buyer logged in
router.post("/show-buyer-four-recent-properties", jwt_verify_token, UserPropertiesController.showBuyerFourRecentPropertyController)

// show agent agent's four recent properties in Dashboard when Agent logged in
router.post("/show-agent-four-recent-properties", jwt_verify_token, UserPropertiesController.showAgentRecentPropertyController)

// show buyer two feature properties in Dashboard when Buyer logged in
router.post("/show-buyer-two-feature-properties", jwt_verify_token, UserPropertiesController.showBuyerTwoFeaturesPropertyController)

// show admin two feature properties in Dashboard when Buyer logged in
router.post("/show-admin-four-recent-properties", jwt_verify_token, UserPropertiesController.showAdimFourRecentPropertyController)

// show agent agent's two recent properties in Dashboard when Agent logged in
router.post("/show-agent-two-recent-properties", jwt_verify_token, UserPropertiesController.showAgentRecentPropertyController)

// show all users four recent properties in Dashboard when Buyer logged in
router.post("/show-allUsers-four-recent-properties", UserPropertiesController.showAllUsersFourRecentPropertyController)

// show all users two feature properties in Dashboard.
router.post("/show-allUsers-two-feature-properties", UserPropertiesController.showAllUsersTwoFeaturesPropertyController)

//show all agent's properties and fillter if needed in ViewAllProperties page
router.post("/show-by-type-agent-properties", jwt_verify_token, UserPropertiesController.showByTypeAgentPropertyController);

//shows all properties and fillter if needed to buyers in ViewAllProperties page
router.post("/show-by-type-buyer-properties", jwt_verify_token, UserPropertiesController.showByTypeBuyerPropertyController);

//shows all properties and fillter if needed to admin in ViewAllProperties page
router.post("/show-by-type-admin-properties", jwt_verify_token, UserPropertiesController.showByTypeAdminPropertyController);

//shows all properties and fillter if needed to people before login in ViewAllProperties page
router.post('/show-by-type-all-user-properties', UserPropertiesController.showByTypeAllUserPropertyController)

// To edit property redirect to EditProperty Page
router.post("/edit-property", jwt_verify_token, UserPropertiesController.editPropertyController);

router.post('/toggle-favorite', jwt_verify_token, UserPropertiesController.toggleFavoriteController);

// Show buyer's favorite properties
router.get('/show-buyer-favorite', jwt_verify_token, UserPropertiesController.showFavoriteController);

///shows all properties of agent to buyer or admin login in ViewAllProperties page
router.post('/show-agent-properties-to-others', jwt_verify_token, UserPropertiesController.showAgentPropertytoOthersController)

router.post("/upload-photos", jwt_verify_token, upload.array('userListingImage', 10), async (req, res) => {
    try {
        // Check if files are uploaded
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "No files uploaded." });
        }

        // Map the uploaded files to their paths (URLs)
        const imageUrls = req.files.map(file => file.path); // Assuming multer stores the file path in `file.path`

        // Log the uploaded image URLs for debugging
        console.log("Uploaded image URLs:", imageUrls);

        // Respond with the uploaded image URLs
        res.status(200).json({
            message: "Images uploaded successfully.",
            imageUrls: imageUrls
        });
    } catch (error) {
        console.error("Error uploading images:", error); // Log the error for debugging
        res.status(500).json({ error: "Failed to upload images" });
    }
});

router.post('/update-property-status', jwt_verify_token, UserPropertiesController.updatePropertyStatusController);

router.post('/check-favorite', jwt_verify_token, UserPropertiesController.checkFavoriteController);

module.exports = router;
