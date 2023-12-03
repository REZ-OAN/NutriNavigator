import express from "express";
import {
    isAuthenticatedUser,
    authorizeRoles,
} from "../middlewares/authMiddleware.js";
import {
    deleteOrder,
    getAllOrders,
    getSingleOrder,
    myOrders,
    newOrder,
    updateOrderStatus,
} from "../controllers/orderController.js";
const router = express.Router();

// create new order
router.route("/order/new").post(isAuthenticatedUser, newOrder);

// get order details from single order
router
    .route("/admin/order/:id")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleOrder)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder)
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrderStatus);
// get all order details
router
    .route("/admin/orders")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

// get user orders
router.route("/orders/me").get(isAuthenticatedUser, myOrders);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
export default router;
