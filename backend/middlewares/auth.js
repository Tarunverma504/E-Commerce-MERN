// const ErrorHandler = require("../utils/errorHandler");
// const catchAsyncErrors = require("./catchAsyncErrors");
// const jwt = require('jsonwebtoken');
// const user = require("../models/user");
// // checks if user is authenticated or not
// exports.isAuthenticatedUser = catchAsyncErrors(async(req, res, next)=>{

//      const {token} = req.cookies
//      if(!token && token!=undefined){
//           return next(new ErrorHandler('Login first to access this resource.', 401))
//      }

//      const decoded = jwt.verify(token, process.env.JWT_SECRET);
//      req.user = await user.findById(decoded.id);
//      next();

// })

// //Handling users roles
// exports.authorizeRoles = (...roles)=>{
//      return (req,res,next)=>{
//           if(!roles.includes(req.user.role)){
//                return next(new ErrorHandler(`Role(${req.user.role})is not allowd to access these resource`,403));
//           }
//           next();  
//      }

// }


const User = require('../models/user')

const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

// Checks if user is authenticated or not
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {

    const { token } = req.cookies

    if (!token) {
        return next(new ErrorHandler('Login first to access this resource.', 401))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id);

    next()
})

// Handling users roles
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(`Role (${req.user.role}) is not allowed to acccess this resource`, 403))
        }
        next()
    }
}


