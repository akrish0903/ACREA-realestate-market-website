const ScheduleModel = require('../models/ScheduleModel');
const UserAuthModel = require("../models/UserAuthModel");
const httpErrors = require("http-errors");
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Function to generate receipt
const generateReceipt = async (schedule) => {
    const doc = new PDFDocument({ margin: 50 });

    const receiptFileName = `receipt_${schedule._id}.pdf`;
    const receiptPath = path.join(__dirname, '../receipts', receiptFileName);
    doc.pipe(fs.createWriteStream(receiptPath));

    // Header
    doc
        .fontSize(28)
        .fillColor('#333333')
        .text('Property Visit Receipt', { align: 'center' })
        .moveDown(0.5);

    doc
        .fontSize(16)
        .fillColor('#555555')
        .text('Thank you for scheduling a visit with us!', { align: 'center' })
        .moveDown(1.5);

    // Draw a line separator
    doc
        .strokeColor('#aaaaaa')
        .lineWidth(1)
        .moveTo(50, doc.y)
        .lineTo(550, doc.y)
        .stroke()
        .moveDown(1);

    // Visit Details
    doc
        .fontSize(14)
        .fillColor('#000000')
        .text(`Buyer Name: `, { continued: true })
        .font('Helvetica-Bold')
        .text(`${schedule.buyerName}`)
        .font('Helvetica')
        .text(`Agent Name: `, { continued: true })
        .font('Helvetica-Bold')
        .text(`${schedule.agentName}`)
        .font('Helvetica')
        .text(`Date: `, { continued: true })
        .font('Helvetica-Bold')
        .text(`${schedule.date}`)
        .font('Helvetica')
        .text(`Time: `, { continued: true })
        .font('Helvetica-Bold')
        .text(`${schedule.time}`)
        .moveDown(0.5);

    // Contact Information
    doc
        .font('Helvetica')
        .text(`Contact Number: `, { continued: true })
        .font('Helvetica-Bold')
        .text(`${schedule.contact}`)
        .moveDown(0.5);

    // Property Information
    // doc
    //     .font('Helvetica')
    //     .text(`Property Address: `, { continued: true })
    //     .font('Helvetica-Bold')
    //     .text(`${schedule.propertyAddress}`)
    //     .font('Helvetica')
    //     .text(`Property Type: `, { continued: true })
    //     .font('Helvetica-Bold')
    //     .text(`${schedule.propertyType}`)
    //     .moveDown(1);

    // Notes Section
    doc
        .font('Helvetica-Bold')
        .text('Additional Notes:')
        .font('Helvetica')
        .text(schedule.notes || 'No additional notes provided.')
        .moveDown(2);

    // Receipt Section
    // doc
    //     .font('Helvetica-Bold')
    //     .text('Receipt:')
    //     .font('Helvetica')
    //     .text( `${schedule.receipt}`)
    //     .moveDown(2);

    // Footer with Thank You Note
    doc
        .strokeColor('#aaaaaa')
        .lineWidth(1)
        .moveTo(50, doc.y)
        .lineTo(550, doc.y)
        .stroke()
        .moveDown(0.5);

    doc
        .fontSize(12)
        .fillColor('#555555')
        // .text('For any inquiries, please contact us at support@realestateapp.com', { align: 'center' })
        .moveDown(0.2)
        .text('We look forward to assisting you with your property journey!', { align: 'center' });

    doc.end();

    return receiptFileName; // Return only the filename
}

exports.scheduleVisit = async (req, res) => {
    const { propertyData, date, time, buyerName, contact, notes } = req.body;
    var userId = req.payload.aud;

    try {
        // Fetch the user data for the buyer
        var fetchedUserData = await UserAuthModel.findById(userId);
        
        // Fetch the agent details using the propertyData
        const agent = await UserAuthModel.findById(propertyData.agentId); // Fetch agent details

        // Check if agent exists
        if (!agent) {
            return res.status(404).json({ message: 'Agent not found' });
        }

        const newSchedule = new ScheduleModel({
            propertyId: propertyData._id,
            agentId: propertyData.agentId,
            buyerId: userId,
            date,
            time,
            buyerName,
            contact,
            notes,
            receipt: null, // Initialize receipt as null
            agentName: agent.usrFullName, // Save the agent's name
            agentPhone: agent.usrMobileNumber // Save the agent's phone number
        });

        await newSchedule.save();

        // Generate receipt logic here (e.g., create a PDF and save the path)
        const receiptFileName = await generateReceipt(newSchedule); // Implement this function
        newSchedule.receipt = receiptFileName; // Save the receipt path
        await newSchedule.save(); // Save the updated schedule with receipt

        res.status(200).json({ 
            razorpayKeyId: process.env.RAZORPAY_KEY_ID,
            agentName: agent.usrFullName, // Send agent name to frontend
            agentPhone: agent.usrMobileNumber, // Send agent phone number to frontend
            receipt: receiptFileName // Send receipt path to frontend
        });
    } catch (error) {
        console.error('Error details:', error.message);
        res.status(500).json({ message: 'Internal Server Error - Unable to schedule visit.' });
    }
};

exports.getSchedulesList = async (req, res, next) => {
    const userId = req.payload.aud;
    const fetchedUserData = await UserAuthModel.findById(userId);

    try {
        if (fetchedUserData.usrType === "agent" || fetchedUserData.usrType === 'owner') {
            const schedules = await ScheduleModel.find({agentId: userId})
                .sort({ createdAt: -1 });
            
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
        const updatedSchedule = await ScheduleModel.findByIdAndUpdate(scheduleId, updatedData, {
            new: true,
        });

        if (!updatedSchedule) {
            return next(httpErrors(404, "Schedule not found"));
        }

        res.status(200).json({ message: "Schedule updated successfully", updatedSchedule });
    } catch (error) {
        next(httpErrors(500, "Failed to update schedule"));
    }
};


exports.getBuyerSchedulesList = async (req, res, next) => {
    const userId = req.payload.aud;
    const fetchedUserData = await UserAuthModel.findById(userId);

    try {
        if (fetchedUserData.usrType === "buyer") {
            const schedules = await ScheduleModel.find({buyerId: userId})
                .sort({ createdAt: -1 });
            
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
        const updatedSchedule = await ScheduleModel.findByIdAndUpdate(scheduleId, updatedData, {
            new: true,
        });

        if (!updatedSchedule) {
            return next(httpErrors(404, "Schedule not found"));
        }

        res.status(200).json({ message: "Schedule updated successfully", updatedSchedule });
    } catch (error) {
        next(httpErrors(500, "Failed to update schedule"));
    }
};

// Delete a specific schedule
exports.deleteSchedule = async (req, res, next) => {
    const { scheduleId } = req.params;

    try {
        const deletedSchedule = await ScheduleModel.findByIdAndDelete(scheduleId);

        if (!deletedSchedule) {
            return next(httpErrors(404, "Schedule not found"));
        }

        res.status(200).json({ message: "Schedule deleted successfully" });
    } catch (error) {
        next(httpErrors(500, "Failed to delete schedule"));
    }
};