// config/db.js
// Importing MongoClient from the MongoDB package
const { MongoClient } = require('mongodb');

// Creating a new MongoClient instance and connecting to the MongoDB Atlas cluster
const client = new MongoClient('mongodb+srv://mengtong:mengtong1234@atlascluster.9bxn7gs.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster', {});

let db; // Variable to store the database instance

// Function to connect to the MongoDB database
const connectDB = async () => {
    try {
        await client.connect(); // Connecting to the MongoDB Atlas cluster
        db = client.db('footballstoredb');  // Selecting the database
        console.log('MongoDB connected'); // Log success message
    } catch (err) { // Log any errors during connection
        console.error('MongoDB connection error:', err); // Log any errors during connection
        process.exit(1); // Exit the process with failure code
    }
};

// Function to get the database instance
const getDB = () => db;

// Exporting the connectDB and getDB functions
module.exports = { connectDB, getDB };
