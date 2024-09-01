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
const Staff = require('../modules/staff'); // Import Staff model
const { session } = require('passport');

const JWT_SECRET = 'your_jwt_secret_key'; // Replace with your actual secret key

// Middleware to authenticate JWT tokens
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Get token from 'Bearer <token>' format

  if (token == null) return res.sendStatus(401); // No token

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Invalid token

    req.user = user;
    next();
  });
};



// Middleware to check if the user is an Admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'Admin') {
    return res.status(403).send('Access denied. Admins only.');
  }
  next();
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




// Staff portal: Create a new staff member (Admin only)
router.post('/staff', authenticateToken, isAdmin, async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const existingUser = await Staff.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Staff member already exists!' });
    }

    const newStaff = new Staff({ username, password, role });
    await newStaff.save();

    res.status(201).json({ message: 'Staff member created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error!' });
  }
});

// Staff login
router.post('/staff/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const staff = await Staff.findOne({ username });
    if (!staff) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, staff.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: staff._id, role: staff.role }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error!' });
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

      const payload = {
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          fullName: user.fullName
        }
      };

      jwt.sign(
        payload,
        JWT_SECRET,
        { expiresIn: '1h' },
        (err, token) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Failed to generate token' });
          }
          req.session.user = payload.user; // Save user info in session
          res.status(200).json({ token });
        }
      );
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
      console.error('Failed to destroy session:', err);
      return res.status(500).json({ message: 'Failed to sign out' });
    }

    // Clear the session cookie
    res.clearCookie('connect.sid', { path: '/' }); // Ensure path matches the cookie's path option
    res.status(200).json({ message: 'Signed out successfully' });
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

    // Perform password reset here
    res.status(200).json({ message: 'OTP verified successfully! You can now reset your password.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error!' });
  }
});

// Reset password
router.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.updateOne({ email }, { password: hashedPassword });
    await Otp.deleteMany({ email });
    res.status(200).json({ message: 'Password reset successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error!' });
  }
});

module.exports = router;
