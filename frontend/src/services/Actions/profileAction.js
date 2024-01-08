import axios from "axios";
import {
    updateProfileFail,
    updateProfileRequest,
    updateProfileSuccess,
    clearErrors as CLEAR_ERRORS,
    updatePasswordFail,
    updatePasswordRequest,
    updatePasswordSuccess,
} from "../Dispatchers/profileDispatcher.js";

export const updateProfile = async (dispatch, userData) => {
    try {
        dispatch(updateProfileRequest());
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.put(
            "/api/v1/profile/update",
            userData,
            config
        );
        dispatch(updateProfileSuccess(data));
    } catch (error) {
        dispatch(updateProfileFail(error));
    }
};
export const updatePassword = async (dispatch, userData) => {
    try {
        dispatch(updatePasswordRequest());
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.put(
            "/api/v1/password/update",
            userData,
            config
        );
        dispatch(updatePasswordSuccess(data));
    } catch (error) {
        dispatch(updatePasswordFail(error));
    }
};
export const clearErrors = async (dispatch) => {
    dispatch(CLEAR_ERRORS());
};
