const mongoose = require("mongoose");
require("dotenv").config()
const connectToDb = async()=>{
    try{
        
        await mongoose.connect();
        console.log("connected to db")
    }catch(err){
        console.log(err);
        throw new Error('cannot connect to db')
    }
}


module.exports  = {
    connectToDb
}