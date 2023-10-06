import React,{useState} from 'react';
import {AiFillEdit, AiFillDelete} from 'react-icons/ai';
import UpdateAdminModal from './UpdateAdminModal';
import { useDispatch } from 'react-redux';
import { toastHandler } from '../ToastHandler';
import moment from 'moment/moment';

function PaymentTable({tableHeaders, results, search, currentPage,setUpdateModal,updateData,setUpdateData}) {
  const dispatch = useDispatch();
  
  console.log(results);
  return (
   <>
    
    <div className=' h-auto overflow-auto '>
        
        <table className='w-full  '>
            {/*Head*/}
            <thead className=' shadow-md '>
                <tr className=" text-gray-600">
                {
                    tableHeaders.map((header, index)=>(
                        <th className='py-5 px-2 capitalize text-cyan-900' key={index}>{header}</th>
                    ))
                }
                </tr>
            </thead>

            {/*Body*/}
            <tbody className='h-auto p-6 mt-5'>
                
                {
                    search.length > 0 ? 
                    results
                    .map((result)=>(
                        <tr className='' key={result.adminId}>
                            <td className='p-2 text-center flex justify-center '>
                                <img src={result.appointment.patient.profile} className=' w-11 h-11 rounded-full border border-gray-400 ' alt="User" />
                            </td>
                            <td className=' text-center capitalize '>
                                {`${result.appointment.patient.firstname} ${!result.appointment.patient.middlename ? "" : result.appointment.patient.middlename.charAt(0).concat(".")  } ${result.appointment.patient.lastname}`}
                            </td>
                            <td className='text-center'>
                                {moment(result.appointment.appointmentDate).format("MMMM DD, YYYY")}
                            </td>
                            <td className='text-center'>
                                {result.method}
                            </td>
                            <td className='text-center capitalize'>
                                {result.type}
                            </td>
                            <td className='text-center'>
                                {result.totalPayment}
                            </td>
                            <td className='text-center capitalize'>
                                {result.status.toLowerCase()}
                            </td>
                            <td className=' h-auto relative bottom-2 w-auto flex items-start justify-center gap-3'>
                                <button className=' bg-blue-500 text-white flex items-center px-4 py-2 rounded-md' onClick={()=>{
                                    setUpdateData({...updateData, id:result.paymentId, method:result.method?result.method:"", totalPayment:result.totalPayment})
                                    setUpdateModal(true);
                                }} >
                                    <AiFillEdit size={25} />&nbsp;Update
                                </button>
                                {/* <button className='bg-red-500 text-white flex items-center px-4 py-2 rounded-md' >
                                    <AiFillDelete size={25} />&nbsp;Delete
                                </button> */}
                            </td>
                        </tr> 
                          ))
                    : results
                    //       firstItem         LastItem
                    .slice((currentPage*8)-8,currentPage*8 )
                    .map((result)=>(
                        <tr className='' key={result.adminId}>
                            <td className='p-2 text-center flex justify-center '>
                                <img src={result.appointment.patient.profile} className=' w-11 h-11 rounded-full border border-gray-400 ' alt="User" />
                            </td>
                            <td className=' text-center capitalize '>
                                {`${result.appointment.patient.firstname} ${!result.appointment.patient.middlename ? "" : result.appointment.patient.middlename.charAt(0).concat(".")  } ${result.appointment.patient.lastname}`}
                            </td>
                            <td className='text-center'>
                                {moment(result.appointment.appointmentDate).format("MMMM DD, YYYY")}
                            </td>
                            <td className='text-center'>
                                {result.method}
                            </td>
                            <td className='text-center capitalize'>
                                {result.type}
                            </td>
                            <td className='text-center'>
                                {result.totalPayment}
                            </td>
                            <td className='text-center capitalize'>
                                {result.status.toLowerCase()}
                            </td>
                            <td className=' h-auto relative bottom-2 w-auto flex items-start justify-center gap-3'>
                                <button className=' bg-blue-500 text-white flex items-center px-4 py-2 rounded-md' onClick={()=>{
                                    setUpdateData({...updateData, id:result.paymentId, method:result.method?result.method:"", totalPayment:result.totalPayment})
                                    setUpdateModal(true);
                                }} >
                                    <AiFillEdit size={25} />&nbsp;Update
                                </button>
                                <button className='bg-red-500 text-white flex items-center px-4 py-2 rounded-md' >
                                    <AiFillDelete size={25} />&nbsp;Delete
                                </button>
                            </td>
                        </tr> 
                    ))
                }
            </tbody>
        </table>
    </div>
   </>
  )
}

export default PaymentTable