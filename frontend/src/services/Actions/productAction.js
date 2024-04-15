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
    ADMIN_PRODUCT_FAIL,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
} from "../Constants/productActionTypes.js";

export const getProduct = async (
    dispatch,
    keyword = "",
    currentPage = 1,
    price = [0, 4000],
    category = "",
    ratings = 0
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

export const getAllAdminProducts = async (dispatch) => {
    try {
        dispatch({
            type: ADMIN_PRODUCT_REQUEST,
        });
        const { data } = await axios.get("/api/v1/admin/products");
        dispatch({ type: ADMIN_PRODUCT_SUCCESS, payload: data.products });
    } catch (error) {
        dispatch({
            type: ADMIN_PRODUCT_FAIL,
            payload: error.response.data.error.message,
        });
    }
};

export const newProduct = async (dispatch, productInfo) => {
    try {
        dispatch({ type: NEW_PRODUCT_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" },
        };

        const { data } = await axios.post(
            `/api/v1/admin/product/new`,
            productInfo,
            config
        );

        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.error.message,
        });
    }
};

// /admin/product/:id
export const deleteProduct = async (dispatch, id) => {
    try {
        dispatch({
            type: DELETE_PRODUCT_REQUEST,
        });
        const { data } = await axios.delete(`/api/v1/admin/product/${id}`);
        dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response.data.error.message,
        });
    }
};

export const updateProduct = async (dispatch, id, productData) => {
    try {
        dispatch({ type: UPDATE_PRODUCT_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" },
        };

        const { data } = await axios.put(
            `/api/v1/admin/product/${id}`,
            productData,
            config
        );

        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response.data.error.message,
        });
    }
};

// Get All Reviews of a Product
export const getAllReviews = async (dispatch, id) => {
    try {
        dispatch({ type: ALL_REVIEW_REQUEST });

        const { data } = await axios.get(`/api/v1/reviews?id=${id}`);

        dispatch({
            type: ALL_REVIEW_SUCCESS,
            payload: data.reviews,
        });
    } catch (error) {
        dispatch({
            type: ALL_REVIEW_FAIL,
            payload: error.response.data.error.message,
        });
    }
};

// Delete Review of a Product
export const deleteReviews = async (dispatch, reviewId, productId) => {
    try {
        dispatch({ type: DELETE_REVIEW_REQUEST });

        const { data } = await axios.delete(
            `/api/v1/reviews?id=${reviewId}&productId=${productId}`
        );

        dispatch({
            type: DELETE_REVIEW_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: DELETE_REVIEW_FAIL,
            payload: error.response.data.error.message,
        });
    }
};

export const clearErrors = async (dispatch) => {
    dispatch(ErrorReset());
};
