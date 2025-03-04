// Initialize packages
const express = require('express');
const router = express.Router();


// functions
const { createContact, signUp, signIn, signOut, verifyOtp, forgotPassword, verifyOtpForReset, resetPassword, getAllUsers, updateUser, getAllContacts, updateContactStatus } = require('../controller/clientController'); 
const { createStaff, loginStaff, getAllStaff, getStaffById, updateStaff } = require('../controller/staffController');
const { authenticateToken, isAdmin } = require('../middleWare/middleWare');
const { body } = require('express-validator');

// const { session } = require('passport');

// -----------------------------------------------------------------------------------> staff portal <-----------------------------------------------------------------------------------

// Staff portal: Create a new staff member (Admin only)
router.post('/staff', authenticateToken, isAdmin, createStaff);

// Staff login
router.post('/staff/login', loginStaff);

// Get all staff members (Admin only)
router.get('/staff', authenticateToken, isAdmin, getAllStaff);

// Get a single staff member by ID (Admin only)
router.get('/staff/:staffId', authenticateToken, isAdmin, getStaffById);

// Update staff details (Admin only)
router.put('/staff/:staffId', authenticateToken, isAdmin, updateStaff);

// -----------------------------------------------------------------------------------> client portal <-----------------------------------------------------------------------------------

// Handle contact form submission
router.post('/contact', createContact);

// Initial signup route to send OTP
router.post('/signup', signUp);

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

// Get all Users (Clients) (Admin only)
router.get('/users', authenticateToken, isAdmin, getAllUsers);

// Update user data (Admin only)
router.put('/users/:userId', authenticateToken, isAdmin, updateUser);

// Get all contact messages (Admin only)
router.get('/contacts', authenticateToken, isAdmin, getAllContacts);

// Update contact message status (Admin only)
router.put('/contacts/:contactId/status', authenticateToken, isAdmin, updateContactStatus);

module.exports = router;
