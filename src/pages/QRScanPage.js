import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toastHandler } from '../ToastHandler';
import { ToastContainer } from 'react-toastify';
import { approvedPayment } from "../redux/action/PaymentAction";
import { acceptAppointment } from "../redux/action/AppointmentAction";
import moment from 'moment';


export default function QRScanPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [appointmentDetails, setAppointmentDetails]=useState(null);
  const todaysDate = moment().format("YYYY-MM-DD");
  const todaysTime = moment();


  const appointment = useSelector((state)=>{
    return state.appointment.payload.filter((val)=>{
       return val.appointmentId===id
       && (val.status==="PENDING" || val.status === "APPROVED") })
  });

  const payment = useSelector((state)=>{
    return state.payment.payload.filter(val=>val.appointment.appointmentId===id);
  });

  console.log(payment);

  const checkIfExistingAppointment = () =>{
    if(appointment.length>0){
      const appointmentTime = moment(appointment[0].timeStart, "HH:mm:00").add(10, "minutes");
      const appointmentDate = moment(appointment[0].appointmentDate).format("YYYY-MM-DD");
      console.log(todaysDate.toString()===appointmentDate.toString()&& todaysTime.isBefore(appointmentTime));
      if((todaysDate.toString()===appointmentDate.toString() && todaysTime.isBefore(appointmentTime))){
        setAppointmentDetails(...appointment);
        toastHandler("success","Successfully scan the QR");
      }else{
        toastHandler("error", "Invalid Appointment");
        navigate(-1);
      }
    }else if(appointment.length<1 || appointment === null){
      toastHandler("error", "Appointment not found");
      navigate("/admin/dashboard/");
    }
  }
  useEffect(()=>{
    checkIfExistingAppointment();
  },[id]);
  

  const approvedPaymentButton = () =>{
    if(payment[0]?.method !== "cash"){
      return toastHandler("error", "Please pay first your payment online either Gcash or Paymaya");
    }
    if(payment[0]?.status === "APPROVED") return;
    dispatch(approvedPayment(payment[0].paymentId));
  }

  const btnSubmitAppointment = () =>{
    if(payment[0]?.status === "PENDING"){
      return toastHandler("error","Please pay the bill")
    }
    dispatch(acceptAppointment(id));
    window.location.reload(navigate("/admin/dashboard/"));
  }
  return appointmentDetails && (
    <div className=' w-full h-screen p-5 flex justify-center items-center ' >
      <ToastContainer />
      <div className=' w-auto h-auto bg-white p-5 rounded-md '>

      <div className=' w-full h-auto '>
          <h3 className=' w-full py-3 border-b-2 font-bold text-lg text-zinc-700 '>Patient Profile</h3>
          <div className=' pl-5 py-5 flex flex-grow gap-2 '>
            <img src={`${appointmentDetails.patient.profile}`} className=' w-44 h-44  ' alt='Patient Profile' />
            <div className=' w-72 '>
              <h3 className=' text-md font-bold text-zinc-600 '>{appointmentDetails.patient.firstname} {appointmentDetails.patient.middlename? `${appointmentDetails.patient.middlename}.`:''} {appointmentDetails.patient.lastname}</h3>
              <h4 className=' text-sm text-zinc-500 '>{moment(appointmentDetails.appointmentDate).format("dddd, MMM DD YYYY")} <span className=' text-sm text-cyan-500 '>({moment(appointmentDetails.timeStart, "HH:mm").format("LT")} - {moment(appointmentDetails.timeEnd,"HH:mm").format("LT")})</span></h4>
              <div className={`${appointmentDetails.status==="PENDING" ? " bg-orange-400":"bg-emerald-500"} text-white text-xs px-5 mt-1 py-[2px]  w-fit uppercase rounded-full `}>{appointmentDetails.status.toLowerCase()}</div>
            </div>
          </div>
        </div>

        <div className=' w-full h-auto '>
          <div className=' w-full h-auto flex justify-between items-center py-3 border-b-2 font-bold text-lg text-zinc-700 '>
            <h3>Payment Details </h3>

          <button onClick={approvedPaymentButton} className={`px-5 py-1 ${payment[0]?.status === "APPROVED" ? "bg-emerald-400 cursor-default":"bg-orange-400 cursor-pointer"} capitalize rounded-lg text-white mt-3 font-medium text-sm `}>
            {payment[0]?.status === "PENDING"?"Accept Payment":payment[0]?.status.toLowerCase()}</button>
          </div>
          <div className=' pl-5 py-5 flex flex-col flex-grow gap-2 '>
            <p className=' w-full capitalize flex justify-between items-start '><span className=' text-zinc-600 font-bold '>Payment Method:</span> {payment[0]?.method}</p>
            <p className=' w-full capitalize flex justify-between items-start '><span className=' text-zinc-600 font-bold '>Payment type:</span> {payment[0]?.type}</p>
            <p className=' w-full capitalize flex justify-between items-start '><span className=' text-zinc-600 font-bold '>Total Payment:</span> ₱ {payment[0]?.totalPayment.toLocaleString()}</p>
          </div>
        </div>

        <button onClick={btnSubmitAppointment} className=' w-full py-3 bg-cyan-500 text-white rounded-md '>Done</button>
      </div>
    </div>
  )
}
