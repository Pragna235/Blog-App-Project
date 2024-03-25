const exp = require('express');
const adminApp = exp.Router();

adminApp.get('/test-admin',(req,res)=>{
    res.send({message:"from admin api"});
})















module.exports = adminApp;