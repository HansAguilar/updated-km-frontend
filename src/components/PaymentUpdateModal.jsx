import React from 'react';
import { useDispatch } from 'react-redux';
import { updatePatient } from "../redux/action/PatientAction";
import { updateAdmin } from "../redux/action/AdminAction";
import { ToastContainer } from 'react-toastify';

const inputStyle = "p-2 border focus:border-blue-400 rounded text-sm focus:outline-none";

function UpdateAdminModal({ show, setModal, setAdminInfo, adminInfo, type }) {

  const dispatch = useDispatch();

  return (
    <div className={` w-full h-screen bg-gray-900 bg-opacity-75 absolute top-0 left-0 z-40 flex flex-grow justify-center items-center ${show ? '' : 'hidden'}`}>
      <div className="m-auto w-[900px] h-[700px] bg-zinc-100 rounded overflow-auto">
        <ToastContainer limit={1} autoClose={1500} />

        {/*//~ HEADER */}
        <div className='p-4 bg-blue-400'>
          <h2 className="text-2xl text-slate-100 tracking-wider uppercase font-bold">Add Schedule</h2>
        </div>
        {/*//~ HEADER */}


        <form action="post" className='grid gap-3 p-4' >
          <div className='flex flex-col'>
            <label htmlFor="firstname">Firstname</label>
            <input type="text" name="firstname" placeholder='ex. John' className=' px-4 py-2 text-sm focus:outline-none focus:shadow-md border ' />
          </div>
        </form>
      </div>
    </div >
  )
}

export default UpdateAdminModal