const express = require('express');
const app = express();
const products = require('./routes/product');
const bodyParser = require('body-parser')
const errorMiddleware = require('./middlewares/errors');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.json());

//import all routes
app.use('/api/v1', products);      //now it makes /api/v1/product

//middleware to handle errors
app.use(errorMiddleware);
 

module.exports = app;