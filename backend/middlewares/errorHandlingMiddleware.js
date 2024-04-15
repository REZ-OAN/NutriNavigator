import ErrorHandler from "../utils/errorHandler.js";

const errorHanlder = (err, req, res, next) => {
    const error = {
        statusCode: "",
        message: "",
        stack: "",
    };
    if (err.name === "CastError") {
        const msg = `Resource Not Found. Invalid : ${err.path}`;
        err = new ErrorHandler(msg, 400);
    }
    if (err.code === 11000) {
        const msg = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(msg, 400);
    }
    if (err.name === "JsonWebTokenError") {
        const msg = `Web Token is Not Recognized, try again`;
        err = new ErrorHandler(msg, 400);
    }
    if (err.name === "TokenExpiredError") {
        const msg = `Web Token is Expired, try again`;
        err = new ErrorHandler(msg, 400);
    }
    if (err.http_code === 400) {
        const msg = "Internal Server Problem";
        err = new ErrorHandler(msg, 500);
    }
    error.statusCode = err.statusCode || 500;
    error.message = err.message || "Internal Server Error";
    error.stack = err.stack.split("\n")[1].trim() || "root";
    res.status(error.statusCode).json({
        success: false,
        error,
    });
};

export default errorHanlder;
