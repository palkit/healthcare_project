const express = require("express")
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");
const hbs = require("hbs");
const path = require("path");

//env file config
const dotenv = require("dotenv");
dotenv.config();

connectDb();
const app = express();
const port = process.env.PORT || 5000;


app.use(cors());    
app.use(express.json());

app.use(errorHandler);

app.set('view engine' ,'hbs');

app.get("/", (req, res) => {
    res.send("working perfectly!")
})

app.use('/api/register', require("./routes/userRoutes"));
app.use('/api/doctor', require("./routes/doctorRoutes"));
app.delete('/api/doctor/:email', require("./routes/doctorRoutes"));

hbs.registerPartials(path.join(__dirname, '/views/partials'));

app.get("/user",(req,res)=>{
    res.render("user",{
        users: [
            { username: "Palkit", Age: "20", subject: "Maths" },
            { username: "Aarav", Age: "23", subject: "Science" },
            { username: "Ishita", Age: "19", subject: "History" }
        ]
    })
})


app.get("/home",(req,res)=>{
    res.render("home",{})
})

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`)
})

