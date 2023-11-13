import React, { useState } from 'react'
import { ADMIN_LINK } from '../ApiLinks';
import axios from 'axios';
import clinic from "../assets/dental-clinic.jpg"

function Profile() {
  const adminInfo = localStorage.getItem("adminInfo");
  const data = JSON.parse(adminInfo);

  const [adminData] = useState([data]);

  return (
    <div className=' h-screen overflow-hidden relative bg-gray-200 '>

      <div className='flex justify-between p-4 gap-8'>
        <div className='flex flex-col items-center justify-between w-[28rem] gap-8'>

          <div className='bg-white w-full h-72 flex items-center justify-center rounded'>
            <img src={adminData[0].profile} className='h-52 w-52 aspect-auto rounded-full border-2' alt='admin' />
          </div>

          <div className='bg-white divide-y flex items-center flex-col justify-between w-full gap-4 p-4 rounded'>
            {/*//~ NAME */}
            <div className=' w-full flex justify-between p-2 border-gray-300 '>
              <p className='text-slate-800 font-medium'>Name</p>
              <p className='capitalize text-slate-600'>{`${adminData[0].firstname} ${adminData[0].middlename} ${adminData[0].lastname}`}</p>
            </div>
            {/*//~ NAME */}

            {/*//~ GENDER */}
            <div className=' w-full flex justify-between p-2 border-gray-300 '>
              <p className='text-slate-800 font-medium'>Gender</p>
              <p className='capitalize text-slate-600'>{adminData[0].gender}</p>
            </div>
            {/*//~ GENDER */}

            {/*//~ BIRTHDAY */}
            <div className=' w-full flex justify-between p-2 border-gray-300 '>
              <p className='text-slate-800 font-medium'>Birthday</p>
              <p className='capitalize text-slate-600'>{adminData[0].birthday}</p>
            </div>
            {/*//~ BIRTHDAY */}

            {/*//~ PHONE */}
            <div className=' w-full flex justify-between p-2 border-gray-300 '>
              <p className='text-slate-800 font-medium'>Phone</p>
              <p className='capitalize text-slate-600'>{adminData[0].contactNumber}</p>
            </div>
            {/*//~ PHONE */}

            {/*//~ ADDRESS */}
            <div className=' w-full flex justify-between p-2 border-gray-300 '>
              <p className='text-slate-800 font-medium'>Address</p>
              <p className='capitalize text-slate-600'>{adminData[0].address}</p>
            </div>
            {/*//~ ADDRESS */}

            {/*//~ ROLE */}
            <div className=' w-full flex justify-between p-2 mb-4 border-gray-300 '>
              <p className='text-slate-800 font-medium'>Role</p>
              <p className='capitalize text-slate-600'>{adminData[0].role}</p>
            </div>
            {/*//~ ROLE */}
          </div>
        </div>

        <div className='flex-1 bg-white rounded w-full'>
            <img src={clinic} className='aspect-auto object-fill h-[700px] w-full' />
        </div>
      </div>

    </div>
  )
}

export default Profile