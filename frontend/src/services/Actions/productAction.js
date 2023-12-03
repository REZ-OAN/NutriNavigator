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
export const clearErrors = async (dispatch) => {
    dispatch(ErrorReset());
};
