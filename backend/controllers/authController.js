const USer = require('../models/user');
const ErrorHandler = require("../utils/errorHandler");

const catchAsyncError = require('../middlewares/catchAsyncErrors');
const User = require('../models/user');
const sendToken = require('../utils/jwtToken');

//Register a user => /api/v1/register
exports.registerUser = catchAsyncError(async(req,res,next)=>{
    const {name, email, password} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:'avtar-Ecommerce/pngwing.com_mzxlzu.png',
            url:'https://res.cloudinary.com/vermatarun/image/upload/v1644578440/avtar-Ecommerce/pngwing.com_mzxlzu.png'
        }
    })

    sendToken(user, 200, res);

})

// Login user => /api/v1/login

exports.loginUser = catchAsyncError(async(req, res,next)=>{
    const {email, password} = req.body;

    //checks if email and password is entered by user
    if(!email || !password){
        return next(new ErrorHandler('Please enter email & password', 400))
    }

    //Finding user in database 
    const user = await User.findOne({email}).select('+password') 

    if(!user){
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    //checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    
    sendToken(user, 200, res);

})