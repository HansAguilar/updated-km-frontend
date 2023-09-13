import { CREATE_DENTIST_SUCCESS, FETCH_DENTIST_FAILED, FETCH_DENTIST_REQUEST, FETCH_DENTIST_SUCCESS } from "../ActionTypes";

const reducer = (state={}, action)=>{
    switch(action.type){
        case FETCH_DENTIST_REQUEST:
            return {...state, loading:true};
        case FETCH_DENTIST_SUCCESS:
            return {...state, payload:action.payload, loading:false };
        case CREATE_DENTIST_SUCCESS:
            return { ...state, payload:[...state.payload, action.payload], loading:false}
        case FETCH_DENTIST_FAILED:
            return {...state, error:action.error, loading:false };
        default:
            return state;
    }
} 

export default reducer;