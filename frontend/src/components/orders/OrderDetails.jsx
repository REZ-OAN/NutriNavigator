import React, { Fragment, useEffect } from "react";
import "./orderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layouts/Header/MetaData.jsx";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import {
    orderDetails,
    clearErrors,
} from "../../services/Actions/orderActions.js";
import Loader from "../layouts/Loader/Loader.jsx";
import { toast } from "react-toastify";
import { toastifyOptions } from "../../utils/toastify";

const OrderDetails = () => {
    const { order, error, loading } = useSelector(
        (state) => state.orderDetailsR
    );
    const { id } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        if (error) {
            toast.error(error, { ...toastifyOptions });
            clearErrors(dispatch);
        }
        orderDetails(dispatch, id);
    }, [dispatch, error, id]);
    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="Order Details" />
                    <div className="orderDetailsPage">
                        <div className="orderDetailsContainer">
                            <Typography component="h1">
                                Order #{order && order._id}
                            </Typography>
                            <Typography>Shipping Info</Typography>
                            <div className="orderDetailsContainerBox">
                                <div>
                                    <p>Name:</p>
                                    <span>{order.user && order.user.name}</span>
                                </div>
                                <div>
                                    <p>Phone:</p>
                                    <span>
                                        {order.shippinginfo &&
                                            order.shippinginfo.phoneNo}
                                    </span>
                                </div>
                                <div>
                                    <p>Address:</p>
                                    <span>
                                        {order.shippinginfo &&
                                            `${order.shippinginfo.address}, ${order.shippinginfo.city}, ${order.shippinginfo.pinCode}`}
                                    </span>
                                </div>
                            </div>
                            <Typography>Payment</Typography>
                            <div className="orderDetailsContainerBox">
                                <div>
                                    <p
                                        className={
                                            order.paymentinfo &&
                                            order.paymentinfo.status ===
                                                "succeeded"
                                                ? "greenColor"
                                                : "redColor"
                                        }
                                    >
                                        {order.paymentinfo &&
                                        order.paymentinfo.status === "succeeded"
                                            ? "PAID"
                                            : "NOT PAID"}
                                    </p>
                                </div>

                                <div>
                                    <p>Amount:</p>
                                    <span>
                                        {order.totalprice && order.totalprice}
                                    </span>
                                </div>
                            </div>

                            <Typography>Order Status</Typography>
                            <div className="orderDetailsContainerBox">
                                <div>
                                    <p
                                        className={
                                            order.orderstatus &&
                                            order.orderstatus === "delivered"
                                                ? "greenColor"
                                                : "redColor"
                                        }
                                    >
                                        {order.orderstatus && order.orderstatus}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="orderDetailsCartItems">
                            <Typography>Order Items:</Typography>
                            <div className="orderDetailsCartItemsContainer">
                                {order.orderitems &&
                                    order.orderitems.map((item) => (
                                        <div key={item.product}>
                                            <img
                                                src={item.image}
                                                alt="Product"
                                            />
                                            <Link
                                                to={`/product/${item.product}`}
                                            >
                                                {item.name}
                                            </Link>{" "}
                                            <span>
                                                {item.quantity} X ৳‎{item.price}{" "}
                                                ={" "}
                                                <b>
                                                    ৳‎
                                                    {item.price * item.quantity}
                                                </b>
                                            </span>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default OrderDetails;
