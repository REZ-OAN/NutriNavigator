import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    CLEAR_ERRORS,
    REGISTER_USER_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOGOUT_FAIL,
    LOGOUT_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
} from "../Constants/userActionTypes";
export const login_fail = (error) => {
    return {
        type: LOGIN_FAIL,
        payload: error.response.data.error.message,
    };
};
export const login_request = () => {
    return {
        type: LOGIN_REQUEST,
    };
};
export const login_success = (data) => {
    return {
        type: LOGIN_SUCCESS,
        payload: data,
    };
};
export const registration_fail = (error) => {
    return {
        type: REGISTER_USER_FAIL,
        payload: error.response.data.error.message,
    };
};
export const registration_request = () => {
    return {
        type: REGISTER_USER_REQUEST,
    };
};
export const registration_success = (data) => {
    return {
        type: REGISTER_USER_SUCCESS,
        payload: data,
    };
};
export const load_fail = (error) => {
    return {
        type: LOAD_USER_FAIL,
        payload: error.response.data.error.message,
    };
};
export const load_request = () => {
    return {
        type: LOAD_USER_REQUEST,
    };
};
export const load_success = (data) => {
    return {
        type: LOAD_USER_SUCCESS,
        payload: data,
    };
};
export const logout_success = () => {
    return {
        type: LOGOUT_SUCCESS,
    };
};
export const logout_fail = (error) => {
    return {
        type: LOGOUT_FAIL,
        payload: error.response.data.error.message,
    };
};
export const forgot_password_fail = (error) => {
    return {
        type: FORGOT_PASSWORD_FAIL,
        payload: error.response.data.error.message,
    };
};
export const forgot_password_success = (data) => {
    return {
        type: FORGOT_PASSWORD_SUCCESS,
        payload: data.message,
    };
};
export const forgot_password_request = () => {
    return {
        type: FORGOT_PASSWORD_REQUEST,
    };
};
export const reset_password_fail = (error) => {
    return {
        type: RESET_PASSWORD_FAIL,
        payload: error.response.data.error.message,
    };
};
export const reset_password_success = (data) => {
    return {
        type: RESET_PASSWORD_SUCCESS,
        payload: data,
    };
};
export const reset_password_request = () => {
    return {
        type: RESET_PASSWORD_REQUEST,
    };
};
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS,
    };
};
