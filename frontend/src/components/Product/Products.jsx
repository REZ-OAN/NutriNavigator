import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../services/Actions/productAction";
import Loader from "../layouts/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toastifyOptions } from "../../utils/toastify.js";
import "./products.css";
import { styled } from "@material-ui/core/styles";
import Pagination from "react-js-pagination";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import MetaData from "../layouts/Header/MetaData.jsx";
const Products = () => {
    const params = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState([0, 4000]);
    const [ratings, setRatings] = useState(1);
    const popError = (error) => {
        toast.error(error, {
            ...toastifyOptions,
        });
    };
    const GreenSlider = styled(Slider)({
        color: "#BABD42", // Set the color to green
        "& .MuiSlider-thumb": {
            "&:hover, &.Mui-focusVisible": {
                boxShadow: "0px 0px 0px 8px rgba(0, 255, 0, 0.16)", // Change the thumb shadow on hover/focus
            },
        },
        "& .MuiSlider-track": {
            height: 4, // Set the track height
        },
        "& .MuiSlider-rail": {
            height: 4, // Set the rail height
        },
    });
    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    };
    const dispatch = useDispatch();
    const {
        loading,
        error,
        products,
        productsCount,
        resultPerPage,
        filteredProductsCount,
        categories,
    } = useSelector((state) => state.productsR);
    const keyword = params.keyword;
    const priceHandler = (event, newPrice) => {
        event.preventDefault();
        setPrice(newPrice);
    };
    useEffect(() => {
        if (error) {
            popError();
            clearErrors(dispatch);
        }
        getProduct(dispatch, keyword, currentPage, price, category, ratings);
    }, [dispatch, error, keyword, currentPage, price, category, ratings]);
    let count = filteredProductsCount;
    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={"products-NutriNavigator"} />
                    <h2 className="productsHeading">Products</h2>
                    <div className="products">
                        {products &&
                            products.map((product) => {
                                return (
                                    <ProductCard
                                        key={product._id}
                                        product={product}
                                    />
                                );
                            })}
                    </div>
                    <div className="filterBox">
                        <Typography>Price</Typography>
                        <br />
                        <GreenSlider
                            value={price}
                            onChange={priceHandler}
                            valueLabelDisplay="auto"
                            aria-labelledby="continuous-slider"
                            step={50}
                            min={0}
                            max={4000}
                        />
                        <br />
                        <Typography>Categories</Typography>
                        <br />
                        <ul className="categoryBox">
                            {categories &&
                                categories.map((category) => (
                                    <li
                                        className="category-link"
                                        key={category}
                                        onClick={() => setCategory(category)}
                                    >
                                        {category}
                                    </li>
                                ))}
                        </ul>
                        <br />
                        <Typography component="legend">
                            Ratings Above
                        </Typography>
                        <GreenSlider
                            value={ratings}
                            onChange={(e, newRating) => {
                                e.preventDefault();
                                setRatings(newRating);
                            }}
                            aria-labelledby="continuous-slider"
                            valueLabelDisplay="auto"
                            step={0.5}
                            min={0}
                            max={5}
                        />
                    </div>
                    {resultPerPage <
                        (price[1] - price[0] === 4000 &&
                        ratings[1] - ratings[0] === 5 &&
                        category === ""
                            ? productsCount
                            : count) && (
                        <div className="paginationBox">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resultPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText="Next"
                                prevPageText="Prev"
                                firstPageText="First"
                                lastPageText="Last"
                                itemClass="page-item"
                                linkClass="page-link"
                                activeClass="pageItemActive"
                                activeLinkClass="pageLinkActive"
                            />
                        </div>
                    )}
                </Fragment>
            )}
        </Fragment>
    );
};

export default Products;
