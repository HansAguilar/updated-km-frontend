import React, { useEffect, useState, } from 'react';
import { CiCircleRemove } from "react-icons/ci";
import { ToastContainer } from 'react-toastify';
import moment from 'moment/moment';
import { toastHandler } from '../ToastHandler';
import { useDispatch, useSelector } from 'react-redux';
import { BiSearchAlt } from 'react-icons/bi';
import { fetchDentist } from '../redux/action/DentistAction';

const inputStyle = "p-2 border border-slate-300 focus:border-blue-600 rounded text-sm focus:outline-none";

function TreatmentModal({ show, setModal, setCovidModal, appointment, setAppointment, clearData }) {
  const dispatch = useDispatch();
  const patient = useSelector((state) => { return state.patient; });
  const dentist = useSelector((state) => { return state?.dentist; });
  const service = useSelector((state) => { return state.service; });
  const schedule = useSelector((state) => { return state.schedule.payload; });
  const filteredAppointments = useSelector((state) => { return state.appointment.payload.filter((val) => (val.status !== "DONE" && val.status !== "CANCELLED"&& val.status !== "TREATMENT_DONE")) });
  const [availableHMO, setAvailableHMO] = useState(null);
  const [active, setActive] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  let [timeStartList, setTimeStartList] = useState(
    [
      { timeValue: "09:00 Am", timeStart: "09:00:00" },
      { timeValue: "09:30 Am", timeStart: "09:30:00" },
      { timeValue: "10:00 Am", timeStart: "10:00:00" },
      { timeValue: "10:30 Am", timeStart: "10:30:00" },
      { timeValue: "11:00 Am", timeStart: "11:00:00" },
      { timeValue: "11:30 Am", timeStart: "11:30:00" },
      { timeValue: "12:00 Am", timeStart: "12:00:00" },
      { timeValue: "01:00 Pm", timeStart: "13:00:00" },
      { timeValue: "01:30 Pm", timeStart: "13:30:00" },
      { timeValue: "02:00 Pm", timeStart: "14:00:00" },
      { timeValue: "02:30 Pm", timeStart: "14:30:00" },
      { timeValue: "03:00 Pm", timeStart: "15:00:00" },
      { timeValue: "03:30 Pm", timeStart: "15:30:00" },
      { timeValue: "04:00 Pm", timeStart: "16:00:00" },
    ]
  );

  const handleOnChange = (e) => {
    if (e.target.name === "patient") {
      const filteredPatient = patient.payload.filter(v => {
        return v.verified;
      })
        .filter((v) =>
          (v.firstname + v.middlename + v.lastname).toLowerCase().includes(e.target.value.toLowerCase())
        )
      setSuggestions(filteredPatient);
      setActive("patient")
    }
    if (e.target.name === "dentist") {
      const filteredPatient = dentist.payload
        .filter(v => {
          return v.verified;
        })
        .filter((v) =>
          (v.fullname).toLowerCase().includes(e.target.value.toLowerCase())
        )
      setSuggestions(filteredPatient)
      setActive("dentist")
    }
    if (e.target.name === "serviceValue") {
      const filteredService = service.payload
        .filter(v => {
          return v.isAvailable;
        })
        .filter((v) =>
          (v.name).toLowerCase().includes(e.target.value.toLowerCase())
        )
      setSuggestions(filteredService)
      setActive("service")
    }

    setAppointment({
      ...appointment,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    const newTimeList = [
      { timeValue: "09:00 Am", timeStart: "09:00:00" },
      { timeValue: "09:30 Am", timeStart: "09:30:00" },
      { timeValue: "10:00 Am", timeStart: "10:00:00" },
      { timeValue: "10:30 Am", timeStart: "10:30:00" },
      { timeValue: "11:00 Am", timeStart: "11:00:00" },
      { timeValue: "11:30 Am", timeStart: "11:30:00" },
      { timeValue: "12:00 Am", timeStart: "12:00:00" },
      { timeValue: "01:00 Pm", timeStart: "13:00:00" },
      { timeValue: "01:30 Pm", timeStart: "13:30:00" },
      { timeValue: "02:00 Pm", timeStart: "14:00:00" },
      { timeValue: "02:30 Pm", timeStart: "14:30:00" },
      { timeValue: "03:00 Pm", timeStart: "15:00:00" },
      { timeValue: "03:30 Pm", timeStart: "15:30:00" },
      { timeValue: "04:00 Pm", timeStart: "16:00:00" },
    ];

    const currentTime = moment();
    const newTime = currentTime.add(1, "hour");
    const newHour = moment(newTime);

    setTimeStartList([...newTimeList]);

    const filteredTime = newTimeList.filter((val) =>
      moment(appointment.date, 'YYYY-MM-DD').isSame(moment(), 'day') &&
      moment(val.timeStart, 'HH:mm:ss').isAfter(newHour)
    );
    if (filteredTime.length > 0) {
      setTimeStartList(filteredTime);
    } else {
      setTimeStartList([...newTimeList]);
    }

    setTimeStartList((prev) => {
      let updatedSchedList = [...prev];
      const filteredSchedule = schedule.filter((val) => (moment(appointment.date, "YYYY-MM-DD").isSame(moment(val.dateSchedule).format("YYYY-MM-DD")) && val.dentist.dentistId === appointment.dentistId));
      if (filteredSchedule.length > 0) {
        const indicesScheduleToRemain = [];
        for (let x = 0; x < filteredSchedule.length; x++) {
          let start = updatedSchedList.findIndex((val) => val.timeStart === filteredSchedule[x].timeStart);
          let end = updatedSchedList.findIndex((val) => val.timeStart === filteredSchedule[x].timeEnd);

          for (let i = start; i < end; i++) {
            indicesScheduleToRemain.push(i);
          }
        }
        updatedSchedList = updatedSchedList.filter((_, idx) => { return !indicesScheduleToRemain.includes(idx) });
      }
      return updatedSchedList;
    });

    setTimeStartList(prevTimeStartList => {
      let updatedTimeStartList = [...prevTimeStartList];
      const getAppointmentDate = filteredAppointments.filter((value) => {
        return moment(appointment.date, "YYYY-MM-DD").isSame(moment(value.appointmentDate).format("YYYY-MM-DD"));
      });
      if (getAppointmentDate.length > 0) {
        const indexesToRemove = [];
        for (let x = 0; x < getAppointmentDate.length; x++) {
          const start = prevTimeStartList.findIndex((value) => {
            return value.timeStart === getAppointmentDate[x].timeStart;
          });
          const end = prevTimeStartList.findIndex((value) => {
            return value.timeStart === getAppointmentDate[x].timeEnd;
          })
          for (let begin = start; begin < end; begin++) {
            indexesToRemove.push(begin);
          }
        }
        updatedTimeStartList = updatedTimeStartList.filter((_, index) => {
          return !indexesToRemove.includes(index);
        })
      }
      return updatedTimeStartList;
    })
  }, [appointment.date,appointment.dentistId]);

  // INSURANCE
  // useEffect(()=>{
  //   const fetchAllPatientHMO = insurance.filter((val)=>val.patient.patientId===appointment.patientId);
  //   setAvailableHMO(fetchAllPatientHMO);
  // },[appointment.patientId])
  

  const nextButton = async () => {
    // appointment.serviceSelected.length < 1 ||
    if (!appointment.patient || !appointment.dentist || !appointment.date || !appointment.timeStart || !appointment.type || !appointment.method) {
      return toastHandler("error", "Fill up empty field!");
    }
    if (appointment.method === "hmo" && !appointment.insuranceId) return toastHandler("error", "Please select your insurance");

    // const current = new Date();
    // current.setHours(0, 0, 0, 0);
    // const selectedDate = new Date(appointment.date);
    // selectedDate.setHours(0, 0, 0, 0);
    // if (selectedDate < current) return toastHandler("error", "You can't select previous date");

    const checkIfPatientAlreadyHaveAppointment = filteredAppointments.filter((val) => {
      return (
        moment(val.appointmentDate, "YYYY-MM-DD").isSame(moment(appointment.date)) &&
        val.patient.patientId === appointment.patientId
        && (val.status !== "CANCELLED" || val.status !== "DONE" || val.status !== "TREATMENT_DONE" )
        // && val.appointmentId !== appointment.appointmentId
      );
    });

    if (checkIfPatientAlreadyHaveAppointment.length > 0) {
      return toastHandler("error", "You already have an existing appointment on this date!");
    }
    const end = calculateTotalTime();
    const data = { timeEnd: end, }

    const timeTotal = calculateTotalServiceTime();
    const totalTimeDuration = moment('00:00:00', 'HH:mm:ss');

    let start = moment(appointment.timeStart, 'HH:mm:ss');
    while (start.isBefore(moment(end, "HH:mm:ss").add(30, 'minutes'))) {
      const startTime = start.format('HH:mm:ss');
      const matchingTime = timeStartList.find(time => time.timeStart === startTime);

      if (startTime === "12:30:00" || startTime === "16:30:00") {
        toastHandler("error", `Kindly select ${totalTimeDuration.format('HH:mm:ss') === "01:00:00"
          ? '30 minutes'
          : '1 hour'
          } service or change other dates`);
        return;
      }
      if (!matchingTime) {
        if (timeTotal !== totalTimeDuration.format("HH:mm:ss")) {
          toastHandler('error', `Your selected time range should be less than or equal ${totalTimeDuration.format('HH:mm:ss') === "00:30:00"
            ? totalTimeDuration.minute() + ' minutes'
            : totalTimeDuration.hour() + ' hour'
            }`)
          return;
        }
      }
      totalTimeDuration.add(30, 'minutes');
      start.add(30, "minutes");
    }
    setAppointment({ ...appointment, ...data })
    setModal(false);
    setCovidModal(true);
  }
  const calculateTotalServiceTime = () => {
    // const timeEnd = appointment.serviceSelected.map((val)=>{
    //   const result = service.payload.filter((serv)=>{
    //     return serv.serviceId === val;
    //   }).map((val)=>{return val.duration; });
    //   return  result;
    // })
    // let total = 0;
    // for (const duration of timeEnd) {
    //   const timeParts = duration.toLocaleString().split(':');
    //   const hours = parseInt(timeParts[0], 10);
    //   const minutes = parseInt(timeParts[1], 10);
    //   const seconds = parseInt(timeParts[2], 10);

    //   const durationInMillis = (hours * 60 * 60 + minutes * 60 + seconds) * 1000;
    //   total += durationInMillis;
    // }

    const convertTotalTime = moment.duration("00:30:00");
    return moment.utc(convertTotalTime.asMilliseconds()).format('HH:mm:ss');
  }
  const calculateTotalTime = () => {
    const timeStart = moment(appointment.timeStart, "HH:mm:ss");
    // const timeStart = moment("00:30:00", "HH:mm:ss");
    return timeStart.add(calculateTotalServiceTime()).format("HH:mm:ss");
  }
  const calculateTotalAmount = (list) => {
    const totalAmount = list.map((val) => {
      const result = service.payload.find((service) => {
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
    clearData();
    setModal(false);
  };

  const [minDate, setMinDate] = useState(new Date().toISOString().split('T')[0]);
  
  useEffect(()=>{
    if(!dentist){
      dispatch(fetchDentist())
    }
  },[])

  return (
    <div className={`w-full min-h-screen bg-gray-900 bg-opacity-75 fixed inset-0 z-50 flex flex-grow justify-center items-center ${show ? '' : 'hidden'}`}>
      <div className="m-auto w-[900px] min-h-max bg-zinc-100 rounded overflow-auto">
        <ToastContainer limit={1} autoClose={1500} />

        {/*//~ HEADER */}
        <div className='p-4 bg-blue-400'>
          <h2 className="text-2xl text-slate-100 tracking-wider uppercase font-bold">Add Appointment</h2>
        </div>
        {/*//~ HEADER */}

        <form className='grid gap-3 p-4 relative'>

          <div className='flex flex-col w-full pb-4'>
            <h1 className='text-xl font-bold mb-6'>Appointment Information</h1>
            <div className='flex flex-col gap-4'>

              {/*//~ APPOINTMENT NAMES */}
              <div className='flex gap-4'>

                {/*//~ PATIENT NAME */}
                <div className=' mb-2 flex flex-col gap-1 relative w-full'>
                  <BiSearchAlt className="absolute left-2 top-9 text-slate-400" size={24} />
                  <label htmlFor='patient' className='font-medium text-slate-600'>Patient Name</label>
                  <input type='search' name='patient' value={appointment.patient} className={`${inputStyle} indent-8`} onChange={(e) => handleOnChange(e)} />

                  {/*//^ HELPER STYLE */}
                  <ul className={`relative z-10 bg-white outline-none font-medium shadow-md min-w-full ${active === "patient" && appointment.patient !== "" ? 'border border-slate-400' : ''}`}>
                    {
                      active === "patient" && appointment.patient !== "" && suggestions.length > 0 ?
                        suggestions.map((patient) => (
                          <li key={patient.patientId} className='group flex items-center gap-x-2 capitalize p-2 text-slate-600 cursor-pointer hover:bg-blue-500 hover:text-white'
                            onClick={() => {
                              setAppointment({
                                ...appointment,
                                patient: (patient.firstname + " " + patient.middlename + " " + patient.lastname),
                                patientId: patient.patientId
                              });
                              setSuggestions([]);
                              setActive("");
                            }}>
                            <BiSearchAlt className="group-hover:text-white" size={24} />
                            <span>{patient.firstname} {patient.middlename.charAt(0)}. {patient.lastname}</span>
                          </li>
                        ))
                        :
                        active === "patient" && appointment.patient !== "" && suggestions.length < 1 ?
                          <li className='p-2 indent-8 text-red-400 '>No existing patient</li>
                          :
                          ""
                    }
                  </ul>
                  {/*//^ HELPER STYLE */}
                </div>
                {/*//~ PATIENT NAME */}


                {/*//~ DENTIST NAME */}
                <div className=' mb-2 flex flex-col gap-1 relative w-full'>
                  <BiSearchAlt className="absolute left-2 top-9 text-slate-400" size={24} />
                  <label htmlFor='dentist' className='font-medium text-slate-600'>Dentist Name</label>
                  <input type='search' name='dentist' value={appointment.dentist} className={`${inputStyle} indent-8`} onChange={(e) => handleOnChange(e)} />

                  {/*//^ HELPER STYLE */}
                  <ul className={`relative z-10 bg-white outline-none font-medium shadow-md min-w-full ${active === "dentist" && appointment.dentist !== "" ? 'border border-slate-400' : ''}`}>
                    {
                      active === "dentist" && appointment.dentist !== "" && suggestions.length > 0 ? (
                        suggestions.map((dentist) => (
                          <li key={dentist.dentistId} className='group flex items-center gap-x-2 capitalize p-2 text-slate-600 cursor-pointer hover:bg-blue-500 hover:text-white'
                            onClick={() => {
                              setAppointment({
                                ...appointment,
                                dentist: `Dr. ${dentist.fullname}`,
                                dentistId: dentist.dentistId
                              });
                              setSuggestions([]);
                              setActive("");
                            }}>
                            <BiSearchAlt className="group-hover:text-white" size={24} />
                            <span>Dr. {dentist.fullname}</span>
                          </li>
                        ))
                      ) :
                        active === "dentist" && appointment.dentist !== "" && suggestions.length < 1 ?
                          <li className='p-2 indent-8 text-red-400 '>No existing dentist</li>
                          :
                          ""
                    }
                  </ul>
                  {/*//^ HELPER STYLE */}

                </div>
                {/*//~ DENTIST NAME */}


                {/*//~ DENTAL SERVICE */}
                <div className=' mb-2 flex flex-col gap-1 relative w-full'>
                  <BiSearchAlt className="absolute left-2 top-9 text-slate-400" size={24} />
                  <label htmlFor='service' className='font-medium text-slate-600'>Dental Service</label>
                  <input type='search' name='serviceValue' value={appointment.serviceValue} className={`${inputStyle} indent-8`} onChange={(e) => handleOnChange(e)} />

                  {/*//^ HELPER STYLE */}
                  <ul className={`relative z-10 bg-white outline-none font-medium shadow-md min-w-full ${active === "service" && appointment.serviceValue !== "" ? 'border border-slate-400' : ''}`}>
                    {
                      active === "service" && appointment.serviceValue !== "" && suggestions.length > 0 ? (
                        suggestions.map((v) => (
                          <li key={v.serviceId} className='group flex items-center gap-x-2 capitalize p-2 text-slate-600 cursor-pointer hover:bg-blue-500 hover:text-white'
                            onClick={() => {
                              const checkIfExist = appointment.serviceSelected.filter(val => { return val === v.serviceId });
                              if (checkIfExist.length > 0) return toastHandler("error", "You already selected this service");

                              appointment.serviceSelected.push(v.serviceId);
                              setAppointment({ ...appointment, serviceValue: "", });
                              setSuggestions([]);
                              setActive("");
                            }}>
                            <BiSearchAlt className="group-hover:text-white" size={24} />
                            <span>{v.name}</span>
                          </li>
                        ))
                      ) :
                        active === "service" && appointment.serviceValue !== "" && suggestions.length < 1 ?
                          <li className='p-2 indent-8 text-red-400 '>No existing service</li>
                          :
                          ""
                    }
                  </ul>


                  {
                    appointment.serviceSelected.length > 0 && (
                      <div className='rounded py-2 flex flex-wrap gap-2 w-full'>
                        {
                          appointment.serviceSelected.map((serv, index) => {
                            const selectedService = service.payload.find((val) => val.serviceId === serv);

                            return (
                              <p key={index} className="flex gap-2 bg-blue-500 rounded-md p-2 text-white">
                                {selectedService.name}{' '}
                                <span
                                  onClick={() => {
                                    const updatedServices = appointment.serviceSelected.slice();
                                    updatedServices.splice(index, 1);

                                    // const totalAmount = calculateTotalAmount(updatedServices)

                                    setAppointment({ ...appointment, serviceSelected: updatedServices });
                                  }}
                                  className='cursor-pointer'
                                >
                                  <CiCircleRemove size={25} />
                                </span>
                              </p>
                            );
                          })
                        }
                      </div>
                    )
                  }
                  {/*//^ HELPER STYLE */}

                </div>
                {/*//~ DENTAL SERVICE */}

              </div>
              {/*//~ APPOINTMENT NAMES */}


              {/*//~ APPOINTMENT DATE */}
              <div className='flex gap-4'>

                {/*//^ APPOINTMENT RAW STYLE */}
                <div className=' mb-2 flex flex-col gap-1 relative w-full'>
                  <label htmlFor='date' className='font-medium text-slate-600'>Appointment Date</label>
                  <input type='date' name='date' min={minDate} value={appointment.date} className={inputStyle} onChange={(e) => handleOnChange(e)} />
                </div>

                <div className=' mb-2 flex flex-col gap-1 relative w-full'>
                  <label htmlFor='time' className='font-medium text-slate-600'>Appointment Time</label>
                  <select name="timeStart" value={appointment.timeStart} onChange={(e) => handleOnChange(e)} className={inputStyle}>
                    <option value="" disabled >Choose time...</option>
                    {
                      timeStartList
                        .filter((val) => {
                          return val.timeStart !== "12:00:00" && val.timeStart !== "16:00:00";
                        })
                        .map((val, index) => (
                          <option value={val.timeStart} key={index}>{val.timeValue}</option>
                        ))
                    }
                  </select>
                </div>
                {/*//^ APPOINTMENT RAW STYLE */}

              </div>
              {/*//~ APPOINTMENT DATE */}

            </div>
          </div>


          {/*//~ PAYMENT INFORMAITON */}
          <div className='flex flex-col w-full border-t-2 py-4 relative'>
            <h5 className='text-xl font-bold mb-6'>Payment Information</h5>
            <div className='flex gap-4'>

              <div className='flex flex-col gap-1 relative w-full'>
                {/*//~ PAYMENT METHOD */}
                <label htmlFor='payment' className='font-medium text-slate-600'>Payment Method</label>
                <select name="method" value={appointment.method} onChange={(e) => handleOnChange(e)} className={inputStyle}>
                  <option value="" disabled>Select payment method...</option>
                  <optgroup label='Online Payment' className='font-medium'>
                    <option value="e-payment/gcash">GCash</option>
                    <option value="e-payment/paymaya">Paymaya</option>
                  </optgroup>
                  <option value="cash">Cash</option>
                  {availableHMO && availableHMO.length > 0 ? (<option value="hmo">Health Insurance</option>) : ""}
                </select>
                {/*//~ PAYMENT METHOD */}
              </div>

              {/*//~ INSURANCE CARD */}
              {/* {
                appointment.method === "hmo" && availableHMO && availableHMO.length > 0 ?
                  <div className='flex flex-col gap-1 relative w-full'>
                    <label htmlFor='insuranceId' className='font-medium text-slate-600'>Insurance Card</label>
                    <select name="insuranceId" value={appointment.insuranceId} onChange={(e) => handleOnChange(e)} className={inputStyle}>
                      <option value="" disabled >Select your insurance card...</option>
                      {
                        availableHMO.map((val) => (
                          <option value={val.insuranceId} key={val.insuranceId}>{val.card}</option>
                        ))
                      }
                    </select>
                  </div>
                  : ""
              } */}
              {/*//~ INSURANCE CARD */}


              {/*//~ PAYMENT TYPE */}
              <div className='flex flex-col gap-1 relative w-full'>
                <label htmlFor='paymentType' className='font-medium text-slate-600'>Payment Type</label>
                <select name="type" value={appointment.type} onChange={(e) => handleOnChange(e)} className={inputStyle}>
                  <option value="" disabled >Select time...</option>
                  <option value="full-payment">Full Payment</option>
                  {appointment.method !== "hmo" && appointment.totalAmount >= 40000 ? <option value="installment">Installment</option> : ""}
                </select>
              </div>

              {
                appointment.type === "installment" &&
                (
                  <div className='flex flex-col gap-1 relative '>
                    <label htmlFor='serviceValue' className='font-medium text-slate-600'>Installment Duration</label>
                    <select name="numberOfMonths" value={appointment.numberOfMonths} onChange={(e) => handleOnChange(e)} className={inputStyle}>
                      <option value="" disabled >Select duration...</option>
                      <option value={12}>12 Months</option>
                      <option value={6}>6 Months</option>
                      <option value={3}>3 Months</option>
                    </select>
                  </div>
                )
              }
              {/*//~ PAYMENT TYPE */}
            </div>
          </div>
          {/*//~ PAYMENT INFORMAITON */}


          {/*//~ TOTAL DOWNPAYMENT */}
          <div className='flex border-t-2 pt-4'>
            {
              appointment.totalAmount !== 0.00 &&
              (
                <div className='flex items-center gap-4 ml-auto'>
                  <h1 className='text-xl font-medium text-slate-600'>Initial downpayment: </h1>
                  <div className="flex items-center justify-center gap-2">
                    <p className="text-2xl font-bold text-gray-500">₱</p>
                    <p className="text-2xl font-bold text-gray-500">{appointment.totalAmount}</p>
                  </div>
                </div>
              )
            }
          </div>
          {/*//~ TOTAL DOWNPAYMENT */}
        </form>


        {/*//~ BUTTONS */}
        <div className='flex gap-2 p-4 justify-end mt-auto'>
          <button className="py-2 px-4 font-medium bg-gray-300 text-gray-700 rounded hover:bg-gray-400" onClick={btnClose}>Cancel</button>
          <button className="py-2 px-6 font-medium bg-blue-500 text-white rounded hover:bg-blue-700" onClick={nextButton}>Next</button>
        </div>
        {/*//~ BUTTONS */}

      </div>
    </div >
  )
}

export default TreatmentModal