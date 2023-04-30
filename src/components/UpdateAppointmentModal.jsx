import React,{useEffect, useState} from 'react';
import { SERVICES_LINK } from '../ApiLinks';
import axios from 'axios';
// import {CiCircleRemove} from "react-icons/ci"

function UpdateAppointmentModal({show, setShow,setAppointmentData, appointmentData}) {
    const [services, setServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    // const [suggestions, setSuggestions] = useState([]);
    // const [active, setActive] = useState("");

    const fetchDentalServices = async() => {
        try {
            const response = await axios.get(SERVICES_LINK);
            if(response.data){
                setServices(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        fetchDentalServices(); 
        // appointmentData.serviceSelected.map((val)=>{
        //     return setSelectedServices({
        //         id: val.serviceId,
        //         name: val.name
        //     })
        // })
    },[]);

    const handleOnChange = (e)=>{          
        setAppointmentData({
            ...appointmentData,
            [e.target.name]: e.target.value
        })
    }

   
    
    console.log(selectedServices);
  return (
    <>
    {
        appointmentData && (
            <div className={` w-full h-screen bg-gray-900 bg-opacity-75 absolute top-0 left-0 z-40 flex flex-grow justify-center items-center ${show ? '': 'hidden'}`}>
        <div className=" z-50">
            <div className="m-auto w-[550px] h-auto p-8 bg-white rounded-lg shadow-lg">
                <div className="text-left py-4">
                <h2 className="text-xl font-bold capitalize mb-2 text-gray-600 ">Update Appointment</h2>
                <hr />
                </div>

                <form action="post" className='grid grid-cols-2 gap-3 ' >
                    <div className=' mb-2 flex flex-col gap-1 relative '>
                        <label htmlFor='patient' className='font-bold text-gray-600 '>
                        Dentist Name
                        </label>
                        <input
                        type='search'
                        name='dentist'
                        value={appointmentData.dentist}
                        className=' px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:shadow-md '
                        onChange={(e) => handleOnChange(e)}
                        />
                    </div>
                    <div className=' mb-2 flex flex-col gap-1 relative '>
                        <label htmlFor='patient' className='font-bold text-gray-600 '>
                        Appointment Date
                        </label>
                        <input
                        type='date'
                        name='appointmentDate'
                        value={appointmentData.appointmentDate}
                        className=' px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:shadow-md '
                        onChange={(e) => handleOnChange(e)}
                        />
                    </div>

                    

                    

                </form>
                <div className=" w-full flex justify-end relative left-0 px-7 py-4 bottom-0 pt-2 gap-2 z-40">
                        <button className="bg-cyan-500 px-6 py-3 hover:bg-cyan-700 text-white font-bold  rounded"
                        >
                            Update
                        </button>
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold px-6 py-3 rounded" onClick={()=>setShow(false)}>
                            Close
                        </button>
                    </div>
            </div>
        </div>
    </div>
        )
    }
    </>
  )
}

export default UpdateAppointmentModal