import React from 'react';
import { APPOINTMENT_LINK } from '../ApiLinks';
import { ToastContainer, toast } from 'react-toastify';
import { cancelledAppointment } from "../redux/action/AppointmentAction";
import { useDispatch } from 'react-redux';
import { toastHandler } from '../ToastHandler';

function CancelModal({ show, setShow, status, setStatus }) {
  const dispatch = useDispatch();
  const submitButton = async (e) => {
    e.preventDefault();

    if(!status.description) return toastHandler("error", "Please fill up empty field");

    const data = {
      status: "CANCELLED",
      description: status.description
    }
    dispatch(cancelledAppointment(status.selectedId, data));
    setStatus({ ...status, description: "" })
    setShow(false);
  }
  return (
    <div className={`w-full h-screen bg-gray-900 bg-opacity-75 fixed inset-0 z-50 flex flex-grow justify-center items-center ${show ? '' : 'hidden'}`}>
        <ToastContainer limit={1} autoClose={1500} />
      <div className="m-auto w-[600px] bg-zinc-100 rounded overflow-auto">

        {/*//~ HEADER */}
        <div className='p-4 bg-blue-400'>
          <h2 className="text-2xl text-slate-100 tracking-wider uppercase font-bold">Cancel Appointment</h2>
        </div>
        {/*//~ HEADER */}

        <form action="post" className='p-4 border-t-2' >
          <div className=' mb-2 flex flex-grow flex-col relative '>
            <label htmlFor='description' className='font-medium text-slate-600'>Reason for your cancellation</label>
            <textarea name="description" id="description" rows={3} value={status.description} className='p-2 border border-slate-300 focus:border-blue-600 rounded text-sm focus:outline-none'
              onChange={(e) => setStatus({ ...status, description: e.target.value })}
            >
            </textarea>
          </div>
        </form>

        <div className='flex gap-2 p-4 justify-end'>
          <button className='py-2 px-4 font-medium bg-red-500 text-white rounded hover:bg-red-700' onClick={() => setShow(false)}>Cancel</button>
          <button className='py-2 px-4 font-medium bg-blue-500 text-white rounded hover:bg-blue-700' onClick={submitButton}>Confirm</button>
        </div>

      </div>
    </div>
  )
}

export default CancelModal