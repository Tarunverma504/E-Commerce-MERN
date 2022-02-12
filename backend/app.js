const express = require('express');
const app = express();
const products = require('./routes/product');
const bodyParser = require('body-parser')
const errorMiddleware = require('./middlewares/errors');
const auth = require('./routes/auth');
const cookieParser = require('cookie-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.json());
app.use(cookieParser());

// //import all routes
app.use('/api/v1', products);      //now it makes /api/v1/product
app.use('/api/v1', auth);
//middleware to handle error s
app.use(errorMiddleware);

app.get("/",async(req, res)=>{
    res.send("shopit");
})
 
module.exports = app;