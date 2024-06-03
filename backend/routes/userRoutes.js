// routes/userRoutes.js
const express = require('express');
const { getAllUsers, registerUser, loginUser, logoutUser, 
        getUserPreviousOrders, addFavouriteItem, getFavouriteItems, removeFavoriteItem, addToCart, 
        getCartItems, removeCartItem, updateCartItemQuantity, processOrder
    } = require('../controllers/userController');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

// handle routing for log in Page
router.get('/', getAllUsers);

// handle routing for Register Page
router.post('/register', registerUser);

// handle routing for Login Page
router.post('/login', loginUser);

// handle routing for Logout Page
router.post('/logout', logoutUser);

// handle routing for Past Order Page
router.get('/previous-orders', authenticateToken, getUserPreviousOrders);

// handle routing for Favourite Page
router.post('/add-favourite-items', authenticateToken, addFavouriteItem);
router.get('/get-favourite-items', authenticateToken, getFavouriteItems);
router.delete('/remove-favourite-item/:productId', authenticateToken, removeFavoriteItem);
router.post('/add-to-cart', authenticateToken, addToCart);


// handle routing cart page

router.get('/get-cart-items', authenticateToken, getCartItems);
router.delete('/remove-cart-item/:productId', authenticateToken, removeCartItem);
router.put('/update-cart-item/:productId', authenticateToken, updateCartItemQuantity);
router.post('/process-order', authenticateToken, processOrder);
module.exports = router;
