const { getUserCollection } = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');

const getAllUsers = async (req, res) => {
    try {
      const users = await getUserCollection().find().toArray();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

const registerUser = async (req, res) => {
try {
    const { username, email, password, phone, role } = req.body;
    
    // Check if the email already exists
    const existingUser = await getUserCollection().findOne({ email });
    if (existingUser) {
    return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
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
    const result = await getUserCollection().insertOne(user);
    if (result.insertedId) {
    const newUser = await getUserCollection().findOne({ _id: result.insertedId });

    // Generate a JWT token
    const token = jwt.sign(
        { userId: newUser._id, role: newUser.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    // Include the token in the response
    res.status(201).json({ token, user: newUser });
    } else {
    throw new Error('User registration failed');
    }
} catch (err) {
    console.error('Error during user registration:', err);
    res.status(500).json({ message: err.message });
}
};
  
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUserCollection().findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    //function to validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // generate a JWT token, token includes User ID, and Role, is signed with secret key and is set to expire in 1hour
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user });
  } catch (err) {
    console.error('Error during user login:', err);
    res.status(500).json({ message: err.message });
  }
};

const logoutUser = (req, res) => {
  res.json({ message: 'Logged out successfully' });
};


const getUserPreviousOrders = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await getUserCollection().findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.previousOrders);
  } catch (err) {
    console.error('Error fetching previous orders:', err);
    res.status(500).json({ message: err.message });
  }
};

const addFavouriteItem = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId, name, price, imagePath, brand, type } = req.body;

    const user = await getUserCollection().findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await getUserCollection().updateOne(
      { _id: new ObjectId(userId) },
      { $push: { favoriteItems: { productId, name, price, imagePath, brand, type } } }
    );

    res.status(200).json({ message: 'Product added to favorites' });
  } catch (err) {
    console.error('Error adding favorite item:', err);
    res.status(500).json({ message: 'Failed to add favorite item' });
  }
};

const getFavouriteItems = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await getUserCollection().findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.favoriteItems);
  } catch (err) {
    console.error('Error fetching favorite items:', err);
    res.status(500).json({ message: 'Failed to fetch favorite items' });
  }
};

module.exports = { getAllUsers, registerUser, loginUser, logoutUser, getUserPreviousOrders, addFavouriteItem, getFavouriteItems};