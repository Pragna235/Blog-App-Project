const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next) => {
    //get bearer token from headers of req
    let bearerToken = req.headers.authorization;
    if(bearerToken === undefined){
        return res.send({message:"Unauthorized Access"});
    }
    let token = bearerToken.split(' ')[1];

    try{
        let decodedToken = jwt.verify(token,"abcdef");
        next();
    }
    catch(err){
        res.send({message:err.message});

    }
}

module.exports = verifyToken;