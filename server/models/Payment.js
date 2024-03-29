const mongoose = require('mongoose');
const Schema = mongoose.Schema;


mongoose.set('useFindAndModify', false);

const PaymentSchema = mongoose.Schema({
    
    user:{
        type:Array,
        default:[]
    },
    data:{
        type:Array,
        default:[]
    },
    product:{
        type:Array,
        default:[]
    }

},{timestamps:true});



const Payment = mongoose.model('Payments',PaymentSchema);

module.exports=Payment;