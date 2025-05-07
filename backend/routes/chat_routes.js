const express = require('express');
const router = express.Router();
const chatController = require('../controller/chat_controller');
const { authenticateToken } = require('../middleWare/middleWare'); 

// Get all messages between two users
router.get('/chats/:userId/:otherUserId', chatController.getMessages);

// Post a message (optional, since Socket.IO handles real-time)
router.post('/chats', chatController.postMessage);

// Get users with recent messages
router.get('/users/recent', authenticateToken, chatController.getRecentUsers);

// Get all available users to chat with
router.get('/users/available', authenticateToken, chatController.getAllUsers);

router.put('/chats/mark-seen/:userId/:otherUserId', authenticateToken, chatController.markAsSeen);

module.exports = router;