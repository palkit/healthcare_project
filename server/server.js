// Import required modules
const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");
const hbs = require("hbs");
const path = require("path");
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const doctorRoutes = require("./router/doctorRoutes");
const multer  = require('multer');
const dotenv = require("dotenv");
const uploads =multer({dest:'uploads/'});
const Profile = require("./models/Profile");

// Initialize environment variables
dotenv.config();

// Connect to database
connectDb();

const app = express();
const port = process.env.PORT || 5000;

// Configure express middlewares
app.use(express.json());
app.use(cors());
app.use(errorHandler);

// Register routes
app.use('/api/register', require("./router/userRoutes"));
app.use('/api/doctors', require("./router/doctorRoutes"));

// Set the view engine
app.set('view engine', 'hbs');


app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Store the file in the 'uploads' directory
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        // Generate a unique file name with a timestamp and random number
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);

        // Append the file extension from the original file's name
        const fileExtension = path.extname(file.originalname); // Extract file extension
        cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension); // Save with extension
    }
});
  

// Multer upload setup using disk storage
const upload = multer({ storage: storage });

// ERROR handling middleware
app.use(errorHandler);

// Routes
app.get('/', (req, res) => {
    res.send("working");
});

app.get("/home", (req, res) => {
    res.render("home", {
        users: [
            { username: "Parth", date: "23-10-2024", subject: "Maths" },
            { username: "Aarav", date: "23-10-2024", subject: "Science" },
            { username: "Ishita", date: "23-10-2024", subject: "History" }
        ]
    });
});

app.get("/allusers", (req, res) => {
    res.render("users", {
        users: [
            { username: "Parth", date: "23-10-2024", subject: "Maths" },
            { username: "Aarav", date: "23-10-2024", subject: "Science" },
            { username: "Ishita", date: "23-10-2024", subject: "History" }
        ]
    });
});

hbs.registerPartials(path.join(__dirname, '/views/partials'));

// Profile upload route
// app.post('/profile', upload.single('avatar'), function (req, res, next) {
//     // req.file contains the uploaded file information
//     console.log(req.body);  // Text fields (if any)
//     console.log(req.file);   // File info (name, path, etc.)
    
//     // Redirect to /home after the upload
//     return res.redirect("/home");
// });

app.post("/profile", upload.single("avatar"), async (req, res, next) => {
    console.log(req.body); // Log the uploaded fields (if any)
    console.log(req.file); // Log the uploaded file object

    try {
        // Save the uploaded image path to the database (Profie model)
        const newProfile = new Profile({ image: req.file.path });
        await newProfile.save();

        // Redirect or render the profile view with the uploaded image
        res.render("profile", { image: req.file.path });
    } catch (err) {
        console.error("Error saving profile:", err);
        next(err);
    }
});
// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
