const express = require('express');
const httpErrors = require("http-errors");
const router = express.Router();
const UserAuthController = require("../controller/UserAuthController");
const { jwt_verify_token } = require('../utils/jwt_utils');

// User authentication routes
router.post("/signup", UserAuthController.signupUserAuthController);
router.post("/signin", UserAuthController.signinUserAuthController);

// Protected route to update user profile
router.post("/updateUserProfile", jwt_verify_token, UserAuthController.updateUserProfileAuthController);

// New route to reset password (protected)
router.post("/resetPassword", jwt_verify_token, UserAuthController.resetPasswordAuthController);

// New route to forgot password
router.post("/forgot-password", jwt_verify_token, UserAuthController.forgotPasswordAuthController);

// Route to refresh token
router.post("/refresh-token", UserAuthController.refreshTokenUserAuthController);

// Route to logout user
router.delete("/logout", UserAuthController.logoutUserAuthController);

// Route for admin to see list of buyers and agents
router.get("/buyerslist", jwt_verify_token, UserAuthController.showBuyerListController);
router.get("/agentslist", jwt_verify_token, UserAuthController.showAgentListController);

// Route to show recent buyers and agents to admin
router.get("/show-buyers-recent", jwt_verify_token, UserAuthController.showRecentBuyerstoAdminController);
router.get("/show-agents-recent", jwt_verify_token, UserAuthController.showRecentAgentstoAdminController);

// Route to update an buyer's profile by admin
router.put("/admin-updatebuyer/:buyerId", jwt_verify_token, UserAuthController.updateBuyerProfileByAdminController);

// Route to delete an buyer's profile by admin
router.delete('/admin-deletebuyer/:buyerId', jwt_verify_token, UserAuthController.deleteBuyerProfileAuthController);

// Route to update an agent's profile by admin
router.put('/admin-updateagent/:agentId', jwt_verify_token, UserAuthController.updateAgentProfileByAdminController);

// Route to delete an agent's profile by admin
router.delete('/admin-deleteagent/:agentId', jwt_verify_token, UserAuthController.deleteAgentProfileAuthController);

// Route to show agents details to admin in propertypage
router.post ("/show-agent-data", jwt_verify_token, UserAuthController.showAgentDataController);

module.exports = router;
