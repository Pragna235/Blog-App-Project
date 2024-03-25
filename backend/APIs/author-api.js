const exp = require('express');
const authorApp = exp.Router(); //mini author application
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('../Middlewares/verifyToken');

//middleware
let authorsCollection;
let articlesCollection;

authorApp.use((req,res,next)=>{
    authorsCollection = req.app.get('authorsCollection');
    articlesCollection = req.app.get('articlesCollection');
    next();
});


authorApp.get('/test-author',(req,res)=>{
    res.send({message:"from author api"});
});

//create author
authorApp.post('/register',async(req,res) => {
    //get author from req
    let newAuthor = req.body;
    //check for duplicate author by username
    let dbAuthor= await authorsCollection.findOne({username:newAuthor.username});
    //if author already exists return repsponse
    if(dbAuthor !== null){
        return res.send({message:"Authorname already taken!"});
    }
    //print to console
    //console.log(newAuthor);
    //hash the password
    let hashedPassword = await bcryptjs.hash(newAuthor.password,6);
    //replace plain pw with hashedPassword
    newAuthor.password = hashedPassword;
    //save to db
    await authorsCollection.insertOne(newAuthor);
    //send res
    res.send({message:"New Author Created"});


});

//login author
authorApp.post('/login',async(req,res)=>{
    //get author object
    const credObj = req.body;
    //verify username
    let dbAuthor = await authorsCollection.findOne({username:credObj.username});
    //if author not found
    if(dbAuthor === null){
        res.send({message:"Invalid Username"});
    }
    else{
        let result = await bcryptjs.compare(credObj.password,dbAuthor.password);
        //if passwords not matched
        if(result === false){
            res.send({message:"Invalid Password"});
        }
        else{
            //create token --> JWT Library -> JSON Web Token
            let signedToken = jwt.sign({username:dbAuthor.username},'abcdef',{expiresIn:"30"}); //default - seconds, d -> days
            //send token as response
            res.send({message:"Login Success",token:signedToken,author:dbAuthor});
        }
    }

});

//add article
authorApp.post('/article',verifyToken,async(req,res)=>{
    //get new article from req
    const newArticle = req.body;
    //save to articles collection
    await articlesCollection.insertOne(newArticle);
    //send res
    res.send({message:"New Article Added"});
});

//read article
authorApp.get('/articles/:username',verifyToken,async(req,res)=>{
    //get author's username from url
    let authorUsername = req.params.username;
    //get articles of current author
    let articlesList = await articlesCollection.find({username:authorUsername}).toArray();
    //send res
    res.send({message:"articles",payload:articlesList});
});

//delete or restore article
authorApp.put('/articles/:username/:articleId',verifyToken,async(req,res)=>{
    //get articleId from url
    let articleIdOfUrl = req.params.articleId;
    //get status from req
    let currentStatus = req.body.status;

    console.log(currentStatus);

    //remove article
    if(currentStatus === true){
        //call the findOneAndUpdate method
        let removedArticle = await articlesCollection.findOneAndUpdate({articleId:articleIdOfUrl},{$set:{status:true}},{returnDocument:"after"});
        //send res
        res.send({message:"Article Removed",payload:removedArticle});
    }
    //restore article
    if(currentStatus === false){
        //call the findOneAndUpdate method
        let restoredArticle = await articlesCollection.findOneAndUpdate({articleId:articleIdOfUrl},{$set:{status:false}},{returnDocument:"after"});
        //send res
        res.send({message:"Article Restored",payload:restoredArticle});
    }
    
});

//edit article
authorApp.put('/article',verifyToken,async(req,res)=>{
    //get modified article from req
    let modifiedArticle = req.body;
    //update article by its id
    await articlesCollection.findOneAndUpdate({articleId:modifiedArticle.articleId},
       {$set:{...modifiedArticle}},
       {returnDocument:"after"} );
    //send res
    res.send({message:"Article Editted",payload:modifiedArticle});
});












module.exports = authorApp;