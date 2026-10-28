import mongoose from "mongoose";

const connectDB=async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("database connected..");
        
    }
    catch{
        console.log("Not Connected..");
        
    }
}

export default connectDB;