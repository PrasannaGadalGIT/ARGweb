import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async() => {
    try{
        const connection = await mongoose.connect(process.env.MONGODB_URL as string);
        console.log(`MongoDB connected: ${connection.connection.host}`);
        return connection;
    }catch(e){
        console.error(`Error: ${e}`);
    
    }
}

export default connectDB;