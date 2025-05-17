const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  recipientId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'recipientModel',
  },
  recipientModel: {
    type: String,
    required: true,
    enum: ['User', 'Staff'], // Matches controller logic
  },
  title: { type: String, required: true },
  body: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  sourceType: { type: String, enum: ['message', 'alert', 'system', 'email', 'other'], default: 'other' },
  metadata: { type: mongoose.Schema.Types.Mixed },
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);