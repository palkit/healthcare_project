const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");

// Route to register a new user
router.post("/register", registerUser);

// Route to login an existing user
router.post("/login", loginUser);

module.exports = router;