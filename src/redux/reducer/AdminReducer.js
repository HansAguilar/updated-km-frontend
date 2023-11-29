import { ADMIN_CHANGE_STATUS_SUCCESS, CREATE_ADMIN_SUCCESS, DELETE_ADMIN_SUCCESS, FETCH_ADMIN_FAILED, FETCH_ADMIN_REQUEST, FETCH_ADMIN_SUCCESS, FETCH_LOGIN_ADMIN_FAILED, FETCH_LOGIN_ADMIN_SUCCESS, LOGOUT_ADMIN_SUCCESS, UPDATE_ADMIN_LOGIN_SUCCESS, UPDATE_ADMIN_SUCCESS } from "../ActionTypes";

const reducer = (state={}, action)=>{
    switch(action.type){
        case FETCH_ADMIN_REQUEST:
            return { ...state, loading:true };
        case FETCH_ADMIN_SUCCESS:
            return { ...state, payload:action.payload, loading:false };
        case CREATE_ADMIN_SUCCESS:
            return { ...state, payload:[...state.payload, action.payload], loading:false };    
        case UPDATE_ADMIN_SUCCESS:
            return { ...state, payload: state.payload.map((admin)=>{ return admin.adminId===action.payload.adminId ? action.payload:admin; }), loading:false, }  
        case ADMIN_CHANGE_STATUS_SUCCESS:
            return { ...state, payload: state.payload.map((admin)=>{ return admin.adminId===action.payload.adminId ? action.payload:admin; }), loading:false, }       
        case DELETE_ADMIN_SUCCESS:
            return { ...state, payload: state.payload.filter((admin)=>{ return admin.adminId !== action.payload; }), loading:false, }
       
        case FETCH_LOGIN_ADMIN_SUCCESS:
            return { ...state, loginAdmin:action.payload, loading:false };
        case FETCH_LOGIN_ADMIN_FAILED:
            return { ...state, error:action.error, loading:false }
        case FETCH_ADMIN_FAILED:
            return { ...state, error:action.error, loading:false }
        case UPDATE_ADMIN_LOGIN_SUCCESS:
            return { ...state, loginAdmin:action.payload, loading:false };
        case LOGOUT_ADMIN_SUCCESS:
            return {}
        default:
            return state;
    }
}

export default reducer;