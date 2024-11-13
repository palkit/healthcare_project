const express = require("express");
const router = express.Router();
const { validateJwtToken } = require("../middlewares/jwtMiddleware");  // <-- Use require() instead of import
const { registerUser, loginUser, getAllUsers, getUserProfile, updateUserProfile } = require("../controllers/userController");

// Route to register a new user
router.post("/register", registerUser);

// Route to login an existing user
router.post("/login", loginUser);

// Protected route to get all users
router.get("/getallusers", validateJwtToken, getAllUsers);

// Route to get the user's own profile (protected)
router.get("/myaccount", validateJwtToken, getUserProfile);

// Route to update the user's profile (protected)
router.patch("/myaccount", validateJwtToken, updateUserProfile);

module.exports = router;