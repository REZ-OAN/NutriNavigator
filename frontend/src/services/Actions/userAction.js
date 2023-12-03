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
} from "../Dispatchers/userDispatcher";
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
export const clearErrors = async (dispatch) => {
    dispatch(ErrorReset());
};
