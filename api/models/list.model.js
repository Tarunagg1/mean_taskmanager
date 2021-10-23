const mongoose = require('mongoose');


const listSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        minLength:3,
        trim:true,
    }
});

const list = mongoose.model('list',listSchema);

module.exports = list;


