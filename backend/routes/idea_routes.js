const express = require('express');
const router = express.Router();
const path = require('path');
const Contact = require('../modules/contact'); // Assuming your contact schema is in models/contact.js
const User = require('../modules/signup'); // Assuming your user schema is in models/signup.js

// Handle contact form submission
router.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Create a new contact instance
    const newContact = new Contact({ name, email, message });

    // Save the contact to the database
    await newContact.save();

    res.status(201).send('Contact message received successfully');
  } catch (error) {
    res.status(400).send(`Error saving contact message: ${error.message}`);
  }
});


// Handle signup form submission
router.post('/signup', async (req, res) => {
  try {
    const { role, fullName, email, password } = req.body;

    // Create a new user instance
    const newUser = new User({ role, fullName, email, password });

    // Save the user to the database
    await newUser.save();

    res.status(201).send('User signed up successfully');
  } catch (error) {
    res.status(400).send(`Error signing up user: ${error.message}`);
  }
});

module.exports = router;
