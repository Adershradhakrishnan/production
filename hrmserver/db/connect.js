const mongoose=require('mongoose');
const dotenv =require('dotenv');
dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_NAME = process.env.MONGODB_NAME;

async function connect(){
    try {
        mongoose.Promise = global.Promise;
        await mongoose.connect(`${MONGODB_URI}/${MONGODB_NAME}`);
        console.log("Database connection established...");
        
    } catch (error) {
        console.log("Database connection error : ", error);
    }
    // .then((message)=>{
    //     console.log("Database connection established");
    // })
    // .catch((error)=>{
    //     console.log("database not connected",error);
    // })
}

module.exports=connect;
