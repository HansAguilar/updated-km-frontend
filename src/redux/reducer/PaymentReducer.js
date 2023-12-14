import { ACCEPT_PAYMENT_SUCCESS, APPROVED_PAYMENT_SUCCESS, CANCELLED_PAYMENT_SUCCESS, CREATE_PAYMENT_SUCCESS, FETCH_PAYMENT_FAILED, FETCH_PAYMENT_REQUEST, FETCH_PAYMENT_SUCCESS, UPDATE_PAYMENT_SUCCESS } from "../ActionTypes";

const reducer = (state={}, action) =>{
    switch(action.type){
        case FETCH_PAYMENT_SUCCESS: 
            return { ...state, payload:action.payload, loading:false };
        case CREATE_PAYMENT_SUCCESS:
            return { ...state, payload:[...state.payload, action.payload], loading:false };
        case APPROVED_PAYMENT_SUCCESS:
            return { ...state, payload:state.payload.map((val)=>val.paymentId === action.payload.paymentId ? action.payload : val), loading:false }
        case UPDATE_PAYMENT_SUCCESS:
            return { ...state, payload:state.payload.map((val)=>val.paymentId === action.payload.paymentId ? action.payload : val), loading:false }  
        case CANCELLED_PAYMENT_SUCCESS:
            return { ...state, payload:state.payload.map((val)=>val.paymentId === action.payload.paymentId ? action.payload : val), loading:false }  
        case ACCEPT_PAYMENT_SUCCESS:
            return { ...state, payload:state.payload.filter((val)=>val.paymentId !== action.payload), loading:false }  
        case FETCH_PAYMENT_FAILED:
            return { ...state, error:action.error, loading:false };
        default: return state;
    }
}
export default reducer;