const EnvVar = require('./mongodbenv');

// Function to get all environment variables
const readEnv = async () => {
    try {
        const envVars = await EnvVar.find({});
        return envVars.reduce((acc, envVar) => {
            acc[envVar.key] = envVar.value;
            return acc;
        }, {});
    } catch (err) {
        console.error('❌ Error retrieving environment variables:', err);
        throw err;
    }
};

// Function to update an environment variable
const updateEnv = async (key, newValue) => {
    try {
        const result = await EnvVar.findOneAndUpdate(
            { key },
            { value: newValue },
            { new: true, upsert: true }
        );
        console.log(`✅ Updated: ${key} → ${newValue}`);
        return result;
    } catch (err) {
        console.error('❌ Error updating environment variable:', err);
        throw err;
    }
};

module.exports = {
    readEnv,
    updateEnv
};
