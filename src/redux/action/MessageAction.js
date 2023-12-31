import axios from "axios";
import { CREATE_MESSAGE_SUCCESS, FETCH_MESSAGE_FAILED, FETCH_MESSAGE_SUCCESS, LOGOUT_MESSAGE_SUCCESS, RESPONSE_MESSAGE_SUCCESS, SEND_MESSAGE_SUCCESS } from "../ActionTypes"
import { MESSAGE_LINK, SOCKET_LINK } from "../../ApiLinks";
import * as io from "socket.io-client";

const socket = io.connect(SOCKET_LINK);
export const fetchMessages = (adminId) =>{
    return async dispatch =>{
        try {
            const response = await axios.get(`${MESSAGE_LINK}/admin_login/${adminId}`);
            dispatch({
                type: FETCH_MESSAGE_SUCCESS,
                payload: response.data
            })
        } catch (error) {
            dispatch({
                type: FETCH_MESSAGE_FAILED,
                error
            })
        }
    }
}

export const createNewMessage = (roomKey, data) => {
    return async dispatch => {
      try {
        const response = await axios.post(`${MESSAGE_LINK}/new_message/`, data);
        dispatch({
          type: CREATE_MESSAGE_SUCCESS,
          key: roomKey,
          payload: response.data
        });
      const sendData = JSON.stringify({key: roomKey, patient: data.receiverId})
      socket.emit("create_message_admin", sendData);
      } catch (error) {
        console.log("send_message", error);
      }
    };
  };
  

export const sendMessage = (roomKey,data) =>{
    return async dispatch=>{
        try {
            const response = await axios.post(`${MESSAGE_LINK}/send_message/`,data);
            dispatch({
                type:SEND_MESSAGE_SUCCESS,
                key:roomKey,
                payload:response.data
            });
            const sendData = {...response.data};
            socket.emit("send_to_patient",{ key:roomKey, patient:data.receiverId, value:sendData })
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

export const fetchNewAdminMessage = (roomKey) =>{
    return async dispatch=>{
        try {
            const response = await axios.get(`${MESSAGE_LINK}/fetch_room/${roomKey}`);
            dispatch({
                type:CREATE_MESSAGE_SUCCESS,
                payload:response.data
            })
        } catch (error) {}
    }
}

export const logoutMessage = () =>{
    return async dispatch=>{
        try {
           dispatch({type:LOGOUT_MESSAGE_SUCCESS})
        } catch (error) {}
    }
}