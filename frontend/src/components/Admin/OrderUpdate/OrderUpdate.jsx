import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../../layouts/Header/MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import SideBar from "../Sidebar/Sidebar";
import {
    orderDetails as getOrderDetails,
    updateOrder,
    clearErrors,
} from "../../../services/Actions/orderActions.js";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../layouts/Loader/Loader.jsx";
import { toast } from "react-toastify";
import { toastifyOptions } from "../../../utils/toastify.js";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";
import { UPDATE_ORDER_RESET } from "../../../services/Constants/orderConstants.js";
import "./OrderUpdate.css";

const OrderUpdate = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { order, error, loading } = useSelector(
        (state) => state.orderDetailsR
    );
    const { error: updateError, isUpdated } = useSelector(
        (state) => state.orderDUR
    );
    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("status", status);
        updateOrder(dispatch, id, myForm);
    };
    const dispatch = useDispatch();
    const [status, setStatus] = useState("");
    useEffect(() => {
        if (error) {
            toast.error(error, { ...toastifyOptions });
            clearErrors(dispatch);
        }
        if (updateError) {
            toast.error(updateError, { ...toastifyOptions });
            clearErrors(dispatch);
        }
        if (isUpdated) {
            toast.success("Order Updated Successfully", { ...toastifyOptions });
            dispatch({ type: UPDATE_ORDER_RESET });
            navigate("/admin/orders");
        }

        getOrderDetails(dispatch, id);
    }, [dispatch, error, id, isUpdated, updateError, navigate]);

    return (
        <Fragment>
            <MetaData title="Process Order" />
            <div className="dashboard">
                <SideBar />
                <div className="newProductContainer">
                    {loading ? (
                        <Loader />
                    ) : (
                        <div
                            className="confirmOrderPage"
                            style={{
                                display:
                                    order.orderStatus === "delivered"
                                        ? "block"
                                        : "grid",
                            }}
                        >
                            <div>
                                <div className="confirmshippingArea">
                                    <Typography>Shipping Info</Typography>
                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p>Name:</p>
                                            <span>
                                                {order.user && order.user.name}
                                            </span>
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
                                                    `${order.shippinginfo.address}, ${order.shippinginfo.pinCode},Bangladesh`}
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
                                                order.paymentinfo.status ===
                                                    "succeeded"
                                                    ? "PAID"
                                                    : "NOT PAID"}
                                            </p>
                                        </div>

                                        <div>
                                            <p>Amount:</p>
                                            <span>
                                                {order.totalprice &&
                                                    order.totalprice}
                                            </span>
                                        </div>
                                    </div>

                                    <Typography>Order Status</Typography>
                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p
                                                className={
                                                    order.orderstatus &&
                                                    order.orderstatus ===
                                                        "Delivered"
                                                        ? "greenColor"
                                                        : "redColor"
                                                }
                                            >
                                                {order.orderstatus &&
                                                    order.orderstatus}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="confirmCartItems">
                                    <Typography>Your Cart Items:</Typography>
                                    <div className="confirmCartItemsContainer">
                                        {order.orderitems &&
                                            order.orderitems.map((item) => (
                                                <div key={item.product}>
                                                    <img
                                                        src={item.image.url}
                                                        alt="Product"
                                                    />
                                                    <Link
                                                        to={`/product/${item.product}`}
                                                    >
                                                        {item.name}
                                                    </Link>{" "}
                                                    <span>
                                                        {item.quantity} X ৳‎
                                                        {item.price} ={" "}
                                                        <b>
                                                            ৳‎
                                                            {item.price *
                                                                item.quantity}
                                                        </b>
                                                    </span>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                            {/*  */}
                            <div
                                style={{
                                    display:
                                        order.orderStatus === "delivered"
                                            ? "none"
                                            : "block",
                                }}
                            >
                                <form
                                    className="updateOrderForm"
                                    onSubmit={updateOrderSubmitHandler}
                                >
                                    <h1>Process Order</h1>

                                    <div>
                                        <AccountTreeIcon />
                                        <select
                                            onChange={(e) =>
                                                setStatus(e.target.value)
                                            }
                                        >
                                            <option value="">
                                                Choose Category
                                            </option>
                                            {order.orderstatus ===
                                                "processing" && (
                                                <option value="shipped">
                                                    Shipped
                                                </option>
                                            )}

                                            {order.orderstatus ===
                                                "shipped" && (
                                                <option value="delivered">
                                                    Delivered
                                                </option>
                                            )}
                                        </select>
                                    </div>

                                    <Button
                                        id="createProductBtn"
                                        type="submit"
                                        disabled={
                                            loading
                                                ? true
                                                : false || status === ""
                                                ? true
                                                : false
                                        }
                                    >
                                        Process
                                    </Button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default OrderUpdate;
