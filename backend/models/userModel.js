// models/userModel.js
const { getDB } = require('../config/db');

const getUserCollection = () => {
    const db = getDB();
    if (!db) {
        throw new Error('Database not initialized. Call connectDB first.');
    }
    return db.collection('users');
};

module.exports = { getUserCollection };
