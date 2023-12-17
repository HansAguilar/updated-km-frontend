import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toastHandler } from '../ToastHandler';
import { ToastContainer } from 'react-toastify';
import { approvedPayment } from "../redux/action/PaymentAction";
import { acceptAppointment } from "../redux/action/AppointmentAction";
import moment from 'moment';
import appointmentBg from "../assets/appointmentBg.png";
import axios from 'axios';
import { APPOINTMENT_LINK, PAYMENT_LINK } from '../ApiLinks';
import LoadingSpinner from '../components/LoadingSpinner';

function QRScanPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [payment, setPayment] = useState(null);
  const [appointment, setAppointment] = useState(null);
  const todaysDate = moment().format("YYYY-MM-DD");
  const todaysTime = moment();

  
  const fetchPaymentAppointment = async() =>{
      await axios.get(`${PAYMENT_LINK}/fetch/payment_details/${id}`)
      .then((response)=>{
        if(response.data.status !== "APPROVED"){
          setPayment(response.data)
        }else{ setPayment("NA")}
      })
      .catch(err=>console.log());
  }
  const fetchAppointment = async() =>{
    await axios.get(`${APPOINTMENT_LINK}/${id}`)
    .then(response=>setAppointment(response.data))
    .catch(err=>console.log());
}

// const checkIfExistingAppointment = () => {
//   toastHandler("success", "Successfully scan the QR");
// }

  const checkIfExistingAppointment = () => {
    if (appointment) {
     if(appointment.status ==="APPROVED" || appointment.status === "TREATMENT"){
      const appointmentTime = moment(appointment.timeStart, "HH:mm:00").add(15, "minutes");
      const appointmentDate = moment(appointment.appointmentDate).format("YYYY-MM-DD");
      if ((todaysDate.toString() === appointmentDate.toString() && todaysTime.isBefore(appointmentTime))) {
        toastHandler("success", "Successfully scan the QR");
      } else {
        alert("You have no appointment now");
        return navigate("/admin/dashboard/");
      }
     }else{
      alert("You have no appointment now");
      return navigate("/admin/dashboard/");
    }
    }else{
      alert("You have no appointment now");
      return navigate("/admin/dashboard/");
    }
  }

  useEffect(() => {
    fetchAppointment();
    fetchPaymentAppointment();
  }, [id]);

  useEffect(()=>{
    if(appointment || payment){
      checkIfExistingAppointment();
    }
  },[appointment])


  const approvedPaymentButton = () => {
    if (payment?.method !== "cash" && payment?.status !== "APPROVED") {
      return toastHandler("error", "Please pay first your payment online either Gcash or Paymaya");
    }
    if(appointment?.status === "PENDING"){
      return toastHandler("error", "Please approved first the appointment");
    }
    dispatch(approvedPayment(payment?.paymentId));
    toastHandler("success", "Accept payment successfully!");
    setPayment("NA");   
  }

  const backToDashBoard = ()=>{
    window.location.reload(navigate("/admin/dashboard/"));
  }

  const btnSubmitAppointment = () => {
    if(payment){
      if (payment.status === "PENDING" || payment.status === "CHECKING") {
        return toastHandler("error", "Please pay the bill")
      }
    }
    dispatch(acceptAppointment(id));
    backToDashBoard()
  }
  
  return (
    <>
      {
        (!appointment || !payment)? (<div className=' w-full h-screen flex justify-center items-center '>
          <LoadingSpinner loading={true} />
        </div>)
        : (
          <div className='h-screen w-full m-auto flex gap-2 items-center justify-center overflow-hidden relative flex-col'>
          

          <div className='w-[700px] h-auto bg-white p-4 rounded relative shadow'>
            <img src={appointmentBg} className='absolute top-0 left-0 h-48 w-full z-0 rounded' />

            <div className='w-full relative z-0 text-center'>
              <img src={`${appointment.patient.profile}`} className='rounded-lg m-auto w-36 h-36 aspect-auto' alt='Patient Profile' />
              <h3 className='font-medium text-white uppercase'>{appointment.patient.firstname} {appointment.patient.middlename ? `${appointment.patient.middlename.charAt(0)}.` : ''} {appointment.patient.lastname}</h3>
            </div>

            <div className='mt-5 w-full p-5 flex flex-col gap-3'>
              <div className='flex flex-col gap-2 border-b-2 pb-2 border-slate-300'>
                <div className='flex justify-between items-center'>
                  <h1 className='font-semibold text-xl text-slate-700 tracking-wide'>Appointment Information</h1>
                  <div className={`${appointment.status === "PENDING" ? "bg-yellow-100 text-yellow-600" : "bg-green-100 text-green-600"} capitalize transition-all ease-linear duration-150 py-1 px-3 rounded-full text-sm`}>{appointment.status.charAt(0).toUpperCase() + appointment.status.substring(1).toLowerCase()}</div>
                </div>
                <div className='flex flex-col gap-2'>
                  <div className='flex justify-between items-center'>
                    <p className='text-slate-500 font-medium'>Date:</p>
                    <p className='text-slate-700 font-medium'>{moment(appointment.appointmentDate).format("dddd, MMM DD YYYY")}</p>
                  </div>
                  <div className='flex justify-between items-center'>
                    <p className='text-slate-500 font-medium'>Time:</p>
                    <p className='text-slate-700 font-medium'>{moment(appointment.timeStart, "HH:mm").format("LT")} - {moment(appointment.timeEnd, "HH:mm").format("LT")}</p>
                  </div>
                </div>
              </div>

              {
                payment && payment !== "NA" && (
                  <div className='flex flex-col gap-2'>
                    <div className='flex items-center justify-between'>
                      <h1 className='font-semibold text-xl text-slate-700 tracking-wide'>Payment Information</h1>
                    </div>

                    <div className='flex justify-between items-center'>
                      <p className='text-slate-500 font-medium'>Status:</p>
                      <p className={`text-sm font-medium py-1 px-3 rounded-full ${payment?.status === "APPROVED" ? "bg-green-100 capitalize text-green-600" : "bg-yellow-100 text-yellow-600 hover:bg-yellow-400 hover:text-white cursor-pointer"}`} onClick={approvedPaymentButton}>{payment?.status === "PENDING" ? "Accept Payment" : payment?.status.toLowerCase()}</p>
                    </div>

                    <div className='flex flex-col flex-grow gap-2 '>
                      <p className=' w-full capitalize flex justify-between items-start '><span className='text-slate-500 font-medium'>Payment Method:</span> {payment?.method}</p>
                      <p className=' w-full capitalize flex justify-between items-start '><span className='text-slate-500 font-medium'>Payment type:</span> {payment?.type}</p>
                      <p className='bg-slate-200/70 rounded p-2 w-full capitalize flex justify-between items-start text-lg font-semibold mt-2'><span className='text-slate-500'>Total Payment:</span> ₱ {payment?.totalPayment.toLocaleString()}</p>
                    </div>
                  </div>
                )
              }
            </div>

            <button onClick={btnSubmitAppointment} className='uppercase w-full p-4 bg-blue-500 font-semibold tracking-wide text-white rounded hover:bg-blue-700'>CONFIRM</button>
            <ToastContainer />
          </div>
        </div>
        )
      }
    </>
    
  )
}

export default React.memo(QRScanPage);