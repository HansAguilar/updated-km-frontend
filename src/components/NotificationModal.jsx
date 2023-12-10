import React from 'react';
import { useDispatch } from 'react-redux';

function NotificationModal({ notificationToggle, setNotificationToggle }) {
  const dispatch = useDispatch();

  return (
    <div className={`w-full h-screen bg-gray-900 bg-opacity-75 fixed inset-0 z-50 flex flex-grow justify-center items-center `}>
      <div className="m-auto w-[600px] bg-zinc-100 rounded overflow-auto">
        {/*//~ HEADER */}
        <div className='p-4 bg-blue-400'>
          <h2 className="text-2xl text-slate-100 tracking-wider uppercase font-bold">{notificationToggle.data.name}</h2>
        </div>

        <div className=' mb-2 flex flex-grow flex-col relative p-4'>
          <p htmlFor='description' className='font-medium text-slate-600'>{notificationToggle.data.description}</p>
        </div>

        <div className='flex gap-2 p-4 justify-end'>
          <button className='py-2 px-4 font-medium bg-red-500 text-white rounded hover:bg-red-700' onClick={() => setNotificationToggle({ ...notificationToggle, data: null, isShow: false })}>Close</button>
        </div>

      </div>
    </div>
  )
}

export default NotificationModal