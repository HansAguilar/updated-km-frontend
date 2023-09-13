import { FETCH_ADMIN_FAILED, FETCH_ADMIN_REQUEST, FETCH_ADMIN_SUCCESS, FETCH_LOGIN_ADMIN_FAILED, FETCH_LOGIN_ADMIN_SUCCESS } from "../ActionTypes";

const reducer = (state={}, action)=>{
    switch(action.type){
        case FETCH_ADMIN_REQUEST:
            return { ...state, loading:true };
        case FETCH_ADMIN_SUCCESS:
            return { ...state, payload:action.payload, loading:false };
        case FETCH_LOGIN_ADMIN_SUCCESS:
            return { ...state, loginAdmin:action.payload, loading:false };
        case FETCH_LOGIN_ADMIN_FAILED:
            return { ...state, error:action.error, loading:false }
        case FETCH_ADMIN_FAILED:
            return { ...state, error:action.error, loading:false }
        default:
            return state;
    }
}

export default reducer;