// server.js
const app = require('./app');
PORT = 8080;
const port = PORT || 8080;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
