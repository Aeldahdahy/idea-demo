// Initialize packages
const express = require('express');
const router = express.Router();
const upload = require('../middleWare/projectMiddleware'); // Import multer middleware

// functions
const { createContact, signUp, signIn, signOut, verifyOtp, forgotPassword, verifyOtpForReset, resetPassword, getAllUsers, updateUser, getAllContacts, updateContactStatus, createProject, getAllProjects, getProjectById, updateProject, deleteProject, updateUserById } = require('../controller/clientController'); 
const { createStaff, loginStaff, getAllStaff, getStaffById, updateStaff,  createMeeting, assignAuditor, investorSelectSlots, entrepreneurConfirmSlot, getAllMeetings, getMeetingById } = require('../controller/staffController');
const { authenticateToken, isAdmin } = require('../middleWare/middleWare');
const userImageUploads = require('../middleWare/userImageUploads');
const staffImageUploads = require('../middleWare/staffImageUploads'); // Import multer middleware
const { body } = require('express-validator');
const { validateMeetingSlots } = require('../middleWare/slotValidation');

// const { session } = require('passport');

// -----------------------------------------------------------------------------------> staff portal <-----------------------------------------------------------------------------------


// Staff portal: Create a new staff member (Admin only)
router.post('/staff', authenticateToken, isAdmin, staffImageUploads, createStaff);

// Staff login
router.post('/staff/login', loginStaff);

// Get all staff members (Admin only)
router.get('/staff', authenticateToken, isAdmin, getAllStaff);

// Get a single staff member by ID (Admin only)
router.get('/staff/:staffId', authenticateToken, isAdmin, getStaffById);

// Update staff details (Admin only)
router.put('/staff/:staffId', authenticateToken, isAdmin, staffImageUploads, updateStaff);

// Get all Users (Clients) (Admin only)
router.get('/users', authenticateToken, isAdmin, getAllUsers);

// Get all contact messages (Admin only)
router.get('/contacts', authenticateToken, isAdmin, getAllContacts);

// Update contact message status (Admin only)
router.put('/contacts/:contactId/status', authenticateToken, isAdmin, updateContactStatus);

// Get all projects (Admin only)
router.get('/projects', authenticateToken, isAdmin, getAllProjects);

// Get a single project by ID (Admin only)
router.get('/projects/:projectId', authenticateToken, isAdmin, getProjectById);

// Step 1: Investor requests a meeting
router.post('/create-meeting', authenticateToken, createMeeting);

// Step 2: Admin assigns an auditor and generates 3 slots
router.put('/assign-auditor/:meetingId', authenticateToken, isAdmin, assignAuditor);

// Step 3: Investor selects 2 slots
router.put('/investor-select/:meetingId', authenticateToken, validateMeetingSlots, investorSelectSlots);

// Step 4: Entrepreneur confirms final slot
router.put('/entrepreneur-confirm/:meetingId', authenticateToken, validateMeetingSlots, entrepreneurConfirmSlot);

// Route to get all meetings
router.get('/meetings', authenticateToken, getAllMeetings);

// Route to get a meeting by ID
router.get('/meetings/:id', getMeetingById);

// -----------------------------------------------------------------------------------> client portal <-----------------------------------------------------------------------------------

// Handle contact form submission
router.post('/contact', createContact);

// Initial signup route to send OTP
router.post('/signup', signUp);

// Update user data
router.put('/users/:id', authenticateToken, userImageUploads.single('image'), updateUserById);

// Verify OTP and complete signup route
router.post('/verify-otp', verifyOtp);

// Sign-in route
router.post('/signin',
  [
    body('email').isEmail().withMessage('Please enter a valid email.'),
    body('password').notEmpty().withMessage('Password is required.')
  ], signIn
);

// Sign-out route
router.post('/signout', signOut);

// Request OTP for password reset
router.post('/forgot-password', forgotPassword);

// Verify OTP and reset password
router.post('/verify-otp-for-reset', verifyOtpForReset);

// Reset password
router.post('/reset-password', resetPassword);

// Create a new project (Authenticated users only)
router.post('/projects', authenticateToken, upload, createProject);

// Update project (Authenticated users only)
router.put('/projects/:projectId', authenticateToken, upload, updateProject);

// Delete project (Authenticated users only)
router.delete('/projects/:projectId', authenticateToken, deleteProject);

module.exports = router;
