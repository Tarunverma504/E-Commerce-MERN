const { Error } = require("mongoose");
const Product = require("../models/product");
const ErrorHandler = require("../utils/errorHandler"); 
const catchAsyncErrors = require("../middlewares/catchAsyncErrors"); 

//create new product => /api/v1/product/new

exports.newProduct = catchAsyncErrors(async(req,res, next)=>{
        const product = await Product.create(req.body);
        res.status(201).json({
            success:true,
            product
        })
}) 

//Get all products => /api/v1/products

exports.getProducts =  catchAsyncErrors(async(req,res,next)=>{

    const products = await Product.find();

    res.status(200).json({
        success:true,
        count:products.length,
        products
    })
})


//Get single product details => /api/v1/admin/product/:id

exports.getSingleProduct = catchAsyncErrors(async(req, res, next)=>{
    try{
        const product = await Product.findById(req.params.id);
        if(!product){
            throw Error();
        }
        res.status(200).json({
            success:true,
            product
        })
    }
    catch(err){
        return next(new ErrorHandler('Product not found', 404));
        // return res.status(404).json({
        //     success:false,
        //     message:"Product not found"
        // })
    }
});


//update product => /api/v1/admin/ product/:id

exports.updateProduct = catchAsyncErrors(async(req,res, next)=>{
    try{
        let product = await Product.findById(req.params.id);
        product = await Product.findByIdAndUpdate(req.params.id, req.body,{
            new:true,
            runValidators:true,
            useFindAndModify: false
        });
        res.status(200).json({
            success:true,
            product
        })

    }
    catch(err){
        return res.status(404).json({
            success:false,
            message:"Product not found"
        })
    }
})

// Delete  Product => /api/v1/admin/product/:id

exports.deleteProduct = catchAsyncErrors(async(req, res, next)=>{
    try{
        let product = await Product.findById(req.params.id);
        await product.remove();
        res.status(200).json({
            success: true,
            message: "Product is deleted."
        })
    }
    catch(err){
        return res.status(404).json({
            success:false,
            message:"Product not found"
        })
    }
});