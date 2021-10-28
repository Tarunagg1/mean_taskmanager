const mongoose = require('mongoose');


const listSchema = mongoose.Schema({
    userid:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    title:{
        type:String,
        required:true,
        minLength:3,
        trim:true,
    }
});

const list = mongoose.model('list',listSchema);

module.exports = list;


