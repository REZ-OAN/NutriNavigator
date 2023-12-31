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
    getAllUsers,
    clearErrors,
    deleteUser,
} from "../../../services/Actions/userAction.js";
import { DELETE_USER_RESET } from "../../../services/Constants/userActionTypes.js";

const UsersList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, users } = useSelector((state) => state.usersAR);

    const {
        error: deleteError,
        isDeleted,
        message,
    } = useSelector((state) => state.userDUR);

    const deleteUserHandler = (id) => {
        deleteUser(dispatch, id);
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
            toast.success(message, { ...toastifyOptions });
            navigate("/admin/users");
            dispatch({ type: DELETE_USER_RESET });
        }

        getAllUsers(dispatch);
    }, [dispatch, error, deleteError, navigate, isDeleted, message]);

    const columns = [
        { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

        {
            field: "email",
            headerName: "Email",
            minWidth: 200,
            flex: 1,
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 150,
            flex: 0.5,
        },

        {
            field: "role",
            headerName: "Role",
            type: "number",
            minWidth: 150,
            flex: 0.3,
            cellClassName: (params) => {
                return params.getValue(params.id, "role") === "admin"
                    ? "greenColor"
                    : "redColor";
            },
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
                            to={`/admin/user/${params.getValue(
                                params.id,
                                "id"
                            )}`}
                        >
                            <EditIcon />
                        </Link>

                        <Button
                            onClick={() =>
                                deleteUserHandler(
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

    users &&
        users.forEach((item) => {
            rows.push({
                id: item._id,
                role: item.role,
                email: item.email,
                name: item.name,
            });
        });

    return (
        <Fragment>
            <MetaData title={`ALL USERS - Admin`} />

            <div className="dashboard">
                <SideBar />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL USERS</h1>

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

export default UsersList;
