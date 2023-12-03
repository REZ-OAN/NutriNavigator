import app from "./app.js";
import dotenv from "dotenv";
import connection from "./config/dbconnect.js";
import { v2 as cloudinary } from "cloudinary";
//  handling uncaught error
process.on("uncaughtException", (err) => {
    console.log(`Error : ${err.message}`);
    console.log(`Shutting Down The Server Due To Uncaught Exception`);
    process.exit(1);
});
// configure
dotenv.config({ path: "backend/config/config.env" });
// connecting to the db
connection();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
// server
const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// unhandled Promise error
process.on("unhandledRejection", (err) => {
    console.log(`Error : ${err.message}`);
    console.log(`Shutting Down The Server Due To Uncaught Promise Rejection`);
    server.close(() => {
        process.exit(1);
    });
});
