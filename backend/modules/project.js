const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  user_name: {
    type: String,
    required: [true, 'User name is required'],
    trim: true
  },
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
    type: String, // File path or URL
    required: false
  },
  additional_document: {
    type: String, // File path or URL
    required: false
  },
  financial_statement: {
    type: String, // File path or URL
    required: false
  },
  exective_sunnary: {
    type: String, // File path or URL
    required: false
  },
  project_images: {
    type: [String],
    required: false,
    default: []
  },
  project_logo:{
    type: String, 
    required: false
  },
  project_stage: {
    type: String
  },
  networth: {
    type: String
  },
  deal_type: {
    type: String
  },
  website_link: {
    type: String
  },
  bussiness_highlights: {
    type: String
  },
  financial_status: {
    type: String
  },
  business_description: {
    type: String
  },
  comment: {
    type: String,
    default: 'N/A'
  },
  status: {
    type: String,
    enum: ['Approved', 'Rejected'],
    default: 'Rejected'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Project', projectSchema);
