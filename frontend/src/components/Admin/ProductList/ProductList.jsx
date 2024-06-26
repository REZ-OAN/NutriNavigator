import "./ProductList.css";
import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import {
    clearErrors,
    getAllAdminProducts,
    deleteProduct,
} from "../../../services/Actions/productAction.js";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { toastifyOptions } from "../../../utils/toastify.js";
import { Button } from "@material-ui/core";
import MetaData from "../../layouts/Header/MetaData.jsx";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from "../Sidebar/Sidebar.jsx";
import { useNavigate } from "react-router-dom";
import { DELETE_PRODUCT_RESET } from "../../../services/Constants/productActionTypes.js";
const ProductList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, products } = useSelector((state) => state.productsR);

    const { error: deleteError, isDeleted } = useSelector(
        (state) => state.productDUR
    );

    const deleteProductHandler = (id) => {
        deleteProduct(dispatch, id);
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
            toast.success("Product Deleted Successfully", {
                ...toastifyOptions,
            });
            navigate("/admin/products");
            dispatch({ type: DELETE_PRODUCT_RESET });
        }

        getAllAdminProducts(dispatch);
    }, [dispatch, error, navigate, isDeleted, deleteError]);

    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

        {
            field: "name",
            headerName: "Name",
            minWidth: 350,
            flex: 1,
        },
        {
            field: "stock",
            headerName: "Stock",
            type: "number",
            minWidth: 150,
            flex: 0.3,
        },

        {
            field: "price",
            headerName: "Price",
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
                            to={`/admin/product/${params.getValue(
                                params.id,
                                "id"
                            )}`}
                        >
                            <EditIcon />
                        </Link>

                        <Button
                            onClick={() =>
                                deleteProductHandler(
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

    products &&
        products.forEach((item) => {
            rows.push({
                id: item._id,
                stock: item.stock,
                price: item.price,
                name: item.name,
            });
        });

    return (
        <Fragment>
            <MetaData title={`ALL PRODUCTS - Admin`} />

            <div className="dashboard">
                <Sidebar />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL PRODUCTS</h1>

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

export default ProductList;
