import axios from 'axios';
import React from 'react';
import { APPOINTMENT_LINK } from '../ApiLinks';
import { ToastContainer, toast } from 'react-toastify';
import { cancelledAppointment } from "../redux/action/AppointmentAction";
import { useDispatch } from 'react-redux';

function CancelModal({show, setShow,status,setStatus}) {
    const dispatch = useDispatch();
  const submitButton = async(e)=>{
    e.preventDefault();
    const data = {
        status: "CANCELLED",
        description: status.description
    }
    dispatch(cancelledAppointment(status.selectedId,data));
    setStatus({...status, description:""})
    setShow(false);
  }
  return (
    <>
    <ToastContainer/>
        <div className={` w-full h-screen bg-gray-900 bg-opacity-75 absolute top-0 left-0 z-40 flex flex-grow justify-center items-center ${show ? '': 'hidden'}`}>
    <div className=" z-50">
            <div className="m-auto w-[550px] h-auto p-8 bg-white rounded-lg shadow-lg">
                <div className="text-left py-4">
                <h2 className="text-xl font-bold capitalize mb-2 text-gray-600 ">Cancel Appointment</h2>
                <hr />
                </div>

                <form action="post" className='w-full ' >
                    <div className=' mb-2  flex flex flex-grow flex-col relative '>
                        <label htmlFor='patient' className='font-bold text-gray-600 '>
                        Reason for your cancellation
                        </label>
                        <input
                        type='text'
                        name='description'
                        value={status.description}
                        className=' px-4 py-2 w-full border border-gray-400 rounded-md focus:outline-none focus:shadow-md '
                        onChange={(e) => setStatus({...status, description:e.target.value})}
                        />
                    </div>
                </form>
                <div className=" w-full flex justify-end relative left-0 px-7 py-4 bottom-0 pt-2 gap-2 z-40">
                        <button className="bg-cyan-500 px-6 py-3 hover:bg-cyan-700 text-white font-bold  rounded"
                        onClick={submitButton}>
                            Submit
                        </button>
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold px-6 py-3 rounded" onClick={()=>setShow(false)}>
                            Close
                        </button>
                    </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default CancelModal