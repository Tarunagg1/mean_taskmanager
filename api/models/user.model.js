const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');


const userSchema = new mongoose.Schema({
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    sessions: [
        {
            token: {
                type: String,
                required: true
            },
            expire_at: {
                type: Number,
                required: true
            }
        }
    ]
});


// instance method

userSchema.method.toJson = function(){
    const user = this;
    const userObject = user.toObject();

    // return 
    
}





module.exports = mongoose.model("user", userSchema);








