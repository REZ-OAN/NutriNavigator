import express from "express";
import {
    createProduct,
    createProductReview,
    deleteProduct,
    deleteReviews,
    getAllProducts,
    getAllReviews,
    getProduct,
    getProductReviews,
    updateProduct,
} from "../controllers/productController.js";
import {
    isAuthenticatedUser,
    authorizeRoles,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

// creating new product -- Admin
router
    .route("/admin/product/new")
    .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

// get all the products -- User and Admin
router.route("/products").get(getAllProducts);

// product update & delete -- Admin
router
    .route("/admin/product/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);
router.route("/product/:id").get(getProduct);

// review
router.route("/review").put(isAuthenticatedUser, createProductReview);

// getAll product reviews
router
    .route("/reviews")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getAllReviews);
// delete product reviews
router
    .route("/review")
    .get(getProductReviews)
    .delete(isAuthenticatedUser, deleteReviews);
export default router;
