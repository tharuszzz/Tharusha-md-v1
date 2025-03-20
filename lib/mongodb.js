const mongoose = require('mongoose');
const config = require('../config');
const EnvVar = require('./mongodbenv');

const defaultEnvVariables = [
    { key: 'ALIVE_IMG', value: 'https://i.ibb.co/WpHbKD3Q/6ec6e0f072121856.jpg' },
    { key: 'ALIVE_MSG', value: '╭─「 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰-𝙼𝙳 𝙰𝙻𝙸𝚅𝙴 𝙼𝚂𝙶」\𝚗│◈ 𝙿𝚁𝙴𝙵𝙸𝚇 - "."\𝚗│◈ 𝚁𝚄𝙽𝚃𝙸𝙼𝙴 - ${runtime(process.uptime())}\𝚗│◈ 𝙸'𝙼 𝙾𝙽𝙻𝙸𝙽𝙴..👤\𝚗╰──────────●●' },
    { key: 'PREFIX', value: '.' },
    { key: 'AUTO_READ_STATUS', value: 'false' },
    { key: 'MODE', value: 'public' },
];

// MongoDB connection function
const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGODB);
        console.log('🛜 MongoDB Connected ✅');

        // Check and create default environment variables
        for (const envVar of defaultEnvVariables) {
            const existingVar = await EnvVar.findOne({ key: envVar.key });

            if (!existingVar) {
                // Create new environment variable with default value
                await EnvVar.create(envVar);
                console.log(`➕ Created default env var: ${envVar.key}`);
            }
        }

    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
