import { 
    APPROVED_APPOINTMENT_SUCCESS, 
    CANCELLED_APPOINTMENT_SUCCESS, 
    CREATE_APPOINTMENT_SUCCESS, 
    DELETE_APPOINTMENT_SUCCESS, 
    DONE_APPOINTMENT_SUCCESS, 
    FETCH_APPOINTMENT_FAILED, 
    FETCH_APPOINTMENT_REQUEST, 
    FETCH_APPOINTMENT_SUCCESS, 
    UPDATE_APPOINTMENT_SUCCESS 
} from "../ActionTypes";

const reducer = (state = {}, action)=>{
    switch(action.type){
        case FETCH_APPOINTMENT_REQUEST:
            return { ...state, loading:true };
        case FETCH_APPOINTMENT_SUCCESS:
            return { ...state, payload:action.payload, loading:false };
        case CREATE_APPOINTMENT_SUCCESS:
            return { ...state, payload:[...state.payload, action.payload], loading:false };
        case UPDATE_APPOINTMENT_SUCCESS:
            return { ...state, payload:state.payload.map((val)=>{ return val.appointmentId === action.payload.appointmentId ? action.payload:val }), loading:false };
        case DELETE_APPOINTMENT_SUCCESS:
            return {...state, payload:state.payload.filter((val)=>val.appointmentId!==action.payload), loading:false};
        case APPROVED_APPOINTMENT_SUCCESS:
            return { 
                ...state, 
                payload: state.payload.map((val) => { return val.appointmentId !== action.payload.appointmentId ? val : action.payload}),
                loading: false 
            };
        case CANCELLED_APPOINTMENT_SUCCESS:
            return { 
                ...state, 
                payload: state.payload.map((val) => { return val.appointmentId !== action.key ? val : action.payload}),
                loading: false 
            };
        case DONE_APPOINTMENT_SUCCESS:
            return {...state, payload:state.payload.map((val)=>val.appointmentId!==action.payload), loading:false};
        case FETCH_APPOINTMENT_FAILED:
            return { ...state, error:action.error, loading:false };
        default:
            return state;
    }
}

export default reducer;