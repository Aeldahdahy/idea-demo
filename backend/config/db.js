const mongoose = require('mongoose');
const localDB_URL = 'mongodb://localhost:27017/ideaDB';

require('dotenv').config();
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME
const dbOptions = process.env.DB_OPTIONS;

const db_URL = `mongodb+srv://${dbUsername}:${dbPassword}@${dbHost}/${dbName}${dbOptions}`;

const db_connection = async () => {
  try {
    await mongoose.connect(db_URL ? db_URL : localDB_URL);

    console.log("Database connected");
  } catch (error) {
    console.log('Error while connecting: ' + error.message);
  }
};

module.exports = db_connection;
