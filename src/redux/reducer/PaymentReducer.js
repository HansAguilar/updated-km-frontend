import { ACCEPT_PAYMENT_SUCCESS, APPROVED_PAYMENT_SUCCESS, FETCH_PAYMENT_FAILED, FETCH_PAYMENT_REQUEST, FETCH_PAYMENT_SUCCESS, UPDATE_PAYMENT_SUCCESS } from "../ActionTypes";

const reducer = (state={}, action) =>{
    switch(action.type){
        case FETCH_PAYMENT_REQUEST:
            return { ...state, loading:true };
        case FETCH_PAYMENT_SUCCESS: 
            return { ...state, payload:action.payload, loading:false };
        case APPROVED_PAYMENT_SUCCESS:
            return { ...state, payload:state.payload.map((val)=>val.paymentId === action.payload.paymentId ? action.payload : val) }
        case UPDATE_PAYMENT_SUCCESS:
            return { ...state, payload:state.payload.map((val)=>val.paymentId === action.payload.paymentId ? action.payload : val) }   
        case ACCEPT_PAYMENT_SUCCESS:
            return { ...state, payload:state.payload.map((val)=>val.paymentId === action.payload.paymentId ? action.payload : val) }  
        case FETCH_PAYMENT_FAILED:
            return { ...state, error:action.error, loading:false };
        default: return state;
    }
}
export default reducer;