import axios from "axios";
import { FETCH_ADMIN_FAILED, FETCH_ADMIN_REQUEST, FETCH_ADMIN_SUCCESS, FETCH_LOGIN_ADMIN_FAILED, FETCH_LOGIN_ADMIN_SUCCESS } from "../ActionTypes"
import { ADMIN_LINK } from "../../ApiLinks";

export const fetchAdmin = () => {
    return async dispatch =>{
        try {
            dispatch({ type:FETCH_ADMIN_REQUEST });
            const response = await axios.get(`${ADMIN_LINK}/`);
            dispatch({ type:FETCH_ADMIN_SUCCESS, payload:response.data })
        } catch (error) {
            dispatch({ type:FETCH_ADMIN_FAILED, error:error });
        }
    }
}

export const fetchLoginAdmin = (token) =>{
    return async dispatch=>{
        try {
            const response = await axios.get(`${ADMIN_LINK}/getAdmin/${token}`);
            dispatch({ type:FETCH_LOGIN_ADMIN_SUCCESS, payload:response.data });
        } catch (error) {
            dispatch({ type:FETCH_LOGIN_ADMIN_FAILED, error:error });
        }
    }
}