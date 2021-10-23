const mongoose = require('mongoose');


const taskSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        minLength:3,
        trim:true,
    },
    listid:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    iscompleted:{
        type:Boolean,
        default:false
    }
});

const task = mongoose.model('task',taskSchema);

module.exports = task;


