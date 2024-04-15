import {
    ADD_TO_CART,
    ADD_TO_CART_FAIL,
    REMOVE_CART_ITEM,
    SAVE_SHIPPING_INFO,
} from "../Constants/cartConstants.js";

export const add_to_cart = (data) => {
    return {
        type: ADD_TO_CART,
        payload: { ...data },
    };
};
export const remove_cart_item = (id) => {
    return {
        type: REMOVE_CART_ITEM,
        payload: id,
    };
};

export const save_shipping_info = (data) => {
    return {
        type: SAVE_SHIPPING_INFO,
        payload: data,
    };
};

export const add_to_cart_fail = (error) => {
    return {
        type: ADD_TO_CART_FAIL,
        payload: error.response.data.error.message,
    };
};
