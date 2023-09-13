import axios from "axios";
import { FETCH_MESSAGE_FAILED, FETCH_MESSAGE_REQUEST, FETCH_MESSAGE_SUCCESS, RESPONSE_MESSAGE_SUCCESS, SEND_MESSAGE_SUCCESS } from "../ActionTypes"
import { MESSAGE_LINK, SOCKET_LINK } from "../../ApiLinks";
import * as io from "socket.io-client";

const socket = io.connect(SOCKET_LINK);
export const fetchMessages = (adminId) =>{
    return async dispatch =>{
        try {
            dispatch({type:FETCH_MESSAGE_REQUEST});
            const response = await axios.get(`${MESSAGE_LINK}/`);
            const filteredData = {};
            for(const [roomId, messageList] of Object.entries(response.data)){
                const filteredMessageArray = messageList.filter(
                    message => message.adminId.adminId === adminId
                  );
                
                  if (filteredMessageArray.length > 0) {
                    filteredData[roomId] = filteredMessageArray;
                  }
            }
            dispatch({
                type: FETCH_MESSAGE_SUCCESS,
                payload: filteredData
            })
        } catch (error) {
            dispatch({
                type: FETCH_MESSAGE_FAILED,
                error
            })
        }
    }
}

export const sendMessage = (roomKey,data) =>{
    return async dispatch=>{
        try {
            const response = await axios.post(`${MESSAGE_LINK}/`,data);
            dispatch({
                type:SEND_MESSAGE_SUCCESS,
                key:roomKey,
                payload:response.data
            });
            socket.emit("send_to_patient",{ key:roomKey, value:data })
        } catch (error) {
            console.log("send_message", error);
        }
    }
}

export const fetchIncomingMessage = (roomKey, data)=>{
    return async dispatch=>{
        try {
            dispatch({
                type:RESPONSE_MESSAGE_SUCCESS,
                key:roomKey,
                payload:data
            })
        } catch (error) {
            
        }
    }
}