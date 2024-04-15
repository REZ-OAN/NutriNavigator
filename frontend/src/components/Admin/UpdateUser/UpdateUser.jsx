import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { toastifyOptions } from "../../../utils/toastify.js";
import { Button } from "@material-ui/core";
import MetaData from "../../layouts/Header/MetaData.jsx";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonIcon from "@material-ui/icons/Person";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import SideBar from "../Sidebar/Sidebar.jsx";
import { UPDATE_USER_RESET } from "../../../services/Constants/userActionTypes.js";
import {
    getUserDetails,
    clearErrors,
    updateUser,
} from "../../../services/Actions/userAction.js";
import Loader from "../../layouts/Loader/Loader.jsx";
import { useNavigate, useParams } from "react-router-dom";
const UpdateUser = () => {
    const dispatch = useDispatch();
    const { id: userId } = useParams();
    const navigate = useNavigate();

    const { loading, error, user } = useSelector((state) => state.userDeR);

    const {
        loading: updateLoading,
        error: updateError,
        isUpdated,
    } = useSelector((state) => state.orderDUR);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    useEffect(() => {
        if (user && user._id !== userId) {
            getUserDetails(dispatch, userId);
        } else {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }
        if (error) {
            toast.error(error, { ...toastifyOptions });
            clearErrors(dispatch);
        }

        if (updateError) {
            toast.error(updateError, { ...toastifyOptions });
            clearErrors(dispatch);
        }

        if (isUpdated) {
            toast.success("User Updated Successfully", { ...toastifyOptions });
            navigate("/admin/users");
            dispatch({ type: UPDATE_USER_RESET });
        }
    }, [dispatch, error, navigate, isUpdated, updateError, user, userId]);

    const updateUserSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("role", role);

        updateUser(dispatch, userId, myForm);
    };

    return (
        <Fragment>
            <MetaData title="Update User" />
            <div className="dashboard">
                <SideBar />
                <div className="newProductContainer">
                    {loading ? (
                        <Loader />
                    ) : (
                        <form
                            className="createProductForm"
                            onSubmit={updateUserSubmitHandler}
                        >
                            <h1>Update User</h1>

                            <div>
                                <PersonIcon />
                                <input
                                    type="text"
                                    placeholder="Name"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div>
                                <MailOutlineIcon />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <VerifiedUserIcon />
                                <select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <option value="">Choose Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                            </div>

                            <Button
                                id="createProductBtn"
                                type="submit"
                                disabled={
                                    updateLoading
                                        ? true
                                        : false || role === ""
                                        ? true
                                        : false
                                }
                            >
                                Update
                            </Button>
                        </form>
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default UpdateUser;
