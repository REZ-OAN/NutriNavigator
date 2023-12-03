import mongoose, { mongo } from "mongoose";

const orderSchema = new mongoose.Schema({
    shippinginfo: {
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        postalcode: {
            type: Number,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
    },
    orderitems: [
        {
            name: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            image: {
                type: String,
                required: true,
            },
            product: {
                type: mongoose.Schema.ObjectId,
                ref: "products",
                required: true,
            },
        },
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "users",
        required: true,
    },
    paymentinfo: {
        id: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
    },
    paidat: {
        type: Date,
        required: true,
    },
    itemsprice: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    shippingcost: { type: Number, default: 0 },
    totalprice: { type: Number, default: 0 },
    orderstatus: {
        type: String,
        required: true,
        default: "processing",
    },
    deliveredat: Date,
    createdAt: { type: Date, default: Date.now },
});

const orderModel = mongoose.model("orders", orderSchema);
export default orderModel;
