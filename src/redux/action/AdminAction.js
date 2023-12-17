import axios from "axios";
import { ADMIN_CHANGE_STATUS_SUCCESS, CREATE_ADMIN_SUCCESS, DELETE_ADMIN_SUCCESS, FETCH_ADMIN_FAILED, FETCH_ADMIN_SUCCESS, FETCH_LOGIN_ADMIN_FAILED, FETCH_LOGIN_ADMIN_SUCCESS, LOGOUT_ADMIN_SUCCESS, UPDATE_ADMIN_LOGIN_REQUEST, UPDATE_ADMIN_LOGIN_SUCCESS, UPDATE_ADMIN_SUCCESS } from "../ActionTypes"
import { ADMIN_LINK } from "../../ApiLinks";
import { toastHandler } from "../../ToastHandler";
import { logoutMessage } from "./MessageAction";

export const fetchAdmin = () => {
    return async dispatch =>{
        try {
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
            localStorage.setItem("adminId", response.data.adminId);
        } catch (error) {
            dispatch({ type:FETCH_LOGIN_ADMIN_FAILED, error:error });
        }
    }
}

export const createAdmin = (data,setModal,setAdminInfo,setProfile) =>{
    return async dispatch=>{
        try {
            const response = await axios.post(`${ADMIN_LINK}/registration`,data);
            dispatch({ type:CREATE_ADMIN_SUCCESS, payload:response.data });
            toastHandler("success","Register new patient successfully!");
            setModal(false);
            setAdminInfo({
                firstname:"",
                middlename:"",
                lastname:"",
                birthday:"",
                address:"",
                gender:"",
                contactNumber:"",
                email:"",
                username:"",
                password:"",
                confirmPassword:"",
                haveInsurance: "no"
            });
            setProfile("")
        } catch (error) {
            toastHandler("error",error.response.data.message);
        }
    }
}

export const updateAdmin = (id,data,toastHandler,setModal) =>{
    return async dispatch=>{
        try {
            const response = await axios.put(`${ADMIN_LINK}/update/${id}`,data);
            dispatch({
                type: UPDATE_ADMIN_SUCCESS,
                payload: response.data
            });
            setModal(false);
        } catch (error) {
            toastHandler("error",error.response.data.message);
        }
    }
}

export const updateAdminLogin = (id,data) =>{
    return async dispatch=>{
        try {
            dispatch({type:UPDATE_ADMIN_LOGIN_REQUEST})
            const response = await axios.put(`${ADMIN_LINK}/update/${id}`,data);
            dispatch({
                type: UPDATE_ADMIN_LOGIN_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            toastHandler("error",error.response.data.message);
        }
    }
}

export const deleteAdmin = (id) =>{
    return async dispatch=>{
        try {
            await axios.delete(`${ADMIN_LINK}/${id}`);
            dispatch({ type:DELETE_ADMIN_SUCCESS, payload:id });
            toastHandler("success", "Deleted successfully");
        } catch (error) {
            toastHandler("error", error.response.data.message);
        }
    }
}

export const changeAdminStatus = (data) =>{
    return async dispatch=>{
        try {
            const response = await axios.post(`${ADMIN_LINK}/disable`,data);
            dispatch({
                type: ADMIN_CHANGE_STATUS_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            toastHandler("error",error.response.data.message);
        }
    }
}

export const logoutAdmin = () =>{
    return async dispatch=>{
        try {
            dispatch({ type: LOGOUT_ADMIN_SUCCESS,  });
            dispatch(logoutMessage())
        } catch (error) { }
    }
}