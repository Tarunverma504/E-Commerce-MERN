const app = require("./app");
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');


//setting up config file
dotenv.config({path:'./config/config.env'})
//connecting to database
connectDatabase();
const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server running at Port: ${process.env.PORT}`)
})

//Handle Unhandle promise rejection
// process.on("unhandledRejection", err=>{
//     console.log(`ERROR: ${err.message}`);
//     console.log('shutting down the server due to unhandled Promise rejection');
//     server.close(()=>{
//         process.exit(1);
//     })
// })