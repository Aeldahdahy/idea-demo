const express = require('express');
const app = express();
const db_connection = require('./config/db');
const bodyParser = require('body-parser');
const ideaRoutes = require('./routes/idea_routes');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');

// Connect to the database
db_connection(); 

const hostname = '127.0.0.1';
const port = 2000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session configuration
app.use(session({
  secret: 'your_session_secret', // Replace with your actual secret
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: 'mongodb://localhost:27017/ideaDB', // Use your MongoDB URL
    ttl: 24 * 60 * 60 // 1 day session expiration
  })
}));

// Use the idea routes for handling contact, sign up and sign in 
app.use('/api', ideaRoutes); 

// Start the server
app.listen(port, hostname, () => {
  console.log(`Server is running on http://${hostname}:${port}`);
});
