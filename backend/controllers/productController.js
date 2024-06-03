// Importing necessary modules and dependencies
const { getProductCollection } = require('../models/productModel'); // Importing the product collection
const { ObjectId } = require('mongodb'); // Importing ObjectId to work with MongoDB IDs


// Function to get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await getProductCollection().find().toArray(); // Fetch all products from the database
        res.json(products); // Send the products as a JSON response
    } catch (err) {
        res.status(500).json({ message: err.message }); // Handle any errors
    }
};

// Function to add a product (only accessible by admin)
const addProduct = async (req, res) => {
    try {
        const { name, price, brand, imagePath, type } = req.body; // Destructure product details from request body

        const newProduct = {
            name,
            price,
            brand,
            imagePath,
            type
        };

        const result = await getProductCollection().insertOne(newProduct); // Insert the new product into the database

        if (result.insertedId) {
            res.status(201).json({ message: 'Product added successfully' }); // Respond with a success message
        } else {
            throw new Error('Product addition failed'); // Throw error if addition fails
        }
    } catch (err) {
        console.error('Error adding product:', err);
        res.status(500).json({ message: 'Failed to add product' }); // Handle any errors
    }
};

// Export the functions
module.exports = { getAllProducts, addProduct };
