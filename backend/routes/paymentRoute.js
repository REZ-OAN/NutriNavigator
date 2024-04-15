import express from "express";
import { isAuthenticatedUser } from "../middlewares/authMiddleware.js";
import {
    processPayment,
    sendApiKey,
} from "../controllers/paymentController.js";
const router = express.Router();

router.route("/payment/process").post(isAuthenticatedUser, processPayment);
router.route("/stripeapikey").get(isAuthenticatedUser, sendApiKey);
export default router;
