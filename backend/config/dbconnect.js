import mongoose from "mongoose";
import dotenv from "dotenv";

// configure
dotenv.config({ path: "/backend/config/config.env" });

const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log(
            `MongoDB connected with server ${mongoose.connection.host}`
        );
    } catch (error) {
        console.log({
            error: error.message,
        });
    }
};

export default connection;
