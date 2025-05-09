const Chat = require('../modules/chat');
const User = require('../modules/signup');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true,
  auth: {
    user: 'idea.venture@idea-venture.agency',
    pass: '3UzrwDDv4Ati',
  },
});

// Get messages between two users
exports.getMessages = async (req, res) => {
  try {
    const { userId, otherUserId } = req.params;
    const messages = await Chat.find({
      $or: [
        { sender: userId, receiver: otherUserId },
        { sender: otherUserId, receiver: userId },
      ],
    }).sort({ timestamp: 1 });
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
    const currentUserId = req.user._id;

    const recentChats = await Chat.aggregate([
      {
        $match: {
          $or: [{ sender: currentUserId }, { receiver: currentUserId }],
        },
      },
      {
        $sort: { timestamp: -1 },
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

    const recentUserIds = recentChats.map((chat) => chat._id);

    const users = await User.find({ _id: { $nin: [currentUserId], $in: recentUserIds } })
      .select('fullName image');

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

// Get all available users to chat with
exports.getAllUsers = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const user = await User.findById(currentUserId).select('role');

    let users;
    if (user.role === 'Admin' || user.role === 'CS') {
      // Admins and CS see all users
      users = await User.find({ _id: { $ne: currentUserId } })
        .select('fullName image createdAt role email');
    } else {
      // Others see only admins, employees, CS
      users = await User.find({
        _id: { $ne: currentUserId },
        role: { $in: ['Admin', 'employee', 'CS'] },
      }).select('fullName image createdAt role email');
    }

    const unreadCounts = await Chat.aggregate([
      {
        $match: {
          receiver: currentUserId,
          seen: { $ne: true },
        },
      },
      {
        $group: {
          _id: '$sender',
          count: { $sum: 1 },
        },
      },
    ]);

    const lastReceivedMessages = await Chat.aggregate([
      {
        $match: {
          receiver: currentUserId,
        },
      },
      {
        $sort: { timestamp: -1 },
      },
      {
        $group: {
          _id: '$sender',
          lastMessageTime: { $first: '$timestamp' },
          lastMessageContent: { $first: '$content' },
        },
      },
    ]);

    const lastSentMessages = await Chat.aggregate([
      {
        $match: {
          sender: currentUserId,
        },
      },
      {
        $sort: { timestamp: -1 },
      },
      {
        $group: {
          _id: '$receiver',
          lastMessageTime: { $first: '$timestamp' },
          lastMessageContent: { $first: '$content' },
        },
      },
    ]);

    const usersWithChatInfo = users.map((user) => {
      const unread = unreadCounts.find((u) => u._id.toString() === user._id.toString());
      const lastReceived = lastReceivedMessages.find((m) => m._id.toString() === user._id.toString());
      const lastSent = lastSentMessages.find((m) => m._id.toString() === user._id.toString());

      const lastMessageTime = lastReceived?.lastMessageTime || lastSent?.lastMessageTime || null;
      const lastMessageContent = lastReceived?.lastMessageContent || lastSent?.lastMessageContent || null;

      return {
        ...user.toObject(),
        unreadCount: unread ? unread.count : 0,
        lastMessageTime,
        lastMessageContent,
      };
    });

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

// Mark messages as seen
exports.markAsSeen = async (req, res) => {
  try {
    const { userId, otherUserId } = req.params;

    await Chat.updateMany(
      {
        sender: otherUserId,
        receiver: userId,
        seen: false,
      },
      {
        $set: { seen: true },
      }
    );

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error marking messages as seen', error: error.message });
  }
};

// Send email to non-existing user
exports.sendEmail = async (req, res) => {
  try {
    const { email, message, reply } = req.body;

    if (!email || !message) {
      return res.status(400).json({ success: false, message: 'Email and message are required' });
    }

    const mailOptions = {
      from: 'idea.venture@idea-venture.agency',
      to: email,
      subject: 'Message from Idea Venture',
      html: `
        <div style="background:#f9fafb;padding:20px;border-radius:12px;border:1px solid #e5e7eb;max-width:480px;margin:auto;font-family:sans-serif;">
          <h2 style="color:#111827;">📩 New Message</h2>
          <p style="color:#374151;">You have received a message from Idea Venture:</p>
          <div style="font-size:16px;color:#111827;margin:20px 0;">
            <strong>Original Message:</strong><br>${message}
            ${reply ? `<br><br><strong>Reply:</strong><br>${reply}` : ''}
          </div>
          <p style="color:#6b7280;">Please contact us at idea.venture@idea-venture.agency for further communication.</p>
          <hr style="margin:24px 0;"/>
          <p style="font-size:12px;color:#9ca3af;">If you believe this is an error, please ignore this email.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send email', error: error.message });
  }
};