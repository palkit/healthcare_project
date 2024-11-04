const express = require("express");
const router = express.Router();
const {
    registerDoctor
    
}=require("../controllers/doctorsDetailsController");
router.post("/" , registerDoctor);


module.exports=router;