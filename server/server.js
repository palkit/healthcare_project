//Framework Configuration
const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");

// connectDb();
const app = express();
const port = process.env.PORT || 5000;

// app.use(express.json());
// app.use(cors());

// Error handling middleware
// app.use(errorHandler);

// Router Below
app.get('/',(req,res)=>{
    res.send("Working......");
})

// APP Config Start
app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
})