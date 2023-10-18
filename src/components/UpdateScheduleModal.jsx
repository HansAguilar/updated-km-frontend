import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toastHandler } from "../ToastHandler";
import { ToastContainer } from 'react-toastify';
import { updateSchedule } from "../redux/action/ScheduleAction";
import moment from 'moment';

const inputStyle = "p-2 border border-slate-300 focus:border-blue-600 rounded text-sm focus:outline-none";

function UpdateScheduleModal({ setModal, info }) {
  const dispatch = useDispatch();
  const timeChart = [
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
  const search = `Dr. ${info.dentist.fullname}`;
  const [timeOption, setTimeOption] = useState({
    start: timeChart,
    end: timeChart
  });

  const [data, setData] = useState({
    dentistId: info.dentist.dentistId,
    dateSchedule: moment(info.dateSchedule).format("YYYY-MM-DD"),
    timeStart: info.timeStart,
    timeEnd: info.timeEnd,
  });

  const handleTimeChange = (e) => {
    if (e.target.name === "timeStart") {
      const result = timeOption.start.findIndex((val) => val.timeStart === e.target.value);
      const filteredData = timeOption.start.filter((_, idx) => idx > result - 1);
      setTimeOption({ ...timeOption, end: filteredData });
    }
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const handleSubmit = () => {
    if (!data.dentistId || !data.dateSchedule || !data.timeStart || !data.timeEnd) return toastHandler("error", "Fill up empty field");
    dispatch(updateSchedule(info.scheduleId, data));
    setModal(false);
  }

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className={`w-full h-screen bg-gray-900 bg-opacity-75 absolute top-0 left-0 z-10 flex flex-grow justify-center items-center`}>
      <div className="m-auto w-[700px] min-h-max bg-zinc-100 rounded overflow-auto ">

        {/*//~ HEADER */}
        <div className='p-4 bg-blue-400'>
          <h2 className="text-2xl text-slate-100 tracking-wider uppercase font-bold">Update Service</h2>
        </div>
        {/*//~ HEADER */}


        <form action="post" className='grid gap-3 p-4 border-t-2' >

          {/*//~ DENTIST NAME */}
          <div className=' flex flex-col gap-1 w-full '>
            <label htmlFor='name' className='font-medium text-slate-600'>Service Name</label>
            <input type="text" name='name' id='name' value={search} className={inputStyle} disabled />
          </div>
          {/*//~ DENTIST NAME */}


          {/*//~ DATE SCHEDULE */}
          <div className='flex flex-col gap-1 w-full'>
            <label htmlFor="schedule" className='font-medium text-slate-600'>Schedule Date</label>
            <input type="date" min={minDate} id='schedule' value={data.dateSchedule} className={inputStyle} onChange={(e) => setData({ ...data, dateSchedule: moment(e.target.value).format("YYYY-MM-DD") })} />
          </div>
          {/*//~ DATE SCHEDULE */}


          {/*//~ TIME START */}
          <div className='flex flex-col gap-1 w-full'>
            <label htmlFor="start" className='font-medium text-slate-600'>Time Start</label>
            <select className={inputStyle} name='timeStart' id='start' value={data.timeStart} onChange={(e) => handleTimeChange(e)}>
              <option value={""} disabled>Select starting time...</option>
              {
                timeOption.start.map((v, idx) => (
                  <option value={v.timeStart} key={idx}>{v.timeValue}</option>
                ))
              }
            </select>
          </div>
          {/*//~ TIME START */}
          

          {/*//~ TIME END */}
          {
            data.timeStart && (
              <div className='flex flex-col gap-1 '>
                <label htmlFor="end" className='font-mediumtext-slate-600'>Time End</label>
                <select className={inputStyle} value={data.timeEnd} id='end' name='timeEnd' onChange={(e) => handleTimeChange(e)}>
                  <option value={""} disabled>Select ending time...</option>
                  {
                    timeOption.end.map((v, idx) => (
                      <option value={v.timeStart} key={idx}>{v.timeValue}</option>
                    )).splice(1, timeOption.end.length)
                  }
                </select>
              </div>
            )
          }
          {/*//~ TIME END */}
        </form>


        {/*//~ BUTTONS */}
        <div className='flex gap-2 p-4 justify-end mt-auto'>
          <button className="py-2 px-4 font-medium bg-red-500 text-white rounded hover:bg-red-700" onClick={() => setModal(false)}>Cancel</button>
          <button className="py-2 px-4 font-medium bg-blue-500 text-white rounded hover:bg-blue-700" onClick={handleSubmit}>Save Changes</button>
        </div>
        {/*//~ BUTTONS */}
      </div>
    </div>
  );
}

export default UpdateScheduleModal