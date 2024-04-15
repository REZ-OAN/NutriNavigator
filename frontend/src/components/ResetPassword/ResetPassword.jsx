import React, { Fragment, useState, useEffect } from "react";
import "./ResetPassword.css";
import Loader from "../layouts/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../services/Actions/userAction";
import { toastifyOptions } from "../../utils/toastify";
import { toast } from "react-toastify";
import MetaData from "../layouts/Header/MetaData";
import { useNavigate, useParams } from "react-router-dom";
import { MdLockOpen, MdLock } from "react-icons/md/index.esm";

const ResetPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useParams();
    const { error, success, loading } = useSelector(
        (state) => state.resetPasswordR
    );

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const resetPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);

        resetPassword(dispatch, token, myForm);
    };

    useEffect(() => {
        if (error) {
            toast.error(error, { ...toastifyOptions });
            clearErrors(dispatch);
        }

        if (success) {
            toast.success("Password Updated Successfully", {
                ...toastifyOptions,
            });

            navigate("/login");
        }
    }, [dispatch, error, navigate, success]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="Change Password" />
                    <div className="resetPasswordContainer">
                        <div className="resetPasswordBox">
                            <h2 className="resetPasswordHeading">
                                Reset Password
                            </h2>

                            <form
                                className="resetPasswordForm"
                                onSubmit={resetPasswordSubmit}
                            >
                                <div>
                                    <MdLockOpen />
                                    <input
                                        type="password"
                                        placeholder="New Password"
                                        required
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="loginPassword">
                                    <MdLock />
                                    <input
                                        type="password"
                                        placeholder="Confirm Password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) =>
                                            setConfirmPassword(e.target.value)
                                        }
                                    />
                                </div>
                                <input
                                    type="submit"
                                    value="Update"
                                    className="resetPasswordBtn"
                                />
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default ResetPassword;
