const express = require('express');
const httpErrors = require("http-errors")
const router = express.Router();
const UserAuthController = require("../controller/UserAuthController");
const { jwt_verify_token } = require('../utils/jwt_utils');

router.post("/signup",UserAuthController.signupUserAuthController);

router.post("/signin",UserAuthController.signinUserAuthController);

// protected route and accessed when correct token is passes
router.post("/updateAcc",jwt_verify_token,UserAuthController.updateAccUserAuthController)

router.post("/refresh-token",UserAuthController.refreshTokenUserAuthController);

router.delete("/logout",UserAuthController.logoutUserAuthController);


module.exports = router;