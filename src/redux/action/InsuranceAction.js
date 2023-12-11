import axios from "axios";
import { FETCH_INSURANCE_FAILED, FETCH_INSURANCE_SUCCESS } from "../ActionTypes"
import { HMO_LINK } from "../../ApiLinks";

export const fetchInsurance = () =>{
    return async dispatch=>{
        try {
            const response = await axios.get(`${HMO_LINK}/`);
            dispatch({
                type: FETCH_INSURANCE_SUCCESS,
                payload:response.data
            })
        } catch (error) {
            dispatch({type: FETCH_INSURANCE_FAILED, error:error});
        }
    }
}