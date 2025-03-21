const axios = require('axios');

/**
 * Fetch data as a buffer from a given URL.
 * @param {string} url - The URL to fetch data from.
 * @param {object} [options] - Additional Axios options.
 * @returns {Promise<Buffer>} - Returns a buffer.
 */
const getBuffer = async (url, options = {}) => {
    try {
        const res = await axios.get(url, {
            headers: { 'DNT': 1, 'Upgrade-Insecure-Requests': 1 },
            responseType: 'arraybuffer',
            ...options
        });
        return res.data;
    } catch (error) {
        console.error('❌ Error fetching buffer:', error.message);
        return null;
    }
};

/**
 * Get a list of group admins from participants.
 * @param {Array} participants - List of group participants.
 * @returns {Array} - Returns an array of admin IDs.
 */
const getGroupAdmins = (participants) => participants
    .filter(participant => participant.admin)
    .map(admin => admin.id);

/**
 * Generate a random file name with a given extension.
 * @param {string} ext - File extension (e.g., ".jpg", ".txt").
 * @returns {string} - Random file name with extension.
 */
const getRandom = (ext) => `${Math.floor(Math.random() * 10000)}${ext}`;

/**
 * Convert large numbers to a human-readable format.
 * @param {number} num - Number to convert.
 * @returns {string} - Human-readable format (e.g., "1.2K", "3.4M").
 */
const h2k = (num) => {
    const units = ['', 'K', 'M', 'B', 'T', 'P', 'E'];
    let magnitude = Math.floor(Math.log10(Math.abs(num)) / 3) || 0;
    if (magnitude === 0) return num.toString();
    let scaled = (num / Math.pow(10, magnitude * 3)).toFixed(1);
    return scaled.replace(/\.0$/, '') + units[magnitude];
};

/**
 * Check if a string is a valid URL.
 * @param {string} url - The URL to check.
 * @returns {boolean} - True if valid, false otherwise.
 */
const isUrl = (url) => {
    const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/gi;
    return regex.test(url);
};

/**
 * Convert an object to a formatted JSON string.
 * @param {object} data - Data to convert.
 * @returns {string} - Pretty formatted JSON.
 */
const Json = (data) => JSON.stringify(data, null, 2);

/**
 * Convert seconds into a human-readable time format.
 * @param {number} seconds - Number of seconds.
 * @returns {string} - Human-readable time format.
 */
const runtime = (seconds) => {
    let d = Math.floor(seconds / 86400),
        h = Math.floor((seconds % 86400) / 3600),
        m = Math.floor((seconds % 3600) / 60),
        s = Math.floor(seconds % 60);
    return `${d ? d + "d, " : ""}${h ? h + "h, " : ""}${m ? m + "m, " : ""}${s}s`;
};

/**
 * Pause execution for a given time.
 * @param {number} ms - Time in milliseconds.
 * @returns {Promise<void>}
 */
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetch JSON data from a URL.
 * @param {string} url - The URL to fetch JSON from.
 * @param {object} [options] - Additional Axios options.
 * @returns {Promise<object>} - JSON response.
 */
const fetchJson = async (url, options = {}) => {
    try {
        const res = await axios.get(url, {
            headers: { 'User-Agent': 'Mozilla/5.0' },
            ...options
        });
        return res.data;
    } catch (error) {
        console.error('❌ Error fetching JSON:', error.message);
        return null;
    }
};

module.exports = { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson };
