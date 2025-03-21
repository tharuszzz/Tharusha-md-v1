const fs = require('fs');
const dotenv = require('dotenv');

// Load environment variables from config.env if exists
if (fs.existsSync('config.env')) {
    const result = dotenv.config({ path: './config.env' });

    if (result.error) {
        console.error("❌ Error loading .env file:", result.error);
    }
}

/**
 * Convert a string to boolean (default: true)
 * @param {string} text - String to convert
 * @param {string} fault - Default comparison value
 * @returns {boolean}
 */
function convertToBool(text, fault = 'true') {
    return text?.toLowerCase() === fault.toLowerCase();
}

// Environment Variables (Securely loaded)
module.exports = {
    SESSION_ID: process.env.SESSION_ID || (() => {
        console.warn("⚠️ WARNING: SESSION_ID is missing in .env file!");
        return "YOUR_DEFAULT_SESSION_ID";
    })(),
    
    MONGODB: process.env.MONGODB || (() => {
        console.warn("⚠️ WARNING: MONGODB connection string is missing in .env file!");
        return "YOUR_DEFAULT_MONGODB_URI";
    })()
};
