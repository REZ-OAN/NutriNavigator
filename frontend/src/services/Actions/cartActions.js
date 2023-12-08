import axios from "axios";
import {
    add_to_cart,
    remove_cart_item,
    save_shipping_info,
} from "../Dispatchers/cartDispatcher.js";
import store from "../../store.js";
export const addItemsToCart = async (dispatch, id, quantity) => {
    const { data } = await axios.get(`/api/v1/product/${id}`);
    const payload = {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0],
        quantity,
        stock: data.product.stock,
    };
    dispatch(add_to_cart(payload));
    localStorage.setItem(
        `cartItems`,
        JSON.stringify(store.getState().cartR.cartItems)
    );
};

export const removeCartItem = async (dispatch, id) => {
    dispatch(remove_cart_item(id));
    localStorage.setItem(
        `cartItems`,
        JSON.stringify(store.getState().cartR.cartItems)
    );
};

export const saveShippingInfo = async (dispatch, data) => {
    dispatch(save_shipping_info(data));
    localStorage.setItem(`shippinginfo`, JSON.stringify(data));
};
