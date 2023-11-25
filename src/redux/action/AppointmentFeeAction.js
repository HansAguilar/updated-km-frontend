import axios from "axios";
import { FETCH_FEE_FAILED, FETCH_FEE_REQUEST, FETCH_FEE_SUCCESS, UPDATE_FEE_SUCCESS } from "../ActionTypes"
import { FEE_LINK } from "../../ApiLinks";

export const fetchAppointmentFee = () =>{
    return async dispatch=>{
        try {
            dispatch({type: FETCH_FEE_REQUEST});
            const response = await axios.get(`${FEE_LINK}/`);
            dispatch({
                type: FETCH_FEE_SUCCESS,
                payload:response.data
            })
        } catch (error) {
            dispatch({type: FETCH_FEE_FAILED, error:error});
        }
    }
}

export const updateInfo = (value) =>{
    return async dispatch=>{
        try {
            await axios.put(`${FEE_LINK}/enabled/${value}`);
            dispatch({ type: UPDATE_FEE_SUCCESS, payload:value })
        } catch (error) { }
    }
}