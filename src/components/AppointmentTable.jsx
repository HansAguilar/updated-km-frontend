import axios from 'axios';
import React,{useState} from 'react';
import { APPOINTMENT_LINK } from '../ApiLinks';
import {AiFillEdit, AiOutlineFolderView,AiFillDelete} from 'react-icons/ai';
import UpdateAppointmentModal from './UpdateAppointmentModal';

function AppointmentTable({tableHeaders,results,search,currentPage,setCancelModal, statusSubmit, status1, setStatus1}) {
    const [update, setUpdate] = useState(false);
    const [statusValue, setStatusValue] = useState({
        isClick: false,
        statusCode: ""
    });
    const [appointmentData, setAppointmentData] = useState({
        dentist: "",
        dentalServices: "",
        timeStart: "",
        appointmentDate: "",
        appointmentId: ""
    })
    const [status, setStatus] = useState({
        selectedId: null,
        remarks: "PENDING",
        isSelected: false
      });
      
      const deleteAppointment = async(id, result) =>{
        try {
            if(result === "APPROVED"){
                return alert("You can't remove this appointment!")
            }
            const response = await axios.delete(`${APPOINTMENT_LINK}${id}`);
            if(response.data){
                alert(response.data.message);
                window.location.reload();
            }
        } catch (error) {
            alert(error.response.data.message);
        }
      }
      const updateButton= (dentist, dentalServices, timeStart, appointmentDate, appointmentId) =>{
        setAppointmentData({
            dentist: dentist.fullname,
            dentistId: dentist.dentistId,
            serviceSelected: dentalServices,
            serviceValue: "",
            timeStart: timeStart,
            appointmentDate: appointmentDate,
            appointmentId: appointmentId
        })
        setUpdate(true);
      }
      console.log(results);
  return (
    <>
    <div className=' h-[550px] px-4 py-3 overflow-auto '>
        <UpdateAppointmentModal show={update} setShow={setUpdate} setAppointmentData={setAppointmentData} appointmentData={appointmentData} />
        <table className='w-full  '>
            {/*Head*/}
            <thead className=' bg-gray-100 '>
                <tr className=" text-gray-600">
                {
                    tableHeaders.map((header, index)=>(
                        <>
                        {
                            header === "Status" ? 
                            <>
                            <th className={`py-3 px-2 capitalize cursor-pointer ${statusValue.isClick ? "hidden":""}`} key={index} onClick={()=>setStatusValue({...statusValue, isClick: true})}>{header}</th>
                            {/* {
                                statusValue.isClick ? <select value={}>

                                </select>
                            } */}
                            </>
                            : <th className='py-3 px-2 capitalize' key={index}>{header}</th>
                        }
                        </>
                    ))
                }
                </tr>
            </thead>

            {/*Body*/}
            <tbody className='h-auto p-6 '>
               {
                    results
                    // .filter((val)=>{ return statusValue.statusCode !== "" ? val.status === statusValue.statusCode : (val.status === "APPROVED" || val.status === "PENDING") })
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
                                { status.selectedId === result.appointmentId && result.status !== "CANCELLED" && result.status !== "DONE" ? (
                                    <select
                                    name="status"
                                    value={result.status}
                                    className='px-6 py-2 border focus:outline'
                                    onChange={(e) => {
                                        if(e.target.value === "CANCELLED"){
                                            setStatus1({...status1,
                                                id: result.appointmentId,
                                                status: "CANCELLED"
                                            })
                                            return setCancelModal(true);
                                        }
                                        setStatus1({...status1,
                                            id: result.appointmentId,
                                            status: e.target.value
                                        })
                                        statusSubmit();
                                        window.location.reload();
                                        // console.log(result.appointmentId,"",e.target.value);
                                    }}
                                    onBlur={()=>setStatus({...status, selectedId:null})}
                                    >
                                    <option value="PENDING" disabled>Pending</option>
                                    <option value="APPROVED" >Approved</option>
                                    {
                                        result.status === "APPROVED" ?
                                        <option value="DONE" >Done</option>
                                        : ""
                                    }
                                    <option value="CANCELLED" >Cancel</option>
                                    </select>
                                ) : (
                                    <p
                                    className={`${
                                        result.status === "PENDING" ? "bg-orange-500"
                                        : result.status === "APPROVED" ? "bg-green-500"
                                        : result.status === "DONE" ? "bg-cyan-500"
                                        : "bg-red-500"
                                    } rounded-full text-white py-1 cursor-pointer`}
                                    onClick={() =>{
                                        setStatus({
                                        selectedId: result.appointmentId,
                                        remarks: result.status,
                                        isSelected:true,
                                    })}
                                    }
                                    >
                                    {result.status.toLowerCase()}
                                    </p>
                                )}
                                </td>
                            <td className=' text-center '>
                                {
                                    result.doneReadingTC ?
                                    <input type="checkbox" checked/>:
                                    <input type="checkbox" />
                                }
                            </td>
                            <td className=' h-16 text-white flex gap-1 items-center justify-center text-center '>
                                <p className=' bg-cyan-500 px-4 py-2 rounded-md cursor-pointer hover:shadow-md inline-flex ' onClick={()=>updateButton(
                                    result.dentist,
                                    result.dentalServices,
                                    result.timeStart,
                                    result.appointmentDate,
                                    result.appointmentId
                                    )}><AiFillEdit size={25} />&nbsp;Update</p>
                                <p className=' bg-red-500 px-4 py-2 rounded-md cursor-pointer  hover:shadow-md inline-flex' onClick={()=>deleteAppointment(result.appointmentId, result.status)}><AiFillDelete size={25} />&nbsp;Delete</p>
                                <p className=' bg-gray-500 px-4 py-2 rounded-md cursor-pointer  hover:shadow-md inline-flex'><AiOutlineFolderView size={25} />&nbsp;View</p>
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