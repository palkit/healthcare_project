const mongoose = require("mongoose");

const userschema = mongoose.Schema(
    {
        name:{
            type:String,
            require:[true,"Please add your name"],
        },
        age:{
            type:Integer,
            require:[true,"add your age"],
        },
        

    },
    
)