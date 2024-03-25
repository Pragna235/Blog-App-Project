const exp = require('express');
const userApp = exp.Router(); //mini user application
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('../Middlewares/verifyToken');

//middleware
let usersCollection;
let articlesCollection;

userApp.use((req,res,next) => {
    usersCollection = req.app.get('usersCollection');
    articlesCollection = req.app.get('articlesCollection');
    next();
})

userApp.get('/test-user',(req,res)=>{
    res.send({message:"from user api"});
})

//create user
userApp.post('/register',async(req,res)=>{
    //get user from req
    let newUser = req.body;
    //check for duplicate user by username
    let dbUser = await usersCollection.findOne({username:newUser.username});
    //if user already exists return response
    if(dbUser!=null){
        return res.send({message:"Username already taken!"});
    }
    //print to console
    //console.log(newUser);
    //hash the password
    let hashedPassword = await bcryptjs.hash(newUser.password,6);
    //replace plain pw with hashedpassword
    newUser.password = hashedPassword;
    //save to db
    await usersCollection.insertOne(newUser);
    //send res
    res.send({message:"New User Created"});
});

//login user
userApp.post('/login',async(req,res)=>{
    //get user object
    const credObj = req.body;
    //verify username
    let dbUser = await usersCollection.findOne({username:credObj.username});
    //if user not found
    if(dbUser===null){
        res.send({message:"Invalid Username"});
    }
    else{
        let result = await bcryptjs.compare(credObj.password,dbUser.password);
        //if passwords not matched
        if(result===false){
            res.send({message:"Invalid Password"});
        }
        else{
            //create token
            let signedToken = jwt.sign({username:dbUser},'abcdef',{expiresIn:300});
            //delete the password property
            delete dbUser.password;
            //send token as response
            res.send({message:"Login Success",token:signedToken,user:dbUser});
        }

    }
});

//read all articles by users
userApp.get('/articles',verifyToken,async(req,res)=>{
    //get articles of current author
    let articlesList = await articlesCollection
    .find({status:true})
    .toArray();
    //send res
    res.send({message:"articles",payloaad:articlesList});
});

//add comment by user
userApp.put('/article/:articleId/comment',verifyToken,async(req,res)=>{
    //get comment object from req
    let commentobj = req.body;
    //get articleId from url
    let articleIdOfUrl = req.params.articleId;
    //add commentObj to comments array of article
    let articleWithComment = await articlesCollection.findOneAndUpdate({articleId:articleIdOfUrl},{$push:{comments:commentobj}},{returnDocument:"after"}); //$push allows duplicates, $addToSet doesn not
    //send res
    res.send({message:"Comment Posted",payload:articleWithComment});
});





module.exports = userApp;