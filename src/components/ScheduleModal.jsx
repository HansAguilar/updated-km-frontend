import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toastHandler } from "../ToastHandler";
import { ToastContainer } from 'react-toastify';
import { createSchedule } from "../redux/action/ScheduleAction";
import { BiSearchAlt } from 'react-icons/bi';

const inputStyle = "p-2 border border-slate-300 focus:border-blue-400 rounded text-base focus:outline-none";
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
];

function ScheduleModal({ setModal }) {
  const dispatch = useDispatch();
  const [suggestion, setSuggestion] = useState([]);

  const [search, setSearch] = useState("");

  const [timeOption, setTimeOption] = useState({
    start: timeChart,
    end: timeChart
  });

  const dentistList = useSelector((state) => state.dentist.payload);

  const [data, setData] = useState({
    dentistId: "",
    dateSchedule: "",
    timeStart: "",
    timeEnd: "",
  });

  const handleTimeChange = (e) => {
    if (e.target.name === "timeStart") {
      const result = timeOption.start.findIndex((val) => val.timeStart === e.target.value);
      const filteredData = timeOption.start.filter((_, idx) => idx > result - 1);
      setTimeOption({ ...timeOption, end: filteredData });
    }
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const handleDentistSearch = (e) => {
    setSearch(e.target.value);
    const result = dentistList.filter((v) => (v.fullname).toLowerCase().includes(e.target.value.toLowerCase()));
    setSuggestion(result);
  }

  const handleSubmit = () => {
    if (!data.dentistId || !data.dateSchedule || !data.timeStart || !data.timeEnd) return toastHandler("error", "Fill up empty field");
    dispatch(createSchedule(data));
    setModal(false);
  }

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className={`w-full min-h-screen bg-gray-900 bg-opacity-75 fixed inset-0 z-50 flex flex-grow justify-center items-center`}>
      <div className="m-auto w-[700px] min-h-[500px] bg-zinc-100 rounded overflow-auto flex flex-col">
        <ToastContainer limit={1} autoClose={1500} />

        {/*//~ HEADER */}
        <div className='p-4 bg-blue-400'>
          <h2 className="text-2xl text-slate-100 tracking-wider uppercase font-bold">Add Schedule</h2>
        </div>
        {/*//~ HEADER */}

        <form action="post" className='grid gap-3 p-4' >

          {/*//~ DENTIST NAME */}
          <div className='flex flex-col gap-1 w-full relative'>
            <BiSearchAlt className="absolute left-2 top-9 text-slate-400" size={24} />
            <label htmlFor="dentist" className='font-medium text-slate-600'>Dentist Name</label>
            <input type="text" id='dentist' className={`${inputStyle} indent-8`} value={search} onChange={(e) => handleDentistSearch(e)} />
            <ul className={`relative z-10 bg-white outline-none font-medium shadow-md w-full ${!data.dentistId && search ? 'border border-slate-400' : ''}`}>
              {
                suggestion.length > 0 && search ?
                  suggestion.map((val, idx) => (
                    <li key={idx} className='group flex items-center gap-x-2 capitalize p-2 text-slate-600 cursor-pointer hover:bg-blue-500 hover:text-white'
                      onClick={() => {
                        setSearch(`Dr. ${val.fullname}`);
                        setData({ ...data, dentistId: val.dentistId });
                        setSuggestion([]);
                      }}>
                      <BiSearchAlt className="group-hover:text-white" size={24} />
                      <span>Dr. {val.fullname}</span>
                    </li>
                  ))
                  : search && suggestion.length < 1 && !data.dentistId ?
                    <li className='p-2 indent-8 text-red-400'>No existing dentist</li>
                    : ""
              }
            </ul>
          </div>
          {/*//~ DENTIST NAME */}


          {/*//~ DATE SCHEDULE */}
          <div className='flex flex-col gap-1 w-full'>
            <label htmlFor="schedule" className='font-medium text-slate-600'>Schedule Date</label>
            <input type="date" min={minDate} id='schedule' className={inputStyle} onChange={(e) => setData({ ...data, dateSchedule: new Date(e.target.value) })} />
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
          <button className='py-2 px-4 font-medium bg-red-500 text-white rounded hover:bg-red-700' onClick={() => setModal(false)}>Cancel</button>
          <button className='py-2 px-4 font-medium bg-blue-500 text-white rounded hover:bg-blue-700' onClick={handleSubmit}>Confirm</button>
        </div>
        {/*//~ BUTTONS */}
      </div>

    </div>
  );
}

export default ScheduleModal;