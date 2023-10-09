import { CREATE_DENTIST_SUCCESS, DELETE_DENTIST_SUCCESS, FETCH_DENTIST_FAILED, FETCH_DENTIST_REQUEST, FETCH_DENTIST_SUCCESS, STATUS_DENTIST_SUCCESS, UPDATE_DENTIST_SUCCESS } from "../ActionTypes";

const reducer = (state={}, action)=>{
    switch(action.type){
        case FETCH_DENTIST_REQUEST:
            return {...state, loading:true};
        case FETCH_DENTIST_SUCCESS:
            return {...state, payload:action.payload, loading:false };
        case CREATE_DENTIST_SUCCESS:
            return { ...state, payload:[...state.payload, action.payload], loading:false}
        case UPDATE_DENTIST_SUCCESS:
            return { ...state, payload: state.payload.map((dentist)=>{ return dentist.dentistId===action.payload.dentistId ? action.payload:dentist; }), loading:false, }
        case STATUS_DENTIST_SUCCESS:
                return { ...state, payload: state.payload.map((dentist)=>{ return dentist.dentistId===action.payload.dentistId ? action.payload:dentist; }), loading:false, }
        case DELETE_DENTIST_SUCCESS:
            return {...state, payload:state.payload.filter((val)=>val.dentistId!==action.payload), loading:false}
        case FETCH_DENTIST_FAILED:
            return {...state, error:action.error, loading:false };
        default:
            return state;
    }
} 

export default reducer;