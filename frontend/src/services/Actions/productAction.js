import axios from "axios";
import {
    failedAllProductRequest,
    getAllProductRequest,
    succeededAlProductRequest,
    getProductDetails as getProductDetailsRequest,
    failedToGetProductDetails,
    succeedToGetProductDetails,
    clearErrors as ErrorReset,
} from "../Dispatchers/productDispatcher.js";
import {
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_SUCCESS,
} from "../Constants/productActionTypes.js";

export const getProduct = async (
    dispatch,
    keyword = "",
    currentPage = 1,
    price = [0, 4000],
    category = "",
    ratings = 1
) => {
    try {
        dispatch(getAllProductRequest());
        let isCategory =
            category === ""
                ? `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&rating[gte]=${ratings}`
                : `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&rating[gte]=${ratings}`;
        let link = isCategory;
        const { data } = await axios.get(link);
        dispatch(succeededAlProductRequest(data));
    } catch (error) {
        dispatch(failedAllProductRequest(error));
    }
};
export const getProductDetails = async (dispatch, id) => {
    try {
        dispatch(getProductDetailsRequest);
        const { data } = await axios.get(`/api/v1/product/${id}`);
        dispatch(succeedToGetProductDetails(data.product));
    } catch (error) {
        dispatch(failedToGetProductDetails(error));
    }
};
// NEW REVIEW
export const newReview = async (dispatch, reviewData) => {
    try {
        dispatch({ type: NEW_REVIEW_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" },
        };

        const { data } = await axios.put(`/api/v1/review`, reviewData, config);

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.error.message,
        });
    }
};

export const clearErrors = async (dispatch) => {
    dispatch(ErrorReset());
};
