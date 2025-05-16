const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sanitizePath = require('sanitize-filename');

// Constants for configuration
const UPLOAD_DIRS = {
  IMAGES: 'uploads/images',
  DOCUMENTS: 'uploads/documents',
};

const ALLOWED_FILE_TYPES = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/gif': ['.gif'],
  'application/pdf': ['.pdf'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'application/vnd.ms-excel': ['.xls'],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const FIELD_LIMITS = [
  { name: 'business_plan', maxCount: 1 },
  { name: 'additional_document', maxCount: 1 },
  { name: 'financial_statement', maxCount: 1 },
  { name: 'exective_sunnary', maxCount: 1 },
  { name: 'project_images', maxCount: 5 },
  { name: 'project_logo', maxCount: 1 },
  { name: 'member_image[]', maxCount: 10 }, // Keep as 'member_image' for multer
];

// Create upload directories if they don’t exist
const createUploadDirs = () => {
  Object.values(UPLOAD_DIRS).forEach(dir => {
    try {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`Created upload directory: ${dir}`);
      }
    } catch (error) {
      console.error(`Failed to create directory ${dir}:`, error);
      throw new Error(`Unable to create upload directory: ${dir}`);
    }
  });
};

// Initialize directories
createUploadDirs();

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Route images (including project_logo and member_image) to images directory
    if (file.mimetype.startsWith('image/') || ['project_logo', 'member_image'].includes(file.fieldname)) {
      cb(null, UPLOAD_DIRS.IMAGES);
    } else {
      cb(null, UPLOAD_DIRS.DOCUMENTS);
    }
  },
  filename: (req, file, cb) => {
    // Sanitize the original filename and append timestamp for uniqueness
    const sanitizedName = sanitizePath(file.originalname.replace(/\s+/g, '_')); // Replace spaces with underscores
    const timestamp = Date.now();
    const ext = path.extname(sanitizedName).toLowerCase();
    const basename = path.basename(sanitizedName, ext);
    cb(null, `${timestamp}-${basename}${ext}`);
  },
});

// File filter to validate MIME types and extensions
const fileFilter = (req, file, cb) => {
  const { mimetype, originalname } = file;
  const ext = path.extname(originalname).toLowerCase();

  // Check if MIME type is allowed
  if (!Object.keys(ALLOWED_FILE_TYPES).includes(mimetype)) {
    console.error(`Invalid MIME type for ${file.fieldname}: ${mimetype}`);
    return cb(new Error(`Invalid file type for ${file.fieldname}. Allowed types: JPEG, PNG, GIF, PDF, DOC, DOCX, XLS, XLSX`));
  }

  // Verify that the file extension matches the MIME type
  if (!ALLOWED_FILE_TYPES[mimetype].includes(ext)) {
    console.error(`MIME type ${mimetype} does not match extension ${ext} for ${file.fieldname}`);
    return cb(new Error(`File extension ${ext} does not match the file type for ${file.fieldname}`));
  }

  // Additional validation per field
  const imageFields = ['project_logo', 'member_image', 'project_images'];
  const documentFields = ['business_plan', 'additional_document', 'exective_sunnary'];
  const financialFields = ['financial_statement'];

  if (imageFields.includes(file.fieldname) && !mimetype.startsWith('image/')) {
    return cb(new Error(`Only image files (JPEG, PNG, GIF) are allowed for ${file.fieldname}`));
  }
  if (documentFields.includes(file.fieldname) && !['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(mimetype)) {
    return cb(new Error(`Only PDF, DOC, or DOCX files are allowed for ${file.fieldname}`));
  }
  if (financialFields.includes(file.fieldname) && !['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'].includes(mimetype)) {
    return cb(new Error(`Only PDF, DOC, DOCX, XLS, or XLSX files are allowed for ${file.fieldname}`));
  }

  cb(null, true);
};

// Multer upload middleware
const upload = multer({
  storage,
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: FIELD_LIMITS.reduce((sum, field) => sum + field.maxCount, 0),
  },
  fileFilter,
}).fields(FIELD_LIMITS);

// Error handling middleware for multer errors
const handleMulterErrors = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: `File upload error: ${err.message}`,
      field: err.field || 'unknown',
    });
  }
  if (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
  next();
};

module.exports = { upload, handleMulterErrors };