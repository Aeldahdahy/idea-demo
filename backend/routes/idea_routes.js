const express = require('express');
const router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
const Contact = require('../modules/contact'); // Assuming your contact schema is in models/contact.js
const User = require('../modules/signup'); // Assuming your user schema is in models/signup.js

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




// Handle signup form submission
router.post('/signup', async (req, res) => {
  try {
      const user = new User(req.body);
      await user.save();
      res.status(201).send({ message: 'User registered successfully!' });
  } catch (error) {
      let errors = {};
      if (error instanceof mongoose.Error.ValidationError) {
          for (let field in error.errors) {
              errors[field] = error.errors[field].message;
          }
      } else if (error.code === 11000) {
          // Handle unique constraint errors (duplicate email)
          errors['email'] = 'Email already exists';
      } else {
          errors['general'] = 'An error occurred during registration';
      }
      res.status(400).json(errors); // Changed to json method directly
  }
});



module.exports = router;
