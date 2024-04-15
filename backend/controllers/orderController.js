import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrorHandlingMiddleware.js";

// create new order -- user / admin
export const newOrder = catchAsyncErrors(async (req, res, next) => {
    const {
        shippinginfo,
        orderitems,
        paymentinfo,
        itemsprice,
        tax,
        shippingcost,
        totalprice,
    } = req.body;
    const order = await Order.create({
        shippinginfo,
        orderitems,
        paymentinfo,
        itemsprice,
        tax,
        shippingcost,
        totalprice,
        paidat: Date.now(),
        user: req.user.id,
    });
    res.status(201).json({
        success: true,
        order,
    });
});

// get single order -- admin
export const getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
    );
    if (!order) {
        return next(
            new ErrorHandler(
                `Order Not Found with this id ${req.params.id}`,
                404
            )
        );
    }
    res.status(200).json({
        success: true,
        order,
    });
});

// get all orders -- admin
export const getAllOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find().populate("user", "name email");
    const totalAmount = orders
        .map((order) => order.totalprice)
        .reduce((acc, curr) => acc + curr, 0);

    res.status(200).json({
        success: true,
        orders,
        totalAmount,
    });
});

// update order status -- Admin
export const updateOrderStatus = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(
            new ErrorHandler(
                `Order Not Found with this id ${req.params.id}`,
                404
            )
        );
    }
    if (order.orderstatus === "delivered") {
        return next(
            new ErrorHandler("You Have Already Delivered This Order", 400)
        );
    }
    if (req.body.status === "shipped") {
        order.orderitems.forEach(async (order) => {
            await updateStock(order.product, order.quantity);
        });
    }
    order.orderstatus = req.body.status;
    if (req.body.status === "delivered") {
        order.deliveredat = Date.now();
    }

    await order.save({
        validateBeforeSave: false,
    });
    res.status(200).json({
        success: true,
        order,
    });
});

// delete order -- Admin
export const deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.find({ _id: req.params.id });
    if (!order) {
        return next(
            new ErrorHandler(
                `Order is not found with this id ${req.params.id}`,
                404
            )
        );
    }

    await Order.deleteOne({ _id: req.params.id });
    res.status(200).json({
        success: true,
        message: "Order Deleted Successfully",
    });
});
// get logged in user orders user/admin
export const myOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user.id });
    if (!orders) {
        return next(
            new ErrorHandler(`No Order Found with this id ${req.user.id}`, 404)
        );
    }
    res.status(200).json({
        success: true,
        orders,
    });
});

async function updateStock(productId, productQuantity) {
    const product = await Product.findById(productId);
    product.stock -= productQuantity;
    await product.save({
        validateBeforeSave: false,
    });
}

export const totalAmountByDate = catchAsyncErrors(async (req, res, next) => {
    const amounts = await Order.aggregate([
        {
            $group: {
                _id: {
                    year: { $year: "$createdAt" },
                    month: { $month: "$createdAt" },
                    day: { $dayOfMonth: "$createdAt" },
                },
                totalAmount: { $sum: "$totalprice" },
            },
        },
        {
            $sort: {
                "_id.day": 1, // Sort by day in ascending order
            },
        },
    ]);
    res.status(200).json({ amounts });
});
