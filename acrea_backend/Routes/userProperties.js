const express = require('express');
const httpErrors = require("http-errors");
const router = express.Router();
const { jwt_verify_token } = require('../utils/jwt_utils');
const UserPropertiesController = require("../controller/UserPropertiesController")

router.post("/add-properties", jwt_verify_token, UserPropertiesController.addPropertyController)
router.post("/show-properties", jwt_verify_token, UserPropertiesController.showPropertyController)


module.exports = router;