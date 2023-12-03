import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    CLEAR_ERRORS,
} from "../Constants/productActionTypes.js";

export const getAllProductRequest = () => {
    return {
        type: ALL_PRODUCT_REQUEST,
    };
};

export const failedAllProductRequest = (error) => {
    return {
        type: ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
    };
};

export const succeededAlProductRequest = (data) => {
    return {
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
    };
};
export const getProductDetails = () => {
    return {
        type: PRODUCT_DETAILS_REQUEST,
    };
};
export const failedToGetProductDetails = (error) => {
    return {
        type: PRODUCT_DETAILS_FAIL,
        payload: error.response.data.error.message,
    };
};
export const succeedToGetProductDetails = (data) => {
    return {
        type: PRODUCT_DETAILS_SUCCESS,
        payload: data,
    };
};
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS,
    };
};
