const express = require('express');
const app = express();
const db_connection = require('./config/db');
const bodyParser = require('body-parser');
const ideaRoutes = require('./routes/idea_routes');
const chatRoutes = require('./routes/chat_routes');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const Chat = require('./modules/chat'); 
const Staff = require('./modules/staff');
const User = require('./modules/signup');
const { createNotification } = require('./controller/clientController');

const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;
const dbOptions = process.env.DB_OPTIONS;

const db_URL = `mongodb+srv://${dbUsername}:${dbPassword}@${dbHost}/${dbName}${dbOptions}`;

db_connection();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: true,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("send_message", async (data) => {
    try {
      const senderUser = await Staff.findById(data.sender).select('fullName image role');
      const senderName = senderUser?.fullName || data.senderName || 'Unknown';
      const senderImage = senderUser?.image || null;
      const senderRole = senderUser?.role?.toLowerCase() || 'admin';

      const chatMessage = new Chat({
        sender: data.sender,
        receiver: data.receiver,
        type: 'text',
        content: data.message,
        senderName,
      });
      await chatMessage.save();

      let receiverModel = 'Staff';
      const isUser = await User.exists({ _id: data.receiver });
      if (!isUser) {
        const isStaff = await Staff.exists({ _id: data.receiver });
        if (isStaff) receiverModel = 'User';
      }

      const notification = await createNotification({
        recipientId: data.receiver,
        recipientModel: receiverModel,
        title: senderName,
        body: data.message,
        sourceType: 'message',
        metadata: {
          chatId: chatMessage._id,
          senderId: data.sender,
        },
      }).catch((error) => {
        console.error("Error creating notification:", error);
        return null;
      });

      if (!notification) {
        console.error("Failed to create notification for message:", data);
        return;
      }

      const messageData = {
        sender: data.sender,
        receiver: data.receiver,
        message: data.message,
        senderName,
        senderImage,
        senderRole,
        timestamp: chatMessage.timestamp,
        notificationId: notification._id, // Include backend notification ID
      };

      socket.to(data.receiver).emit("receive_message", {
        ...messageData,
        playSound: true,
      });

      socket.emit("receive_message", {
        ...messageData,
        playSound: false,
      });
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  socket.on("join_room", (userId) => {
    socket.join(userId);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });

  socket.on("error", (error) => {
    console.error("Socket.IO server error:", error);
  });
});

app.use('/sounds', express.static('public/sounds'));

app.get('/', (req, res) => {
  res.redirect('/idea-demo');
});

app.use('/idea-demo', express.static(path.join(__dirname, '../frontend/build')));

app.get('/idea-demo/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(session({
  secret: process.env.SESSION_SECRET || 'your_session_secret_key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: db_URL,
    collectionName: 'sessions',
    ttl: 2 * 60 * 60
  }),
  cookie: {
    secure: false,
    maxAge: 2 * 60 * 60 * 1000
  }
}));

app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', ideaRoutes);
app.use('/api', chatRoutes);

server.listen(7030, '127.0.0.1', () => {
  console.log(`Server is running at http://127.0.0.1:7030`);
});