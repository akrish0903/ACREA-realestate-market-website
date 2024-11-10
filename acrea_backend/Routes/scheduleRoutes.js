// Routes/scheduleRoutes.js
const express = require('express');
const router = express.Router();
const ScheduleController = require('../controller/ScheduleController');
const { jwt_verify_token } = require('../utils/jwt_utils');

// Schedule a visit and redirect to payment
router.post('/schedule',jwt_verify_token, ScheduleController.scheduleVisit);

module.exports = router;
