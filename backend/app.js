const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const products = require('./routes/product');
const auth = require('./routes/auth');
const order = require('./routes/order');

const errorMiddleware = require('./middlewares/errors');



app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.json());
app.use(cookieParser());

// //import all routes

app.use('/api/v1', products);      //now it makes /api/v1/product
app.use('/api/v1', auth);
app.use('/api/v1', order);

//middleware to handle error s
app.use(errorMiddleware);

app.get("/",async(req, res)=>{
    res.send("shopit");
})
 
module.exports = app;