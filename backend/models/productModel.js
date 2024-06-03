// models/productModel.js
const { getDB } = require('../config/db');

const getProductCollection = () => {
    const db = getDB();
    if (!db) {
        throw new Error('Database not initialized. Call connectDB first.');
    }
    return db.collection('products');
};

module.exports = { getProductCollection };
