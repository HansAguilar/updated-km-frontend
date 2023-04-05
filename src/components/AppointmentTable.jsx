import React,{useState} from 'react';
import {AiFillEdit, AiOutlineFolderView,AiFillDelete} from 'react-icons/ai';

function AppointmentTable({tableHeaders,results,search,currentPage}) {
  const [status, setStatus] = useState({
    selectedStatus: "",
    isSelected: false,
    remarks: "PENDING"
  });
 console.log(status);
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
                            <td className=' capitalize px-10 '>
                                <p className={` ${ 
                                    status.remarks === "PENDING" ? "bg-orange-500"
                                    : status.remarks === "APPROVED" ? "bg-green-500"
                                    : "bg-red-500"
                                } ${ status.selectedStatus && status.selectedStatus === result.appointmentId && !status.isSelected ? " ": "hidden"} rounded-full text-white py-1 cursor-pointer `} onClick={()=>setStatus({...status,
                                    selectedStatus: result.appointmentId,
                                    isSelected: true,
                                })} >{status.remarks.toLowerCase()}</p>
                                {
                                    status.selectedStatus === result.appointmentId && status.isSelected && result.status === "PENDING" ?
                                    <select name="status" value={result.st} className=' px-6 py-2 border focus:outline ' onChange={(e)=>setStatus({
                                        ...status,
                                        remarks: e.target.value,
                                        isSelected:false
                                    })}>
                                        <option value="PENDING" disabled>Pending</option>
                                        <option value="APPROVED" >Approved</option>
                                        <option value="FAILED">Cancel</option>
                                    </select>
                                    : " "
                                }
                            </td>
                            <td className=' h-16 w-full text-white flex gap-1 items-center justify-center text-center '>
                                <p className=' bg-cyan-500 px-6 py-2 rounded-md cursor-pointer hover:shadow-md inline-flex '><AiFillEdit size={25} />&nbsp;Update</p>
                                <p className=' bg-red-500 px-6 py-2 rounded-md cursor-pointer  hover:shadow-md inline-flex'><AiFillDelete size={25} />&nbsp;Delete</p>
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