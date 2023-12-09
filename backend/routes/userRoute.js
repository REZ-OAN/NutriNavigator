import express from "express";
import {
    deleteUser,
    forgotPassword,
    getAllUsers,
    getSpecificUser,
    getUserDetails,
    loginUser,
    logoutUser,
    registerUser,
    resetPassword,
    updateUser,
    updateUserDetails,
    updateUserPassword,
} from "../controllers/userController.js";
import {
    isAuthenticatedUser,
    authorizeRoles,
} from "../middlewares/authMiddleware.js";
const router = express.Router();

// registration
router.route("/register").post(registerUser);
// login
router.route("/login").post(loginUser);
// logout
router.route("/logout").get(isAuthenticatedUser, logoutUser);
// forgetpassword
router.route("/password/forgot").post(forgotPassword);
// reset password
router.route("/password/reset/:token").put(resetPassword);
// user details
router.route("/profile").get(isAuthenticatedUser, getUserDetails);
// password change
router.route("/password/update").put(isAuthenticatedUser, updateUserPassword);
// update user details
router.route("/profile/update").put(isAuthenticatedUser, updateUserDetails);
// get all users
router
    .route("/admin/userprofiles")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);

// user RUD - Admin
router
    .route("/admin/userprofile/:id")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getSpecificUser)
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateUser)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);
export default router;
