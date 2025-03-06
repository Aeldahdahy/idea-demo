const mongoose = require('mongoose');
const validator = require('validator');
// const bcrypt = require('bcrypt');

const contactSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'Full name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: {
            validator: validator.isEmail,
            message: 'Invalid email format'
        }
    },
    message: {
        type: String,
        required: [true, 'Message is required'],
        default: null
    },
    status: {
        type: String,
        enum: ['Pending', 'Replied'],
        default: 'Pending'
    }
}, { timestamps: true });

// Pre-save hook to encrypt email
// contactSchema.pre('save', async function (next) {
//     if (this.isModified('email')) {
//         const salt = await bcrypt.genSalt(10);
//         this.email = await bcrypt.hash(this.email, salt);
//     }
//     next();
// });

module.exports = mongoose.model('Contact', contactSchema);


