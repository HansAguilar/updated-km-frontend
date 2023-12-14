import { CREATE_PATIENT_SUCCESS, DELETE_PATIENT_SUCCESS, DISABLE_PATIENT_SUCCESS, FETCH_PATIENT_FAILED, FETCH_PATIENT_REQUEST, FETCH_PATIENT_SUCCESS, UPDATE_PATIENT_SUCCESS } from "../ActionTypes";

const reducer = (state={}, action)=>{
    switch(action.type){
        case FETCH_PATIENT_SUCCESS:
            return { ...state, payload:action.payload, loading:false};
        case FETCH_PATIENT_FAILED:
            return { ...state, error:action.error, loading:false }
        
        case CREATE_PATIENT_SUCCESS:
            return { ...state, payload:[...state.payload, action.payload], loading:false };
        
        case UPDATE_PATIENT_SUCCESS:
            return { ...state, payload: state.payload.map((patient)=>{ return patient.patientId===action.payload.patientId ? action.payload:patient; }), loading:false, }

        case DISABLE_PATIENT_SUCCESS:
            return { ...state, payload: state.payload.map((patient)=>{ return patient.patientId===action.payload.patientId ? action.payload:patient; }), loading:false, }
        
        case DELETE_PATIENT_SUCCESS:
            return { ...state, payload: state.payload.filter((patient)=>{ return patient.patientId !== action.payload; }), loading:false, }

        default:
            return state;
    }
}

export default reducer;