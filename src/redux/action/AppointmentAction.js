import axios from "axios";
import { APPROVED_APPOINTMENT_SUCCESS, CANCELLED_APPOINTMENT_SUCCESS, CREATE_APPOINTMENT_SUCCESS, DELETE_APPOINTMENT_SUCCESS, DONE_APPOINTMENT_SUCCESS, FETCH_APPOINTMENT_FAILED, FETCH_APPOINTMENT_REQUEST, FETCH_APPOINTMENT_SUCCESS, UPDATE_APPOINTMENT_SUCCESS } from "../ActionTypes";
import { APPOINTMENT_LINK, SOCKET_LINK } from "../../ApiLinks";
import { toastHandler } from "../../ToastHandler";
import { fetchPatientPayments } from "./PaymentAction";
import * as io from "socket.io-client";

const socket = io.connect(SOCKET_LINK);
export const fetchAppointment = () =>{
    return async dispatch=>{
        try {
            dispatch({ type:FETCH_APPOINTMENT_REQUEST });
            const response = await axios.get(`${APPOINTMENT_LINK}/`);
            dispatch({ type:FETCH_APPOINTMENT_SUCCESS, payload:response.data });
        } catch (error) {
            dispatch({  type:FETCH_APPOINTMENT_FAILED , error:error })
        }
    }
}

export const fetchPatientAppointment = () =>{
    return async dispatch=>{
        try {
            const response = await axios.get(`${APPOINTMENT_LINK}/`);
            dispatch({ type:FETCH_APPOINTMENT_SUCCESS, payload:response.data });
        } catch (error) {
            dispatch({  type:FETCH_APPOINTMENT_FAILED , error:error })
        }
    }
}

export const createAppointment = (data,setModal,setAppointment) =>{
    return async dispatch=>{
        try {
            const response = await axios.post(`${APPOINTMENT_LINK}/`,data);
            dispatch(fetchPatientPayments());
            dispatch({
                type: CREATE_APPOINTMENT_SUCCESS,
                payload: response.data
            });
            toastHandler("success","Created appointment successfully!");
            socket.emit("appointment_admin_changes",{value: response.data});
            setModal(false);
        } catch (error) {
            toastHandler("error",error.response.data.message);
        }
    }
}

export const insertAppointment = (data) =>{
    return async dispatch=>{
        try {
            dispatch({
                type: CREATE_APPOINTMENT_SUCCESS,
                payload: data
            });
        } catch (error) {
        }
    }
}

export const approvedAppointment = (id) =>{
    return async dispatch=>{
        try {
            const response = await axios.put(`${APPOINTMENT_LINK}/status/approved/${id}`);
            dispatch({
                type: APPROVED_APPOINTMENT_SUCCESS,
                payload:response.data
            });
            socket.emit("appointment_changes",{value: response.data});
        } catch (error) {
            
        }
    }
}

export const updateAppointment = (id,value) =>{
    return async dispatch=>{
        try {
            const response = await axios.put(`${APPOINTMENT_LINK}/update/${id}`,value);
            dispatch({
                type: UPDATE_APPOINTMENT_SUCCESS,
                payload:response.data
            });
            socket.emit("appointment_changes",{value: response.data});
        } catch (error) {
            toastHandler("error",error.response.data.message);
        }
    }
}

export const  deleteAppointment = (id) =>{
    return async dispatch=>{
        try {
            await axios.delete(`${APPOINTMENT_LINK}/${id}`);
            dispatch(fetchPatientPayments());
            dispatch({
                type: DELETE_APPOINTMENT_SUCCESS,
                payload:id
            });
        } catch (error) {
            toastHandler("error",error.response.data.message);
        }
    }
}


export const cancelledAppointment = (id,data) =>{
    return async dispatch=>{
        try {
            const response = await axios.put(`${APPOINTMENT_LINK}/status/cancelled/${id}`,data);
            dispatch(fetchPatientPayments());
            dispatch({
                type: CANCELLED_APPOINTMENT_SUCCESS,
                payload:id
            });
            socket.emit("appointment_changes",{value: response.data});
            toastHandler("success", "Cancelled appointment successfully");
        } catch (error) {
            toastHandler("error", error.response.data.message);
        }
    }
}

export const responseToCancelledAppointment = (data) =>{
    return async dispatch=>{
        try {
            dispatch({
                type: CANCELLED_APPOINTMENT_SUCCESS,
                payload:data
            });
        } catch (error) {
            toastHandler("error", error.response.data.message);
        }
    }
}

export const acceptAppointment = (id) => {
    return async dispatch=>{
        try {
            const response = await axios.put(`${APPOINTMENT_LINK}/status/accept/${id}`);
            dispatch({
                type: DONE_APPOINTMENT_SUCCESS,
                payload: response.data
            })
            socket.emit("appointment_changes",{value: response.data});
            toastHandler("success", "Verified appointment successfully");
        } catch (error) {
            
        }
    }
}