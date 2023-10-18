import React, { useEffect, useState } from "react";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import PageHeader from '../components/PageHeader';
import moment from 'moment';
import { useSelector } from "react-redux";

function AppointmentCalendar({ }) {
  const appointments = useSelector((state) => state.appointment.payload.filter((val) => val.status === "APPROVED" || val.status === "TREATMENT"))
  const [allAppointment, setAppointment] = useState([]);
  const timeArray = ["12:00", "12:30", "1:00", "1:30", "2:00", "2:30", "3:00", "3:30", "4:00", "4:30", "5:00"];
  const locales = { "en-US": require("date-fns/locale/en-US") };
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  const getTime = (value) => {
    const time = moment(new Date(`1997-12-30T${value}`)).format('LT');
    const timeSplit = time.split(" ");
    const period = timeArray.includes(timeSplit[0]) ? "PM" : "AM";
    return timeSplit[0].concat(" ", period);
    // let newTime = "";
    // if (
    //   timeSplit[0] === "12:00" || timeSplit[0] === "12:30" || timeSplit[0] === "1:00" || timeSplit[0] === "1:30" || timeSplit[0] === "2:00" || timeSplit[0] === "2:30" || timeSplit[0] === "3:00" || timeSplit[0] === "3:30" || timeSplit[0] === "4:00" || timeSplit[0] === "4:30" || timeSplit[0] === "5:00"
    // ) {
    //   newTime = timeSplit[0].concat(" ").concat("Pm");
    // } else {
    //   newTime = timeSplit[0].concat(" ").concat("Am");
    // }
    // return newTime;
  }

  useEffect(() => {
    const result = appointments.map((val) => {
      console.log(new Date(moment(`${val.appointmentDate},${getTime(val.timeStart)}`).format('LLLL')));
      return {
        title: `Appointment for ${val.patient.firstname} ${val.patient.lastname}`,
        start: new Date(moment(`${val.appointmentDate},${getTime(val.timeStart)}`).format('LLLL')),
        end: new Date(moment(`${val.appointmentDate},${getTime(val.timeEnd)}`).format('LLLL'))
      }
    })
    setAppointment([...result])
  }, [appointments])

  return (
    <>
      {
        appointments && (
          <div className='h-screen overflow-hidden relative bg-gray-200'>
            <PageHeader link={'Appointment Calendar'} />

            <div className='w-full flex flex-col justify-center p-4'>
              <div className='w-full rounded shadow bg-white'>
                <Calendar localizer={localizer} events={allAppointment} startAccessor="start" endAccessor="end" className="h-[550px] m-8" />
              </div>
            </div>

          </div>
        )
      }
    </>
  )
}

export default AppointmentCalendar