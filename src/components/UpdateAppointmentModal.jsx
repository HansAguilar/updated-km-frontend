import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import moment from 'moment/moment';
import { CiCircleRemove } from "react-icons/ci"
import { updateAppointment } from "../redux/action/AppointmentAction";
import { toastHandler } from '../ToastHandler';
import { BiSearchAlt } from 'react-icons/bi';

const inputStyle = "p-2 border border-slate-300 focus:border-blue-600 rounded text-sm focus:outline-none";

function UpdateAppointmentModal({ show, setModal, initialAppointment }) {
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
  const [minDate, setMinDate] = useState(new Date().toISOString().split('T')[0]);
  const dispatch = useDispatch();
  const dentist = useSelector((state) => { return state.dentist; });
  const service = useSelector((state) => { return state.service; });
  const schedule = useSelector((state)=>state.schedule.payload);
  const filteredAppointments = useSelector((state) => { return state.appointment.payload.filter((val) => (val.status !== "DONE" && val.status !== "CANCELLED"&& val.status !== "TREATMENT_DONE")) });

  const serviceIds = initialAppointment?.dentalServices.map((val) => val.serviceId);

  const [appointment, setAppointment] = useState({
    patient: `${initialAppointment?.patient.firstname} ${initialAppointment?.patient.lastname}`,
    dentist: initialAppointment?.dentist.fullname,
    dentistId: initialAppointment?.dentist.dentistId,
    serviceSelected: [...serviceIds],
    date: initialAppointment?.appointmentDate,
    timeStart: initialAppointment?.timeStart,
    timeEnd: initialAppointment?.timeEnd,
    timeSubmitted: initialAppointment?.timeSubmitted,
  });
  const initialTime = timeStartList.filter(v=>v.timeStart===initialAppointment?.timeStart).map((v)=>v.timeValue)
  const timeStartRef = useRef(`${initialTime[0]}`);
  const [active, setActive] = useState("");
  const [suggestions, setSuggestions] = useState([]);


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

    // const removeCurrentTime = newTimeList.filter((val)=>val.timeStart!==appointment.timeStart && val.timeStart!==appointment.timeEnd)
    const filteredTime = newTimeList.filter((val) =>
      moment(appointment.date, 'YYYY-MM-DD').isSame(moment(), 'day') &&
      moment(val.timeStart, 'HH:mm:ss').isAfter(newHour)
    );
    if (filteredTime.length > 0) {
      setTimeStartList(filteredTime);
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

    //REMOVE ALL THE OTHER PATIENT APPOINTMENT
    setTimeStartList(prevTimeStartList => {
      let updatedTimeStartList = [...prevTimeStartList];
      const getAppointmentDate = filteredAppointments.filter((value) => {
        return moment(value.appointmentDate, "YYYY-MM-DD").isSame(moment(appointment.date)) 
        && value.patient.patientId !== initialAppointment.patient.patientId
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
  }, [timeStartRef.current,appointment.date, appointment.dentistId])

  const handleOnChange = (e) => {
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
    if(e.target.name === "timeValue"){
      const timeStartValue = timeStartList.filter((v)=>v.timeValue===e.target.value);
      setAppointment({ ...appointment, ["timeStart"]:timeStartValue[0].timeStart });
      timeStartRef.current = e.target.value;
    }
    else{ setAppointment({ ...appointment, [e.target.name]: e.target.value }); }
  };

  const nextButton = () => {
    if (!appointment.dentist || !appointment.date || !appointment.timeStart || appointment.serviceSelected.length < 1) {
      return toastHandler("error", "Fill up empty field!");
    }
    if (appointment.method === "hmo" && !appointment.insuranceId) {
      return toastHandler("error", "Please select your insurance");
    }

    const checkIfPatientAlreadyHaveAppointment = filteredAppointments.filter((val) =>
      moment(val.appointmentDate, "YYYY-MM-DD").isSame(moment(appointment.date))
      && val.patient.patientId === initialAppointment.patient.patientId
      && val.appointmentId !== initialAppointment.appointmentId
    );
    if(checkIfPatientAlreadyHaveAppointment.length > 0){
      return toastHandler("error", "You already have existing appointment in this date!")
    }
    // const current = new Date();
    // current.setHours(0, 0, 0, 0);
    // const selectedDate = new Date(appointment.date);
    // selectedDate.setHours(0, 0, 0, 0);
    // if (selectedDate < current) {
    //   return alert("You can't select previous date")
    // }
    const end = calculateTotalTime();
    const data = {
      timeEnd: end,
    }

    const timeTotal = calculateTotalServiceTime();
    const totalTimeDuration = moment('00:00:00', 'HH:mm:ss');

    let start = moment(appointment.timeStart, 'HH:mm:ss');
    while (start.isBefore(moment(end, "HH:mm:ss").add(30, 'minutes'))) {
      const startTime = start.format('HH:mm:ss');
      const matchingTime = timeStartList.find(time => time.timeStart === startTime);
      console.log("start time", startTime);
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
    const result = {
      dentist: appointment.dentistId,
      dentalServices: appointment.serviceSelected,
      date: appointment.date,
      timeStart: appointment.timeStart,
      timeEnd:end
    }
    dispatch(updateAppointment(initialAppointment.appointmentId, result));
    setModal(false);
  }
  const calculateTotalServiceTime = () => {
    const timeEnd = appointment.serviceSelected.map((val) => {
      const result = service.payload.filter((serv) => {
        return serv.serviceId === val;
      }).map((val) => { return val.duration; });
      return result;
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

    const convertTotalTime = moment.duration("00:30:00");
    return moment.utc(convertTotalTime.asMilliseconds()).format('HH:mm:ss');
  }
  const calculateTotalTime = () => {
    const timeStart = moment(appointment.timeStart, "HH:mm:ss");
    // const timeStart = moment("00:30:00", "HH:mm:ss");
    return timeStart.add(calculateTotalServiceTime()).format("HH:mm:ss");
  }

  const btnClose = () => setModal(false);

  return initialAppointment && (
    <div className={`w-full h-screen bg-gray-900 bg-opacity-75 fixed inset-0 z-50 flex flex-grow justify-center items-center ${show ? '' : 'hidden'}`}>
      <div className="m-auto w-[900px] min-h-max bg-zinc-100 rounded overflow-auto ">
        <ToastContainer limit={1} autoClose={1500} />

        {/*//~ HEADER */}
        <div className='p-4 bg-blue-400'>
          <h2 className="text-2xl text-slate-100 tracking-wider uppercase font-bold">Update Appointment</h2>
        </div>
        {/*//~ HEADER */}


        <form action="post" className='grid gap-3 p-4 border-t-2' >

          {/*//~ PATIENT NAME */}
          <div className='flex gap-4'>
            <div className='flex flex-col w-full gap-1'>
              <label htmlFor='patient' className='font-medium text-slate-600'> Patient Name</label>
              <input type='search' name='patient' value={appointment.patient} className={`${inputStyle}`} disabled onChange={(e) => handleOnChange(e)} />
            </div>

          </div>
          {/*//~ PATIENT NAME */}


          {/*//~ DENTIST NAME */}
          <div className='mb-2 flex flex-col gap-1 relative w-full'>
            <BiSearchAlt className="absolute left-2 top-9 text-slate-400" size={24} />
            <label htmlFor='patient' className='font-medium text-slate-600'>Dentist Name</label>
            <input type='search' name='dentist' value={appointment.dentist} className={`${inputStyle} indent-8`} onChange={(e) => handleOnChange(e)} />

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
          </div>
          {/*//~ DENTIST NAME */}


          {/*//~ DENTAL SERVICE */}
          <div className=' mb-2 flex flex-col gap-1 relative w-full'>
            <BiSearchAlt className="absolute left-2 top-9 text-slate-400" size={24} />
            <label htmlFor='service' className='font-medium text-slate-600'>Dental Service</label>
            <input type='search' name='serviceValue' id='service' value={appointment.serviceValue} className={`${inputStyle} indent-8`} onChange={(e) => handleOnChange(e)} />

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

          {/*//~ APPOINTMENT DATE */}
          <div className='flex gap-4'>

            {/*//^ APPOINTMENT RAW STYLE */}
            <div className=' mb-2 flex flex-col gap-1 relative w-full'>
              <label htmlFor='date' className='font-medium text-slate-600'>Appointment Date</label>
              <input type='date' name='date' id='date' min={minDate} value={appointment.date} className={inputStyle} onChange={(e) => handleOnChange(e)} />
            </div>

            <div className=' mb-2 flex flex-col gap-1 relative w-full'>
              <label htmlFor='time' className='font-medium text-slate-600'>Appointment Time</label>
              <select id='time' name="timeValue" value={timeStartRef.current} onChange={(e) => handleOnChange(e)} className={inputStyle}>
                {
                  timeStartList
                    .filter((val) => {
                      return val.timeStart !== "12:00:00" && val.timeStart !== "16:00:00";
                    })
                    .map((val, index) => (
                      <>
                      {
                        val.timeValue === timeStartRef.current
                        ? <option value={val.timeValue} key={index} disabled>{val.timeValue}</option>
                        :<option value={val.timeValue} key={index}>{val.timeValue}</option>
                      }
                      </>
                    ))
                }
              </select>
            </div>
            {/*//^ APPOINTMENT RAW STYLE */}

          </div>
          {/*//~ APPOINTMENT DATE */}
        </form>

        {/*//~ BUTTONS */}
        <div className='flex gap-2 p-4 justify-end mt-auto'>
          <button className="py-2 px-4 font-medium bg-red-500 text-white rounded hover:bg-red-700" onClick={btnClose}>Cancel</button>
          <button className="py-2 px-4 font-medium bg-blue-500 text-white rounded hover:bg-blue-700" onClick={nextButton}>Save Changes</button>
        </div>
        {/*//~ BUTTONS */}
      </div>
    </div>
  )
}

export default UpdateAppointmentModal