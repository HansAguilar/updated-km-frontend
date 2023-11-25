import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateInfo } from '../redux/action/AppointmentFeeAction';
import * as io from "socket.io-client";
import { SOCKET_LINK } from '../ApiLinks';

const socket = io.connect(SOCKET_LINK);
function AppointmentFee() {
    const appointmentFee = useSelector((state)=>state.fee.payload);
    const dispatch = useDispatch();

    const buttonSubmit = () =>{
        const data = appointmentFee.status === "AVAILABLE"? "DISABLE" : "AVAILABLE";
        const result = { value: data };
        dispatch(updateInfo(data));
        socket.emit("change_appointment_fee",JSON.stringify(result))
    }
    return (
        <div className=' p-10 '>
            <button className=' bg-emerald-500 py-4 px-3 text-white capitalize ' onClick={buttonSubmit}>{appointmentFee.status}</button>
        </div>
    );
}

export default AppointmentFee;