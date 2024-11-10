const ScheduleModel = require('../models/ScheduleModel');
const UserAuthModel = require("../models/UserAuthModel");
const httpErrors = require("http-errors");

exports.scheduleVisit = async (req, res) => {
    const { propertyData, agentData, date, time, buyerName, contact, notes } = req.body;
        console.log({propertyData, agentData, date, time, buyerName, contact, notes})
        var userId = req.payload.aud;
    try {
        var fetchedUserData = await UserAuthModel.findById(userId);
        const newSchedule = new ScheduleModel({
            propertyId: propertyData._id,agentId: propertyData.agentId, buyerId: userId, date, time, buyerName, contact, notes
        });
        
        await newSchedule.save();
        console.log(process.env.razorlink)
        res.status(200).json({ redirectUrl: process.env.VITE_RAZORPAY_LINK });
    } catch (error) {
        console.error('Error details:', error.message);
        console.error('Error stack:', error.stack);
        res.status(500).json({ message: 'Internal Server Error - Unable to schedule visit.' });
    }
};

exports.getSchedulesList = async (req, res, next) => {
    const userId = req.payload.aud;
    const fetchedUserData = await UserAuthModel.findById(userId);

    try {
        if (fetchedUserData.usrType === "agent") {
        const schedules = await ScheduleModel.find({agentId: userId});
        
        if (schedules.length === 0) {
            return res.status(200).json({ schedule_list: [], message: "No schedules found" });
        }

        res.status(200).json({ schedule_list: schedules });
    } else {
        return next(httpErrors.Unauthorized("Unauthorized access."));
    }
} catch (error) {
        next(httpErrors(500, "Failed to fetch schedules"));
    }
};

// Update a specific schedule
exports.updateSchedule = async (req, res, next) => {
    const { scheduleId } = req.params;
    const updatedData = req.body;

    try {
        const updatedSchedule = await Schedule.findByIdAndUpdate(scheduleId, updatedData, {
            new: true,
        });

        if (!updatedSchedule) {
            return next(createError(404, "Schedule not found"));
        }

        res.status(200).json({ message: "Schedule updated successfully", updatedSchedule });
    } catch (error) {
        next(createError(500, "Failed to update schedule"));
    }
};


exports.getBuyerSchedulesList = async (req, res, next) => {
    const userId = req.payload.aud;
    const fetchedUserData = await UserAuthModel.findById(userId);

    try {
        if (fetchedUserData.usrType === "buyer") {
        const schedules = await ScheduleModel.find({buyerId: userId});
        
        if (schedules.length === 0) {
            return res.status(200).json({ schedule_list: [], message: "No schedules found" });
        }

        res.status(200).json({ schedule_list: schedules });
    } else {
        return next(httpErrors.Unauthorized("Unauthorized access."));
    }
} catch (error) {
        next(httpErrors(500, "Failed to fetch schedules"));
    }
};

// Update a specific schedule
exports.updateBuyerSchedule = async (req, res, next) => {
    const { scheduleId } = req.params;
    const updatedData = req.body;

    try {
        const updatedSchedule = await Schedule.findByIdAndUpdate(scheduleId, updatedData, {
            new: true,
        });

        if (!updatedSchedule) {
            return next(createError(404, "Schedule not found"));
        }

        res.status(200).json({ message: "Schedule updated successfully", updatedSchedule });
    } catch (error) {
        next(createError(500, "Failed to update schedule"));
    }
};

// Delete a specific schedule
exports.deleteSchedule = async (req, res, next) => {
    const { scheduleId } = req.params;

    try {
        const deletedSchedule = await Schedule.findByIdAndDelete(scheduleId);

        if (!deletedSchedule) {
            return next(createError(404, "Schedule not found"));
        }

        res.status(200).json({ message: "Schedule deleted successfully" });
    } catch (error) {
        next(createError(500, "Failed to delete schedule"));
    }
};