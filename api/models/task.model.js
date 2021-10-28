const mongoose = require('mongoose');
const list = require('./list.model');


const taskSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        minLength:3,
        trim:true,
    },
    listid:{
        type:mongoose.Types.ObjectId,
        ref:'list',
        required:true
    },
    iscompleted:{
        type:Boolean,
        default:false
    }
});

// user.find({$and:[{id:id}]})


const task = mongoose.model('task',taskSchema);

module.exports = task;



