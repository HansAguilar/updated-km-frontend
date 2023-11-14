import React from 'react';
import logo from '../assets/small-logo.jpg';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { ToastContainer } from 'react-toastify';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { createAppointment, fetchPatientAppointment } from "../redux/action/AppointmentAction";
import { sendNotification } from "../redux/action/NotificationAction";
import { fetchPatientPayments } from "../redux/action/PaymentAction";
import { toastHandler } from '../ToastHandler';

function CovidServiceModal({ show, setModal, setAddModal, data, setAppointment,clearData }) {
  const dispatch = useDispatch();

  const backPrevious = () => {
    setModal(false);
    setAddModal(true);

  }

  const btnSubmit = async () => {
    const newData = {
      patient: data.patientId,
      dentist: data.dentistId,
      dentalServices: data.serviceSelected,
      date: data.date,
      timeStart: data.timeStart,
      timeEnd: data.timeEnd,
      numberOfMonths: data.numberOfMonths,
      timeSubmitted: moment(new Date().getTime()).format("HH:mm:ss"),
      totalAmount: data.totalAmount,
      method: data.method,
      type: data.type,
      insuranceId: data.insuranceId
    }
    const notificationData = {
      name: "Created an Appointment",
      time: moment().format("HH:mm:ss"),
      date: moment().format("YYYY-MM-DD"),
      patientId: data.patientId,
      description: `You have new appointment ${moment(data.date).format("L").toString()===moment().format("L").toString() ? "today": "on"} ${moment(data.date).format("MMM DD YYYY")}`,
      receiverType: "PATIENT"
    }
    dispatch(createAppointment(newData, setModal,clearData));
    dispatch(sendNotification(notificationData));
  }
  const rules = [
    {
      title: "Appointment Scheduling",
      description: " Patients are required to schedule their appointments with our dental clinic in advance. Appointments can be scheduled over the phone, through our website or in person. We recommend that you schedule your appointment as soon as possible to ensure availability."
    },
    {
      title: "Cancellation Policy",
      description: "We understand that unforeseen circumstances may arise that could force you to cancel your appointment. However, we kindly ask that you give us at least 24 hours notice if you need to cancel or reschedule your appointment. Failure to provide sufficient notice may result in a cancellation fee or the loss of your deposit."
    },
    {
      title: "Late Arrivals",
      description: "We ask that patients arrive on time for their appointments. If you are running late, please notify us as soon as possible. If you arrive late for your appointment, we may not be able to see you and you may need to reschedule for a later time."
    },
    {
      title: "Payment Policy",
      description: "Payment is due at the time of your appointment. We accept cash, e-payment and insurance payments. If you have dental insurance, we will need to verify your coverage before your appointment."
    },
    {
      title: "Insurance",
      description: "We accept most major dental insurance plans. Please bring your insurance card with you to your appointment. If your insurance requires a co-pay or deductible, it will be due at the time of your appointment."
    },
    {
      title: "Treatment Plans",
      description: "Our dentists will create a personalized treatment plan for each patient based on their individual needs. We will provide a detailed explanation of the treatment plan, including the estimated cost and duration of treatment. If you have any questions or concerns, please do not hesitate to ask."
    },
    {
      title: "Consent Forms",
      description: "Before any treatment is performed, patients will be required to sign consent forms. These forms will provide information about the treatment, the risks and benefits, and any alternatives that may be available."
    },
    {
      title: "Privacy Policy",
      description: "Our dental clinic takes patient privacy very seriously. We will not share your personal information with any third parties without your consent."
    },
    {
      title: "Emergencies",
      description: "If you experience a dental emergency outside of our regular office hours, please call our emergency number for assistance."
    },
    {
      title: "Agreement",
      description: "By scheduling an appointment with our dental clinic, you agree to these terms and conditions."
    },
  ]
  return (
    <div className={`w-full min-h-screen bg-gray-900 bg-opacity-75 absolute -top-10 z-10 flex flex-grow justify-center items-center ${show ? '' : 'hidden'}`}>
      <div className="m-auto w-[900px] h-[700px] bg-white rounded overflow-auto">
        <ToastContainer limit={1} autoClose={1500} />

        <div className='grid gap-3 p-4'>

          {/* Title */}
          <div className=' w-full p-4 flex flex-col justify-center items-center gap-2 relative '>
            <div className=' w-auto h-auto p-2 text-white rounded-full absolute top-4 left-4 bg-blue-500 cursor-pointer ' onClick={backPrevious}>
              <IoMdArrowRoundBack size={30} />
            </div>
            <img src={logo} alt="logo" className=' w-20 h-20 rounded-full shadow-md ' />
            <h1 className=' text-4xl font-semibold text-slate-600 '>Terms and Conditions</h1>
          </div>

          {/* Header */}
          <div className=' w-full p-4  '>
            <h1 className=' text-2xl font-bold text-slate-400 tracking-wide'>Appointment Usage</h1>
            <h3 className=' text-md font-bold mb-4 text-orange-500 '>Last Revised: April 22, 2023</h3>
            <p className=' text-slate-500 leading-7'>These terms and conditions outline the policies and procedures for scheduling and attending appointments at our dental clinic. They cover important topics such as appointment scheduling, cancellation and payment policies, insurance coverage, personalized treatment plans, consent forms, patient privacy, emergency procedures, and agreement to these terms and conditions. By scheduling an appointment with our dental clinic, patients agree to abide by these terms and conditions.</p>
          </div>

          {/* Conditions */}
          {
            rules.map((rule, index) => (
              <div className=' w-full p-4 ' key={index}>
                <h1 className=' text-lg font-bold text-slate-500 uppercase tracking-wider '>{index + 1}. {rule.title}</h1>
                <p className=' text-slate-500 leading-7 '>{rule.description}</p>
              </div>
            ))
          }

          <div className='flex p-4 justify-end'>
            <button className='p-4 bg-blue-500 font-medium text-white rounded hover:bg-blue-700' onClick={btnSubmit}>I accept the agreement</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CovidServiceModal