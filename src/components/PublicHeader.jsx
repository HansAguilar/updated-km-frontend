import React from 'react';
import logo from '../assets/small-logo.jpg';

function PublicHeader() {
  return (
    <div className=' w-full h-auto bg-white absolute top-0 flex items-center px-4 shadow-md '>
        <img src={logo} alt="KM Geronimo Dental Clinic" className=' w-20 ' />
        <p className=' text-cyan-500 font-bold '>KM Geronimo Dental Clinic</p>
    </div>
  )
}

export default PublicHeader