// routes/productRoutes.js
const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const {
    getAllProducts,   // Import the getAllProducts controller
    addProduct,       // Import the addProduct controller
} = require('../controllers/productController');

const router = express.Router();

// Route to get all products
router.get('/', getAllProducts);

// Route to add a new product, requires authentication
router.post('/add-product', authenticateToken, addProduct);

module.exports = router;
