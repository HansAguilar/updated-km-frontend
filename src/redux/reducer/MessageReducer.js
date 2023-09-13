import { FETCH_MESSAGE_FAILED, FETCH_MESSAGE_REQUEST, FETCH_MESSAGE_SUCCESS, RESPONSE_MESSAGE_SUCCESS, SEND_MESSAGE_SUCCESS } from "../ActionTypes";

const reducer = (state = {}, action)=>{
    switch(action.type){
        case FETCH_MESSAGE_REQUEST:
            return { ...state, loading:true }
        case FETCH_MESSAGE_SUCCESS:
            return { ...state, payload:action.payload, loading:false }
        case SEND_MESSAGE_SUCCESS:
            return {
                ...state,
                payload: { ...state.payload, [action.key]: state.payload[action.key]?[...state.payload[action.key], action.payload] : [action.payload] },
                loading:false,
              };
        case RESPONSE_MESSAGE_SUCCESS:
            return{
                ...state,
                payload:{
                    ...state.payload,
                    [action.key]: [...state.payload[action.key], action.payload]
                }
            }
        case FETCH_MESSAGE_FAILED:
            return { ...state, error:action.error, loading:false }
        default:
            return state;
    }
}

export default reducer;