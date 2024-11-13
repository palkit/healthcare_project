// //First we are initializing jsonwebtoken module to use functionalities of Jwt eg sign, verify

// const jwt = require('jsonwebtoken');
// //After successful Register of user, and then calling the logoin endpoint with the already registered user, it will create and return Jwt token

// const generateJwtToken = (userData)=>{
//     return jwt.sign(userData,process.env.PRIVATE_KEY,{expiresIn:400000});

// }
// //After login, we are getting the token, and for validating the JWT Token, that is correct or not, we will proceed with secure routes, to GET/POST/UPDATE/DELETE.
// const validateJwtToken= (req,res,next) =>{
//     //We are checkong that token is available or not in request headers.
//     const tokencheck= req.headers.authorization;

//     if(!tokenCheck) return res.status(401).json({err:'TOKEN NOT AVAILABLE'});

//     //option2: req header getting token: but not in a right formate:
//     //Authorization: BASIC / BEARER
//     //BAsic btoa(USERNAME: PASSWORD) -> BASIC hfdiuhdshfds [BASE64]
//     // BEARER fdihushisdoisadsa
//     const token= req.headers.authorization.split(' ')[1];
//     if(!token){
//         return res.status(401).json({err:'Invalid Token'});
//     }
//     try{
//         const validateToken= jwt.verify(token,process.env.PRIVATE_KEY);
//         req.user= validateToken;
//         next();
        
//     }catch(err){
//         return res.status(401).json(err.message);

//     }
// }

// module.exports={jwt : generateJwtToken,validateJwtToken}
const jwt = require('jsonwebtoken');



const validateJwtToken = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        console.log("Authorization header missing"); // Debugging log
        return res.status(401).json({ err: 'Token not available' });
    }

    const token = authorization.split(' ')[1];
    if (!token) {
        console.log("Token not found after splitting header"); // Debugging log
        return res.status(401).json({ err: 'Unauthorized User' });
    }

    try {
        const validateToken = jwt.verify(token, process.env.PRIVATE_KEY);
        req.user = validateToken;
        console.log("Token validated successfully:", validateToken); // Debug log
        next();
    } catch (err) {
        console.log("Error validating token:", err.message); // Debugging log
        return res.status(401).json({ err: 'Invalid or expired token' });
    } 
};

module.exports = { validateJwtToken };