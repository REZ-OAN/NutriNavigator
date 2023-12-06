import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
    productReducer,
    productDetailsReducer,
} from "./services/Reducers/productReducer.js";
import { userReducer } from "./services/Reducers/userReducer.js";
import { profileReducer } from "./services/Reducers/profileReducer.js";
import forgotPasswordReducer from "./services/Reducers/forgotPasswordReducer.js";
import resetPasswordReducer from "./services/Reducers/resetPasswordReducer.js";

const reducer = combineReducers({
    productsR: productReducer,
    productR: productDetailsReducer,
    userR: userReducer,
    profileR: profileReducer,
    forgotPasswordR: forgotPasswordReducer,
    resetPasswordR: resetPasswordReducer,
});

let initialState = {};
const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
