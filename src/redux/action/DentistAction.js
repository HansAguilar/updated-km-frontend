import axios from "axios";
import { DENTIST_LINK } from '../../ApiLinks';

import { CREATE_DENTIST_SUCCESS, FETCH_DENTIST_FAILED, FETCH_DENTIST_REQUEST, FETCH_DENTIST_SUCCESS } from "../ActionTypes";
import { toastHandler } from "../../ToastHandler";
export const fetchDentist = () =>{
    return async dispatch => {
        try {
            dispatch({ type:FETCH_DENTIST_REQUEST });
            const response = await axios.get(`${DENTIST_LINK}/`);
            dispatch({ type:FETCH_DENTIST_SUCCESS, payload:response.data });
        } catch (error) {
            dispatch({ type:FETCH_DENTIST_FAILED, error:error });
        }
    }
}

export const createDentist = (data) =>{
    return async dispatch => {
        try {
            const response = await axios.post(`${DENTIST_LINK}/register`,data);
            dispatch({ type:CREATE_DENTIST_SUCCESS, payload:response.data });
            toastHandler("success", "Successfully registered new dentist");
        } catch (error) {
        }
    }
}