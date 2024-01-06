import express from "express";
import errorHanlder from "./middlewares/errorHandlingMiddleware.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
// routes import
import product from "./routes/productRoute.js";
import user from "./routes/userRoute.js";
import order from "./routes/orderRoute.js";
import payment from "./routes/paymentRoute.js";
import dotenv from "dotenv";

// configure
dotenv.config({ path: "backend/config/config.env" });
const app = express();

app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);
app.use(errorHanlder);
export default app;
