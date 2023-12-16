import { CREATE_MESSAGE_SUCCESS, FETCH_MESSAGE_FAILED, FETCH_MESSAGE_REQUEST, FETCH_MESSAGE_SUCCESS, RESPONSE_MESSAGE_SUCCESS, SEND_MESSAGE_SUCCESS } from "../ActionTypes";

const reducer = (state = {}, action)=>{
    switch(action.type){

        case FETCH_MESSAGE_SUCCESS:
            return { ...state, payload:action.payload, loading:false }
        
            case CREATE_MESSAGE_SUCCESS:
                return {
                  ...state,
                  payload: [...state.payload, action.payload],
                  loading: false,
                };

        case SEND_MESSAGE_SUCCESS:
            return {
                ...state,
                payload: state.payload.map((val)=>{
                    if(val.roomId===action.key){
                        return {
                            ...val,
                            messageEntityList:[...val.messageEntityList, action.payload]
                        }
                    }
                    return val;
                }) ,
                loading:false,
              };

        case RESPONSE_MESSAGE_SUCCESS:
            return{
                ...state,
                payload:state.payload.map((val)=>{
                    if(val.roomId===action.key){
                        return {
                            ...val,
                            messageEntityList:[...val.messageEntityList, action.payload]
                        }
                    }
                    return val;
                }) ,
                loading:false,
            }
        case FETCH_MESSAGE_FAILED:
            return { ...state, error:action.error, loading:false }
        default:
            return state;
    }
}

export default reducer;