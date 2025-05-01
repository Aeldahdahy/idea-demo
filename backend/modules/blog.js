const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  blog_title: {
    type: String,
    required: [true, 'Blog title is required'],
    trim: true
  },
  blog_image: {
    type: String, 
    default: null
  },
  blog_description: {
    type: String,
    required: [true, 'Blog description is required'],
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Blog', blogSchema);
