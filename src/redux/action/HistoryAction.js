import axios from "axios";
import { FETCH_HISTORY_FAILED, FETCH_HISTORY_REQUEST, FETCH_HISTORY_SUCCESS } from "../ActionTypes";
import { HISTORY_LINK } from "../../ApiLinks";

export const fetchHistory = () =>{
    return async dispatch=>{
        try {
            dispatch({ type:FETCH_HISTORY_REQUEST });
            const response = await axios.get(`${HISTORY_LINK}/`);
            dispatch({ type:FETCH_HISTORY_SUCCESS, payload:response.data });
        } catch (error) {
            dispatch({  type:FETCH_HISTORY_FAILED , error:error })
        }
    }
}