const ScheduleModel = require('../models/ScheduleModel');
const UserAuthModel = require("../models/UserAuthModel");
const httpErrors = require("http-errors");
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const cloudinary = require('../config/cloudinaryConfig');

// Function to generate receipt
const generateReceipt = async (schedule) => {
    const doc = new PDFDocument({ margin: 50 });
    
    // Create a promise to handle the PDF generation
    return new Promise((resolve, reject) => {
        try {
            // Create an array to store the PDF chunks
            const chunks = [];
            
            doc.on('data', chunk => chunks.push(chunk));
            doc.on('end', async () => {
                // Concatenate all chunks into a single Buffer
                const pdfBuffer = Buffer.concat(chunks);
                
                // Upload to Cloudinary
                const result = await cloudinary.uploader.upload_stream({
                    resource_type: 'raw',
                    folder: 'receipts',
                    public_id: `receipt_${schedule._id}`,
                    format: 'pdf'
                }, (error, result) => {
                    if (error) {
                        console.error('Upload to Cloudinary failed:', error);
                        reject(error);
                    } else {
                        resolve(result.secure_url); // Return the Cloudinary URL
                    }
                }).end(pdfBuffer);
            });

            // Generate PDF content (keep your existing PDF generation code)
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
        } catch (error) {
            reject(error);
        }
    });
};

exports.scheduleVisit = async (req, res) => {
    const { propertyData, date, time, buyerName, contact, notes, paymentId } = req.body;
    var userId = req.payload.aud;

    try {
        // Verify that we have a payment ID
        if (!paymentId) {
            return res.status(400).json({ 
                success: false,
                message: 'Payment verification failed' 
            });
        }

        // Fetch the user data for the buyer
        var fetchedUserData = await UserAuthModel.findById(userId);
        
        // Fetch the agent details using the propertyData
        const agent = await UserAuthModel.findById(propertyData.agentId);

        // Check if agent exists
        if (!agent) {
            return res.status(404).json({ 
                success: false,
                message: 'Agent not found' 
            });
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
            paymentId, // Store the payment ID
            receipt: null,
            agentName: agent.usrFullName,
            agentPhone: agent.usrMobileNumber
        });

        await newSchedule.save();

        // Generate and upload receipt to Cloudinary
        const receiptUrl = await generateReceipt(newSchedule);
        newSchedule.receipt = receiptUrl; // Store the Cloudinary URL
        await newSchedule.save();

        res.status(200).json({ 
            success: true,
            message: 'Schedule created successfully',
            receipt: receiptUrl
        });
    } catch (error) {
        console.error('Error details:', error.message);
        res.status(500).json({ 
            success: false,
            message: 'Internal Server Error - Unable to schedule visit.' 
        });
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

// Add this new controller method
exports.getRazorpayKey = async (req, res) => {
    try {
        res.status(200).json({ 
            razorpayKeyId: process.env.RAZORPAY_KEY_ID
        });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Update the download receipt route in scheduleRoutes.js
exports.downloadReceipt = async (req, res) => {
    try {
        const schedule = await ScheduleModel.findById(req.params.scheduleId);
        if (!schedule || !schedule.receipt) {
            return res.status(404).json({ message: 'Receipt not found' });
        }

        // Redirect to the Cloudinary URL
        res.redirect(schedule.receipt);
    } catch (error) {
        console.error('Error downloading receipt:', error);
        res.status(500).json({ message: 'Error downloading receipt' });
    }
};