import User from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrorHandlingMiddleware.js";
import { sendToken } from "../utils/getJWTToken.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";
import { v2 as cloudinary } from "cloudinary";
// register user
export const registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password, avatar } = req.body;
    const myCloud = await cloudinary.uploader.upload(avatar, {
        folder: "avatars",
        width: 250,
        crop: "scale",
    });
    const user = await User.create({
        name,
        email,
        password,
        avtar: {
            public_id: myCloud["public_id"],
            url: myCloud["secure_url"],
        },
    });
    sendToken(user, 201, res);
});

// login user
export const loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("Email and Password Must Be Filled", 400));
    }
    const user = await User.findOne({ email: email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid Email or Passowrd", 401));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }
    sendToken(user, 200, res);
});

// logout user
export const logoutUser = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});

// forgot password
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorHandler("User Not Found", 404));
    }
    // get resetPassword Token
    const resetoken = await user.getResetPasswordToken();
    // save the particular user
    await user.save();
    // here the link will be where your frontend is hosted
    const resetPasswordUrl = `${req.protocol}://${process.env.FRONT_END_URI}/password/reset/${resetoken}`;
    const message = `Your Password Reset Token Is : \n\n ${resetPasswordUrl}\n\nIf you have not requested this email then, please ignore it`;
    try {
        await sendEmail({
            email: user.email,
            subject: `NutriNavigator Password Recovery`,
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });
    } catch (error) {
        user.resetPasswordExpire = undefined;
        user.resetPasswordToken = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500));
    }
});

// reset password
export const resetPassword = catchAsyncErrors(async (req, res, next) => {
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordTokenExpire: { $gt: Date.now() },
    });
    if (!user) {
        return next(
            new ErrorHandler(
                "Reset Password Token Is Invalid or has been Expired",
                400
            )
        );
    }
    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password Does Not Match", 400));
    }
    user.password = req.body.password;
    user.resetPasswordTokenExpire = undefined;
    user.resetPasswordToken = undefined;
    await user.save();
    sendToken(user, 200, res);
});

// get user details
export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user,
    });
});

// update password
export const updateUserPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old Password Didn't Matched", 401));
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Passwords Does not match", 401));
    }
    user.password = req.body.newPassword;
    await user.save();
    sendToken(user, 200, res);
});

// update user details
export const updateUserDetails = catchAsyncErrors(async (req, res, next) => {
    const { name, email, avatar } = req.body;
    const updatedUserData = {
        name,
        email,
    };
    if (avatar !== "") {
        const user = await User.findById(req.user.id);
        const imgID = user.avtar.public_id;
        await cloudinary.uploader.destroy(imgID);
        const myCloud = await cloudinary.uploader.upload(avatar, {
            folder: "avatars",
            width: 250,
            crop: "scale",
        });
        updatedUserData.avtar = {
            public_id: myCloud["public_id"],
            url: myCloud["secure_url"],
        };
    }
    const updatedUser = await User.updateOne(
        { _id: req.user.id },
        { ...updatedUserData }
    );
    res.status(200).json({
        success: true,
    });
});

// get all users (admin)
export const getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        users,
    });
});

// get single user (admin)
export const getSpecificUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(
            new ErrorHandler(
                `User Does Not Exist With Id : ${req.params.id}`,
                404
            )
        );
    }
    res.status(200).json({
        success: true,
        user,
    });
});

//update user  (admin)
export const updateUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(
            new ErrorHandler(
                `user does not exist with Id: ${req.params.id}`,
                404
            )
        );
    }
    const updatedUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    };
    const updatedUser = await User.updateOne(
        { _id: req.params.id },
        { ...updatedUserData }
    );
    res.status(200).json({
        success: true,
        updatedUser,
    });
});
// delete a user (admin)
export const deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(
            new ErrorHandler(
                `user does not exist with Id: ${req.params.id}`,
                404
            )
        );
    }
    const imageId = user.avtar.public_id;

    await cloudinary.uploader.destroy(imageId);
    await User.deleteOne({ _id: req.params.id });
    res.status(200).json({
        success: true,
        message: "Successfully Removed User",
    });
});
