import {
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_RESET,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_FAIL,
    UPDATE_USER_RESET,
    UPDATE_USER_SUCCESS,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_RESET,
    UPDATE_PASSWORD_SUCCESS,
    CLEAR_ERRORS,
} from "../Constants/userActionTypes.js";
export const updatePasswordRequest = () => {
    return {
        type: UPDATE_PASSWORD_REQUEST,
    };
};
export const updatePasswordFail = (error) => {
    return {
        type: UPDATE_PASSWORD_FAIL,
        payload: error.response.data.error.message,
    };
};
export const updatePasswordSuccess = (data) => {
    return {
        type: UPDATE_PASSWORD_SUCCESS,
        payload: data.success,
    };
};
export const updatePasswordReset = () => {
    return {
        type: UPDATE_PASSWORD_RESET,
    };
};

export const updateProfileRequest = () => {
    return {
        type: UPDATE_PROFILE_REQUEST,
    };
};
export const updateProfileSuccess = (data) => {
    return {
        type: UPDATE_PROFILE_SUCCESS,
        payload: data.success,
    };
};
export const updateProfileFail = (error) => {
    return {
        type: UPDATE_PROFILE_FAIL,
        payload: error.response.data.error.message,
    };
};
export const updateProfileReset = () => {
    return {
        type: UPDATE_PROFILE_RESET,
    };
};
export const updateUserReset = () => {
    return {
        type: UPDATE_USER_RESET,
    };
};
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS,
    };
};
