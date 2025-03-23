const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create upload directories if they don’t exist
const createUploadDirs = () => {
    const directories = ['uploads/staff_images'];
    directories.forEach(dir => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    });
};
createUploadDirs();

// Multer storage configuration for staff images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/staff_images'); // Store staff images in uploads/staff_images
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

// Multer upload middleware
const staffImageUploads = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit to match project uploads
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only images (JPEG, PNG, JPG) are allowed'));
        }
    }
}).fields([{ name: 'image', maxCount: 1 }]); // Accepts only one image file

module.exports = staffImageUploads;
