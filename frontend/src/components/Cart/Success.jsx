import React from "react";
import { MdCheckCircle } from "react-icons/md";
import "./Success.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
const Success = () => {
    localStorage.removeItem("shippinginfo");
    localStorage.removeItem("cartItems");
    sessionStorage.removeItem("orderInfo");
    return (
        <div className="orderSuccess">
            <MdCheckCircle />
            <Typography>Your Order has been Placed successfully </Typography>
            <Link to="/orders/me">View Orders</Link>
        </div>
    );
};

export default Success;
