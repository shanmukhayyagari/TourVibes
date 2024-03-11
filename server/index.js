const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const router = require('./routes/users');
const app=express();

app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors());



app.use('/api/users',router);
app.use('/api/product',require('./routes/product'));

app.use('/uploads', express.static('../uploads'));


mongoose.connect('mongodb+srv://shanmukh:Shannu23@cluster0.htyqlk0.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true } ,(err)=>{
    if(err)console.log(JSON.stringify(err));
    else console.log('DB connected successfully');
});

app.get('/',(req,res)=>{
    res.send('Hello mern stack');
});

const PORT=6200;

app.listen(PORT,()=>{
    console.log(`Listening on the port ${PORT}`);
}); 

module.exports = app