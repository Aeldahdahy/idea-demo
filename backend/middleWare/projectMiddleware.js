const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create upload directories if they don’t exist
const createUploadDirs = () => {
    const directories = ['uploads/images', 'uploads/documents'];
    directories.forEach(dir => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    });
};
createUploadDirs();

// Multer storage configuration for documents and images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, 'uploads/images'); // Store images in uploads/images
        } else {
            cb(null, 'uploads/documents'); // Store documents in uploads/documents
        }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

// Multer upload middleware
const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only images (JPEG, PNG) and PDFs are allowed'));
        }
    }
}).fields([
    { name: 'business_plan', maxCount: 1 },
    { name: 'additional_document', maxCount: 1 },
    { name: 'project_images', maxCount: 5 }
]);

module.exports = upload;
