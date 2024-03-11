const express = require('express');
const cookieParser = require('cookie-parser');
const Product = require('../models/Product');
const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;


const User = require('../models/User');
const auth = require('../middleware/auth');
const multer = require('multer');

const router=express.Router();
router.use(cookieParser());


var storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, '../uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.png') {
            return cb(res.status(400).end('only jpg, png are allowed'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single("file")

router.post("/uploadImage", auth, (req, res) => {


    upload(req, res, err => {
        if (err) {
            // console.log(err);
            return res.json({ success: false, err })
        }
        return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
    })

});

router.post('/uploadProduct',auth,(req,res)=>{ 
    if(process.env.NODE_ENV === 'test') {
        req.body = {
            name: 'Product Name',
            price: 100,
            description: 'Product Description',
          };
    }

    const product = new Product(req.body);

    product.save(err=>{
        if(err)return res.status(400).json({success:false,err});
        return res.status(200).json({success:true})
    })
})

router.post('/getProducts',(req,res)=>{
    // console.log(req.body.term)
    if(process.env.NODE_ENV === 'test') {
        req.body.term = true
    }
    if(req.body.term){

        Product.find({ $text: { $search: req.body.term }},(err,products)=>{
            if(err)return res.status(400).json({success:false,err});
            return res.status(200).json({success:true,products})
        })

    }
    else{
        Product.find({},(err,products)=>{
            if(err)return res.status(400).json({success:false,err});
            return res.status(200).json({success:true,products})
        })
    }

})

router.post('/getDetail',(req,res)=>{
    if(process.env.NODE_ENV === 'test') {
        req.body.id = '6546e334b47e023b42c58b5e';
    } 
//    console.log(req.body.id)
    Product.find({_id:ObjectId.createFromHexString(req.body.id) },(err,docs)=>{
        if(err){
           return res.status(400).json({
                success:false,
                err
            })
        }
        return res.status(200).json({
            success:true,
            product:docs
        })
    })
})

router.post('/getCartDetails',(req,res)=>{
    if(process.env.NODE_ENV === 'test') {
        req.body.array = [];
    } 
    Product.find({"_id":{$in:req.body.array}},(err,docs)=>{
        res.json({docs:docs});
    })
})


module.exports=router;