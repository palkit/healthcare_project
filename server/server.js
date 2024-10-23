const express= require("express");
const connectDb= require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const cors= require ("cors");

//env file config
const dotenv=require("dotenv");
dotenv.config();

connectDb();
const app = express();
const port= process.env.PORT || 5000;
app.set('view engine', 'hbs');
app.use(express.json());
app.use(cors());
//error handling middleware
app.use(errorHandler);

//ROUTES BELOW
app.get('/',(req,res)=>{
    res.send("working")
});
app.get("/home",(req,res)=>{
    res.render("home",{})  
})
app.get("/allusers",(req,res)=>{
    res.render("user",{
        users:[{id:1,username:"Palkit",age:21},
            {id:2,username:"ram",age:20}]
    })
})


app.listen(port,()=>{
    console.log(`Server is running on port http://localhost:${port}`);
});