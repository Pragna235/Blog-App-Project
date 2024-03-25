//create express app
const exp = require('express');
const app = exp();

//database connectivity
const mongoClient = require('mongodb').MongoClient;

//import apis
const userApp = require('./APIs/user-api');
const adminApp = require('./APIs/admin-api');
const authorApp = require('./APIs/author-api');

const path=require('path');

//apply body parser middleware
app.use(exp.json());

//connect react build with serevr
app.use(exp.static(path.join(__dirname,'../frontend/blog-app/build'))); //path of current wprking directory and path of the directory build --> two arguments of path.join()

//use the imported apis
app.use('/user-api',userApp);
app.use('/admin-api',adminApp);
app.use('/author-api',authorApp);


const dbUrl = 'mongodb://localhost:27017';

//connect to mongodb
mongoClient.connect(dbUrl)
.then(client => {
    const dbObj = client.db("blogapp");
    //create collection objects
    const usersCollection = dbObj.collection('users');
    const authorsCollection = dbObj.collection('authors');
    const articlesCollection = dbObj.collection('articles');
    //share collection objects with APIs
    app.set('usersCollection',usersCollection);
    app.set('authorsCollection',authorsCollection);
    app.set('articlesCollection',articlesCollection);
    //print confirmation
    console.log("Database Connection Success");

})

//error handling middleware
app.use((err,req,res,next)=>{
    res.send({message:"error",payload:error.msg});
})

const port = 4000;
app.listen(port,console.log(`HTTP Server on port ${port}`));
