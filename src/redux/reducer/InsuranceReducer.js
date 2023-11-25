import { FETCH_INSURANCE_FAILED, FETCH_INSURANCE_REQUEST, FETCH_INSURANCE_SUCCESS } from "../ActionTypes";

const reducer = (state={}, action)=>{
    switch(action.type){
        case FETCH_INSURANCE_REQUEST:
            return {...state, loading:true};
        case FETCH_INSURANCE_SUCCESS:
            return {...state, payload:action.payload, loading:false };
        case FETCH_INSURANCE_FAILED:
            return {...state, error:action.error, loading:false };
        default:
            return state;
    }
} 

export default reducer;