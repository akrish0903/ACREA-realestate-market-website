// Routes/scheduleRoutes.js
const express = require('express');
const router = express.Router();
const ScheduleController = require('../controller/ScheduleController');
const { jwt_verify_token } = require('../utils/jwt_utils');
const path = require('path');

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

// Route to serve receipt files
router.get('/receipts/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '../receipts', filename); // Ensure this path is correct
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).send('File not found');
        }
    });
});

module.exports = router;
