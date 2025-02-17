const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator');

require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

// Import models
const Contact = require('../modules/contact');
const User = require('../modules/signup');
const Otp = require('../modules/otp');

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

const createContact = async (req, res) => {
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
};

const signUp =  async (req, res) => {
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
};

const verifyOtp = async (req, res) => {
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
};

const signIn = async (req, res) => {
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
        console.log(req.session.user);
        res.status(200).json({ token });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const signOut = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Failed to destroy session:', err);
      return res.status(500).json({ message: 'Failed to sign out' });
    }

    // Clear the session cookie
    res.clearCookie('connect.sid', { path: '/' }); // Ensure path matches the cookie's path option
    res.status(200).json({ message: 'Signed out successfully' });
  });
};

const forgotPassword =  async (req, res) => {
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
};

const verifyOtpForReset = async (req, res) => {
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
};

const resetPassword = async (req, res) => {
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
};

module.exports = 
{ 
    createContact,
    signUp,
    signIn,
    signOut,
    verifyOtp,
    forgotPassword,
    verifyOtpForReset,
    resetPassword,
};
