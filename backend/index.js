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
const fs = require('fs'); // Add fs module for file checking

const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;
const dbOptions = process.env.DB_OPTIONS;

const db_URL = `mongodb+srv://${dbUsername}:${dbPassword}@${dbHost}/${dbName}${dbOptions}`;

db_connection();

// Socket io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: true,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("send_message", async (data) => {
    console.log("Message received:", data);
    try {
      const chatMessage = new Chat({
        sender: data.sender,
        receiver: data.receiver,
        type: 'text',
        content: data.message,
      });
      await chatMessage.save();
      
      // Emit to receiver with sound notification flag
      socket.to(data.receiver).emit("receive_message", {
        sender: data.sender,
        receiver: data.receiver,
        message: data.message,
        timestamp: chatMessage.timestamp,
        playSound: true // Sound for receiver
      });
      
      // Emit to sender without sound
      socket.emit("receive_message", {
        sender: data.sender,
        receiver: data.receiver,
        message: data.message,
        timestamp: chatMessage.timestamp,
        playSound: false // No sound for sender
      });
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  socket.on("join_room", (userId) => {
    socket.join(userId);
    console.log(`User ${socket.id} joined room: ${userId}`);
  });

  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`);
  });

  socket.on("error", (error) => {
    console.error("Socket.IO server error:", error);
  });
});

// Sound Effect
app.use('/sounds', express.static('public/sounds'));

const hostname = '0.0.0.0';
const port = 7030;

// Redirect root to /idea-demo
app.get('/', (req, res) => {
  res.redirect('/idea-demo');
});

// Serve static files from React build under /idea-demo
const buildPath = path.join(__dirname, '../frontend/build');
app.use('/idea-demo', express.static(buildPath));

// Handle React Router paths under /idea-demo
app.get('/idea-demo/*', (req, res) => {
  const indexPath = path.join(buildPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('React build not found. Please run `npm run build` in the frontend directory.');
  }
});

// Serve uploaded files
app.use('/Uploads', express.static(path.join(__dirname, 'Uploads')));

// Session config
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

// Middleware setup
app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API routes
app.use('/api', ideaRoutes);
app.use('/api', chatRoutes);

// Start server
server.listen(port, hostname, () => {
  console.log(`Server is running at http://${hostname}:${port}`);
});