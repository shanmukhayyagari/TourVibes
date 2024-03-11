const User = require('../models/User');

const auth = (req,res,next)=>{
    if(process.env.NODE_ENV === 'test') {
        next()
    }

    const token = req.cookies.x_auth;
    // console.log('Auth')

    User.findIdByToken(token,(err,user)=>{
        if(!user || err)return res.json({
            AuthSuccess:false
        })
        
        req.token=token;
        req.user=user;

        next();
    });

}

module.exports=auth;