const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  client_review: {
    type: String,
    required: [true, 'Client review is required'],
    trim: true
  },
  review_rate: {
    type: Number,
    required: [true, 'Review rate is required'],
    min: 1,
    max: 5
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Review', reviewSchema);
