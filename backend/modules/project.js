const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  project_name: {
    type: String,
    required: [true, 'Project name is required'],
    trim: true
  },
  project_industry: {
    type: String,
    required: [true, 'Project industry is required'],
    trim: true
  },
  max_investment: {
    type: String,
    required: [true, 'Max investment is required']
  },
  min_investment: {
    type: String,
    required: [true, 'Min investment is required']
  },
  city: {
    type: String,
    required: [true, 'City is required']
  },
  state: {
    type: String,
    required: [true, 'State is required']
  },
  postal_code: {
    type: String,
    required: [true, 'Postal code is required']
  },
  market_description: {
    type: String,
    required: [true, 'Market description is required']
  },
  business_objectives: {
    type: String,
    required: [true, 'Business objectives are required']
  },
  business_plan: {
    type: String, // Stores the file path or URL
    required: false
  },
  additional_document: {
    type: String, // Stores the file path or URL
    required: false
  },
  project_images: {
    type: [String], // Array of image file paths or URLs
    required: false,
    default: []
  },
  status: { type: String,
   enum: ['Approved', 'Rejected'], 
   default: 'Rejected'
   },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Project', projectSchema);
