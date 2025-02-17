// Initialize packages
const express = require('express');
const router = express.Router();


// functions
const { createContact, signUp, signIn, signOut, verifyOtp, forgotPassword, verifyOtpForReset, resetPassword } = require('../controller/clientController'); 
const { createStaff, loginStaff } = require('../controller/staffController');
const { authenticateToken, isAdmin } = require('../middleWare/middleWare');
const { body } = require('express-validator');

// const { session } = require('passport');

// -----------------------------------------------------------------------------------> staff portal <-----------------------------------------------------------------------------------

// Staff portal: Create a new staff member (Admin only)
router.post('/staff', authenticateToken, isAdmin, createStaff);

// Staff login
router.post('/staff/login', loginStaff);

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


module.exports = router;
