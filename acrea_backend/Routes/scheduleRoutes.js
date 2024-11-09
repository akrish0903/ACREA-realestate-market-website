// Routes/scheduleRoutes.js
const express = require('express');
const router = express.Router();
const ScheduleController = require('../controller/ScheduleController'); // Create this file and export controller functions

// Schedule a visit and redirect to payment
router.post('/schedule', ScheduleController.scheduleVisit);

module.exports = router;
