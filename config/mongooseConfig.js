import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.DB_URL;

console.log("MongoDB URL:", url);

export const connectUsingMongoose = async () => {
    try {
        await mongoose.connect(url, {
           family: 4
        });
        console.log("MongoDB connected using mongoose");
    } catch (error) {
        console.error("Error while connecting to MongoDB:", error.message);
    }
}
