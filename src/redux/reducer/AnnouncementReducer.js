import { CREATE_ANNOUNCEMENT_SUCCESS, DELETE_ANNOUNCEMENT_SUCCESS, FETCH_ANNOUNCEMENT_FAILED, FETCH_ANNOUNCEMENT_REQUEST, FETCH_ANNOUNCEMENT_SUCCESS, UPDATE_ANNOUNCEMENT_SUCCESS } from "../ActionTypes";

const reducer = (state = {}, action)=>{
    switch(action.type){
        case FETCH_ANNOUNCEMENT_REQUEST:
            return { ...state, loading:true }
        case FETCH_ANNOUNCEMENT_SUCCESS:
            return { ...state, payload:action.payload, loading:false }
        case CREATE_ANNOUNCEMENT_SUCCESS:
            return { ...state, payload:[...state.payload, action.payload], loading:false }
        case UPDATE_ANNOUNCEMENT_SUCCESS:
            return { ...state, payload:state.payload.map((val)=>val.announcementId!==action.payload.announcementId ? val : action.payload), loading:false }
        case DELETE_ANNOUNCEMENT_SUCCESS:
            return { ...state, payload:state.payload.filter((val)=>val.announcementId!==action.payload), loading:false }
        case FETCH_ANNOUNCEMENT_FAILED:
            return { ...state, error:action.error, loading:false }
        default:
            return state;
    }
}

export default reducer;