import axios from "axios";
import { APPROVED_APPOINTMENT_SUCCESS, CANCELLED_APPOINTMENT_SUCCESS, CREATE_APPOINTMENT_SUCCESS, DELETE_APPOINTMENT_SUCCESS, DONE_APPOINTMENT_SUCCESS, FETCH_APPOINTMENT_FAILED, FETCH_APPOINTMENT_SUCCESS, UPDATE_APPOINTMENT_SUCCESS } from "../ActionTypes";
import { APPOINTMENT_LINK, SOCKET_LINK } from "../../ApiLinks";
import { toastHandler } from "../../ToastHandler";
import { fetchPaymentsQuickly, fetchPatientPayments, fetchCancelledPayment } from "./PaymentAction";
import * as io from "socket.io-client";

const socket = io.connect(SOCKET_LINK);

export const fetchAppointment = () => {
    return async dispatch => {
        try {
            // dispatch({ type:FETCH_APPOINTMENT_REQUEST });
            const response = await axios.get(`${APPOINTMENT_LINK}/`);
            dispatch({ type: FETCH_APPOINTMENT_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: FETCH_APPOINTMENT_FAILED, error: error })
        }
    }
}

export const fetchPatientAppointment = (id) => {
    return async dispatch => {
        try {
            const response = await axios.get(`${APPOINTMENT_LINK}/fetch/new_appointment/${id}`);
            dispatch({ type: CREATE_APPOINTMENT_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: FETCH_APPOINTMENT_FAILED, error: error })
        }
    }
}
export const patientChanges = (id) => {
    return async dispatch => {
        try {
            const response = await axios.get(`${APPOINTMENT_LINK}/fetch/new_appointment/${id}`);
            dispatch({
                type: UPDATE_APPOINTMENT_SUCCESS,
                payload: response.data
            })
        } catch (error) {

        }
    }
}

export const createAppointment = (data, setModal, clearData) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${APPOINTMENT_LINK}/`, data);
            dispatch({
                type: CREATE_APPOINTMENT_SUCCESS,
                payload: response.data
            });
            const { appointmentId } = response.data;
            dispatch(fetchPatientPayments(appointmentId));
            socket.emit("admin_appointment_create", { value: appointmentId });
            clearData();
            setModal(false);
        } catch (error) {
            alert(error.response.data.message);
        }
    }
}
export const insertAppointment = (data) => {
    return async dispatch => {
        try {
            dispatch({
                type: CREATE_APPOINTMENT_SUCCESS,
                payload: data
            });
        } catch (error) {
        }
    }
}
export const approvedAppointment = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(`${APPOINTMENT_LINK}/status/approved/${id}`);
            const appointmentData = response.data;
            dispatch({
                type: APPROVED_APPOINTMENT_SUCCESS,
                payload: appointmentData,
            });
            const sendData = { value: appointmentData.appointmentId }
            socket.emit("appointment_changes", JSON.stringify(sendData));
        } catch (error) {
            // Handle the error
        }
    };
};
export const updateAppointment = (id, value) => {
    return async dispatch => {
        try {
            const response = await axios.put(`${APPOINTMENT_LINK}/update/${id}`, value);
            const appointmentData = response.data;
            dispatch({
                type: UPDATE_APPOINTMENT_SUCCESS,
                payload: appointmentData
            });
            const sendData = { value: appointmentData.appointmentId }
            socket.emit("appointment_admin_changes", JSON.stringify(sendData));
        } catch (error) {
            toastHandler("error", error.response.data.message);
        }
    }
}
export const deleteAppointment = (id, toastHandler) => {
    return async dispatch => {
        try {
            await axios.delete(`${APPOINTMENT_LINK}/${id}`);
            dispatch(fetchPaymentsQuickly());
            dispatch({
                type: DELETE_APPOINTMENT_SUCCESS,
                payload: id
            });
            const sendData = { value: `${id}` };
            socket.emit("delete_appointment", JSON.stringify(sendData));
            toastHandler("success", "Deleted successfully!");
        } catch (error) {
            toastHandler("error", error.response.data.message);
        }
    }
}
export const deleteByPatientAppointment = (id) => {
    return async dispatch => {
        try {
            dispatch(fetchPaymentsQuickly());
            dispatch({
                type: DELETE_APPOINTMENT_SUCCESS,
                payload: id
            });
        } catch (error) { }
    }
}
export const cancelledAppointment = (id, data) => {
    return async dispatch => {
        try {
            const response = await axios.put(`${APPOINTMENT_LINK}/status/cancelled/${id}`, data);
            const appointmentData = response.data;
            dispatch(fetchCancelledPayment(id));
            dispatch({
                type: CANCELLED_APPOINTMENT_SUCCESS,
                key: id,
                payload: appointmentData
            });
            toastHandler("success", "Cancelled appointment successfully");
            socket.emit("cancel_by_admin", { value: id });
        } catch (error) {
            toastHandler("error", error.response.data.message);
        }
    }
}
export const responseToCancelledAppointment = (data) => {
    return async dispatch => {
        try {
            dispatch({
                type: CANCELLED_APPOINTMENT_SUCCESS,
                payload: data
            });
        } catch (error) {
            toastHandler("error", error.response.data.message);
        }
    }
}
export const acceptAppointment = (id,backToDashBoard) => {
    return async dispatch => {
        try {
            const response = await axios.put(`${APPOINTMENT_LINK}/status/accept/${id}`);
            dispatch({
                type: DONE_APPOINTMENT_SUCCESS,
                payload: response.data
            })
            socket.emit("appointment_changes", { value: response.data });
            toastHandler("success", "Verified appointment successfully");
            backToDashBoard();
        } catch (error) {

        }
    }
}
export const acceptTreatmentAppointment = (id) => {
    return async dispatch => {
        try {
            const response = await axios.put(`${APPOINTMENT_LINK}/status/accept/treatment/${id}`);
            dispatch({
                type: DONE_APPOINTMENT_SUCCESS,
                payload: response.data
            })
        } catch (error) {

        }
    }
}