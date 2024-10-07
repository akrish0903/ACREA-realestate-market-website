const express = require('express');
const httpErrors = require("http-errors");
const router = express.Router();
const { jwt_verify_token } = require('../utils/jwt_utils');
const UserPropertiesController = require("../controller/UserPropertiesController")

router.post("/add-properties", jwt_verify_token, UserPropertiesController.addPropertyController)
router.post("/show-buyer-recent-properties", jwt_verify_token, UserPropertiesController.showBuyerRecentPropertyController)
router.post("/show-agent-recent-properties", jwt_verify_token, UserPropertiesController.showAgentRecentPropertyController)
router.post("/show-buyer-features-properties", jwt_verify_token, UserPropertiesController.showBuyerRecentPropertyController)
router.post("/show-admin-properties", jwt_verify_token, UserPropertiesController.showPropertyController)
router.post("/show-agent-properties",jwt_verify_token, UserPropertiesController.showAgentPropertyController)
router.post("/show-buyer-properties", jwt_verify_token, UserPropertiesController.showBuyerPropertyController)




module.exports = router;