const express = require('express');
const router = express.Router();
const UserAuthController = require("../controller/UserAuthController");

router.post("/signup",UserAuthController.signupUserAuthController);

router.post("/signin",UserAuthController.signinUserAuthController);

module.exports = router;