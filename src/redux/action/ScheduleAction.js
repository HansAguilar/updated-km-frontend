import axios from "axios";
import { CREATE_SCHEDULE_FAILED, CREATE_SCHEDULE_SUCCESS, DELETE_SCHEDULE_FAILED, DELETE_SCHEDULE_SUCCESS, FETCH_SCHEDULE_FAILED, FETCH_SCHEDULE_REQUEST, FETCH_SCHEDULE_SUCCESS, UPDATE_SCHEDULE_FAILED, UPDATE_SCHEDULE_SUCCESS } from "../ActionTypes"
import { SCHEDULE_LINK } from "../../ApiLinks";
import { toastHandler } from "../../ToastHandler";

export const fetchSchedule = () =>{
    return async dispatch=>{
        try {
            const response = await axios.get(`${SCHEDULE_LINK}/`);
            dispatch({
                type:FETCH_SCHEDULE_SUCCESS,
                payload:response.data
            })
        } catch (error) {
            dispatch({
                type: FETCH_SCHEDULE_FAILED,
                error: error.response && error.response.data.message
            })
        }
    }
}

export const createSchedule = (data) =>{
    return async dispatch=>{
        try {
            const response = await axios.post(`${SCHEDULE_LINK}/`,data);
            dispatch({
                type:CREATE_SCHEDULE_SUCCESS,
                payload:response.data
            })
        } catch (error) {
            dispatch({
                type: CREATE_SCHEDULE_FAILED,
                error: error.response && error.response.data.message
            })
            console.log(error.response.data.message);
            toastHandler("error",error.response.data.message)
        }
    }
}

export const updateSchedule = (id,data) =>{
    return async dispatch=>{
        try {
            const response = await axios.put(`${SCHEDULE_LINK}/${id}`,data);
            dispatch({
                type:UPDATE_SCHEDULE_SUCCESS,
                payload:response.data
            });
            toastHandler("success", "Update schedule successfully!");
        } catch (error) {
            dispatch({
                type: UPDATE_SCHEDULE_FAILED,
                error: error.response && error.response.data.message
            })
        }
    }
}

export const deleteSchedule = (id) =>{
    return async dispatch=>{
        try {
            await axios.delete(`${SCHEDULE_LINK}/${id}`);
            dispatch({
                type:DELETE_SCHEDULE_SUCCESS,
                payload:id
            });
            toastHandler("success", "Delete schedule successfully!");
        } catch (error) {
            dispatch({
                type: DELETE_SCHEDULE_FAILED,
                error: error.response && error.response.data.message
            })
        }
    }
}