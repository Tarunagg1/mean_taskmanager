const User = require("../models/user.model");
let jwt = require('jsonwebtoken');

const verifyRefreshToken = (req,res,next) => {
    let refreshTOken = req.header('x-refresh-token');
    let _id = req.header('_id');

    User.findByIdAndToken(_id,refreshTOken)
    .then((user)=>{
        if(!user){
            return Promise.reject({
                'error':'user not found ivalid token'
            })
        }
        req.user_id = user._id;
        req.userObject = user;
        req.refreshTOken = refreshTOken;
        let isSessionvalid = false;
        
        user.sessions.forEach((session) => {
            if(session.token === refreshTOken){
                if(User.hasRefreshTokenExpired(session.expiresAt) === false){
                    isSessionvalid = true;
                }
            }
        })

        if(isSessionvalid){
            next();
        }else{
            return Promise.reject({
                'error':'Session expire'
            })        
        }
    }).catch((err)=>{
        console.log(err);
        return res.status(401).send(err);
    })
    
}


let authentcateTOken = (req, res,next) => {
    let token = req.header('x-access-token');
    jwt.verify(token,process.env.JWT_SECRET,(err,dockbook)=>{
        if(err){
            return res.status(401).send(err);
        }else{
            req.user = dockbook; 
            next();
        }
    })
}

module.exports = {
    verifyRefreshToken,
    authentcateTOken
}


