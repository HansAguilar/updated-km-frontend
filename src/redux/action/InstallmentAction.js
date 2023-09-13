import axios from "axios";
import { FETCH_INSTALLMENT_FAILED, FETCH_INSTALLMENT_REQUEST, FETCH_INSTALLMENT_SUCCESS } from "../ActionTypes";
import { INSTALLMENT_LINK } from "../../ApiLinks";

export const fetchInstallment = () =>{
    return async dispatch=>{
        try {
            dispatch({ type:FETCH_INSTALLMENT_REQUEST });
            const response = await axios.get(`${INSTALLMENT_LINK}/`);
            dispatch({ type:FETCH_INSTALLMENT_SUCCESS, payload:response.data });
        } catch (error) {
            dispatch({  type:FETCH_INSTALLMENT_FAILED , error:error })
        }
    }
}