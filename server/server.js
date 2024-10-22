// Import express
const express = require('express');
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");

//env file config
const dotenv = require("dotenv");
dotenv.config();


connectDb();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(cors());

// Define a route for the root URL
app.get('/', (req, res) => {
    res.send('Working......');
});

// Start the server on port 3000
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});