const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Contact = require('../modules/contact');
const User = require('../modules/signup');
const Otp = require('../modules/otp');

const JWT_SECRET = 'your_jwt_secret_key'; // Replace with your actual secret key

// Create a transporter for nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tahaelrajel8@gmail.com',
    pass: 'bwdj iofo hirn vqmx'
  }
});

// Generate OTP
const generateOtp = () => {
  return Math.floor(1000 + Math.random() * 9000).toString(); // 4-character OTP
};

// Handle contact form submission
router.post('/contact', async (req, res) => {
  try {
    const { fullname, email, message } = req.body;

    // Create a new contact instance
    const newContact = new Contact({ fullname, email, message });

    // Save the contact to the database
    await newContact.save();

    res.status(201).send({ message: 'Contact message received successfully' });
  } catch (error) {
    let errors = {};
    if (error instanceof mongoose.Error.ValidationError) {
      for (let field in error.errors) {
        errors[field] = error.errors[field].message;
      }
    } else {
      errors['general'] = 'An error occurred while saving the contact message';
    }
    res.status(400).send(errors);
  }
});

// Initial signup route to send OTP
router.post('/signup', async (req, res) => {
  const { email } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists!' });
    }

    const otp = generateOtp();
    const otpEntry = new Otp({ email, otp });
    await otpEntry.save();

    const mailOptions = {
      from: 'tahaelrajel8@gmail.com',
      to: email,
      subject: 'Your OTP for Signup',
      text: `Your OTP is ${otp}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to send OTP!' });
      } else {
        console.log('Email sent: ' + info.response);
        return res.status(200).json({ message: 'OTP sent to email.' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error!' });
  }
});

// Verify OTP and complete signup route
router.post('/verify-otp', async (req, res) => {
  const { email, otp, role, fullName, password } = req.body;

  try {
    const otpEntry = await Otp.findOne({ email, otp });

    if (!otpEntry) {
      return res.status(400).json({ message: 'Invalid OTP!' });
    }

    const newUser = new User({ email, password, role, fullName });

    try {
      await newUser.save();
      await Otp.deleteMany({ email });
      res.status(201).send({ message: 'User registered successfully!' });
    } catch (error) {
      let errors = {};
      if (error instanceof mongoose.Error.ValidationError) {
        for (let field in error.errors) {
          errors[field] = error.errors[field].message;
        }
      } else if (error.code === 11000) {
        errors['email'] = 'Email already exists!';
      } else {
        errors['general'] = 'An error occurred during registration';
      }
      res.status(400).json(errors);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error!' });
  }
});

// Sign-in route
router.post(
  '/signin',
  [
    body('email').isEmail().withMessage('Please enter a valid email.'),
    body('password').notEmpty().withMessage('Password is required.')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      req.session.user = {
        id: user.id,
        email: user.email,
        role: user.role,
        fullName: user.fullName
      };

      res.status(200).json({ message: 'Sign-in successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Sign-out route
router.post('/signout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: 'Failed to log out' });
    }
    res.clearCookie('connect.sid'); // clear the cookie on client side
    res.status(200).json({ message: 'Sign-out successful' });
  });
});

// Request OTP for password reset
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User with this email does not exist!' });
    }

    const otp = generateOtp();
    const otpEntry = new Otp({ email, otp });
    await otpEntry.save();

    const mailOptions = {
      from: 'tahaelrajel8@gmail.com',
      to: email,
      subject: 'Your OTP for Password Reset',
      text: `Your OTP is ${otp}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to send OTP!' });
      } else {
        console.log('Email sent: ' + info.response);
        return res.status(200).json({ message: 'OTP sent to email.' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error!' });
  }
});

// Verify OTP and reset password
router.post('/verify-otp-for-reset', async (req, res) => {
  const { email, otp } = req.body;

  try {
    const otpEntry = await Otp.findOne({ email, otp });
    if (!otpEntry) {
      return res.status(400).json({ message: 'Invalid OTP!' });
    }
    res.status(200).json({ message: 'OTP is valid. Proceed to reset password.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error!' });
  }
});

router.put('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User with this email does not exist!' });
    }

    user.password = await bcrypt.hash(newPassword, 10); // Hash the new password
    await user.save();

    // Optionally, delete the OTP entries if you are using the same OTP system for password reset
    await Otp.deleteMany({ email });

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error!' });
  }
});

// Protected route example
router.get('/protected-route', (req, res) => {
  if (req.session.user) {
    res.status(200).json({ message: 'This is a protected route', user: req.session.user });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

module.exports = router;
