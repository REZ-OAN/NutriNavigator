import React, { Fragment, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { toastifyOptions } from "../../utils/toastify.js";
import { toast } from "react-toastify";
import MetaData from "../layouts/Header/MetaData";
import {
    getProductDetails,
    clearErrors,
} from "../../services/Actions/productAction.js";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.jsx";
import Loader from "../layouts/Loader/Loader.jsx";
import { addItemsToCart } from "../../services/Actions/cartActions.js";
const ProductDetails = () => {
    const dispatch = useDispatch();
    const { loading, error, product } = useSelector((state) => state.productR);
    const [itemCount, setItemCount] = useState(1);
    const { id } = useParams();
    const popError = (error) => {
        toast.error(error, {
            ...toastifyOptions,
        });
    };
    const incCount = (e) => {
        e.preventDefault();
        setItemCount((prevState) =>
            prevState + 1 > product.stock ? prevState : prevState + 1
        );
    };
    const decCount = (e) => {
        e.preventDefault();
        setItemCount((prevState) =>
            prevState === 1 ? prevState : prevState - 1
        );
    };
    const addToCartHandler = (e) => {
        e.preventDefault();
        addItemsToCart(dispatch, id, itemCount);
        toast.success(`${product.name} added to cart`);
    };
    useEffect(() => {
        if (error) {
            popError();
            clearErrors(dispatch);
        }
        getProductDetails(dispatch, id);
    }, [dispatch, error, id]);
    const options = {
        edit: false,
        color: "rgb(201, 193, 193,.5)",
        activeColor: "#8EAC50",
        size: window.innerWidth < 600 ? 15 : 20,
        value: product.rating,
        isHalf: true,
    };
    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={`${product.name}-NutriNavigator`} />
                    <div className="ProductDetails">
                        <div>
                            <Carousel>
                                {product.images &&
                                    product.images.map((item, i) => {
                                        return (
                                            <img
                                                className="CarouselImage"
                                                key={item.url}
                                                src={item.url}
                                                alt={`${i} Slide`}
                                            />
                                        );
                                    })}
                            </Carousel>
                        </div>
                        <div>
                            <div className="detailsBlock-1">
                                <h2>{product.name}</h2>
                                <p>Product # {product._id}</p>
                            </div>
                            <div className="detailsBlock-2">
                                {product.rating && <ReactStars {...options} />}
                                <span> ({product.reviewscount} Reviews)</span>
                            </div>
                            <div className="detailsBlock-3">
                                <h1>{`৳‎${product.price}`}</h1>
                                <div className="detailsBlock-3-1">
                                    <div className="detailsBlock-3-1-1">
                                        <button onClick={decCount}>-</button>
                                        <input
                                            readOnly
                                            value={itemCount}
                                            type="number"
                                        />
                                        <button onClick={incCount}>+</button>
                                    </div>{" "}
                                    <button onClick={addToCartHandler}>
                                        Add To Cart
                                    </button>
                                </div>
                                <p>
                                    Status:{" "}
                                    <b
                                        className={
                                            product.stock < 1
                                                ? "redColor"
                                                : "greenColor"
                                        }
                                    >
                                        {product.stock < 1
                                            ? "OutOfStock"
                                            : `${product.stock} Available Now`}
                                    </b>
                                </p>
                            </div>
                            <div className="detailsBlock-4">
                                Description : <p>{product.description}</p>
                            </div>
                            <button className="submitReview">
                                Submit Review
                            </button>
                        </div>
                    </div>
                    <h3 className="reviewsHeading">REVIEWS</h3>
                    {product.reviews && product.reviews[0] ? (
                        <div className="reviews">
                            {product.reviews &&
                                product.reviews.map((review) => (
                                    <ReviewCard review={review} />
                                ))}
                        </div>
                    ) : (
                        <p className="noReviews">No Reviews Yet</p>
                    )}
                </Fragment>
            )}
        </Fragment>
    );
};

export default ProductDetails;
