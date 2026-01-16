import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()


export const connectDB  = async()=>{
    try {
        const uri = process.env.MONGO_URI || process.env.MONGO_URL
        if (!uri) throw new Error("MONGO_URI is not defined in environment")
        await mongoose.connect(uri)
        console.log("MongoDB connected")
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error)
        throw error
    }
}