import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toastHandler } from '../ToastHandler';
import { ToastContainer } from 'react-toastify';
import { approvedPayment } from "../redux/action/PaymentAction";
import { acceptAppointment } from "../redux/action/AppointmentAction";
import moment from 'moment';
import appointmentBg from "../assets/appointmentBg.png";

export default function QRScanPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const todaysDate = moment().format("YYYY-MM-DD");
  const todaysTime = moment();

  const appointment = useSelector((state) => {
    return state.appointment.payload.filter((val) => {
      return val.appointmentId === id
        && (val.status === "APPROVED" || val.status === "TREATMENT")
    })
  });

  const payment = useSelector((state) => {
    return state.payment.payload.filter(val => val.appointment.appointmentId === id);
  });

  const checkIfExistingAppointment = () => {
    const appointmentTime = moment(appointment[0].timeStart, "HH:mm:00").add(10, "minutes");
    const appointmentDate = moment(appointment[0].appointmentDate).format("YYYY-MM-DD");
    setAppointmentDetails(...appointment);
    toastHandler("success", "Successfully scan the QR");
  }

  // const checkIfExistingAppointment = () => {
  //   if (appointment.length > 0) {
  //     const appointmentTime = moment(appointment[0].timeStart, "HH:mm:00").add(10, "minutes");
  //     const appointmentDate = moment(appointment[0].appointmentDate).format("YYYY-MM-DD");
  //     console.log(todaysDate.toString() === appointmentDate.toString() && todaysTime.isBefore(appointmentTime));
  //     if ((todaysDate.toString() === appointmentDate.toString() && todaysTime.isBefore(appointmentTime))) {
  //       setAppointmentDetails(...appointment);
  //       toastHandler("success", "Successfully scan the QR");
  //     } else {
  //       toastHandler("error", "Invalid Appointment");
  //       navigate(-1);
  //     }
  //   }
  //   else if (appointment.length < 1 || appointment === null) {
  //     toastHandler("error", "Appointment not found");
  //     navigate("/admin/dashboard/");
  //   }
  // }
  useEffect(() => {
    checkIfExistingAppointment();
  }, [id]);


  const approvedPaymentButton = () => {
    if (payment[0]?.method !== "cash" && payment[0]?.status !== "APPROVED") {
      return toastHandler("error", "Please pay first your payment online either Gcash or Paymaya");
    }
    dispatch(approvedPayment(payment[0].paymentId));
  }

  const btnSubmitAppointment = () => {
    if (payment[0]?.status === "PENDING") {
      return toastHandler("error", "Please pay the bill")
    }
    if (payment[0]?.status === "TREATMENT") {

    } else {
      dispatch(acceptAppointment(id));
    }
    window.location.reload(navigate("/admin/dashboard/"));
  }
  return appointmentDetails && (
    <div className='h-screen w-full m-auto flex gap-2 items-center justify-center overflow-hidden relative flex-col'>
      <ToastContainer limit={1} autoClose={1500} />

      <div className='w-[700px] h-[620px] bg-white p-4 rounded relative shadow'>
        <img src={appointmentBg} className='absolute top-0 left-0 h-48 w-full z-0 rounded' />

        <div className='w-full relative z-0 text-center'>
          <img src={`${appointmentDetails.patient.profile}`} className='rounded-lg m-auto w-36 h-36 aspect-auto' alt='Patient Profile' />
          <h3 className='font-medium text-white uppercase'>{appointmentDetails.patient.firstname} {appointmentDetails.patient.middlename ? `${appointmentDetails.patient.middlename}.` : ''} {appointmentDetails.patient.lastname}</h3>
        </div>

        <div className='mt-5 w-full p-5 flex flex-col gap-3'>
          <div className='flex flex-col gap-2 border-b-2 pb-2 border-slate-300'>
            <div className='flex justify-between items-center'>
              <h1 className='font-semibold text-xl text-slate-700 tracking-wide'>Appointment Information</h1>
              <div className={`${appointmentDetails.status === "PENDING" ? "bg-yellow-100 text-yellow-600" : "bg-green-100 text-green-600"} transition-all ease-linear duration-150 py-1 px-3 rounded-full text-sm`}>{appointmentDetails.status.charAt(0).toUpperCase() + appointmentDetails.status.substring(1).toLowerCase()}</div>
            </div>
            <div className='flex flex-col gap-2'>
              <div className='flex justify-between items-center'>
                <p className='text-slate-500 font-medium'>Date:</p>
                <p className='text-slate-700 font-medium'>{moment(appointmentDetails.appointmentDate).format("dddd, MMM DD YYYY")}</p>
              </div>
              <div className='flex justify-between items-center'>
                <p className='text-slate-500 font-medium'>Time:</p>
                <p className='text-slate-700 font-medium'>{moment(appointmentDetails.timeStart, "HH:mm").format("LT")} - {moment(appointmentDetails.timeEnd, "HH:mm").format("LT")}</p>
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <div className='flex items-center justify-between'>
              <h1 className='font-semibold text-xl text-slate-700 tracking-wide'>Payment Information</h1>
            </div>

            <div className='flex justify-between items-center'>
              <p className='text-slate-500 font-medium'>Status:</p>
              <p className={`text-sm font-medium py-1 px-3 rounded-full ${payment[0]?.status === "APPROVED" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600 hover:bg-yellow-400 hover:text-white cursor-pointer"}`} onClick={approvedPaymentButton}>{payment[0]?.status === "PENDING" ? "Accept Payment" : payment[0]?.status.toLowerCase()}</p>
            </div>

            <div className='flex flex-col flex-grow gap-2 '>
              <p className=' w-full capitalize flex justify-between items-start '><span className='text-slate-500 font-medium'>Payment Method:</span> {payment[0]?.method}</p>
              <p className=' w-full capitalize flex justify-between items-start '><span className='text-slate-500 font-medium'>Payment type:</span> {payment[0]?.type}</p>
              <p className='bg-slate-200/70 rounded p-2 w-full capitalize flex justify-between items-start text-lg font-semibold mt-2'><span className='text-slate-500'>Total Payment:</span> ₱ {payment[0]?.totalPayment.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <button onClick={btnSubmitAppointment} className='uppercase w-full p-4 bg-blue-500 font-semibold tracking-wide text-white rounded hover:bg-blue-700'>CONFIRM</button>
      </div>
    </div>
  )
}