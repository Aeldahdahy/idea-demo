const mongoose = require('mongoose'); // Import Mongoose
const validator = require('validator'); // Import validator package
const bcrypt = require('bcrypt'); // Import bcrypt for encryption

const userSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
        enum: ['entrepreneur', 'investor'], // Ensure role is either 'entrepreneur' or 'investor'
        message: 'Role should be either entrepreneur or investor'
    },
    fullName: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return validator.isAlpha(v, 'en-US', { ignore: ' ' }); // Validates that the name contains only letters and spaces
            },
            message: 'Full name should contain only letters and spaces'
        }
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure email is unique
        validate: {
            validator: validator.isEmail,
            message: 'Invalid email format'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8 // Ensure password has a minimum length
    }
});

// Pre-save hook to encrypt password
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10); // Generate salt
        this.password = await bcrypt.hash(this.password, salt); // Encrypt password
    }
    next();
});

module.exports = mongoose.model('User', userSchema); // Export the model
