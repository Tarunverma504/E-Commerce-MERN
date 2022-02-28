const mongoose = require('mongoose');

const connectDatabase = ()=>{
    mongoose.connect(process.env.DB_URI,{
    }).then(console.log("MongoDB Database Connected"));
}

module.exports = connectDatabase;