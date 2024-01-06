import MetaData from "../layouts/Header/MetaData";
import "./Profile.css";
import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "../layouts/Loader/Loader";
import { useNavigate, Link } from "react-router-dom";
const Profile = () => {
    const { user, loading, isAuthenticated } = useSelector(
        (state) => state.userR
    );
    console.log(user["name"]);
    const navigate = useNavigate();
    useEffect(() => {
        if (isAuthenticated === false) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);
    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={`${user?.user.name}'s Profile`} />
                    <div className="profileContainer">
                        <div>
                            <h1>My Profile</h1>
                            <img
                                src={user?.user.avtar.url}
                                alt={user?.user.name}
                            />
                            <Link to="/profile/update">Edit Profile</Link>
                        </div>
                        <div>
                            <div>
                                <h4>Full Name</h4>
                                <p>{user?.user.name}</p>
                            </div>
                            <div>
                                <h4>Email</h4>
                                <p>{user?.user.email}</p>
                            </div>

                            <div>
                                <Link to="/orders/me">My Orders</Link>
                                <Link to="/password/update">
                                    Change Password
                                </Link>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Profile;
