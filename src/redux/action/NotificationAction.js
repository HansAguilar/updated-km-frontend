import axios from "axios";
import { CREATE_NOTIFICATION_SUCCESS, FETCH_NEW_NOTIFICATION_SUCCESS, FETCH_NOTIFICATION_FAILED, FETCH_NOTIFICATION_REQUEST, FETCH_NOTIFICATION_SUCCESS, UPDATE_NOTIFICATION_SUCCESS } from "../ActionTypes";
import { NOTIFICATION_LINK, SOCKET_LINK } from "../../ApiLinks";
import * as io from "socket.io-client";

const socket = io.connect(SOCKET_LINK);
export const fetchAllNotification = () =>{
    return async dispatch=>{
        try {
            // dispatch({type:FETCH_NOTIFICATION_REQUEST});
            const response = await axios.get(`${NOTIFICATION_LINK}/`);
            dispatch({
                type:FETCH_NOTIFICATION_SUCCESS,
                payload:response.data
            })
        } catch (error) {
            dispatch({
                type: FETCH_NOTIFICATION_FAILED,
                error:error,
            })
        }
    }
}

export const fetchNewNotification = (id) =>{
    return async dispatch =>{
        try {
            const response = await axios.get(`${NOTIFICATION_LINK}/fetch_notification/${id}`)
            dispatch({
                type:FETCH_NEW_NOTIFICATION_SUCCESS,
                payload:response.data
            })
        } catch (error) {
            console.log("Create notification",error);
        }
    }
}

export const createNotification = (data) =>{
    return async dispatch =>{
        try {
            dispatch({
                type:CREATE_NOTIFICATION_SUCCESS,
                payload:data
            })
        } catch (error) {
            console.log("Create notification",error);
        }
    }
}

export const sendNotification = (data) =>{
    return async dispatch =>{
        try {
            const response = await axios.post(`${NOTIFICATION_LINK}/`,data);
            const { notificationId, patient } = response.data;
            const sendData = { patientId: `${patient.patientId}`, notification: `${notificationId}`};
            socket.emit("send_notification_by_admin", JSON.stringify(sendData))
        } catch (error) {
            console.log("Create notification",error);
        }
    }
}

export const sendNotificationLater = (data) =>{
    return async dispatch =>{
        try {
            await axios.post(`${NOTIFICATION_LINK}/`,data);
        } catch (error) {
            console.log("Create notification",error);
        }
    }
}

export const readPatientNotification = (notificationId,notificationToggle, setNotificationToggleModal) =>{
    return async dispatch =>{
        try {
            const response = await axios.put(`${NOTIFICATION_LINK}/read_notification/${notificationId}`);
            const appointmentData = response.data;
            dispatch({
                type: UPDATE_NOTIFICATION_SUCCESS,
                payload: appointmentData
            })
            setNotificationToggleModal({ ...notificationToggle, data:appointmentData, isShow:true});
        } catch (error) {
            
        }
    } 
}