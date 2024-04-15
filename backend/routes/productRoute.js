import express from "express";
import {
    createProduct,
    createProductReview,
    deleteProduct,
    deleteReviews,
    getAllAdminProducts,
    getAllProducts,
    getAllReviews,
    getProduct,
    getProductReviews,
    updateProduct,
    getProducts,
} from "../controllers/productController.js";
import {
    isAuthenticatedUser,
    authorizeRoles,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

// creating new product -- Admin
router
    .route("/admin/product/new")
    .post(
        isAuthenticatedUser,
        authorizeRoles("admin", "master"),
        createProduct
    );

// get all the products -- User and Admin
router.route("/products").get(getAllProducts);
router
    .route("/admin/products")
    .get(
        isAuthenticatedUser,
        authorizeRoles("admin", "master"),
        getAllAdminProducts
    );

// product update & delete -- Admin
router
    .route("/admin/product/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin", "master"), updateProduct)
    .delete(
        isAuthenticatedUser,
        authorizeRoles("admin", "master"),
        deleteProduct
    );
router.route("/product/:id").get(getProduct);

// review
router.route("/review").put(isAuthenticatedUser, createProductReview);

router
    .route("/reviews")
    .get(getProductReviews)
    .delete(isAuthenticatedUser, deleteReviews);
router.route("/getrecommendedproduct").post(isAuthenticatedUser, getProducts);
export default router;
