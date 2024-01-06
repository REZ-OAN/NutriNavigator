import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./myOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../services/Actions/orderActions.js";
import Loader from "../layouts/Loader/Loader.jsx";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { toastifyOptions } from "../../utils/toastify";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layouts/Header/MetaData";
import LaunchIcon from "@material-ui/icons/Launch";

const MyOrders = () => {
    const dispatch = useDispatch();
    const { loading, error, orders } = useSelector((state) => state.myOrderR);
    const { user } = useSelector((state) => state.userR);

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.5,
            cellClassName: (params) => {
                return params.getValue(params.id, "status") === "delivered"
                    ? "greenColor"
                    : "redColor";
            },
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 150,
            flex: 0.3,
        },

        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 270,
            flex: 0.5,
        },

        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Link to={`/order/${params.getValue(params.id, "id")}`}>
                        <LaunchIcon />
                    </Link>
                );
            },
        },
    ];
    const rows = [];

    orders &&
        orders.forEach((item, index) => {
            rows.push({
                itemsQty: item.orderitems.length,
                id: item._id,
                status: item.orderstatus,
                amount: item.totalprice,
            });
        });

    useEffect(() => {
        if (error) {
            toast.error(error, { ...toastifyOptions });
            clearErrors(dispatch);
        }
        myOrders(dispatch);
    }, [dispatch, error]);

    return (
        <Fragment>
            <MetaData title={`${user.name} - Orders`} />

            {loading ? (
                <Loader />
            ) : (
                <div className="myOrdersPage">
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="myOrdersTable"
                        autoHeight
                    />

                    <Typography id="myOrdersHeading">
                        {user.user.name}'s Orders
                    </Typography>
                </div>
            )}
        </Fragment>
    );
};

export default MyOrders;
