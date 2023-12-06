import {
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_SUCCESS,
    CLEAR_ERRORS,
} from "../Constants/userActionTypes.js";
const resetPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case RESET_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload,
            };
        case RESET_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                message: null,
                error: null,
            };
        default:
            return state;
    }
};

export default resetPasswordReducer;
