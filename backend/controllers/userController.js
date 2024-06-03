const { getUserCollection } = require('../models/userModel'); // Importing the user collection
const bcrypt = require('bcrypt'); // Importing bcrypt for password hashing
const jwt = require('jsonwebtoken'); // Importing JSON Web Token for authentication
const { ObjectId } = require('mongodb'); // Importing ObjectId to work with MongoDB IDs
const moment = require('moment'); // Importing moment for date formatting
const JWT_SECRET = 'your_super_secret_key';

// Function to get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await getUserCollection().find().toArray(); // Fetch all users from the database
        res.json(users); // Send the users as a JSON response
    } catch (err) {
        res.status(500).json({ message: err.message }); // Handle any errors
    }
};

// Function to register a new user
const registerUser = async (req, res) => {
    try {
        const { username, email, password, phone, role } = req.body; // Destructure user details from request body

        // Check if the email already exists
        const existingUser = await getUserCollection().findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' }); // If email exists, respond with an error
        }

        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        const user = {
            username,
            email,
            password: hashedPassword,
            phone,
            role,
            cart: [],
            previousOrders: [],
            favoriteItems: []
        };
        const result = await getUserCollection().insertOne(user); // Insert the new user into the database
        if (result.insertedId) {
            const newUser = await getUserCollection().findOne({ _id: result.insertedId }); // Fetch the newly created user

            // Generate a JWT token
            const token = jwt.sign(
                { userId: newUser._id, role: newUser.role },
                JWT_SECRET,
                { expiresIn: '1h' }
            );

            // Include the token in the response
            res.status(201).json({ token, user: newUser });
        } else {
            throw new Error('User registration failed'); // Throw error if registration fails
        }
    } catch (err) {
        console.error('Error during user registration:', err);
        res.status(500).json({ message: err.message }); // Handle any errors
    }
};

// Function to log in a user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body; // Destructure email and password from request body
        const user = await getUserCollection().findOne({ email }); // Fetch the user by email
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' }); // If user not found, respond with an error
        }
        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' }); // If password is incorrect, respond with an error
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user }); // Send the token and user details as a response
    } catch (err) {
        console.error('Error during user login:', err);
        res.status(500).json({ message: err.message }); // Handle any errors
    }
};

// Function to log out a user
const logoutUser = (req, res) => {
    res.json({ message: 'Logged out successfully' }); // Respond with a success message
};

// Function to get the previous orders of a user
const getUserPreviousOrders = async (req, res) => {
    try {
        const userId = req.user.userId; // Get the user ID from the authenticated token

        const user = await getUserCollection().findOne({ _id: new ObjectId(userId) }); // Fetch the user by ID
        if (!user) {
            return res.status(404).json({ message: 'User not found' }); // If user not found, respond with an error
        }

        res.json(user.previousOrders); // Send the previous orders as a response
    } catch (err) {
        console.error('Error fetching previous orders:', err);
        res.status(500).json({ message: err.message }); // Handle any errors
    }
};

// Function to add a favorite item for a user
const addFavouriteItem = async (req, res) => {
    try {
        const userId = req.user.userId; // Get the user ID from the authenticated token
        const { productId, name, price, imagePath, brand, type } = req.body; // Destructure product details from request body

        const user = await getUserCollection().findOne({ _id: new ObjectId(userId) }); // Fetch the user by ID
        if (!user) {
            return res.status(404).json({ message: 'User not found' }); // If user not found, respond with an error
        }

        await getUserCollection().updateOne(
            { _id: new ObjectId(userId) },
            { $push: { favoriteItems: { productId, name, price, imagePath, brand, type } } } // Add the product to the favorite items array
        );

        res.status(200).json({ message: 'Product added to favorites' }); // Respond with a success message
    } catch (err) {
        console.error('Error adding favorite item:', err);
        res.status(500).json({ message: 'Failed to add favorite item' }); // Handle any errors
    }
};

// Function to get favorite items of a user
const getFavouriteItems = async (req, res) => {
    try {
        const userId = req.user.userId; // Get the user ID from the authenticated token

        const user = await getUserCollection().findOne({ _id: new ObjectId(userId) }); // Fetch the user by ID
        if (!user) {
            return res.status(404).json({ message: 'User not found' }); // If user not found, respond with an error
        }

        res.json(user.favoriteItems); // Send the favorite items as a response
    } catch (err) {
        console.error('Error fetching favorite items:', err);
        res.status(500).json({ message: 'Failed to fetch favorite items' }); // Handle any errors
    }
};

