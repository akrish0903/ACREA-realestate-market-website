const ScheduleModel = require('../models/ScheduleModel');

exports.scheduleVisit = async (req, res) => {
    const { propertyData, agentData, date, time, buyerName, contact, notes } = req.body;
        console.log({propertyData, agentData, date, time, buyerName, contact, notes})
    try {
        var fetchedUserData = await UserAuthModel.findById(userId);
        const newSchedule = new ScheduleModel({ propertyData, agentData, date, time, buyerName, contact, notes });
        await newSchedule.save();
        res.status(200).json({ redirectUrl: 'https://rzp.io/rzp/aMbcA06' });
    } catch (error) {
        console.error('Error details:', error.message);
        console.error('Error stack:', error.stack);
        res.status(500).json({ message: 'Internal Server Error - Unable to schedule visit.' });
    }
};
