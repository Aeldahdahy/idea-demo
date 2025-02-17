const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator');
// Import models
const Staff = require('../modules/staff'); 

const JWT_SECRET = 'your_jwt_secret_key'; // Replace with your actual secret key

const createStaff = async (req, res) => {
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
};

const loginStaff = async (req, res) => {
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
};



module.exports = 
{ 
    createStaff,
    loginStaff 
};
