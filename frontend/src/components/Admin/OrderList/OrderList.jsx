import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "../ProductList/ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { toastifyOptions } from "../../../utils/toastify.js";
import { Button } from "@material-ui/core";
import MetaData from "../../layouts/Header/MetaData.jsx";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "../Sidebar/Sidebar.jsx";
import {
    getAllOrders,
    deleteOrder,
    clearErrors,
} from "../../../services/Actions/orderActions.js";
import { DELETE_ORDER_RESET } from "../../../services/Constants/orderConstants";

const OrderList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, orders } = useSelector((state) => state.ordersAR);
    const { error: deleteError, isDeleted } = useSelector(
        (state) => state.orderDUR
    );

    const deleteOrderHandler = (id) => {
        deleteOrder(dispatch, id);
    };

    useEffect(() => {
        if (error) {
            toast.error(error, { ...toastifyOptions });
            clearErrors(dispatch);
        }

        if (deleteError) {
            toast.error(deleteError, { ...toastifyOptions });
            clearErrors(dispatch);
        }

        if (isDeleted) {
            toast.success("Order Deleted Successfully", { ...toastifyOptions });
            navigate("/admin/orders");
            dispatch({ type: DELETE_ORDER_RESET });
        }

        getAllOrders(dispatch);
    }, [dispatch, navigate, error, deleteError, isDeleted]);

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.5,
            cellClassName: (params) => {
                return params.getValue(params.id, "status") === "Delivered"
                    ? "greenColor"
                    : "redColor";
            },
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 150,
            flex: 0.4,
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
                    <Fragment>
                        <Link
                            to={`/admin/order/${params.getValue(
                                params.id,
                                "id"
                            )}`}
                        >
                            <EditIcon />
                        </Link>

                        <Button
                            onClick={() =>
                                deleteOrderHandler(
                                    params.getValue(params.id, "id")
                                )
                            }
                        >
                            <DeleteIcon />
                        </Button>
                    </Fragment>
                );
            },
        },
    ];

    const rows = [];

    orders &&
        orders.forEach((item) => {
            rows.push({
                id: item._id,
                itemsQty: item.orderitems.length,
                amount: item.totalprice,
                status: item.orderstatus,
            });
        });

    return (
        <Fragment>
            <MetaData title={`ALL ORDERS - Admin`} />

            <div className="dashboard">
                <SideBar />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL ORDERS</h1>

                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="productListTable"
                        autoHeight
                    />
                </div>
            </div>
        </Fragment>
    );
};

export default OrderList;
