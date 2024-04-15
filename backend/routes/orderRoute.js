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
    totalAmountByDate,
    updateOrderStatus,
} from "../controllers/orderController.js";
const router = express.Router();

// create new order
router.route("/order/new").post(isAuthenticatedUser, newOrder);

// get order details from single order
router
    .route("/admin/order/:id")
    .get(isAuthenticatedUser, authorizeRoles("admin", "master"), getSingleOrder)
    .delete(isAuthenticatedUser, authorizeRoles("admin", "master"), deleteOrder)
    .put(
        isAuthenticatedUser,
        authorizeRoles("admin", "master"),
        updateOrderStatus
    );
// get all order details
router
    .route("/admin/orders")
    .get(isAuthenticatedUser, authorizeRoles("admin", "master"), getAllOrders);

// get user orders
router.route("/orders/me").get(isAuthenticatedUser, myOrders);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router
    .route("/totalamount")
    .get(
        isAuthenticatedUser,
        authorizeRoles("admin", "master"),
        totalAmountByDate
    );
export default router;
