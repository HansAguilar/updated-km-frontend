import axios from "axios";
import { ACCEPT_PAYMENT_SUCCESS, APPROVED_PAYMENT_SUCCESS, FETCH_PAYMENT_FAILED, FETCH_PAYMENT_REQUEST, FETCH_PAYMENT_SUCCESS, UPDATE_PAYMENT_SUCCESS } from "../ActionTypes";
import { PAYMENT_LINK, SOCKET_LINK } from "../../ApiLinks";
import * as io from "socket.io-client";

const socket = io.connect(SOCKET_LINK);
export const fetchPayments = () =>{
    return async dispatch => {
        try {
            dispatch({ type:FETCH_PAYMENT_REQUEST });
            const response = await axios.get(`${PAYMENT_LINK}/`);
            dispatch({ type:FETCH_PAYMENT_SUCCESS, payload:response.data });
        } catch (error) {
            dispatch({ type:FETCH_PAYMENT_FAILED, error:error });
        }
    }
}
export const fetchPatientPayments = () =>{
    return async dispatch => {
        try {
            const response = await axios.get(`${PAYMENT_LINK}/`);
            dispatch({ type:FETCH_PAYMENT_SUCCESS, payload:response.data });
        } catch (error) {
            dispatch({ type:FETCH_PAYMENT_FAILED, error:error });
        }
    }
}

export const updatePayment = (data)=>{
    return async dispatch => {
        try {
            const response = await axios.put(`${PAYMENT_LINK}/${data.id}`,data);
            dispatch({
                type:UPDATE_PAYMENT_SUCCESS,
                payload: response.data
            })
        } catch (error) {
        }
    } 
}

export const approvedPayment = (id)=>{
    return async dispatch => {
        try {
            const response = await axios.post(`${PAYMENT_LINK}/approved/${id}`);
            dispatch({
                type:APPROVED_PAYMENT_SUCCESS,
                payload: response.data
            })
        } catch (error) {
        }
    } 
}

export const approvedTreatmentPayment = (id)=>{
    return async dispatch => {
        try {
            const response = await axios.post(`${PAYMENT_LINK}/approved/treatment/${id}`);
            dispatch({
                type:APPROVED_PAYMENT_SUCCESS,
                payload: response.data
            })
        } catch (error) {
        }
    } 
}

export const clientChanges = (data)=>{
    return async dispatch => {
        try {
            dispatch({
                type:UPDATE_PAYMENT_SUCCESS,
                payload: data
            })
        } catch (error) {
        }
    } 
}

export const paymentCancelation = (id,data)=>{
    return async dispatch => {
        try {
            const response = await axios.put(`${PAYMENT_LINK}/cancellation/${id}`,data);
            dispatch({
                type:UPDATE_PAYMENT_SUCCESS,
                payload: response.data
            });
            socket.emit("payment_admin_changes",{value: response.data});
        } catch (error) {
        }
    } 
}

export const paymentAccept = (id)=>{
    return async dispatch => {
        try {
            await axios.get(`${PAYMENT_LINK}/accept/${id}`);
            dispatch(fetchPatientPayments());
        } catch (error) {
        }
    } 
}