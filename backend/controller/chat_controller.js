const Chat = require('../modules/chat');
const User = require('../modules/signup'); // Adjust path as needed

// Get messages between two users
exports.getMessages = async (req, res) => {
  try {
    const { userId, otherUserId } = req.params;
    const messages = await Chat.find({
      $or: [
        { sender: userId, receiver: otherUserId },
        { sender: otherUserId, receiver: userId },
      ],
    }).sort({ timestamp: 1 }); // Sort by timestamp ascending
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

// Post a message
exports.postMessage = async (req, res) => {
  try {
    const { sender, receiver, message } = req.body;
    const chatMessage = new Chat({
      sender,
      receiver,
      type: 'text',
      content: message,
    });
    await chatMessage.save();
    res.status(201).json(chatMessage);
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ error: "Failed to save message" });
  }
};

// Get users with recent messages
exports.getRecentUsers = async (req, res) => {
  try {
    const currentUserId = req.user._id; // Assuming authenticateToken sets req.user

    // Aggregate chats to find the latest message per user (sent or received)
    const recentChats = await Chat.aggregate([
      {
        $match: {
          $or: [{ sender: currentUserId }, { receiver: currentUserId }],
        },
      },
      {
        $sort: { timestamp: -1 }, // Sort by timestamp descending
      },
      {
        $group: {
          _id: {
            $cond: {
              if: { $eq: ['$sender', currentUserId] },
              then: '$receiver',
              else: '$sender',
            },
          },
          lastMessageTime: { $first: '$timestamp' },
        },
      },
    ]);

    // Map user IDs from recent chats
    const recentUserIds = recentChats.map((chat) => chat._id);

    // Fetch user details (excluding the current user)
    const users = await User.find({ _id: { $nin: [currentUserId], $in: recentUserIds } })
      .select('fullName image');

    // Add last message timestamp to each user
    const usersWithRecent = users.map((user) => {
      const recentChat = recentChats.find((chat) => chat._id.toString() === user._id.toString());
      return {
        ...user.toObject(),
        lastMessageTime: recentChat ? recentChat.lastMessageTime : null,
      };
    });

    res.status(200).json({ success: true, data: usersWithRecent });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching recent users', error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    
    // Find all users except the current user
    const users = await User.find({ _id: { $ne: currentUserId } })
      .select('fullName image createdAt');
    
    // Find unread messages count for each user
    const unreadCounts = await Chat.aggregate([
      {
        $match: {
          receiver: currentUserId,
          seen: { $ne: true }
        }
      },
      {
        $group: {
          _id: '$sender',
          count: { $sum: 1 }
        }
      }
    ]);

    // Find last received message time for each user
    const lastReceivedMessages = await Chat.aggregate([
      {
        $match: {
          receiver: currentUserId
        }
      },
      {
        $sort: { timestamp: -1 }
      },
      {
        $group: {
          _id: '$sender',
          lastMessageTime: { $first: '$timestamp' },
          lastMessageContent: { $first: '$content' }
        }
      }
    ]);

    // Find last sent message time for each user (for users with no received messages)
    const lastSentMessages = await Chat.aggregate([
      {
        $match: {
          sender: currentUserId
        }
      },
      {
        $sort: { timestamp: -1 }
      },
      {
        $group: {
          _id: '$receiver',
          lastMessageTime: { $first: '$timestamp' },
          lastMessageContent: { $first: '$content' }
        }
      }
    ]);

    // Combine all data
    const usersWithChatInfo = users.map(user => {
      const unread = unreadCounts.find(u => u._id.toString() === user._id.toString());
      const lastReceived = lastReceivedMessages.find(m => m._id.toString() === user._id.toString());
      const lastSent = lastSentMessages.find(m => m._id.toString() === user._id.toString());
      
      // Use received message time if available, otherwise use sent message time
      const lastMessageTime = lastReceived?.lastMessageTime || lastSent?.lastMessageTime || null;
      const lastMessageContent = lastReceived?.lastMessageContent || lastSent?.lastMessageContent || null;
      
      return {
        ...user.toObject(),
        unreadCount: unread ? unread.count : 0,
        lastMessageTime,
        lastMessageContent
      };
    });

    // Sort by last received message time (most recent first), then by unread count
    usersWithChatInfo.sort((a, b) => {
      if (a.lastMessageTime && b.lastMessageTime) {
        return b.lastMessageTime - a.lastMessageTime;
      }
      if (a.lastMessageTime) return -1;
      if (b.lastMessageTime) return 1;
      return b.unreadCount - a.unreadCount;
    });

    res.status(200).json({ success: true, data: usersWithChatInfo });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching users', error: error.message });
  }
};

exports.markAsSeen = async (req, res) => {
  try {
    const { userId, otherUserId } = req.params;
    
    await Chat.updateMany(
      {
        sender: otherUserId,
        receiver: userId,
        seen: false
      },
      {
        $set: { seen: true }
      }
    );
    
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error marking messages as seen', error: error.message });
  }
};