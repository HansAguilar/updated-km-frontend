import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { SERVICES_LINK, PATIENT_LINK, DENTIST_LINK } from '../ApiLinks';
import {CiCircleRemove} from "react-icons/ci"

function AppointmentModal({ show, setModal,setCovidModal, appointment, setAppointment, filteredAppointments }) {
  const [patients, setPatients] = useState([]);
  const [services, setServices] = useState([]);
  const [active, setActive] = useState("");
  const [dentists, setDentists] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  let [timeStartList, setTimeStartList] = useState(
    [
      { timeValue:"09:00 Am", timeStart: "09:00:00" },
      { timeValue:"09:30 Am", timeStart: "09:30:00" },
      { timeValue:"10:00 Am", timeStart: "10:00:00" },
      { timeValue:"10:30 Am", timeStart: "10:30:00" },
      { timeValue:"11:00 Am", timeStart: "11:00:00" },
      { timeValue:"11:30 Am", timeStart: "11:30:00" },
      { timeValue:"12:00 Am", timeStart: "12:00:00" },
      { timeValue:"01:00 Pm", timeStart: "01:00:00" },
      { timeValue:"01:30 Pm", timeStart: "01:30:00" },
      { timeValue:"02:00 Pm", timeStart: "02:00:00" },
      { timeValue:"02:30 Pm", timeStart: "02:30:00" },
      { timeValue:"03:00 Pm", timeStart: "03:00:00" },
      { timeValue:"03:30 Pm", timeStart: "03:30:00" },
      { timeValue:"04:00 Pm", timeStart: "04:00:00" },
    ]
  );

  const fetchPatient = async () => {
    try {
      const response = await axios.get(PATIENT_LINK + 'fetch');
      if (response.data) {
        setPatients(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDentist = async () => {
    try {
      const response = await axios.get(DENTIST_LINK);
      if (response.data) {
        setDentists(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await axios.get(SERVICES_LINK);
      if (response.data) {
        setServices(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

 
  useEffect(() => {
    fetchPatient();
    fetchDentist();
    fetchServices();
    
  },[]);

  const handleOnChange = (e) => {
    if(e.target.name === "patient"){
      const filteredPatient = patients.filter(v=>{
        return v.verified;
      })
      .filter((v)=>
        (v.firstname+v.middlename+v.lastname).toLowerCase().includes(e.target.value.toLowerCase())
      )
      setSuggestions(filteredPatient);
      setActive("patient")
    }
    if(e.target.name === "dentist"){
      const filteredPatient = dentists
      .filter(v=>{
        return v.verified;
      })
      .filter((v)=>
        (v.fullname).toLowerCase().includes(e.target.value.toLowerCase())
      )
      setSuggestions(filteredPatient)
      setActive("dentist")
    }
    if(e.target.name === "serviceValue"){
      const filteredService = services
      .filter(v=>{
        return v.isAvailable;
      })
      .filter((v)=>
        (v.name).toLowerCase().includes(e.target.value.toLowerCase())
      )
      setSuggestions(filteredService)
      setActive("service")
    }

    // DATE LOGIC
    if (e.target.name === "date") {

      const newTimeList = [
        { timeValue: "09:00 Am", timeStart: "09:00:00" },
        { timeValue: "09:30 Am", timeStart: "09:30:00" },
        { timeValue: "10:00 Am", timeStart: "10:00:00" },
        { timeValue: "10:30 Am", timeStart: "10:30:00" },
        { timeValue: "11:00 Am", timeStart: "11:00:00" },
        { timeValue: "11:30 Am", timeStart: "11:30:00" },
        { timeValue: "12:00 Am", timeStart: "12:00:00" },
        { timeValue: "01:00 Pm", timeStart: "01:00:00" },
        { timeValue: "01:30 Pm", timeStart: "01:30:00" },
        { timeValue: "02:00 Pm", timeStart: "02:00:00" },
        { timeValue: "02:30 Pm", timeStart: "02:30:00" },
        { timeValue: "03:00 Pm", timeStart: "03:00:00" },
        { timeValue: "03:30 Pm", timeStart: "03:30:00" },
        { timeValue: "04:00 Pm", timeStart: "04:00:00" },
      ];
      
      setTimeStartList([...newTimeList]);
      setTimeStartList(prevTimeStartList => {
        let updatedTimeStartList = [...newTimeList];
        const getAppointmentDate = filteredAppointments.filter((value)=>{
          return value.status === "APPROVED" && value.date === e.target.value;
        });

       if(getAppointmentDate.length > 0){
        const indexesToRemove =[];
        for(let x = 0; x < getAppointmentDate.length; x++){
          const start = prevTimeStartList.findIndex((value)=>{
            return value.timeStart === getAppointmentDate[x].timeStart;
          });
          const end = prevTimeStartList.findIndex((value)=>{
            return value.timeStart === getAppointmentDate[x].timeEnd;
          })
          indexesToRemove.push(start, end-1);
        }

        updatedTimeStartList = updatedTimeStartList.filter((_, index)=>{
          return !indexesToRemove.includes(index);
        })
       }

       return updatedTimeStartList;
      })
    }
        
        setAppointment({
          ...appointment,
          [e.target.name]: e.target.value
        });
      };
  const nextButton = async () => {

    if(!appointment.patient || !appointment.dentist || appointment.serviceSelected.length < 1 || !appointment.date || !appointment.timeStart){
      return alert("Fill up empty field!");
    }  
    const current = new Date();
    current.setHours(0,0,0,0);
    const selectedDate = new Date(appointment.date);
    selectedDate.setHours(0,0,0,0);
    if(selectedDate < current){
      return alert("You can't select previous date")
    }
    console.log(current < appointment.date)
    const end = calculateTotalTime();
    const data ={
      timeEnd: end.toLocaleTimeString().split(':').map(val => val.padStart(2,'0')).join(':')
      .substring(0, 8),
    }
    setAppointment({
      ...appointment,
      ...data
    })
    setModal(false);
    setCovidModal(true);
  }

  
  const calculateTotalTime = ()=>{
    const timeEnd = appointment.serviceSelected.map((val)=>{
      const result = services.filter((service)=>{
        return service.serviceId === val;
      }).map((val)=>{return val.duration; });
      return  result;
    })
    let total = 0;
    for (const duration of timeEnd) {
      const timeParts = duration.toLocaleString().split(':');
      const hours = parseInt(timeParts[0], 10);
      const minutes = parseInt(timeParts[1], 10);
      const seconds = parseInt(timeParts[2], 10);
    
      const durationInMillis = (hours * 60 * 60 + minutes * 60 + seconds) * 1000;
      total += durationInMillis;
    }
    
    const date = new Date(total);
    const start = new Date(`1970-01-01T${appointment.timeStart}`);
    const end = new Date(start.getTime() + date.getTime());
    return end;
  }

  const calculateTotalAmount =( list ) =>{
    const totalAmount = list.map((val) => {
      const result = services.find((service) => {
          return service.serviceId === val;
          });
          return result.price;
      })
      .reduce((acc, val) => {
        return acc += parseFloat(val);
      }, 0.00);

      return totalAmount;
  }

  const btnClose = () => {
    setModal(false);
  };

  const minDate = new Date().toISOString().split('T')[0];
  return (
    <div
      className={` w-full h-screen bg-gray-900 bg-opacity-75 absolute top-0 z-40 flex justify-center items-center ${
        show ? '' : 'hidden'
      }`}
    >
      <div className=' z-50 h-auto relative'>
        <div className='m-auto w-[900px] h-[750px] overflow-auto p-8 bg-white rounded-lg relative shadow-lg'>
          <div className='text-left py-4 h-auto overflow-auto'>
            <h2 className='text-2xl font-bold mb-2 text-gray-700 '>Add Appointment</h2>
            <hr />
            <br />
            <h5 className=' text-lg font-bold text-gray-500 mb-5 capitalize '>Appointment Information</h5>
            <form className=' grid grid-cols-2 gap-5 px-8 relative '>
              <div className=' mb-2 flex flex-col gap-1 relative '>
                <label htmlFor='patient' className='font-bold text-gray-600 '>
                  Patient Name
                </label>
                <input
                  type='search'
                  name='patient'
                  value={appointment.patient}
                  className=' px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:shadow-md '
                  onChange={(e) => handleOnChange(e)}
                />
                {active==="patient" && appointment.patient !== "" && suggestions.length > 0 && (
                  <ul className='relative z-10 bg-white border border-gray-400 rounded-md shadow-md w-full'>
                    {suggestions.map((patient) => (
                      <li
                        key={patient.patientId}
                        className='px-2 py-1 cursor-pointer hover:bg-gray-100'
                        onClick={() => {
                          setAppointment({
                            ...appointment,
                            patient: (patient.firstname+" "+patient.middlename+" "+patient.lastname),
                            patientId: patient.patientId
                          });
                          setSuggestions([]);
                        }}
                      >
                        {patient.firstname} {patient.middlename} {patient.lastname}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className=' mb-2 flex flex-col gap-1 relative '>
                <label htmlFor='patient' className='font-bold text-gray-600 '>
                  Dentist Name
                </label>
                <input
                  type='search'
                  name='dentist'
                  value={appointment.dentist}
                  className=' px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:shadow-md '
                  onChange={(e) => handleOnChange(e)}
                />
                {active==="dentist" && appointment.dentist !== "" && suggestions.length > 0 && (
                  <ul className='relative z-10 bg-white border border-gray-400 rounded-md shadow-md w-full'>
                    {suggestions.map((dentist) => (
                      <li
                        key={dentist.dentistId}
                        className='px-2 py-1 cursor-pointer hover:bg-gray-100'
                        onClick={() => {
                          setAppointment({
                            ...appointment,
                            dentist: `Dr. ${dentist.fullname}`,
                            dentistId: dentist.dentistId
                          });
                          setSuggestions([]);
                        }}
                      >
                        Dr. {dentist.fullname}
                      </li>
                    ))}
                    </ul>
                )}
              </div>
              <div className=' mb-2 flex flex-col gap-1 relative '>
                <label htmlFor='serviceValue' className='font-bold text-gray-600 '>
                  Dental Service
                </label>
                <input
                  type='search'
                  name='serviceValue'
                  value={appointment.serviceValue}
                  className=' px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:shadow-md '
                  onChange={(e) => handleOnChange(e)}
                />
                {active==="service" && appointment.serviceValue !== "" && suggestions.length > 0 && (
                  <ul className='relative z-10 bg-white border border-gray-400 rounded-md shadow-md w-full'>
                    { suggestions.map((v) => (
                      <li
                        key={v.serviceId}
                        className='px-2 py-1 cursor-pointer hover:bg-gray-100'
                        onClick={() => {
                          const checkIfExist = appointment.serviceSelected.filter(val=>{ return val === v.serviceId });
                          if(checkIfExist.length > 0){
                            return alert("You already select this service")
                          }
                          appointment.serviceSelected.push(v.serviceId);
                          const totalAmount = calculateTotalAmount(appointment.serviceSelected);
                          
                          setAppointment({
                            ...appointment,
                            serviceValue: "",
                            totalAmount: totalAmount
                          });
                          setSuggestions([]);
                        }}
                      >
                        {v.name}
                      </li>
                    ))}
                    </ul>
                )}
                {
                  appointment.serviceSelected.length > 0 && (
                    <div className=' rounded-sm w-full py-2 flex flex-wrap gap-2 '>
                      {appointment.serviceSelected.map((service, index) => {
                        const selectedService = services.find((val) => val.serviceId === service);

                        return (
                          <p key={index} className="flex gap-2 bg-cyan-500 rounded-md px-3 py-1 text-white">
                            {selectedService.name}{' '}
                            <span
                              onClick={() => {
                                const updatedServices = appointment.serviceSelected.slice();
                                updatedServices.splice(index, 1);
                                
                                const totalAmount = calculateTotalAmount(updatedServices)

                                setAppointment({ ...appointment, serviceSelected: updatedServices, totalAmount: totalAmount });
                              }}
                              className='cursor-pointer'
                            >
                              <CiCircleRemove size={25} />
                            </span>
                          </p>
                        );
                      })}
                    </div>
                  )
                }
              </div>
              <div className=' mb-2 flex flex-col gap-1 relative '>
                <label htmlFor='date' className='font-bold text-gray-600 '>
                  Appointment Date
                </label>
                <input
                  type='date'
                  name='date'
                  min={minDate}
                  value={appointment.date}
                  className=' px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:shadow-md '
                  onChange={(e) => handleOnChange(e)}
                />
              </div>
              <div className=' mb-2 flex flex-col gap-1 relative '>
              <label htmlFor='date' className='font-bold text-gray-600 '>
                  Appointment Time
                </label>
                <select name="timeStart" value={appointment.timeStart} onChange={(e) => handleOnChange(e)} className=' px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:shadow-md '>
                  <option value=" " disabled >Choose time...</option>
                  {
                    timeStartList
                    .filter((val)=>{
                      return val.timeStart !== "12:00:00" && val.timeStart !== "04:00:00";
                    })
                    .map((val, index)=>(
                      <option value={val.timeStart} key={index}
                      
                      >{val.timeValue}</option>
                    ))
                  }
                </select>
              </div>

            </form>


              <div className=' w-full h-500 bg-white relative mt-3 '>
                <h5 className=' text-lg font-semibold text-gray-500 mb-5 capitalize '>Payment Information</h5>
                <form className=' grid grid-cols-2 gap-5 px-8 relative '>
                  <div className=' mb-2 flex flex-col gap-1 relative '>
                    <label htmlFor='patient' className='font-bold text-gray-600 '>
                      Payment Method
                    </label>
                    <select name="method" value={appointment.method} onChange={(e)=>handleOnChange(e)} className=' px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:shadow-md '>
                      <optgroup label='Online Payment' className=' font-semibold '>
                        <option value="e-payment/gcash">GCash</option>
                        <option value="e-payment/paymaya">Paymaya</option>
                      </optgroup>
                      <option value="cash">Cash</option>
                      <option value="hmo">Health Insurance</option>
                    </select>
                    </div>
                    <div className=' mb-2 flex flex-col gap-1 relative '>
                      <label htmlFor='serviceValue' className='font-bold text-gray-600 '>
                        Total Payment
                      </label>
                      <input
                        type='number'
                        name='totalAmount'
                        value={appointment.totalAmount}
                        disabled
                        className=' px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:shadow-md '
                        onChange={(e) => handleOnChange(e)}
                      />
                    </div>
                    <div className=' mb-2 flex flex-col gap-1 relative '>
                      <label htmlFor='serviceValue' className='font-bold text-gray-600 '>
                        Payment Type
                      </label>
                      <select name="type" value={appointment.type} onChange={(e) => handleOnChange(e)} className=' px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:shadow-md '>
                        <option value="" disabled >Select time...</option>
                        <option value="full-payment">Full Payment</option>
                        {
                          appointment.method !== "hmo" && appointment.totalAmount >= 40000 ? <option value="installment">Installment</option> : ""
                        }
                      </select>
                    </div>
                </form>
              </div>


            </div>
            <div className=" w-full flex justify-end relative left-0 px-7 py-4 bottom-0 pt-2 gap-2 z-40">
                <button className="bg-cyan-500 px-14 py-4 hover:bg-cyan-700 text-white font-bold  rounded" 
                onClick={nextButton}
                >
                Next
              </button>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold px-14 py-4 rounded" onClick={btnClose}>
                Close
              </button>
            </div>

            
          </div>
        </div>
    </div>
  )
}

export default AppointmentModal