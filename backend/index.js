const express = require('express');
const app = express();
const mongoose = require('mongoose'); 
const db_connection = require('./config/db');
const bodyParser = require('body-parser');
const ideaRoutes = require('./routes/idea_routes');
const cors = require('cors');

db_connection(); // Ensure this is called correctly

const hostname = "127.0.0.1";
const port = 2000;

app.use(cors());



app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use the idea routes for handling contact and signup
app.use('/api', ideaRoutes); // Adjust the base path as necessary



  
app.listen(port, hostname, () => {
    console.log(`Server is running on http://${hostname}:${port}`);
});
  