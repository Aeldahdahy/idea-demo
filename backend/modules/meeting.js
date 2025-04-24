const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
project_id: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Project',
  required: true
},
investor_id: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true
},
entrepreneur_id: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true
},
auditor_id: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Staff', // or 'User' if auditors are in users
  default: null
},

request_date: {
  type: Date,
  default: Date.now
},

status: {
  type: String,
  enum: [
    'Requested',               // Step 1
    'SlotsSentToInvestor',     // Step 2
    'SlotsSelectedByInvestor', // Step 3
    'SlotConfirmedByEntrepreneur', // Step 4
    'Scheduled',               // Step 5
    'Completed',
    'Cancelled'
  ],
  default: 'Requested'
},

// Step 2: System assigned 3 slots
available_slots: [
  {
    day: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday']
    },
    time: {
      type: String,
      enum: ['09:00-11:00', '12:00-14:00']
    }
  }
],

// Step 3: Investor selects 2 preferred slots
investor_selected_slots: [
  {
    day: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday']
    },
    time: {
      type: String,
      enum: ['09:00-11:00', '12:00-14:00']
    }
  }
],

// Step 4: Entrepreneur confirms 1 final slot
entrepreneur_final_slot: {
  day: {
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday']
  },
  time: {
    type: String,
    enum: ['09:00-11:00', '12:00-14:00']
  }
},

// Optional for calendar integration
scheduled_at: {
  type: Date // You can calculate this later for reminders
},

createdAt: {
  type: Date,
  default: Date.now
}
});
  
module.exports = mongoose.model('Meeting', meetingSchema);
  