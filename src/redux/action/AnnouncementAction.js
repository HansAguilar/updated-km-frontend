import axios from "axios";
import { FETCH_ANNOUNCEMENT_FAILED, FETCH_ANNOUNCEMENT_REQUEST, FETCH_ANNOUNCEMENT_SUCCESS } from "../ActionTypes";
import { ANNOUNCEMENT_LINK } from "../../ApiLinks";

export const fetchAnnouncement = () =>{
    return async dispatch=>{
        try {
            dispatch({ type:FETCH_ANNOUNCEMENT_REQUEST });
            const response = await axios.get(`${ANNOUNCEMENT_LINK}/`);
            dispatch({ type:FETCH_ANNOUNCEMENT_SUCCESS, payload:response.data });
        } catch (error) {
            dispatch({  type:FETCH_ANNOUNCEMENT_FAILED , error:error })
        }
    }
}