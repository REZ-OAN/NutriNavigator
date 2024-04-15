import React, { Fragment } from "react";
import "../header.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import {
    MdDashboard,
    MdPerson,
    MdExitToApp,
    MdListAlt,
    MdShoppingCart,
} from "react-icons/md";
import { Backdrop } from "@material-ui/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toastifyOptions } from "../../../../utils/toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../../services/Actions/userAction";

const UserOptions = ({ user }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cartR);
    const popSuccess = () => {
        toast.success(`Logout Successfull`, { ...toastifyOptions });
    };
    const { error } = useSelector((state) => state.userR);
    const [open, setOpen] = useState(false);
    const orders = () => {
        navigate("/orders/me");
    };
    const profile = () => {
        navigate("/profile");
    };
    const dashboard = () => {
        navigate("/admin/dashboard");
    };
    const cart = () => {
        navigate("/cart");
    };
    const logout = () => {
        logoutUser(dispatch);
        if (error) {
            toast.error(error, { ...toastifyOptions });
        } else {
            popSuccess();
        }
        navigate("/");
    };

    const options = [
        { icon: <MdListAlt />, name: "orders", func: orders },
        { icon: <MdPerson />, name: "profile", func: profile },
        { icon: <MdExitToApp />, name: "logout", func: logout },
        {
            icon: <MdShoppingCart />,
            name: `cart(${cartItems.length})`,
            func: cart,
        },
    ];
    if (user.role === "admin" || user.role === "master") {
        options.unshift({
            icon: <MdDashboard />,
            name: "dashboard",
            func: dashboard,
        });
    }

    return (
        <Fragment>
            <Backdrop style={{ zIndex: 11 }} open={open} />
            <SpeedDial
                className="speedDial"
                ariaLabel="SpeedDial tooltip example"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                style={{ zIndex: 12 }}
                open={open}
                direction="down"
                icon={
                    <img
                        className="speedDialIcon"
                        src={user.avtar.url ? user.avtar.url : "/Profile.png"}
                        alt="profile"
                    />
                }
            >
                {options.map((option) => (
                    <SpeedDialAction
                        key={option.name}
                        icon={option.icon}
                        tooltipTitle={option.name}
                        onClick={option.func}
                        tooltipOpen={window.innerWidth <= 600 ? true : false}
                    />
                ))}
            </SpeedDial>
        </Fragment>
    );
};

export default UserOptions;
