// app.js
const express = require('express');
const { connectDB } = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');

const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/products', productRoutes);
app.use('/users', userRoutes);

// Connect to Database
connectDB();

module.exports = app;
