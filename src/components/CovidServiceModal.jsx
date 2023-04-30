import React from 'react';
import logo from '../assets/small-logo.jpg';
import { IoMdArrowRoundBack } from 'react-icons/io';
import axios from 'axios';
import { APPOINTMENT_LINK } from '../ApiLinks';

function CovidServiceModal({show, setModal, setAddModal, data}) {

  const backPrevious = () =>{
    setModal(false);
    setAddModal(true);
    
  }

  const btnSubmit = async() =>{
    const newData = {
      patient: data.patientId,
      dentist: data.dentistId,
      dentalServices: data.serviceSelected,
      date: data.date,
      timeStart: data.timeStart,
      timeEnd: data.timeEnd,
      totalAmount: data.totalAmount,
      method: data.method,
      type: data.type,
      insuranceId: data.insuranceId
    }
    try {
        const response = await axios.post(APPOINTMENT_LINK, newData);
        if(response.data){
          alert(response.data.message);
          window.location.reload();
        }
      } catch (error) {
        alert(error.response.data.message);
      }
  }
  const rules = [
    {
      title: "Appointment Scheduling",
      description:" Patients are required to schedule their appointments with our dental clinic in advance. Appointments can be scheduled over the phone, through our website or in person. We recommend that you schedule your appointment as soon as possible to ensure availability."
    },
    {
      title: "Cancellation Policy",
      description:"We understand that unforeseen circumstances may arise that could force you to cancel your appointment. However, we kindly ask that you give us at least 24 hours notice if you need to cancel or reschedule your appointment. Failure to provide sufficient notice may result in a cancellation fee or the loss of your deposit."
    },
    {
      title: "Late Arrivals",
      description:"We ask that patients arrive on time for their appointments. If you are running late, please notify us as soon as possible. If you arrive late for your appointment, we may not be able to see you and you may need to reschedule for a later time."
    },
    {
      title: "Payment Policy",
      description:"Payment is due at the time of your appointment. We accept cash, e-payment and insurance payments. If you have dental insurance, we will need to verify your coverage before your appointment."
    },
    {
      title: "Insurance",
      description:"We accept most major dental insurance plans. Please bring your insurance card with you to your appointment. If your insurance requires a co-pay or deductible, it will be due at the time of your appointment."
    },
    {
      title: "Treatment Plans",
      description:"Our dentists will create a personalized treatment plan for each patient based on their individual needs. We will provide a detailed explanation of the treatment plan, including the estimated cost and duration of treatment. If you have any questions or concerns, please do not hesitate to ask."
    },
    {
      title: "Consent Forms",
      description:"Before any treatment is performed, patients will be required to sign consent forms. These forms will provide information about the treatment, the risks and benefits, and any alternatives that may be available."
    },
    {
      title: "Privacy Policy",
      description:"Our dental clinic takes patient privacy very seriously. We will not share your personal information with any third parties without your consent."
    },
    {
      title: "Emergencies",
      description:"If you experience a dental emergency outside of our regular office hours, please call our emergency number for assistance."
    },
    {
      title: "Agreement",
      description:"By scheduling an appointment with our dental clinic, you agree to these terms and conditions."
    },
  ]
  return (
    <div
        className={` w-full h-screen bg-gray-900 bg-opacity-75 absolute top-0 z-40 flex justify-center items-center ${
        show ? '' : 'hidden'
        }`}
    >
        <div className=' z-50 h-auto relative'>
            <div className='m-auto w-[900px] h-[750px] overflow-auto p-8 bg-white rounded-lg relative shadow-lg '>

              {/* Title */}
              <div className=' w-full p-4 flex flex-col justify-center items-center gap-y-4 relative '>
                <div className=' w-auto h-auto p-2 text-white rounded-full absolute top-0 left-0 bg-cyan-500 cursor-pointer ' onClick={backPrevious}>
                  <IoMdArrowRoundBack size={35} />
                </div>
                <img src={logo} alt="logo" className=' w-20 h-20 rounded-full shadow-md ' />
                <h1 className=' text-3xl font-semibold text-cyan-500 '>Terms and Conditions</h1>
              </div>

               {/* Header */}
               <div className=' w-full p-4  '>
                <h1 className=' text-2xl font-bold text-gray-500 '>Appointment Usage</h1>
                <h3 className=' text-md font-bold mb-4 text-cyan-500 '>Last Revised: April 22, 2023</h3>
                <p className=' text-gray-500 '>These terms and conditions outline the policies and procedures for scheduling and attending appointments at our dental clinic. They cover important topics such as appointment scheduling, cancellation and payment policies, insurance coverage, personalized treatment plans, consent forms, patient privacy, emergency procedures, and agreement to these terms and conditions. By scheduling an appointment with our dental clinic, patients agree to abide by these terms and conditions.</p>
              </div>

              {/* Conditions */}
                {
                  rules.map((rule, index)=>(
                    <div className=' w-full p-4  ' key={index}>
                      <h1 className=' text-lg font-bold text-gray-500 '>{index+1}. {rule.title}</h1>
                      <p className=' text-gray-500 '>{rule.description}</p>
                      </div>
                  ))
                }
              
              <div className='w-full p-4 flex justify-end gap-3 '>
                  <button className='px-6 py-4 rounded-md bg-cyan-500 text-white ' onClick={btnSubmit}>I accept, the agreement</button>
                  <button className='px-10 py-4 rounded-md bg-gray-500 text-white' onClick={()=>setModal(false)}>Close</button>
              </div>
            </div>
        </div>
    </div>
  )
}

export default CovidServiceModal