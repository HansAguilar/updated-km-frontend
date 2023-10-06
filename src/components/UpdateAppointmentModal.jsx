import React,{useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import moment from 'moment/moment';
import {CiCircleRemove} from "react-icons/ci"
import { updateAppointment } from "../redux/action/AppointmentAction";
import { toastHandler } from '../ToastHandler';

function UpdateAppointmentModal({show,setModal,initialAppointment}) {
  const [minDate, setMinDate] = useState(new Date().toISOString().split('T')[0]);
  const dispatch = useDispatch();
  const dentist = useSelector((state)=>{ return state.dentist; });
  const service = useSelector((state)=>{ return state.service; });
  const schedule = useSelector((state)=>{ return state.schedule.payload; });const filteredAppointments = useSelector((state)=>{ return state.appointment.payload.filter((val)=>val.status==="PENDING"||val.status==="APPROVED"|| val.status === "TREATMENT")})
  
  const serviceIds = initialAppointment?.dentalServices.map((val) => val.serviceId);
  const [appointment, setAppointment] = useState({
    patient: `${initialAppointment?.patient.firstname} ${initialAppointment?.patient.lastname}`,
    dentist: initialAppointment?.dentist.fullname ,
    dentistId: initialAppointment?.dentist.dentistId,
    serviceSelected: [...serviceIds],
    date: initialAppointment?.appointmentDate,
    timeStart: initialAppointment?.timeStart,
    timeEnd: initialAppointment?.timeEnd,
    timeSubmitted: initialAppointment?.timeSubmitted,
  });

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

  useEffect(()=>{
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

    const currentTime  = moment();
    const newTime = currentTime.add(1,"hour");
    const newHour = moment(newTime);
    
    setTimeStartList([...newTimeList]);

    
    const filteredTime = newTimeList.filter((val) => 
      moment(appointment.date, 'YYYY-MM-DD').isSame(moment(), 'day') &&
      moment(val.timeStart, 'HH:mm:ss').isAfter(newHour)
    );
    if (filteredTime.length > 0) {
      setTimeStartList(filteredTime);
    }
    
    setTimeStartList((prev)=>{
      let updatedSchedList = [...prev];
      const filteredSchedule = schedule.filter((val)=>moment(appointment.date, "YYYY-MM-DD").isSame(moment(val.dateSchedule).format("YYYY-MM-DD")) && val.dentist.dentistId === appointment.dentistId);
      if(filteredSchedule.length > 0) {
        const indicesScheduleToRemain = [];
        for(let x = 0; x<filteredSchedule.length; x++){
          let start = updatedSchedList.findIndex((val)=>val.timeStart===filteredSchedule[x].timeStart);
          let end = updatedSchedList.findIndex((val)=>val.timeStart===filteredSchedule[x].timeEnd);
  
          for(let i = start; i<end; i++){
            indicesScheduleToRemain.push(i);
          }
        }
        console.log(indicesScheduleToRemain);
        updatedSchedList = updatedSchedList.filter((_,idx)=>{return indicesScheduleToRemain.includes(idx)});
      }
      
      return updatedSchedList;
    });
    

    
    
    
    setTimeStartList(prevTimeStartList => {
      let updatedTimeStartList = [...prevTimeStartList];
      const getAppointmentDate = filteredAppointments.filter((value)=>{
        return  value.appointmentDate === appointment.date;
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
        for(let begin = start; begin<=end; begin++){
          indexesToRemove.push(begin);
        }
      }
      // console.log(indexesToRemove);

      updatedTimeStartList = updatedTimeStartList.filter((_, index)=>{
        return !indexesToRemove.includes(index);
      })
     }

     return updatedTimeStartList;
    })
  },[appointment.date])

  const handleOnChange = (e) => {
    if(e.target.name === "dentist"){
      const filteredPatient = dentist.payload
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
      const filteredService = service.payload
      .filter(v=>{
        return v.isAvailable;
      })
      .filter((v)=>
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


      const nextButton = async () => {
        if(!appointment.dentist ||  !appointment.date || !appointment.timeStart || appointment.serviceSelected.length < 1){
          return  toastHandler("error", "Fill up empty field!");
          }
        if(appointment.method==="hmo" && !appointment.insuranceId){
          return toastHandler("error", "Please select your insurance"); 
        }
        const current = new Date();
        current.setHours(0,0,0,0);
        const selectedDate = new Date(appointment.date);
        selectedDate.setHours(0,0,0,0);
        if(selectedDate < current){
          return alert("You can't select previous date")
        }
        const end = calculateTotalTime();
        const data ={
          timeEnd: end,
        }
    
        const timeTotal = calculateTotalServiceTime();
        const totalTimeDuration = moment('00:00:00', 'HH:mm:ss');
        
        let start = moment(appointment.timeStart, 'HH:mm:ss');
        while (start.isBefore(moment(end, "HH:mm:ss").add(30, 'minutes'))) {
          const startTime = start.format('HH:mm:ss');
          const matchingTime = timeStartList.find(time => time.timeStart === startTime);
          console.log("start time", startTime);
          if(startTime === "12:30:00" || startTime === "16:30:00"){
            toastHandler("error",`Kindly select ${
              totalTimeDuration.format('HH:mm:ss') === "01:00:00"
                  ? '30 minutes'
                  : '1 hour'
            } service or change other dates`);
            return;
          }
          if (!matchingTime) {
            if (timeTotal !== totalTimeDuration.format("HH:mm:ss")) {
              toastHandler('error', `Your selected time range should be less than or equal ${
                totalTimeDuration.format('HH:mm:ss') === "00:30:00"
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
            dentist:appointment.dentistId,
            dentalServices: appointment.serviceSelected,
            date: appointment.date,
            timeStart: appointment.timeStart,
        }
        dispatch(updateAppointment(initialAppointment.appointmentId, result));
        setModal(false);
      }
      const calculateTotalServiceTime = () =>{
        const timeEnd = appointment.serviceSelected.map((val)=>{
          const result = service.payload.filter((serv)=>{
            return serv.serviceId === val;
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
    
        const convertTotalTime = moment.duration(timeEnd);
        return moment.utc(convertTotalTime.asMilliseconds()).format('HH:mm:ss');
      }
      const calculateTotalTime = ()=>{
        const timeStart = moment(appointment.timeStart, "HH:mm:ss");
        // const timeStart = moment("00:30:00", "HH:mm:ss");
        return timeStart.add(calculateTotalServiceTime()).format("HH:mm:ss");
      }

      const btnClose = () => {
        // setAppointment({
        //     patient: '',
        //     patientId:"",
        //     dentist: '',
        //     dentistId:"",
        //     serviceValue: "",
        //     serviceSelected:[],
        //     date:"",
        //     numberOfMonths:0,
        //     timeStart: "",
        //     timeEnd:"",
        //     totalAmount:fee.status === "AVAILABLE"?fee.price:0.00,
        //     timeSubmitted:"",
        //     method: "",
        //     type: "",
        //     insuranceId: ""
        //   })
        setModal(false);
      };
    


  return initialAppointment && (
    <div
      className={` w-full h-screen bg-gray-900 bg-opacity-75 absolute right-0 top-0 z-40 flex justify-center items-center ${
        show ? '' : 'hidden'
      }`}
    >
      <ToastContainer />
      <div className=' z-50 h-auto relative'>
        <div className='w-[700px] h-[600px] p-5 overflow-auto bg-white rounded-lg relative shadow-lg'>
          <div className='text-left py-4 h-auto overflow-auto'>
            <h2 className='text-2xl font-bold mb-2 text-gray-700 '>Update Appointment</h2>
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
                  disabled
                  onChange={(e) => handleOnChange(e)}
                />
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
                          //const totalAmount = calculateTotalAmount(appointment.serviceSelected);
                          
                          // setAppointment({
                          //   ...appointment,
                          //   serviceValue: "",
                          //   totalAmount: totalAmount
                          // });
                          setAppointment({
                            ...appointment,
                            serviceValue: "",
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
                      {appointment.serviceSelected.map((serv, index) => {
                        const selectedService = service.payload.find((val) => val.serviceId === serv);

                        return (
                          <p key={index} className="flex gap-2 bg-cyan-500 rounded-md px-3 py-1 text-white">
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
                  <option value="" disabled >Choose time...</option>
                  {
                    timeStartList
                    .filter((val)=>{
                      return val.timeStart !== "12:00:00" && val.timeStart !== "16:00:00";
                    })
                    .map((val, index)=>(
                      <option value={val.timeStart} key={index}
                      
                      >{val.timeValue}</option>
                    ))
                  }
                </select>
              </div>

            </form>

            </div>
            <div className=" w-full flex justify-end relative left-0 px-7 py-4 bottom-0 pt-2 gap-2 z-40">
                <button className="bg-cyan-500 px-14 py-4 hover:bg-cyan-700 text-white font-bold  rounded" 
                onClick={nextButton}
                >
                Submit
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

export default UpdateAppointmentModal