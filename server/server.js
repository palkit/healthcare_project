//Framework Configuration
const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");
const hbs = require("hbs");
const path = require("path");
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const doctorRoutes = require("./routes/doctorRoutes");
const multer = require('multer')
const uploads =multer({dest:'uploads/'})
const Profile = require("./model/Profile");

const dotenv = require("dotenv");
dotenv.config();




connectDb();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use(errorHandler);

app.use('/api/users', require("./routes/userRoutes"));
app.use('/api/doctors', require("./routes/doctorRoutes"));

// ERROR handling middleware
app.use(errorHandler);

app.set('view engine', 'hbs');


//ROUTES BELOW
app.get('/',(req,res)=>{
    res.send("working");
});

app.get("/home",(req,res)=>{
    res.render("home",{
        users: [
            { username: "Parth", date: "23-10-2024", subject: "Maths" },
            { username: "Aarav", date: "23-10-2024", subject: "Science" },
            { username: "Ishita", date: "23-10-2024", subject: "History" }
        ]
    })
})


app.get("/allusers",(req,res)=>{
    res.render("users",{
        users: [
            { username: "Parth", date: "23-10-2024", subject: "Maths" },
            { username: "Aarav", date: "23-10-2024", subject: "Science" },
            { username: "Ishita", date: "23-10-2024", subject: "History" }
        ]
    })
})

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, '/uploads')
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
//   })
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
  
  const upload = multer({ storage: storage })


// app.post('/profile', upload.single('avatar'), function (req, res, next) {
//     console.log(req.body);
//     console.log(req.file);
//     return res.redirect("/home");
//   })
// // Serve the uploaded files as static content
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// app.post("/profile", upload.single("avatar"), (req, res, next) => {
//     console.log(req.body); // Log the uploaded fields (if any)
//     console.log(req.file); // Log the uploaded file object
  
//     if (req.file) {
//       // If a file is uploaded, render the profile view with the file URL
//       const fileUrl = /uploads/${req.file.filename};  // Create the file URL (for static serving)
  
//       // Render the profile view and pass the file URL to be displayed
//       res.render("profile", { image: fileUrl });
//     } else {
//       // If no file is uploaded, just show the home page or a message
//       res.redirect("/home");
//     }
//   });
  
//   // Profile route to display uploaded file
//   app.get("/profile", (req, res) => {
//     res.render("profile", {
//       image: null // Render profile without any image initially
//     });
//   });

let  imageUrls = [];
// app.post("/profile", upload.single("avatar"), async (req, res, next) => {
//     console.log(req.body); // Log the uploaded fields (if any)
//     console.log(req.file); // Log the uploaded file object

//     try {
//         // Save the uploaded image path to the database (Profie model)
//         const newProfile = new Profile({ image: req.file.filename });
//         await newProfile.save();

//         // Redirect or render the profile view with the uploaded image
//         res.render("allImages", { imageUrls: imageUrls });
//     } catch (err) {
//         console.error("Error saving profile:", err);
//         next(err);
//     }
// });


// app.get("/allimages", async (req, res) => {
//     try {
//         // Fetch all profiles with image paths from the database
//         const profiles = await Profile.find();
//         const imageUrls = [];
        
//         res.render("images", { imageUrls: imageUrls });
//     } catch (err) {
//         console.error("Error fetching images:", err);
//         next(err);
//     }
// });

app.post("/profile", upload.single("avatar"), function(req, res, next) {
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }
    console.log(req.body);
    console.log(req.file);

    const fileName = req.file.filename;
    const imageUrl = `/uploads/${fileName}`;
    imageUrls.push(imageUrl);
    return res.render("allimages", {
        imageUrls: imageUrls
    });
});

app.get("/allimages", (req, res) => {
    const imageUrls = []; 
    res.render("images", { imageUrls: imageUrls }); 
});


hbs.registerPartials(path.join(__dirname, '/views/partials'));

// APP CONFIG START
app.listen(port, () =>{
    console.log(`Server running in port http://localhost:${port}`);
});