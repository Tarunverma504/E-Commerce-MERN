// const express = require('express');
// const app = express();
// const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
// const cloudinary = require('cloudinary');

// const path = require('path')

// const products = require('./routes/product');
// const auth = require('./routes/auth');
// const order = require('./routes/order');
// const payment = require('./routes/payment');

// const fileUpload = require('express-fileupload');

// const errorMiddleware = require('./middlewares/errors');

// // const dotenv = require('dotenv');
// //setting up config file
// if(process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').dotenv.config({path:'./config/config.env'})

// // if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' })
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())
// app.use(express.json());
// app.use(cookieParser());
// app.use(fileUpload());


// // Setting up cloudinary configuration
// cloudinary.config({
//      cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
//      api_key: process.env.CLOUDINARY_API_KEY,
//      api_secret: process.env.CLOUDINARY_API_SECRET
// })


// // //import all routes

// app.use('/api/v1', products);      //now it makes /api/v1/product
// app.use('/api/v1', auth);
// app.use('/api/v1', order);
// app.use('/api/v1',payment);

// if(process.env.NODE_ENV === 'PRODUCTION'){
//     app.use(express.static(path.join(__dirname,'../frontend/build')))
    
//     app.get('*', (req,res)=>{
//         res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
//     })
// }

// //middleware to handle error s
// app.use(errorMiddleware);

// app.get("/",async(req, res)=>{
//     res.send("shopit");
// })
 
// module.exports = app;

const express = require('express');
const app = express();

const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
// const dotenv = require('dotenv');
const path = require('path')

const errorMiddleware = require('./middlewares/errors')

// Setting up config file 
if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' })
// dotenv.config({ path: 'backend/config/config.env' })

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(fileUpload());


// Import all routes
const products = require('./routes/product');
const auth = require('./routes/auth');
const payment = require('./routes/payment');
const order = require('./routes/order');


app.use('/api/v1', products)
app.use('/api/v1', auth)
app.use('/api/v1', payment)
app.use('/api/v1', order)

if (process.env.NODE_ENV === 'PRODUCTION') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}


// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app

