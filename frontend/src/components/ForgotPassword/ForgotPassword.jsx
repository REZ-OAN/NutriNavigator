import React, { Fragment, useState, useEffect } from "react";
import "./ForgotPassword.css";
import Loader from "../layouts/Loader/Loader";
import { MdMailOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../services/Actions/userAction";
import { toastifyOptions } from "../../utils/toastify";
import { toast } from "react-toastify";
import MetaData from "../layouts/Header/MetaData";

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const { error, message, loading } = useSelector(
        (state) => state.forgotPasswordR
    );

    const [email, setEmail] = useState("");

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("email", email);
        forgotPassword(dispatch, myForm);
    };

    useEffect(() => {
        if (error) {
            toast.error(error, { ...toastifyOptions });
            clearErrors(dispatch);
        }

        if (message) {
            toast.success(message, { ...toastifyOptions });
        }
    }, [dispatch, error, alert, message]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="Forgot Password" />
                    <div className="forgotPasswordContainer">
                        <div className="forgotPasswordBox">
                            <h2 className="forgotPasswordHeading">
                                Forgot Password
                            </h2>

                            <form
                                className="forgotPasswordForm"
                                onSubmit={forgotPasswordSubmit}
                            >
                                <div className="forgotPasswordEmail">
                                    <MdMailOutline />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        name="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>

                                <input
                                    type="submit"
                                    value="Send"
                                    className="forgotPasswordBtn"
                                />
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default ForgotPassword;
