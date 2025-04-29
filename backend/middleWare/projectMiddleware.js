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

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Save images (including member_image and project_logo) to 'uploads/images'
        if (file.mimetype.startsWith('image/') || ['project_logo', 'member_image'].includes(file.fieldname)) {
            cb(null, 'uploads/images');
        } else {
            cb(null, 'uploads/documents');
        }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Multer upload middleware
const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
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
    { name: 'financial_statement', maxCount: 1 },
    { name: 'exective_sunnary', maxCount: 1 }, // ⚡ (Reminder: consider renaming to 'executive_summary' later)
    { name: 'project_images', maxCount: 5 },
    { name: 'project_logo', maxCount: 1 },
    { name: 'member_image', maxCount: 10 } // ✅ Added member_image field (up to 10 members for example)
]);

module.exports = upload;
