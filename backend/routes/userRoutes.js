// routes/userRoutes.js
const express = require('express');
const { getAllUsers, registerUser, loginUser, logoutUser, getUserPreviousOrders, addFavouriteItem, getFavouriteItems } = require('../controllers/userController');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

router.get('/', getAllUsers);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/previous-orders', authenticateToken, getUserPreviousOrders);
router.post('/add-favourite-items', authenticateToken, addFavouriteItem);
router.get('/get-favourite-items', authenticateToken, getFavouriteItems);

module.exports = router;
