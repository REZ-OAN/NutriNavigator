import {
    CREATE_ORDER_FAIL,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CLEAR_ERRORS,
} from "../Constants/orderConstants.js";
import axios from "axios";
import store from "../../store.js";
// create order
export const createOrder = async (dispatch, order) => {
    try {
        dispatch({
            type: CREATE_ORDER_REQUEST,
        });
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.post("/api/v1/order/new", order, config);
        console.log(data);
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.error.message,
        });
    }
};

// Clearing Errors
export const clearErrors = async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
