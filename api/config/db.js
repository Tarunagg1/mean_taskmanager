const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL,{useNewUrlParser: true},(err,link)=>{
    if(err)
        throw err;
    else{
        console.log("database connected");
    }
})