const express = require('express');
const router = express.Router();
const { jwt_verify_token } = require('../utils/jwt_utils');
const MeetingController = require('../controller/MeetingController');

router.post('/request-meeting', jwt_verify_token, MeetingController.requestMeeting);
router.get('/get-meetings', jwt_verify_token, MeetingController.getMeetings);
router.post('/update-meeting-status', jwt_verify_token, MeetingController.updateMeetingStatus);

module.exports = router; 