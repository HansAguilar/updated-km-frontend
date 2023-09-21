import React from 'react';
import { ToastContainer }from 'react-toastify';
import moment from 'moment/moment';
import {AiFillEdit, AiFillDelete} from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { deleteSchedule } from "../redux/action/ScheduleAction";

function ScheduleTable({tableHeaders,results,setInfo,setModal}) {
    const dispatch = useDispatch();
    const updateButton = (val) =>{
        setInfo(val);
        setModal(true);
    }
    return (
        <div className='w-full px-4 py-3 overflow-auto '>
            
        <ToastContainer />
        <table className='w-full relative mb-5 '>
            {/*Head*/}
            <thead className=' shadow-md '>
                <tr className=" text-gray-600">
                {
                    tableHeaders.map((header, index)=>(
                        <th className='py-5 px-2 capitalize text-cyan-900 ' key={index}>{header}</th>
                    ))
                }
                </tr>
            </thead>
            <tbody className='h-auto p-6 mt-10'>
                {
                    results
                    .map((result)=>(
                        <tr className=' hover:bg-gray-100 mt-5 ' key={result.scheduleId} >
                        <td className=' text-center capitalize text-cyan-900 '>
                            {`Dr. ${result.dentist.fullname}`}
                        </td>
                        <td className='text-center text-cyan-900'>
                            {moment(result.dateSchedule).format(`LL`)}
                        </td>
                        <td className='text-center capitalize text-cyan-900'>
                            {moment(result.timeStart,"HH:mm:ss").format("LT")}
                        </td>
                        <td className='text-center text-cyan-900'>
                            {moment(result.timeEnd,"HH:mm:ss").format("LT")}
                        </td>
                        <td className=' w-auto flex items-center justify-center gap-3'>
                            <p className=' px-5 py-2 rounded-md bg-blue-500 text-white cursor-pointer hover:shadow-md flex' onClick={()=>updateButton(result)}><AiFillEdit size={25} />&nbsp;Update</p>
                            <p className=' px-5 py-2 rounded-md bg-red-500 text-white cursor-pointer hover:shadow-md flex' onClick={()=>dispatch(deleteSchedule(result.scheduleId))}><AiFillDelete size={25}/>&nbsp;Delete</p>  
                        </td>
                    </tr>
                ))}
            </tbody>
        </ table>
        </div>
    );
}

export default ScheduleTable;