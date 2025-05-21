import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => { 
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected Succesfully",);
    } catch (error) {
        console.log("Error connecting to MongoDB", error.message);
        
    }
}