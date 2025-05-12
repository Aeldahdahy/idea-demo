const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  receiver: { type: String, required: true },
  type: {
    type: String,
    enum: ["text", "image", "video", "file", "link", "number", "other"],
    required: true,
  },
  content: {
    type: mongoose.Schema.Types.Mixed, 
    required: true,
  },
  senderName: { type: String },
  timestamp: { type: Date, default: Date.now },
  seen: { type: Boolean, default: false },
}); 

module.exports = mongoose.model("Chat", ChatSchema);