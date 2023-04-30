import React, { useEffect, useState } from "react";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import PageHeader from '../components/PageHeader';
import moment from 'moment';


const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const events = [
  {
      title: "Big Meeting",
      allDay: true,
      start: new Date(),
      end: new Date(),
  },
  {
      title: "Vacation",
      start: new Date(),
      end: new Date(),
  },
  {
      title: "Conference",
      start: new Date(),
      end: new Date(),
  },
];
function AppointmentCalendar({appointments}) {
  const [allAppointment, setAppointment] = useState([])

  const getTime = (value) =>{
    const time = moment(new Date(`1997-12-30T${value}`)).format('LT');
    const timeSplit = time.split(" ");
    let newTime = ""
    if(
      timeSplit[0]==="12:00" || timeSplit[0]==="12:30" || timeSplit[0]==="1:00" || timeSplit[0]==="1:30" || timeSplit[0]==="2:00" || timeSplit[0]==="2:30" || timeSplit[0]==="3:00" || timeSplit[0]==="3:30" || timeSplit[0]==="4:00" || timeSplit[0]==="4:30"|| timeSplit[0]==="5:00"
    ){
        newTime = timeSplit[0].concat(" ").concat("Pm");
    }else{
        newTime = timeSplit[0].concat(" ").concat("Am");
    }
    return newTime;
   }


  
  useEffect(()=>{
    const result = appointments.map((val)=>{
      console.log(new Date(moment(`${val.appointmentDate},${getTime(val.timeStart)}`).format('LLLL')));
      return {
        title: `${val.patient.firstname} ${val.patient.lastname}`,
        start: new Date(moment(`${val.appointmentDate},${getTime(val.timeStart)}`).format('LLLL')),
        end: new Date(moment(`${val.appointmentDate},${getTime(val.timeEnd)}`).format('LLLL'))
      }
      
    })
    
    setAppointment([...result])
  },[appointments])

  console.log(appointments)
  console.table(allAppointment)
  console.table(events)
  return (
    <>
    {
      appointments && (
        <div className=' h-screen overflow-hidden relative '>
      
          <PageHeader link={'Appointment Calendar'} />
          <div className=' w-full flex flex-col justify-center p-4 '> 
            <div className=' w-full bg-white h-auto rounded-xl shadow-lg'>
              {/*Sub header*/}
              <div className=' w-full p-4 border-t-2 border-t-cyan-500 rounded-t-xl flex justify-between items-center border-b-2 '>
                  <h1 className=' text-xl '>Appointment Calendar</h1>
                  
              </div>
                <Calendar localizer={localizer} events={allAppointment} startAccessor="start" endAccessor="end" style={{ height: 550, margin: "50px" }} />

            </div>
          </div>
        </div>
      )
    }
    </>
  )
}

export default AppointmentCalendar