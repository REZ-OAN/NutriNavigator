import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import MetaData from "../../layouts/Header/MetaData";
import Sidebar from "../Sidebar/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { getAllAdminProducts } from "../../../services/Actions/productAction.js";
import { getAllOrders } from "../../../services/Actions/orderActions.js";
import { getAllUsers } from "../../../services/Actions/userAction.js";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import axios from "axios";
const Dashboard = () => {
    const { products } = useSelector((state) => state.productsR);
    const { orders } = useSelector((state) => state.ordersAR);
    const { users } = useSelector((state) => state.usersAR);
    const [paidAmount, setPaidAmount] = useState([]);
    const [label, setLabel] = useState([]);
    const dispatch = useDispatch();
    let outOfStock = 0;
    let totalAmount = 0;
    orders &&
        orders.forEach((item) => {
            totalAmount += item.totalprice;
        });
    products &&
        products.forEach((item) => {
            if (item.stock === 0) {
                outOfStock += 1;
            }
        });
    const lineState = {
        labels: ["Initial", ...label],
        datasets: [
            {
                label: "Total Amount Earned Per Day",
                backgroundColor: ["tomato"],
                hoverBackgroundColor: ["rgb(197, 72, 49)"],
                data: [0, ...paidAmount],
            },
        ],
    };

    const doughnutState = {
        labels: ["Out of Stock", "InStock"],
        datasets: [
            {
                backgroundColor: ["#00A6B4", "#6800B4"],
                hoverBackgroundColor: ["#4B5000", "#35014F"],
                data: [outOfStock, products && products.length - outOfStock],
            },
        ],
    };

    useEffect(() => {
        const fetch = async () => {
            const { data } = await axios.get("/api/v1/totalamount");
            const labels =
                data &&
                data.amounts.map((amount) => {
                    const month =
                        amount._id.month > 9
                            ? amount._id.month
                            : `0${amount._id.month}`;
                    const day =
                        amount._id.day > 9
                            ? amount._id.day
                            : `0${amount._id.day}`;
                    return `Amount Earned at ${day}-${month}-${amount._id.year}`;
                });
            const amounts =
                data &&
                data.amounts.map((amount) => {
                    return amount.totalAmount;
                });
            setPaidAmount(amounts);
            setLabel(labels);
        };
        fetch();
        getAllAdminProducts(dispatch);
        getAllOrders(dispatch);
        getAllUsers(dispatch);
    }, [dispatch]);

    return (
        <div className="dashboard">
            <MetaData title="Dashboard - Admin Panel" />
            <Sidebar />

            <div className="dashboardContainer">
                <Typography component="h1">Dashboard</Typography>

                <div className="dashboardSummary">
                    <div>
                        <p>
                            Total Amount <br /> ৳‎{totalAmount}
                        </p>
                    </div>
                    <div className="dashboardSummaryBox2">
                        <Link to="/admin/products">
                            <p>Product</p>
                            <p>{products && products.length}</p>
                        </Link>
                        <Link to="/admin/orders">
                            <p>Orders</p>
                            <p>{orders && orders.length}</p>
                        </Link>
                        <Link to="/admin/users">
                            <p>Users</p>
                            <p>{users && users.length}</p>
                        </Link>
                    </div>
                </div>

                <div className="lineChart">
                    <Line data={lineState} />
                </div>

                <div className="doughnutChart">
                    <Doughnut data={doughnutState} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
