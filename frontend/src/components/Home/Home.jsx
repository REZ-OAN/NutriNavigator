import React, { Fragment, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BsMouse3Fill } from "react-icons/bs";
import "./Home.css";
import Product from "./ProductCard.jsx";
import MetaData from "../layouts/Header/MetaData";
import { clearErrors, getProduct } from "../../services/Actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layouts/Loader/Loader";
import { toast } from "react-toastify";
import { toastifyOptions } from "../../utils/toastify.js";
import { Button } from "@material-ui/core";
const Home = () => {
    const popError = (error) => {
        toast.error(error, {
            ...toastifyOptions,
        });
    };
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const scrollToContainer = () => {
        if (containerRef.current) {
            containerRef.current.scrollIntoView({
                behavior: "smooth",
            });
        }
    };
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector(
        (state) => state.productsR
    );
    const { isAuthenticated } = useSelector((state) => state.userR);
    useEffect(() => {
        if (error) {
            popError();
            clearErrors(dispatch);
        }
        getProduct(dispatch);
    }, [dispatch, error]);
    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="NutriNavigator" />
                    <div className="banner">
                        <a href="#containter" onClick={scrollToContainer}>
                            SCROLL <BsMouse3Fill />
                        </a>
                    </div>
                    <div className="dummy">
                        <h1>Welcome, Nutrition Enthusiast...</h1>
                        <p>
                            Take care of your body.
                            <br /> It's the only place you have to live
                        </p>
                        {isAuthenticated !== true && (
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate("/login");
                                }}
                            >
                                JOIN US
                            </button>
                        )}
                        <div className="dummy-bloops-1"></div>
                        <div className="dummy-bloops-2"></div>
                        <div className="dummy-bloops-3"></div>
                    </div>
                    <h2 className="homeHeading">Featured Products</h2>
                    <div className="container" ref={containerRef}>
                        {products &&
                            products.map((product) => (
                                <Product product={product} />
                            ))}
                    </div>
                    <div className="dummy">
                        <h2>
                            Nutri Navigator is your dedicated <br />
                            companion on the
                            <br />
                            journey to optimal well-being
                        </h2>
                        <Button
                            onClick={(e) => {
                                e.preventDefault();
                                navigate("/dietrecommend");
                            }}
                        >
                            Get Dietary
                        </Button>
                        <div className="dummy-bloops-1"></div>
                        <div className="dummy-bloops-2"></div>
                        <div className="dummy-bloops-3"></div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Home;
