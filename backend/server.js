// server.js
const app = require('./app');
const { connectDB } = require('./config/db');

// Connect to Database
connectDB().then(() => {
    // Start the server only after the database connection is established
    app.listen(8080, () => {
        console.log('Server is running on port 8080');
    });
}).catch((err) => {
    console.error('Failed to connect to database:', err);
    process.exit(1);
});
