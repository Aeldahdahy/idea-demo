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
        default: 'Active' },
}, { timestamps: true });

// Pre-save hook to encrypt password
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        // this.email = await bcrypt.hash(this.email, salt);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

module.exports = mongoose.model('User', userSchema);

