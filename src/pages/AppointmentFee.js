import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateInfo } from '../redux/action/AppointmentFeeAction';
import * as io from "socket.io-client";
import { SOCKET_LINK } from '../ApiLinks';
import PageHeader from '../components/PageHeader';

const socket = io.connect(SOCKET_LINK);
function AppointmentFee() {
    const appointmentFee = useSelector((state) => state.fee.payload);
    const dispatch = useDispatch();

    const buttonSubmit = () => {
        const data = appointmentFee.status === "AVAILABLE" ? "DISABLE" : "AVAILABLE";
        const result = { value: data };
        dispatch(updateInfo(data));
        socket.emit("change_appointment_fee", JSON.stringify(result))
    }
    return (
        <div className='h-screen overflow-hidden relative bg-gray-200'>
            <PageHeader link={'Appointment Fee'} />

            <div className=' p-10 flex flex-col gap-4'>
                <button className={`${appointmentFee.status === "AVAILABLE" ? "bg-emerald-500 hover:bg-emerald-700" : "bg-red-500 hover:bg-red-700"} rounded  max-w-max py-4 px-3 text-white capitalize`} onClick={buttonSubmit}>{appointmentFee.status === "AVAILABLE" ? "ENABLE" : "DISABLE"}</button>
                <p className={`text-gray-600 capitalize text-xl`}>The appointment fee is <span>{appointmentFee.status === "AVAILABLE" ? "ON" : "OFF"}</span></p>
            </div>
        </div>
    );
}

export default AppointmentFee;