import axios from "axios";
import {  CREATE_PATIENT_SUCCESS, DELETE_PATIENT_SUCCESS, DISABLE_PATIENT_SUCCESS, FETCH_PATIENT_REQUEST, FETCH_PATIENT_SUCCESS, UPDATE_PATIENT_SUCCESS } from "../ActionTypes";
import { PATIENT_LINK } from "../../ApiLinks";
import { toastHandler } from "../../ToastHandler";

export const fetchPatient = () =>{
    return async dispatch=>{
        try {
            // dispatch({ type: FETCH_PATIENT_REQUEST });
            const response = await axios.get(`${PATIENT_LINK}/fetch`);
            dispatch({type: FETCH_PATIENT_SUCCESS, payload:response.data});
        } catch (error) {
            console.log(error);
            dispatch({ type: error.response && error.response.data.message });
        }
    }
}

export const createPatient = (data,setModal,setAdminInfo,setProfile) =>{
    return async dispatch=>{
        try {
            const response = await axios.post(`${PATIENT_LINK}/registration`,data);
            dispatch({ type:CREATE_PATIENT_SUCCESS, payload:response.data });
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

export const updatePatient = (id,data,toastHandler,setModal) =>{
    return async dispatch=>{
        try {
            const response = await axios.put(`${PATIENT_LINK}/update/${id}`,data);
            dispatch({
                type: UPDATE_PATIENT_SUCCESS,
                payload: response.data
            });
            toastHandler("success", "Update patient record successfully!")
            setModal(false);
        } catch (error) {
            toastHandler("error",error.response.data.message);
        }
    }
}

export const disablePatient = (data) =>{
    return async dispatch =>{
        try {
            const response = await axios.post(`${PATIENT_LINK}/disable`,data);
            dispatch({ type: DISABLE_PATIENT_SUCCESS, payload:response.data });
        } catch (error) {
            toastHandler("error",error.response.data.message);
        }
    }
}

export const deletePatient = (id) =>{
    return async dispatch=>{
        try {
            await axios.delete(`${PATIENT_LINK}/${id}`);
            dispatch({ type:DELETE_PATIENT_SUCCESS, payload:id });
            toastHandler("success", "Deleted successfully");
        } catch (error) {
            toastHandler("error", error.response.data.message);
        }
    }
}