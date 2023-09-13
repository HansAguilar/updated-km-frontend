import { FETCH_HISTORY_FAILED, FETCH_HISTORY_REQUEST, FETCH_HISTORY_SUCCESS } from "../ActionTypes";

const reducer = (state={}, action)=>{
    switch(action.type){
        case FETCH_HISTORY_REQUEST:
            return {...state, loading:true};
        case FETCH_HISTORY_SUCCESS:
            return {...state, payload:action.payload, loading:false };
        case FETCH_HISTORY_FAILED:
            return {...state, error:action.error, loading:false };
        default:
            return state;
    }
} 

export default reducer;