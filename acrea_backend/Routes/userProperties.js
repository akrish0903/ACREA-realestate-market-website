const express = require('express');
const httpErrors = require("http-errors");
const router = express.Router();
const { jwt_verify_token } = require('../utils/jwt_utils');
const UserPropertiesController = require("../controller/UserPropertiesController")

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

router.post("/edit-property", jwt_verify_token, UserPropertiesController.editPropertyController);


module.exports = router;