// Function to remove a favorite item from a user's list
const removeFavoriteItem = async (req, res) => {
    try {
        const userId = req.user.userId; // Get the user ID from the authenticated token
        const { productId } = req.params; // Get the product ID from the request parameters

        await getUserCollection().updateOne(
            { _id: new ObjectId(userId) },
            { $pull: { favoriteItems: { productId } } } // Remove the product from the favorite items array
        );

        res.status(200).json({ message: 'Product removed from favorites' }); // Respond with a success message
    } catch (err) {
        console.error('Error removing favorite item:', err);
        res.status(500).json({ message: 'Failed to remove favorite item' }); // Handle any errors
    }
};

// Function to add an item to the cart
const addToCart = async (req, res) => {
    try {
        const userId = req.user.userId; // Get the user ID from the authenticated token
        const { productId, name, price, imagePath, brand, type, quantity } = req.body; // Destructure product details from request body

        await getUserCollection().updateOne(
            { _id: new ObjectId(userId) },
            { $push: { cart: { productId, name, price, imagePath, brand, type, quantity } } } // Add the product to the cart array
        );

        res.status(200).json({ message: 'Product added to cart' }); // Respond with a success message
    } catch (err) {
        console.error('Error adding to cart:', err);
        res.status(500).json({ message: 'Failed to add to cart' }); // Handle any errors
    }
};

// Function to get cart items of a user
const getCartItems = async (req, res) => {
    try {
        const userId = req.user.userId; // Get the user ID from the authenticated token
        const user = await getUserCollection().findOne({ _id: new ObjectId(userId) }); // Fetch the user by ID
        if (!user) {
            return res.status(404).json({ message: 'User not found' }); // If user not found, respond with an error
        }
        res.json(user.cart || []); // Send the cart items as a response
    } catch (err) {
        console.error('Error getting cart items:', err);
        res.status(500).json({ message: 'Failed to get cart items' }); // Handle any errors
    }
};

// Function to remove an item from the cart
const removeCartItem = async (req, res) => {
    try {
        const userId = req.user.userId; // Get the user ID from the authenticated token
        const productId = req.params.productId; // Get the product ID from the request parameters
        await getUserCollection().updateOne(
            { _id: new ObjectId(userId) },
            { $pull: { cart: { productId } } } // Remove the product from the cart array
        );
        res.status(200).json({ message: 'Product removed from cart' }); // Respond with a success message
    } catch (err) {
        console.error('Error removing cart item:', err);
        res.status(500).json({ message: 'Failed to remove cart item' }); // Handle any errors
    }
};

// Function to update the quantity of an item in the cart
const updateCartItemQuantity = async (req, res) => {
    try {
        const userId = req.user.userId; // Get the user ID from the authenticated token
        const productId = req.params.productId; // Get the product ID from the request parameters
        const { quantity } = req.body; // Get the new quantity from the request body

        await getUserCollection().updateOne(
            { _id: new ObjectId(userId), 'cart.productId': productId },
            { $set: { 'cart.$.quantity': quantity } } // Update the quantity of the product in the cart array
        );

        res.status(200).json({ message: 'Cart item quantity updated' }); // Respond with a success message
    } catch (err) {
        console.error('Error updating cart item quantity:', err);
        res.status(500).json({ message: 'Failed to update cart item quantity' }); // Handle any errors
    }
};

// Function to generate a new order ID
const generateOrderId = async (userId) => {
    const user = await getUserCollection().findOne({ _id: new ObjectId(userId) }); // Fetch the user by ID
    if (!user || !user.previousOrders || user.previousOrders.length === 0) {
        return '1001'; // Start from 1001 if there are no previous orders
    }
    const lastOrder = user.previousOrders[user.previousOrders.length - 1]; // Get the last order
    const lastOrderId = parseInt(lastOrder.orderId, 10); // Parse the last order ID as an integer
    return (lastOrderId + 1).toString(); // Increment the order ID and return it as a string
};

// Function to process an order
const processOrder = async (req, res) => {
    try {
        const userId = req.user.userId; // Get the user ID from the authenticated token
        const { cartItems } = req.body; // Get the cart items from the request body

        const orderId = await generateOrderId(userId); // Generate a new order ID
        const orderDate = moment().format('YYYY-MM-DD'); // Get the current date
        const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0); // Calculate the total price

        const order = {
            orderId,
            orderDate,
            products: cartItems,
            total
        };

        await getUserCollection().updateOne(
            { _id: new ObjectId(userId) },
            {
                $push: { previousOrders: order }, // Add the order to the previous orders array
                $set: { cart: [] } // Empty the cart after placing the order
            }
        );

        res.status(200).json({ message: 'Order processed successfully' }); // Respond with a success message
    } catch (err) {
        console.error('Error processing order:', err);
        res.status(500).json({ message: 'Failed to process order' }); // Handle any errors
    }
};

module.exports = {
    getAllUsers, registerUser, loginUser, logoutUser, getUserPreviousOrders,
    addFavouriteItem, getFavouriteItems, removeFavoriteItem,
    addToCart, getCartItems, removeCartItem, updateCartItemQuantity, processOrder
}; // Export the functions
