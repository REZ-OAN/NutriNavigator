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
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS,
    };
};
