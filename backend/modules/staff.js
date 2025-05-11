const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const staffSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return /^[\w\.-]+@[\w\.-]+\.[a-zA-Z]{2,}$/.test(v); // Simpler regex
      },
      message: 'Invalid email format'
    }
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    unique: true,
    validate: {
      validator: function (v) {
        return /^[0-9]{10,15}$/.test(v);
      },
      message: 'Invalid phone number format'
    }
  },
  password: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: null
  },
  role: {
    type: String,
    enum: ['Admin', 'Auditor', 'Cs', 'Employee'],
    default: 'Employee'
  },
  permissions: {
    type: [String],
    enum: [
      'Manage Staff',
      'Manage Projects',
      'Schedule Meetings',
      'Manage Contracts',
      'Manage Support Requests',
      'Manage Users',
      'Manage Web & App',
      'Manage Advertisements',
    ],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
});

staffSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('Staff', staffSchema);