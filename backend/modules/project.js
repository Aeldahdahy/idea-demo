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
  project_location: {
    type: String,
    required: [true, 'Country is required']
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
    type: String,
    required: [true, 'Project stage is required'],
  },
  networth: {
    type: String,
    required: [true, 'Net worth is required']
  },
  deal_type: {
    type: [String],
    required: [true, 'Deal type is required'], 
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
  team_overview: {
    type: String
  },
  team_members: {
    type: [
      {
        member_image: {
          type: String,
          required: [true, 'Member image is required']
        },
        member_name: {
          type: String,
          required: [true, 'Member name is required'],
          trim: true
        },
        linkedin_account: {
          type: String,
          required: [true, 'LinkedIn account is required'],
          trim: true,
          validate: {
            validator: function (v) {
              // Optional: Basic URL validation for LinkedIn
              return /^https?:\/\/(www\.)?linkedin\.com\/.*$/.test(v);
            },
            message: 'Please enter a valid LinkedIn profile URL'
          }
        },
        member_position: {
          type: String,
          required: [true, 'Member position is required'],
          trim: true
        },
        member_bio: {
          type: String,
          required: [true, 'Member bio is required'],
          trim: true
        }
      }
    ],
    default: [] // Default is empty array
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
