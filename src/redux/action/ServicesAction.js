import axios from "axios";
import { CREATE_SERVICES_SUCCESS, DELETE_SERVICES_SUCCESS, FETCH_SERVICES_FAILED, FETCH_SERVICES_REQUEST, FETCH_SERVICES_SUCCESS, UPDATE_SERVICES_SUCCESS } from "../ActionTypes";
import { SERVICES_LINK } from "../../ApiLinks";
import { toastHandler } from "../../ToastHandler";

export const fetchServices = () =>{
    return async dispatch=>{
        try {
            dispatch({ type:FETCH_SERVICES_REQUEST });
            const response = await axios.get(`${SERVICES_LINK}/`);
            dispatch({ type:FETCH_SERVICES_SUCCESS, payload:response.data });
        } catch (error) {
            dispatch({ type:FETCH_SERVICES_FAILED, error:error });
        }
    }
}

export const createService = (data) =>{
    return async dispatch =>{
        try {
            const response = await axios.post(`${SERVICES_LINK}/`,data);
            dispatch({ type:CREATE_SERVICES_SUCCESS, payload: response.data });
            toastHandler("success", "Added new service");
        } catch (error) {
            toastHandler("error", error.response.data.message);
        }
    }
}

export const updateService = (id, data)=>{
    return async dispatch =>{
        try {
            const response = await axios.put(`${SERVICES_LINK}/${id}`,data);
            dispatch({ type:UPDATE_SERVICES_SUCCESS, payload:response.data });
            toastHandler("success", "Update service successfully.");
        } catch (error) {
            toastHandler("error", error.response.data.message);
        }
    }
}

export const deleteService = (id) =>{
    return async dispatch =>{
        try{
            const response = await axios.delete(`${SERVICES_LINK}/${id}`);
            dispatch({ type:DELETE_SERVICES_SUCCESS, payload:id });
            toastHandler("success", response.data.message);
        }catch(error){ toastHandler("error", error.response.data.message);}
    }
}