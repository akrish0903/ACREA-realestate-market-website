// Routes/scheduleRoutes.js
const express = require('express');
const router = express.Router();
const ScheduleController = require('../controller/ScheduleController');
const { jwt_verify_token } = require('../utils/jwt_utils');

// Schedule a visit and redirect to payment
router.post('/schedule',jwt_verify_token, ScheduleController.scheduleVisit);

// Route to fetch all schedules of agent
router.get('/agent-scheduleslist',jwt_verify_token, ScheduleController.getSchedulesList);

// Route to update a specific schedule by its ID of agent
router.put('/update-agent-schedule/:scheduleId',jwt_verify_token, ScheduleController.updateSchedule);

// Route to fetch all schedules of buyer
router.get('/buyer-scheduleslist',jwt_verify_token, ScheduleController.getBuyerSchedulesList);

// Route to update a specific schedule by its ID of buyer
router.put('/update-buyer-schedule/:scheduleId',jwt_verify_token, ScheduleController.updateBuyerSchedule);

// Route to delete a specific schedule by its ID
router.delete('/delete-schedule/:scheduleId',jwt_verify_token, ScheduleController.deleteSchedule);

module.exports = router;
