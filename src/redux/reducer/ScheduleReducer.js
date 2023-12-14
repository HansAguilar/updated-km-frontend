import { CREATE_SCHEDULE_SUCCESS, DELETE_SCHEDULE_SUCCESS, FETCH_SCHEDULE_FAILED, FETCH_SCHEDULE_REQUEST, FETCH_SCHEDULE_SUCCESS, UPDATE_SCHEDULE_SUCCESS } from "../ActionTypes";

const reducer = (state = {}, action)=>{
    switch(action.type){
        case FETCH_SCHEDULE_SUCCESS:
            return { ...state, payload:action.payload, loading:false }
        case CREATE_SCHEDULE_SUCCESS:
            return { ...state, payload:[...state.payload, action.payload], loading:false }
        case UPDATE_SCHEDULE_SUCCESS:
            return { ...state, payload:state.payload.map((val)=>val.scheduleId!==action.payload.scheduleId?val:action.payload), loading:false }
        case DELETE_SCHEDULE_SUCCESS:
            return { ...state, payload:state.payload.filter((val)=>val.scheduleId!==action.payload), loading:false }
        case FETCH_SCHEDULE_FAILED:
            return { ...state, error:action.error, loading:false }
        default:
            return state;
    }
}

export default reducer;