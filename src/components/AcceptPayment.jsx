import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updatePayment, paymentAccept } from "../redux/action/PaymentAction";
import { sendNotificationLater} from "../redux/action/NotificationAction";
import { toastHandler } from '../ToastHandler';
import moment from 'moment/moment';

function UpdatePaymentModal({ info, setAcceptData, setCancelModal }) {
  const dispatch = useDispatch();
  const { data } = info;

  return (
    <div className={` w-full h-screen bg-gray-900 bg-opacity-75 absolute left-0 top-0 z-40 flex justify-center items-center`}>
      <div className=" z-50">
        <div className="m-auto w-[500px] h-auto p-8 bg-white rounded-lg shadow-lg">

          {/* HEADER */}
          <div className="text-left py-4">
            <h2 className="text-xl font-bold mb-2">Approved Payment</h2>
            <hr />
          </div>

          {/* <div className=' mb-2 '>
              <p className=' text-xs '>Dentist</p>
               
            </div>

            <div className=' mb-2 '>
              <p className=' text-xs '>Payment Method</p>
              <input type='text' value={data.method} className=' capitalize bg-zinc-100 w-full py-2 px-3 text-sm rounded-md ' />
            </div> */}

          <div className=' mb-2 '>
            <p className=' text-xs mb-2 '>Receipt</p>
            <img src={data.paymentPhoto} className=' w-full h-[500px] ' />
          </div>

          <div className="flex justify-end pt-2 gap-2">
            <button className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
              onClick={async() => {
                await dispatch(paymentAccept(data.paymentId));
                const notificationData = {
                  name: "Invoice for Patient Payment",
                  time: moment().format("HH:mm:ss"),
                  date: moment().format("YYYY-MM-DD"),
                  patientId: data.patient.patientId,
                  description: `Your payment for appointment ${moment(data.appointment.appointmentDate).format("L").toString()===moment().format("L").toString() ? "today": "on"} ${moment(data.appointment.appointmentDate).format("MMM DD YYYY")} has been receive`,
                  receiverType: "PATIENT"
                }
                dispatch(sendNotificationLater(notificationData));
                setAcceptData({ ...info, isActive: false })
              }}
            >
              Approved
            </button>
            <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                setCancelModal(true)
                setAcceptData({ ...info, isActive: false })
              }}
            >
              Cancel Payment
            </button>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => setAcceptData({ ...info, isActive: false })}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdatePaymentModal;