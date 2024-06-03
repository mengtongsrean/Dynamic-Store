// models/userModel.js
const { getDB } = require('../config/db');

// Function to get the users collection from the database

const getUserCollection = () => {
    const db = getDB();  // Get the database instance
    return db.collection('users'); // Return the users collection
};

module.exports = { getUserCollection };
