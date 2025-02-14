const multer = require('multer');
const path = require('path');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinaryConfig');

// Configure Cloudinary storage for receipts
const receiptStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'receipts', // This will create a 'receipts' folder in your Cloudinary account
        allowed_formats: ['pdf'], // Only allow PDFs
        resource_type: 'raw', // This is important for PDFs
        public_id: (req, file) => {
            // Generate a unique name for the receipt
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            return `receipt-${uniqueSuffix}`;
        }
    }
});

// Create multer upload instance for receipts
const receiptUpload = multer({ 
    storage: receiptStorage,
    fileFilter: (req, file, cb) => {
        // Only accept PDFs
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed!'), false);
        }
    },
    limits: {
        fileSize: 5 * 1024 * 1024 // Limit file size to 5MB
    }
});

module.exports = receiptUpload; 