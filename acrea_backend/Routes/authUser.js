const express = require('express');
const httpErrors = require("http-errors");
const router = express.Router();
const UserAuthController = require("../controller/UserAuthController");
const { jwt_verify_token } = require('../utils/jwt_utils');

router.post("/signup",UserAuthController.signupUserAuthController);

router.post("/signin",UserAuthController.signinUserAuthController);

// Protected route to update user profile
router.post("/updateUserProfile",jwt_verify_token,UserAuthController.updateUserProfileAuthController);

// New route to reset password (protected)
router.post("/resetPassword",jwt_verify_token,UserAuthController.resetPasswordAuthController)

// New route to forgot password
router.post("/forgot-password",jwt_verify_token,UserAuthController.forgotPasswordAuthController)


// Route to refresh token
router.post("/refresh-token",UserAuthController.refreshTokenUserAuthController);

// Route to logout user
router.delete("/logout",UserAuthController.logoutUserAuthController);

router.get("/buyerslist",jwt_verify_token,UserAuthController.showBuyerListController)

router.get("/agentslist",jwt_verify_token,UserAuthController.showAgentListController)

router.get("/show-buyers-recent",jwt_verify_token,UserAuthController.showRecentBuyerstoAdminController)

router.get("/show-agents-recent",jwt_verify_token,UserAuthController.showRecentAgentstoAdminController)

module.exports = router;