import { FETCH_INSTALLMENT_FAILED, FETCH_INSTALLMENT_REQUEST, FETCH_INSTALLMENT_SUCCESS } from "../ActionTypes";

const reducer = (state = {}, action)=>{
    switch(action.type){
        case FETCH_INSTALLMENT_REQUEST:
            return { ...state, loading:true }
        case FETCH_INSTALLMENT_SUCCESS:
            return { ...state, payload:action.payload, loading:false }
        case FETCH_INSTALLMENT_FAILED:
            return { ...state, error:action.error, loading:false }
        default:
            return state;
    }
}

export default reducer;