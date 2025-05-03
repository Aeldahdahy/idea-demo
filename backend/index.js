const express = require('express');
const app = express();
const db_connection = require('./config/db');
const bodyParser = require('body-parser');
const ideaRoutes = require('./routes/idea_routes');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const path = require('path');

const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;
const dbOptions = process.env.DB_OPTIONS;

const db_URL = `mongodb+srv://${dbUsername}:${dbPassword}@${dbHost}/${dbName}${dbOptions}`;

db_connection();

const hostname = '127.0.0.1';
const port = 7030;

// 🟢 Redirect root to /idea-demo
app.get('/', (req, res) => {
  res.redirect('/idea-demo');
});

// 🟢 Serve static files from React build under /idea-demo
app.use('/idea-demo', express.static(path.join(__dirname, '../frontend/build')));

// 🟢 Handle React Router paths under /idea-demo
app.get('/idea-demo/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Session config
app.use(session({
  secret: 'your_session_secret_key',
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

// Start server
app.listen(port, hostname, () => {
  console.log(`Server is running at http://${hostname}:${port}`);
});
