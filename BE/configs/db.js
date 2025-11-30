import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB);
        console.log("CONNECTED TO DB");
    } catch (err) {
        console.error("Error connecting to DB:", err);
        process.exit(1);
    }
};

export default connectDB;
