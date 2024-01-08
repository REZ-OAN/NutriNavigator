import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
    productsReducer,
    productDetailsReducer,
    newReviewReducer,
    newProductReducer,
    productUpdateReducer,
    allReviewsReducer,
    reviewReducer,
} from "./services/Reducers/productReducer.js";
import {
    userReducer,
    userDetailsReducer,
    userUDReducer,
    allUsersReducer,
} from "./services/Reducers/userReducer.js";
import { profileReducer } from "./services/Reducers/profileReducer.js";
import forgotPasswordReducer from "./services/Reducers/forgotPasswordReducer.js";
import resetPasswordReducer from "./services/Reducers/resetPasswordReducer.js";
import { cartReducer } from "./services/Reducers/cartReducer.js";
import {
    allOrdersReducer,
    myOrdersReducer,
    newOrderReducer,
    orderDetailsReducer,
    orderReducer,
} from "./services/Reducers/orderReducer.js";

const reducer = combineReducers({
    productsR: productsReducer,
    productR: productDetailsReducer,
    newProductR: newProductReducer,
    productDUR: productUpdateReducer,
    userR: userReducer,
    profileR: profileReducer,
    forgotPasswordR: forgotPasswordReducer,
    resetPasswordR: resetPasswordReducer,
    cartR: cartReducer,
    newOrderR: newOrderReducer,
    myOrderR: myOrdersReducer,
    ordersAR: allOrdersReducer,
    userDUR: userUDReducer,
    userDeR: userDetailsReducer,
    usersAR: allUsersReducer,
    orderDUR: orderReducer,
    orderDetailsR: orderDetailsReducer,
    newReviewR: newReviewReducer,
    reviews: allReviewsReducer,
    reviewDel: reviewReducer,
});

let initialState = {
    cartR: {
        cartItems: localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems"))
            : [],
        shippingInfo: localStorage.getItem("shippingInfo")
            ? JSON.parse(localStorage.getItem("shippingInfo"))
            : {},
    },
};
const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
