import { CREATE_SERVICES_SUCCESS, DELETE_SERVICES_SUCCESS, FETCH_SERVICES_FAILED, FETCH_SERVICES_REQUEST, FETCH_SERVICES_SUCCESS, UPDATE_SERVICES_SUCCESS } from "../ActionTypes";

const reducer = (state={}, action) =>{
    switch(action.type){
        case FETCH_SERVICES_SUCCESS:
            return { ...state, payload:action.payload, loading:false };
        case CREATE_SERVICES_SUCCESS:
            return { ...state, payload:[...state.payload, action.payload], loading:false };
        case UPDATE_SERVICES_SUCCESS:
            return { ...state, payload:state.payload.map((val)=>{ return val.serviceId!==action.payload.serviceId ? val : action.payload; }), loading:false }
        case DELETE_SERVICES_SUCCESS:
            return { ...state, payload:state.payload.filter((val)=>{ return val.serviceId !== action.payload; }), loading:false };
        case FETCH_SERVICES_FAILED:
            return { ...state, error:action.error, loading:false };
        default: return state;
    }
}
export default reducer;