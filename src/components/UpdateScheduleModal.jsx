import React, { useState } from 'react';
import { useDispatch} from 'react-redux';
import { toastHandler } from "../ToastHandler";
import { ToastContainer } from 'react-toastify';
import { updateSchedule } from "../redux/action/ScheduleAction";
import moment from 'moment';

function UpdateScheduleModal({setModal, info}) {
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
    start:timeChart,
    end:timeChart
   });

   const [data, setData] = useState({
    dentistId: info.dentist.dentistId,
    dateSchedule:moment(info.dateSchedule).format("YYYY-MM-DD"),
    timeStart:info.timeStart,
    timeEnd:info.timeEnd,
   });

   const handleTimeChange = (e) =>{
    if(e.target.name==="timeStart"){
      const result = timeOption.start.findIndex((val)=>val.timeStart===e.target.value);
      const filteredData = timeOption.start.filter((_,idx)=>idx>result-1);
      setTimeOption({...timeOption, end:filteredData});
    }
    setData({...data, [e.target.name]:e.target.value});
  }

  const handleSubmit = () =>{
    if(!data.dentistId || !data.dateSchedule || !data.timeStart || !data.timeEnd) return toastHandler("error", "Fill up empty field");
    dispatch(updateSchedule(info.scheduleId, data));
    setModal(false);
  }

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

    return (
        <div className={` w-full h-screen bg-gray-900 bg-opacity-75 absolute top-0 z-40 flex justify-center items-center `}>
          <ToastContainer />
        <div className=" z-50">
          <div className="m-auto w-[500px] h-auto p-8 bg-white rounded-lg shadow-lg">
            <div className="text-left py-4">
              <h2 className="text-xl font-bold mb-2">Update Schedule</h2>
              <hr /><br />
              <form className=' flex flex-col '>
                
                {/* DENTIST NAME */}
                <div className=' mb-2 flex flex-col gap-1 '>
                    <label htmlFor="name" className='font-bold text-gray-600 '>Dentist Name</label>
                    <input type="text" className=' px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:shadow-md ' value={search} disabled/>
                    
                </div>

                {/* DATE SCHEDULE */}
                <div className=' mb-2 flex flex-col gap-1 '>
                    <label htmlFor="name" className='font-bold text-gray-600 '>Schedule Date</label>
                    <input type="date" min={minDate} value={data.dateSchedule} className=' px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:shadow-md ' onChange={(e)=>setData({...data, dateSchedule:moment(e.target.value).format("YYYY-MM-DD")})} />
                </div>

                {/* TIME START */}
                <div className=' mb-2 flex flex-col gap-1 '>
                    <label htmlFor="name" className='font-bold text-gray-600 '>Time Start</label>
                    <select className=' px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:shadow-md ' name='timeStart' value={data.timeStart} onChange={(e)=>handleTimeChange(e)}>
                      <option value={""} disabled>Select starting time...</option>
                      {
                        timeOption.start.map((v,idx)=>(
                          <option value={v.timeStart} key={idx}>{v.timeValue}</option>
                        ))
                      }
                    </select>
                </div>

                 {/* TIME END */}
                 {
                  data.timeStart && (
                    <div className=' mb-2 flex flex-col gap-1 '>
                        <label htmlFor="name" className='font-bold text-gray-600 '>Time End</label>
                        <select className=' px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:shadow-md ' value={data.timeEnd} name='timeEnd' onChange={(e)=>handleTimeChange(e)}>
                          <option value={""} disabled>Select ending time...</option>
                          {
                            timeOption.end.map((v,idx)=>(
                              <option value={v.timeStart} key={idx}>{v.timeValue}</option>
                            )).splice(1,timeOption.end.length)
                          }
                        </select>
                    </div>
                  )
                 }
                
              </form>
            </div>
            <div className="flex justify-end pt-2 gap-2">
                <button className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded" 
                onClick={handleSubmit}
                >
                Edit
              </button>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={()=>setModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
    </div>
    );
}

export default UpdateScheduleModal