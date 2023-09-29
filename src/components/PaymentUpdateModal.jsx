import React from 'react';
import { useDispatch } from 'react-redux';
import { updatePatient } from "../redux/action/PatientAction";
import { updateAdmin } from "../redux/action/AdminAction";
import { toastHandler } from '../ToastHandler';

function UpdateAdminModal({show, setModal, setAdminInfo, adminInfo, type}) {

    const dispatch = useDispatch();
    
      return (
        <div className={` w-full h-screen bg-gray-900 bg-opacity-75 absolute top-0 left-0 z-40 flex flex-grow justify-center items-center ${show ? '': 'hidden'}`}>
         
            <div className=" z-50">
              <div className="m-auto w-[550px] h-auto p-8 bg-white rounded-lg shadow-lg">
                <div className="text-left py-4">
                  <h2 className="text-xl font-bold capitalize mb-2">{`Update ${type}`}</h2>
                  <hr />
                </div>
    
                <form action="post" className='grid grid-cols-2 gap-3 ' >
                  <div className='flex flex-col'>
                    <label htmlFor="firstname">Firstname</label>
                    <input type="text" name="firstname"  placeholder='ex. John' className=' px-4 py-2 text-sm focus:outline-none focus:shadow-md border '  />
                  </div>
                </form>
            </div>
        </div>
      </div>
  )
}

export default UpdateAdminModal