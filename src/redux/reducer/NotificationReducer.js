import { CREATE_NOTIFICATION_SUCCESS, FETCH_NEW_NOTIFICATION_SUCCESS, FETCH_NOTIFICATION_FAILED, FETCH_NOTIFICATION_REQUEST, FETCH_NOTIFICATION_SUCCESS, UPDATE_NOTIFICATION_SUCCESS } from "../ActionTypes";

const reducer = (state={}, action)=>{
    switch(action.type){
        case FETCH_NOTIFICATION_SUCCESS:
            return {...state, payload:action.payload, loading:false };
        case FETCH_NEW_NOTIFICATION_SUCCESS:
            return { ...state, payload:[action.payload, ...state.payload], loading:false}
        case CREATE_NOTIFICATION_SUCCESS:
            return{
                ...state,
                payload: [action.payload, ...state.payload],
                loading:false
            }
        case UPDATE_NOTIFICATION_SUCCESS:
            return { ...state, payload:state.payload.map((val)=>val.notificationId === action.payload.notificationId ? action.payload : val)}
        case FETCH_NOTIFICATION_FAILED:
            return {...state, error:action.error, loading:false };
        default:
            return state;
    }
} 

export default reducer;