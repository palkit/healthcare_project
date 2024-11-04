const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");
const hbs = require("hbs");
const path = require("path");

// env file config
const dotenv = require("dotenv");
dotenv.config();

connectDb();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// using hbs as the view engine
app.set('view engine', 'hbs');

// Register partials
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Route for user registration and authentication
app.use("/api/register", require("./routes/userRoutes"));

// Routes below
app.get("/", (req, res) => {
    res.send("working");
});

app.get("/home", (req, res) => {
    res.render("home", { 
        username: "Piyush",
        age: 20,
    });
});

app.get("/user", (req, res) => {
    const users = [
        { username: "a", age: 20 },
        { username: "b", age: 22 },
        { username: "c", age: 21 }
    ];
    res.render("user", { users });
});

// Error handling middleware should be at the end
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
