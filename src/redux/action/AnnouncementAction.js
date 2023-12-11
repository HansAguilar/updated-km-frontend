import axios from "axios";
import { CREATE_ANNOUNCEMENT_SUCCESS, DELETE_ANNOUNCEMENT_SUCCESS, FETCH_ANNOUNCEMENT_FAILED, FETCH_ANNOUNCEMENT_SUCCESS, UPDATE_ANNOUNCEMENT_SUCCESS } from "../ActionTypes";
import { ANNOUNCEMENT_LINK } from "../../ApiLinks";

export const fetchAnnouncement = () =>{
    return async dispatch=>{
        try {
            const response = await axios.get(`${ANNOUNCEMENT_LINK}/`);
            dispatch({ type:FETCH_ANNOUNCEMENT_SUCCESS, payload:response.data });
        } catch (error) {
            dispatch({  type:FETCH_ANNOUNCEMENT_FAILED , error:error })
        }
    }
}

export const createAnnouncement = (data,clearText) =>{
    return async dispatch=>{
        try {
            const response = await axios.post(`${ANNOUNCEMENT_LINK}/`,data);
            dispatch({ type:CREATE_ANNOUNCEMENT_SUCCESS, payload:response.data });
            clearText()
        } catch (error) { }
    }
}
export const updateAnnouncement = (id,data) =>{
    return async dispatch=>{
        try {
            const response = await axios.put(`${ANNOUNCEMENT_LINK}/${id}`,data);
            dispatch({ type:UPDATE_ANNOUNCEMENT_SUCCESS, payload:response.data });
        } catch (error) { }
    }
}
export const deleteAnnouncement = (id) =>{
    return async dispatch=>{
        try {
            await axios.delete(`${ANNOUNCEMENT_LINK}/${id}`);
            dispatch({ type:DELETE_ANNOUNCEMENT_SUCCESS, payload:id });
        } catch (error) { }
    }
}