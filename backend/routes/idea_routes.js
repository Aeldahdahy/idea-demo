const express = require('express');
const router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const Contact = require('../modules/contact'); // Assuming the contact schema is in modules/contact.js
const User = require('../modules/signup'); // Assuming the user schema is in modules/signup.js
const Otp = require('../modules/otp'); // OTP schema




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
      pass: 'taha2002'
    }
  });




 // Generate OTP
 const generateOtp = () => {
    return Math.floor(1000 + Math.random() * 9000).toString(); // 4-character OTP
  };




// Initial signup route to send OTP
router.post('/signup', async (req, res) => {
    const { email } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
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
          return res.status(500).json({ message: 'Failed to send OTP' });
        } else {
          console.log('Email sent: ' + info.response);
          return res.status(200).json({ message: 'OTP sent to email' });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  



// Verify OTP and complete signup route
router.post('/verify-otp', async (req, res) => {
    const { email, otp, role, fullName, password } = req.body;
  
    try {
      const otpEntry = await Otp.findOne({ email, otp });
  
      if (!otpEntry) {
        return res.status(400).json({ message: 'Invalid OTP' });
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
          errors['email'] = 'Email already exists';
        } else {
          errors['general'] = 'An error occurred during registration';
        }
        res.status(400).json(errors);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });  



module.exports = router;