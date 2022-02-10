const mongoose = require('mongoose');

const connectDatabase = ()=>{
    mongoose.connect(process.env.DB_LOCAL_URI,{
    }).then(console.log("MongoDB Databse Connected"));
}

module.exports = connectDatabase;