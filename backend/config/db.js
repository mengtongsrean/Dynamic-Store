// config/db.js
const { MongoClient } = require('mongodb');

const client = new MongoClient('mongodb+srv://mengtong:mengtong1234@atlascluster.9bxn7gs.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster', {});

let db;

const connectDB = async () => {
    try {
        await client.connect();
        db = client.db('footballstoredb'); // Your database name
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
};

const getDB = () => {
    if (!db) {
        console.error('Database not initialized. Call connectDB first.');
        return undefined;
    }
    return db;
};

module.exports = { connectDB, getDB };
