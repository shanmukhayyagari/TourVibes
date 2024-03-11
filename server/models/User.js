const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require("moment");

mongoose.set('useFindAndModify', false);

const userSchema = mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    role:{
        type:Number,
        default: 0 
    },
    cart:{
        type:Array,
        default:[]
    },
    history: {
        type: Array,
        default: []
    },
    token:{
        type:String,
    },
    tokenExp:{
        type: Number
    }
});

userSchema.pre('save',async function(next){

    const user=this;

    const saltRounds=10;

    try{
    
    const salt = await bcrypt.genSalt(saltRounds);

    const hashPassword = await bcrypt.hash(user.password,salt);

    user.password=hashPassword

    }
    catch(err){
        console.log(err);
    }

    finally{
        next();
    }

});

userSchema.methods.comparePassword=function(plainPassword,callback){
    // console.log(plainPassword)
    bcrypt.compare(plainPassword,this.password,function(err,isMatch){
        if(err)return callback(err);
        console.log(isMatch)
        return callback(null,isMatch);
    })
}

userSchema.methods.generateToken=async function(callback){
    const user = this;

    var token = jwt.sign(user._id.toHexString(),'secret');
    var oneHour = moment().add(1, 'hour').valueOf();


    // user.save((err,user)=>{
    //     if(err)callback(err);
    //     else callback(null,user);
    // })

    await User.findOneAndUpdate({email:user.email},{$set:{token:token,tokenExp:oneHour}},(err,docs)=>{
        if(err)callback(err);
        
        else {
            user.tokenExp = oneHour;
            user.token = token;
            callback(null,user);
        }
    });

}

userSchema.statics.findIdByToken=function(token,callback){

    jwt.verify(token,'secret',(err,decode)=>{

        User.findOne({"_id":decode,"token":token},(err,user)=>{
            if(err)return callback(err);
            return callback(null,user);
        })

    })

}

const User = mongoose.model('Users',userSchema);

module.exports=User;