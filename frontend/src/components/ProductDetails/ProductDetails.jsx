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
    newReview,
} from "../../services/Actions/productAction.js";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ReviewCard from "./ReviewCard.jsx";
import Loader from "../layouts/Loader/Loader.jsx";
import { addItemsToCart } from "../../services/Actions/cartActions.js";
import { Rating } from "@material-ui/lab";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
} from "@material-ui/core";
const ProductDetails = () => {
    const dispatch = useDispatch();
    const { loading, error, product } = useSelector((state) => state.productR);
    const { success, error: reviewError } = useSelector(
        (state) => state.newReviewR
    );
    const [itemCount, setItemCount] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
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
        toast.success(`${product.name} added to cart`, { ...toastifyOptions });
    };
    const submitReviewToggle = () => {
        setComment("");
        setRating(0);
        open ? setOpen(false) : setOpen(true);
    };

    const reviewSubmitHandler = () => {
        const myForm = new FormData();

        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", id);

        newReview(dispatch, myForm);

        setOpen(false);
    };
    useEffect(() => {
        if (error || reviewError) {
            popError(error || reviewError);
            clearErrors(dispatch);
        }
        if (success) {
            toast.success("Review Submit Successfull", { ...toastifyOptions });
        }
        getProductDetails(dispatch, id);
    }, [dispatch, error, id, reviewError, success]);
    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={`${product.name}-NutriNavigator`} />
                    <div className="ProductDetails">
                        <div>
                            <Carousel className="carousel">
                                {product.images &&
                                    product.images.map((item, i) => (
                                        <img
                                            className="CarouselImage"
                                            key={i}
                                            src={item.url}
                                            alt={`${i} Slide`}
                                        />
                                    ))}
                            </Carousel>
                        </div>

                        <div>
                            <div className="detailsBlock-1">
                                <h2>{product.name}</h2>
                                <p>Product # {product._id}</p>
                            </div>
                            <div className="detailsBlock-2">
                                {product.rating && (
                                    <Rating
                                        name="read-only"
                                        value={product.rating}
                                        precision={0.5}
                                        readOnly
                                    />
                                )}
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
                                    <button
                                        onClick={addToCartHandler}
                                        disabled={product.stock < 1}
                                    >
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
                            <button
                                className="submitReview"
                                onClick={submitReviewToggle}
                            >
                                Submit Review
                            </button>
                        </div>
                    </div>
                    <h3 className="reviewsHeading">REVIEWS</h3>
                    <Dialog
                        aria-labelledby="simple-dialog-title"
                        open={open}
                        onClose={submitReviewToggle}
                    >
                        <DialogTitle>Submit Review</DialogTitle>
                        <DialogContent className="submitDialog">
                            <Rating
                                onChange={(e) => setRating(e.target.value)}
                                value={Number(rating)}
                                size="large"
                                precision={0.5}
                            />

                            <textarea
                                className="submitDialogTextArea"
                                cols="30"
                                rows="5"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={submitReviewToggle}
                                color="secondary"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={reviewSubmitHandler}
                                color="primary"
                            >
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>

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
