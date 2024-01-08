import {
    login_fail,
    login_request,
    login_success,
    registration_fail,
    registration_request,
    registration_success,
    clearErrors as ErrorReset,
    load_fail,
    load_request,
    load_success,
    logout_success,
    logout_fail,
    forgot_password_request,
    forgot_password_success,
    forgot_password_fail,
    reset_password_request,
    reset_password_success,
    reset_password_fail,
} from "../Dispatchers/userDispatcher";
import {
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
} from "../Constants/userActionTypes.js";
import axios from "axios";

export const login = async (dispatch, email, password) => {
    try {
        dispatch(login_request());
        const config = { header: { "Content-Type": "application/json" } };
        const { data } = await axios.post(
            `/api/v1/login`,
            { email, password },
            config
        );
        dispatch(login_success(data));
    } catch (error) {
        dispatch(login_fail(error));
    }
};
export const registration = async (dispatch, user) => {
    try {
        dispatch(registration_request());
        const config = { header: { "Content-Type": "application/json" } };
        const { data } = await axios.post(`/api/v1/register`, user, config);
        dispatch(registration_success(data));
    } catch (error) {
        dispatch(registration_fail(error));
    }
};
export const loadUser = async (dispatch) => {
    try {
        dispatch(load_request());
        const { data } = await axios.get(`/api/v1/profile`);
        dispatch(load_success(data));
    } catch (error) {
        dispatch(load_fail(error));
    }
};
export const logoutUser = async (dispatch) => {
    try {
        await axios.get(`/api/v1/logout`);
        dispatch(logout_success());
    } catch (error) {
        dispatch(logout_fail(error));
    }
};
export const forgotPassword = async (dispatch, email) => {
    try {
        dispatch(forgot_password_request());
        const config = { Headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post(
            "/api/v1/password/forgot",
            email,
            config
        );
        dispatch(forgot_password_success(data));
    } catch (error) {
        dispatch(forgot_password_fail(error));
    }
};
export const resetPassword = async (dispatch, token, passwords) => {
    try {
        dispatch(reset_password_request());

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.put(
            `/api/v1/password/reset/${token}`,
            passwords,
            config
        );

        dispatch(reset_password_success(data.success));
    } catch (error) {
        dispatch(reset_password_fail(error));
    }
};

// get All Users
export const getAllUsers = async (dispatch) => {
    try {
        dispatch({ type: ALL_USERS_REQUEST });
        const { data } = await axios.get(`/api/v1/admin/userprofiles`);

        dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
    } catch (error) {
        dispatch({
            type: ALL_USERS_FAIL,
            payload: error.response.data.error.message,
        });
    }
};

// get  User Details
export const getUserDetails = async (dispatch, id) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST });
        const { data } = await axios.get(`/api/v1/admin/userprofile/${id}`);

        dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response.data.error.message,
        });
    }
};

// Update User
export const updateUser = async (dispatch, id, userData) => {
    try {
        dispatch({ type: UPDATE_USER_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.put(
            `/api/v1/admin/userprofile/${id}`,
            userData,
            config
        );

        dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.error.message,
        });
    }
};

// Delete User
export const deleteUser = async (dispatch, id) => {
    try {
        dispatch({ type: DELETE_USER_REQUEST });

        const { data } = await axios.delete(`/api/v1/admin/userprofile/${id}`);

        dispatch({ type: DELETE_USER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response.data.error.message,
        });
    }
};

export const clearErrors = async (dispatch) => {
    dispatch(ErrorReset());
};
