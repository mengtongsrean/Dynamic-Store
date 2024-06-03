// models/productModel.js
const { getDB } = require('../config/db');

// Function to get the product collection from the database
const getProductCollection = () => {
    const db = getDB();  // Get the database instance
    return db.collection('products');  // Return the products collection
};

module.exports = { getProductCollection };
