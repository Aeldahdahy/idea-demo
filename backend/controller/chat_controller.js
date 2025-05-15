const Chat = require('../modules/chat');
const User = require('../modules/signup');
const Staff = require('../modules/staff');
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

// Middleware to check roles
const checkRole = (allowedRoles) => async (req, res, next) => {
  try {
    const userRole = req.user.role || 'client';
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: 'Role check failed', error: error.message });
  }
};

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
    // console.error("Error fetching messages:", error);
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

    // Fetch sender details from User or Staff collection
    let senderUser = await User.findById(sender).select('fullName image role');
    if (!senderUser) {
      senderUser = await Staff.findById(sender).select('fullName image role');
    }
    if (!senderUser) {
      return res.status(404).json({ success: false, message: 'Sender not found' });
    }

    // Emit Socket.IO event only to the receiver
    const io = req.app.get('socketio');
    if (io) {
      io.to(receiver).emit('receive_message', {
        sender: sender,
        receiver: receiver,
        message: message,
        senderName: senderUser.fullName,
        senderImage: senderUser.image,
        senderRole: senderUser.role,
        timestamp: chatMessage.timestamp,
        playSound: true,
      });
    } else {
      console.error('Socket.IO instance not found');
    }

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
    const userRole = req.user.role;

    // console.log('getAllUsers: currentUserId=', currentUserId, 'userRole=', userRole);

    if (userRole !== 'Admin' && userRole !== 'Cs') {
      return res.status(403).json({ success: false, message: 'Unauthorized access' });
    }

    // Admins and CS see all users (entrepreneurs, investors) and other staff
    const userCollection = await User.find()
      .select('fullName image createdAt role email');
    const staffCollection = await Staff.find({ _id: { $ne: currentUserId } })
      .select('fullName image createdAt role email');

    let users = [
      ...userCollection.map(user => ({
        _id: user._id,
        fullName: user.fullName,
        image: user.image || null,
        createdAt: user.createdAt,
        role: user.role.toLowerCase(),
        email: user.email
      })),
      ...staffCollection.map(staff => ({
        _id: staff._id,
        fullName: staff.fullName,
        image: staff.image || null,
        createdAt: staff.createdAt,
        role: staff.role.toLowerCase(),
        email: staff.email
      }))
    ];

    // Fetch unread message counts
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

    // Fetch last received messages
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

    // Fetch last sent messages
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

    // Enrich users with chat info
    const usersWithChatInfo = users.map((user) => {
      const unread = unreadCounts.find((u) => u._id.toString() === user._id.toString());
      const lastReceived = lastReceivedMessages.find((m) => m._id.toString() === user._id.toString());
      const lastSent = lastSentMessages.find((m) => m._id.toString() === user._id.toString());

      const lastMessageTime = lastReceived?.lastMessageTime || lastSent?.lastMessageTime || null;
      const lastMessageContent = lastReceived?.lastMessageContent || lastSent?.lastMessageContent || null;

      return {
        ...user,
        unreadCount: unread ? unread.count : 0,
        lastMessageTime,
        lastMessageContent,
      };
    });

    // Sort users by last message time or unread count
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
    console.error('Error fetching users for Admin/CS:', error);
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
    const userRole = req.user.role || 'client';

    if (!['Admin', 'CS'].includes(userRole)) {
      return res.status(403).json({ success: false, message: 'Only Admins or CS can send emails' });
    }

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

exports.getInvestorEntrepreneurUsers = async (req, res) => {
  try {

    if (!req.user || !req.user._id) {
      return res.status(403).json({ 
        success: false, 
        message: 'User not authenticated' 
      });
    }

    const currentUserId = req.user._id;
    const userRole = req.user.role;

    console.log(currentUserId, userRole);


    // Allow Investor, Entrepreneur, and Client roles
    if (!['investor', 'entrepreneur'].includes(userRole)) {
      console.log('getInvestorEntrepreneurUsers: Unauthorized role', userRole);
      return res.status(403).json({ success: false, message: 'Unauthorized access' });
    }

    // For Clients, always fetch all Admins regardless of chat history
    if (userRole === 'investor' || userRole === 'entrepreneur') {
      const admins = await Staff.find().select('fullName image createdAt role email');
      
      const users = admins.map(admin => ({
        _id: admin._id,
        fullName: admin.fullName,
        image: admin.image || null,
        createdAt: admin.createdAt,
        role: admin.role.toLowerCase(),
        email: admin.email,
        unreadCount: 0, 
        lastMessageTime: null,
        lastMessageContent: null,
      }));

    
      // Now fetch unread counts and last messages for these admins
      const unreadCounts = await Chat.aggregate([
        {
          $match: {
            receiver: currentUserId,
            sender: { $in: admins.map(a => a._id) },
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

      // Fetch last messages between current user and each admin
      const lastMessages = await Chat.aggregate([
        {
          $match: {
            $or: [
              { sender: currentUserId, receiver: { $in: admins.map(a => a._id) } },
              { receiver: currentUserId, sender: { $in: admins.map(a => a._id) } }
            ]
          }
        },
        {
          $sort: { timestamp: -1 }
        },
        {
          $group: {
            _id: {
              $cond: [
                { $eq: ['$sender', currentUserId] },
                '$receiver',
                '$sender'
              ]
            },
            lastMessageTime: { $first: '$timestamp' },
            lastMessageContent: { $first: '$content' },
          }
        }
      ]);

      // Enrich users with chat info
      const usersWithChatInfo = users.map(user => {
        const unread = unreadCounts.find(u => u._id.toString() === user._id.toString());
        const lastMessage = lastMessages.find(m => m._id.toString() === user._id.toString());

        return {
          ...user,
          unreadCount: unread ? unread.count : 0,
          lastMessageTime: lastMessage?.lastMessageTime || null,
          lastMessageContent: lastMessage?.lastMessageContent || null,
        };
      });

      // Sort by last message time (most recent first) or by name if no messages
      usersWithChatInfo.sort((a, b) => {
        if (a.lastMessageTime && b.lastMessageTime) {
          return b.lastMessageTime - a.lastMessageTime;
        }
        if (a.lastMessageTime) return -1;
        if (b.lastMessageTime) return 1;
        return a.fullName.localeCompare(b.fullName);
      });

      // console.log('getInvestorEntrepreneurUsers: Returning all admins for Client=', usersWithChatInfo);
      return res.status(200).json({ success: true, data: usersWithChatInfo });
    }

    // Original logic for Investor and Entrepreneur roles remains the same
    // [Keep the existing code for Investor/Entrepreneur cases]
    
  } catch (error) {
    console.error('Error fetching staff users for Investor/Entrepreneur/Client:', error);
    res.status(500).json({ success: false, message: 'Error fetching users', error: error.message });
  }
};


exports.saveChatMessage = async (req, res) => {
  try {
    const { sender, receiver, content, senderName, senderImage, timestamp } = req.body;
    let finalSenderName = senderName;
    if (!senderName) {
      const senderUser = await Staff.findById(sender).select('fullName');
      finalSenderName = senderUser?.fullName || 'Unknown';
    }
    const chat = new Chat({
      sender,
      receiver,
      type: 'text',
      content,
      senderName: finalSenderName,
      senderImage: senderImage || null,
      timestamp: timestamp || Date.now(),
      seen: false,
    });
    await chat.save();
    res.status(201).json({ success: true, _id: chat._id });
  } catch (error) {
    console.error('Error saving chat message:', error);
    res.status(500).json({ success: false, message: 'Error saving message' });
  }
};