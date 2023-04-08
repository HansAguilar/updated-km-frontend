import axios from 'axios';
import React,{useState} from 'react';
import { APPOINTMENT_LINK } from '../ApiLinks';
import {AiFillEdit, AiOutlineFolderView,AiFillDelete} from 'react-icons/ai';

function AppointmentTable({tableHeaders,results,search,currentPage}) {
    const [status, setStatus] = useState({
        selectedId: null,
        remarks: "PENDING",
        isSelected: false
      });
      const statusSubmit = async(id, value) =>{
        try {
            const response = await axios.put(`${APPOINTMENT_LINK}status/${id}/${value}`);
            if(response.data){
                alert(response.data.message);
            }
        } catch (error) {
            console.log(error);
        }
      }
      const deleteAppointment = async(id) =>{
        try {
            const response = await axios.delete(`${APPOINTMENT_LINK}${id}`);
            if(response.data){
                alert(response.data.message);
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
      }
  return (
    <>
    <div className=' h-[550px] px-4 py-3 overflow-auto '>
        <table className='w-full  '>
            {/*Head*/}
            <thead className=' bg-gray-100 '>
                <tr className=" text-gray-600">
                {
                    tableHeaders.map((header, index)=>(
                        <th className='py-3 px-2 capitalize' key={index}>{header}</th>
                    ))
                }
                </tr>
            </thead>

            {/*Body*/}
            <tbody className='h-auto p-6 '>
               {
                    results
                    .slice((currentPage*8)-8, currentPage*8)
                    .map((result)=>(
                        <tr key={result.appointmentId} className=' text-center h-16 '>
                            <td>
                                {result.patient.firstname} {result.patient.middlename ? result.patient.middlename.charAt(0).concat("."):""} {result.patient.lastname}
                            </td>
                            <td>
                                {result.dateSubmitted}
                            </td>
                            <td>
                                {result.appointmentDate}
                            </td>
                            <td>
                                {result.timeStart}
                            </td>
                            <td>
                                {result.timeEnd}
                            </td>
                            <td className='capitalize px-10'>
                                { status.selectedId === result.appointmentId && result.status !== "CANCELLED" ? (
                                    <select
                                    name="status"
                                    value={result.status}
                                    className='px-6 py-2 border focus:outline'
                                    onChange={(e) => {
                                        statusSubmit(result.appointmentId, e.target.value);
                                        window.location.reload();
                                        // console.log(result.appointmentId,"",e.target.value);
                                    }}
                                    onBlur={()=>setStatus({...status, selectedId:null})}
                                    >
                                    <option value="PENDING" disabled>Pending</option>
                                    <option value="APPROVED" >Approved</option>
                                    <option value="CANCELLED">Cancel</option>
                                    </select>
                                ) : (
                                    <p
                                    className={`${
                                        result.status === "PENDING" ? "bg-orange-500"
                                        : result.status === "APPROVED" ? "bg-green-500"
                                        : "bg-red-500"
                                    } rounded-full text-white py-1 cursor-pointer`}
                                    onClick={() => setStatus({
                                        selectedId: result.appointmentId,
                                        remarks: result.status,
                                        isSelected:true,
                                    })}
                                    >
                                    {result.status.toLowerCase()}
                                    </p>
                                )}
                                </td>
                            <td className=' h-16 w-full text-white flex gap-1 items-center justify-center text-center '>
                                <p className=' bg-cyan-500 px-6 py-2 rounded-md cursor-pointer hover:shadow-md inline-flex '><AiFillEdit size={25} />&nbsp;Update</p>
                                <p className=' bg-red-500 px-6 py-2 rounded-md cursor-pointer  hover:shadow-md inline-flex' onClick={()=>deleteAppointment(result.appointmentId)}><AiFillDelete size={25} />&nbsp;Delete</p>
                                <p className=' bg-gray-500 px-6 py-2 rounded-md cursor-pointer  hover:shadow-md inline-flex'><AiOutlineFolderView size={25} />&nbsp;View</p>
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

export default AppointmentTable