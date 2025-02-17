const express = require('express');
const app = express();
const db_connection = require('./config/db');
const bodyParser = require('body-parser');
const ideaRoutes = require('./routes/idea_routes');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME
const dbOptions = process.env.DB_OPTIONS;

const db_URL = `mongodb+srv://${dbUsername}:${dbPassword}@${dbHost}/${dbName}${dbOptions}`;


db_connection(); // Ensure this is called correctly

const hostname = '127.0.0.1';
const port = 7030;





app.use(session({
  secret: 'your_session_secret_key', // Replace with your actual session secret
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: db_URL, // Ensure db_URL is correctly defined
    collectionName: 'sessions', // Optional: specify a collection name for sessions
    ttl: 2 * 60 // Session TTL in seconds (2 hours)
  }),
  cookie: {
    secure: false, // Set to true if using HTTPS
    maxAge: 2  * 60 * 1000 // Session cookie expiration time (2 hours in milliseconds)
  }
}));



app.use(cors(
  {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  }
));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use the idea routes for handling contact, sign up, and sign in
app.use('/api', ideaRoutes);

app.listen(port, hostname, () => {
  console.log(`Server is running on http://${hostname}:${port}`);
});
