import axios from "axios";
import { CREATE_NOTIFICATION_SUCCESS, FETCH_NOTIFICATION_FAILED, FETCH_NOTIFICATION_REQUEST, FETCH_NOTIFICATION_SUCCESS } from "../ActionTypes";
import { NOTIFICATION_LINK } from "../../ApiLinks";

export const fetchAllNotification = () =>{
    return async dispatch=>{
        try {
            dispatch({type:FETCH_NOTIFICATION_REQUEST});
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