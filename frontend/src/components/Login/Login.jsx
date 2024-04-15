import React, { Fragment, useEffect, useRef, useState } from "react";
import "./login.css";
import Loader from "../layouts/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastifyOptions } from "../../utils/toastify.js";
import { Link } from "react-router-dom";
import { MdMailOutline, MdLockOpen, MdFace } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
    login,
    clearErrors,
    registration,
} from "../../services/Actions/userAction.js";
import MetaData from "../layouts/Header/MetaData.jsx";
const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, isAuthenticated, error } = useSelector(
        (state) => state.userR
    );
    const popError = () => {
        toast.error(error, {
            ...toastifyOptions,
        });
    };
    const popSuccess = (what) => {
        toast.success(`${what} Successfull`, { ...toastifyOptions });
    };
    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const { name, email, password } = user;

    const [avatar, setAvatar] = useState("/Profile.png");
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const loginSubmit = (e) => {
        e.preventDefault();
        if (loginPassword.length < 8 || loginPassword.length > 38) {
            toast.error("Password Must Be Between 8 to 38 length", {
                ...toastifyOptions,
            });
        } else {
            login(dispatch, loginEmail, loginPassword);
        }
    };
    const registerSubmit = (e) => {
        e.preventDefault();
        if (password.length < 8 || password.length > 38) {
            toast.error("Password Must Be Between 8 to 38 length", {
                ...toastifyOptions,
            });
        } else {
            const myForm = new FormData();
            myForm.set("name", name);
            myForm.set("email", email);
            myForm.set("password", password);
            myForm.set("avatar", avatar);
            registration(dispatch, myForm);
        }
    };
    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };
    const switchTabs = (e, tab) => {
        if (tab === "login") {
            setUser({ username: "", email: "", password: "" });
            setLoginEmail("");
            setLoginPassword("");
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if (tab === "signup") {
            setUser({ name: "", email: "", password: "" });
            setAvatar("/Profile.png");
            setAvatarPreview("/Profile.png");
            setLoginEmail("");
            setLoginPassword("");
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    };

    const queryString = window.location.search
        ? window.location.search.split("=")[1]
        : "profile";
    console.log(window.location.search.split("=")[1]);
    useEffect(() => {
        if (error) {
            popError();
            clearErrors(dispatch);
        }
        if (isAuthenticated) {
            popSuccess("Authenticated User Access");
            navigate(`/${queryString}`);
        }
    }, [error, dispatch, isAuthenticated, queryString, navigate]);
    return (
        <Fragment>
            <MetaData title={"Sign In - Nutrinavigator"} />
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <div className="LoginSignUpContainer">
                        <div className="LoginSignUpBox">
                            <div>
                                <div className="login_signUp_toggle">
                                    <p onClick={(e) => switchTabs(e, "login")}>
                                        SIGN IN
                                    </p>
                                    <p onClick={(e) => switchTabs(e, "signup")}>
                                        SIGN UP
                                    </p>
                                </div>
                                <button ref={switcherTab}></button>
                            </div>
                            <form
                                className="loginForm"
                                ref={loginTab}
                                onSubmit={loginSubmit}
                            >
                                <div className="loginEmail">
                                    <MdMailOutline />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        value={loginEmail}
                                        onChange={(e) => {
                                            e.preventDefault();
                                            setLoginEmail(e.target.value);
                                        }}
                                    />
                                </div>
                                <div className="loginEmail">
                                    <MdLockOpen />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        required
                                        value={loginPassword}
                                        onChange={(e) => {
                                            e.preventDefault();
                                            setLoginPassword(e.target.value);
                                        }}
                                    />
                                </div>
                                <Link to="/password/forgot">
                                    Forgot Password ?
                                </Link>
                                <input
                                    type="submit"
                                    value="SIGN IN"
                                    className="loginBtn"
                                />
                            </form>
                            <form
                                className="signUpForm"
                                ref={registerTab}
                                encType="multipart/form-data"
                                onSubmit={registerSubmit}
                            >
                                <div className="signUpName">
                                    <MdFace />
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        required
                                        name="name"
                                        value={name}
                                        onChange={registerDataChange}
                                    />
                                </div>
                                <div className="signUpEmail">
                                    <MdMailOutline />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        name="email"
                                        value={email}
                                        onChange={registerDataChange}
                                    />
                                </div>
                                <div className="signUpPassword">
                                    <MdLockOpen />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        required
                                        name="password"
                                        value={password}
                                        onChange={registerDataChange}
                                    />
                                </div>

                                <div id="registerImage">
                                    <img
                                        src={avatarPreview}
                                        alt="Avatar Preview"
                                    />
                                    <input
                                        type="file"
                                        name="avatar"
                                        accept="image/*"
                                        onChange={registerDataChange}
                                    />
                                </div>
                                <input
                                    type="submit"
                                    value="Register"
                                    className="signUpBtn"
                                />
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Login;
