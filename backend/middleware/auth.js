const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_super_secret_key';

// Middleware function to authenticate token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];  // Get the authorization header
    if (!authHeader) return res.status(401).json({ message: 'Authorization header missing' });  // If no header, respond with error

    const token = authHeader.split(' ')[1];  // Split the header to get the token
    if (!token) return res.status(401).json({ message: 'Token missing' });  // If no token, respond with error

    // Verify the token using the secret key
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token is not valid' });  // If token is invalid, respond with error
        req.user = user;  // Attach the user object to the request
        next();  // Proceed to the next middleware or route handler
    });
};

module.exports = { authenticateToken };  // Export the middleware function
