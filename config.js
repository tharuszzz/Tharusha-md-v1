const fs = require('fs');
require('dotenv').config();  // Make sure dotenv is properly required

module.exports = {
    SESSION_ID: process.env.SESSION_ID || "default_session_id",
    MONGODB: process.env.MONGODB || "mongodb://localhost:27017/mydb",
};
