import axios from "axios";
import { APPROVED_PAYMENT_SUCCESS, FETCH_PAYMENT_FAILED, FETCH_PAYMENT_REQUEST, FETCH_PAYMENT_SUCCESS } from "../ActionTypes";
import { PAYMENT_LINK } from "../../ApiLinks";

export const fetchPayments = () =>{
    return async dispatch => {
        try {
            dispatch({ type:FETCH_PAYMENT_REQUEST });
            const response = await axios.get(`${PAYMENT_LINK}/`);
            dispatch({ type:FETCH_PAYMENT_SUCCESS, payload:response.data });
        } catch (error) {
            dispatch({ type:FETCH_PAYMENT_FAILED, error:error });
        }
    }
}
export const fetchPatientPayments = () =>{
    return async dispatch => {
        try {
            const response = await axios.get(`${PAYMENT_LINK}/`);
            dispatch({ type:FETCH_PAYMENT_SUCCESS, payload:response.data });
        } catch (error) {
            dispatch({ type:FETCH_PAYMENT_FAILED, error:error });
        }
    }
}

export const approvedPayment = (id)=>{
    return async dispatch => {
        try {
            console.log(id);
            const response = await axios.post(`${PAYMENT_LINK}/approved/${id}`);
            dispatch({
                type:APPROVED_PAYMENT_SUCCESS,
                payload: response.data
            })
        } catch (error) {
        }
    } 
}