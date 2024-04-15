import React, { Fragment, useState, useEffect } from "react";
import "./UpdateProfile.css";
import Loader from "../layouts/Loader/Loader.jsx";
import { MdMailOutline, MdFace } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../services/Actions/userAction.js";
import {
    clearErrors,
    updateProfile,
} from "../../services/Actions/profileAction.js";
import { toast } from "react-toastify";
import { updateProfileReset } from "../../services/Dispatchers/profileDispatcher.js";
import MetaData from "../layouts/Header/MetaData.jsx";
import { toastifyOptions } from "../../utils/toastify.js";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.userR);
    const { error, isUpdated, loading } = useSelector(
        (state) => state.profileR
    );

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

    const updateProfileSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        updateProfile(dispatch, myForm);
    };

    const updateProfileDataChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    };

    useEffect(() => {
        if (user.user) {
            setName(user.user.name);
            setEmail(user.user.email);
            setAvatarPreview(user.user.avtar.url);
        }

        if (error) {
            toast.error(error, { ...toastifyOptions });
            clearErrors(dispatch);
        }

        if (isUpdated) {
            toast.success("Profile Updated Successfully", {
                ...toastifyOptions,
            });
            loadUser(dispatch);
            navigate("/profile");
            dispatch(updateProfileReset());
        }
    }, [dispatch, error, user, navigate, isUpdated]);
    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="Update Profile" />
                    <div className="updateProfileContainer">
                        <div className="updateProfileBox">
                            <h2 className="updateProfileHeading">
                                Update Profile
                            </h2>

                            <form
                                className="updateProfileForm"
                                encType="multipart/form-data"
                                onSubmit={updateProfileSubmit}
                            >
                                <div className="updateProfileName">
                                    <MdFace />
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        required
                                        name="name"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="updateProfileEmail">
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

                                <div id="updateProfileImage">
                                    <img
                                        src={avatarPreview}
                                        alt="Avatar Preview"
                                    />
                                    <input
                                        type="file"
                                        name="avatar"
                                        accept="image/*"
                                        onChange={updateProfileDataChange}
                                    />
                                </div>
                                <input
                                    type="submit"
                                    value="Update"
                                    className="updateProfileBtn"
                                />
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default UpdateProfile;
