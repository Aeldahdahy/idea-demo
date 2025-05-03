const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    required: [true, 'Role is required'],
    enum: {
      values: ['entrepreneur', 'investor'],
      message: 'Role should be either entrepreneur or investor'
    }
  },
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    validate: {
      validator: function (v) {
        return validator.isAlpha(v, 'en-US', { ignore: ' ' });
      },
      message: 'Full name should contain only letters and spaces'
    }
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Invalid email format'
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password should be at least 8 characters long']
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
  phone: {
    type: String,
    default: null
  },
  address: {
    type: String,
    default: null
  },
  date_of_birth: {
    type: Date,
    default: null
  },
  national_id: {
    type: String,
    default: null
  },
  education: {
    type: String,
    default: null
  },
  experience: {
    type: String,
    default: null
  },
  biography: {
    type: String,
    default: null
  },
  image: {
    type: String,
    default: null
  },
  firstLogin: {
    type: Boolean,
    default: true
  },
  country: {
    type: String,
    default: null,
  },
  city: {
    type: String,
    default: null,
  },
  socialAccounts: {
    type: [String],
    validate: {
      validator: function (v) {
        return v.length > 0 && v.every(account => account.trim() !== '');
      },
      message: 'At least one valid social account is required'
    },
    required: [true, 'At least one social account is required']
  },
  yearsOfExperience: {
    type: String,
    enum: ['0-1', '1-3', '3-5', '5+', 'N/A'],
    default: 'N/A'
  },
  investorPreference: {
    type: {
      investorType: {
        type: String,
        enum: ['individual', 'company'],
        required: function () {
          return this.role === 'investor';
        }
      },
      minInvestment: {
        type: Number,
        min: [0, 'Minimum investment cannot be negative'],
        max: [1000000, 'Minimum investment cannot exceed $1,000,000'],
        required: function () {
          return this.role === 'investor';
        }
      },
      maxInvestment: {
        type: Number,
        min: [0, 'Maximum investment cannot be negative'],
        max: [1000000, 'Maximum investment cannot exceed $1,000,000'],
        validate: {
          validator: function (value) {
            return !this.investorPreference || typeof this.investorPreference.minInvestment !== 'number' || value >= this.investorPreference.minInvestment;
          },
          message: 'Maximum investment must be greater than or equal to minimum investment'
        },
        required: function () {
          return this.role === 'investor';
        }
      },
      industries: {
        type: [String],
        validate: {
          validator: function (v) {
            return v.length >= 3;
          },
          message: 'At least 3 industries must be selected'
        },
        required: function () {
          return this.role === 'investor';
        }
      }
    },
    default: null
  }
}, { timestamps: true });

// Pre-save hook to encrypt password
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

module.exports = mongoose.model('User', userSchema);