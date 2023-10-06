import moment from 'moment';
import React, { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { IoArrowBackSharp } from "react-icons/io5";
import ExcelButton from './MedicalRecordExcel';
import PDFButton from './PDFMedicalButton';
import { TEETH_LINK } from '../ApiLinks';
import axios from 'axios';

function ViewPatient(props) {
    const [headerNavigation, setHeaderNavigation] = useState("overview");
    const { id } = useParams();
    const navigate = useNavigate();
    const patient = useSelector((state)=>{ return state.patient.payload.find((val)=>{ return val.patientId === id}); });
    const appointment = useSelector((state) => {
        return state.appointment.payload
          .filter((val) => {
            return (val.patient.patientId === id );
          })
          .map((val) => {
            return { date:val.appointmentDate,time:`${moment(val.timeStart,"HH:mm").format("LT")} - ${moment(val.timeEnd,"HH:mm").format("LT")}` , dentist:`Dr. ${val.dentist.fullname}`, status: val.status, patient:`${val.patient.firstname} ${val.patient.lastname}` };
          });
      });

      const history = appointment.filter(val=>val.status === "DONE" || val.status === "CANCELLED")
        .map(val=> {return{
            date: moment(val.appointmentDate).format("L"),
            dentist: val.dentist,
            description: val.status==="DONE" ? `Appointment for ${val.patient} was successful` :  `Appointment for ${val.patient} has been cancelled`,
            status:val.status
         }});
      

         const [teethList, setTeethList] = useState([]);
         const toothChart = [...Array(32)].map((_,idx)=>{
            const filterTeeth = teethList.filter((val)=>val.teethNumber===idx+1 && val.status==="UNDER_TREATMENT");
            return { 
                teethNumber: idx+1,
                isUnderTreatment:filterTeeth.length>0?true:false,
            }
         });
         const [teethHistory, setHistory] = useState([]);
         const teethHeader = ["Appointment Start", "Appointment End", "Services","Status"]

         const selectTeethButton = (idx) => {
            const filteredSelectedTeeth = teethList.filter((val)=>val.teethNumber===idx);
            setHistory(filteredSelectedTeeth);
         }

         useEffect(()=>{
           const fetchTeeth = async()=>{
               try {
                   const response = await axios.get(`${TEETH_LINK}/${id}`);
                   setTeethList(response.data);
               } catch (error) {
                   
               }
           }
           fetchTeeth();
         },[]);
    
    const OverviewPage = () =>{
        return (
            <>
                {/* LEFT */}
                <section className=' min-h-[560px] max-h-[560px]  flex flex-col flex-grow p-4 '>
                   
                   {/* TOOTH CHART */}
                    <div className=' w-full h-auto flex flex-col gap-y-4 py-3 px-10 bg-rose-500 rounded-lg '>
                        {/* UPPER TEETH */}
                        <div className=' w-full flex flex-row justify-center items-start gap-3 '>
                            {
                                toothChart.map((val,idx)=>(
                                    <div key={idx} className={` px-5 py-8 rounded-b-2xl shadow-sm 
                                    ${val.isUnderTreatment?' bg-emerald-500 ':'bg-white'} 
                                    ${val.isUnderTreatment?' text-white ':'text-zinc-600'} 
                                    ${val.isUnderTreatment?' font-bold ':''} 
                                    cursor-pointer `}
                                    onClick={()=>selectTeethButton(val.teethNumber)}
                                    >
                                        <p>{val.teethNumber<10? `0${val.teethNumber}`:val.teethNumber}</p>
                                    </div>
                                )).slice(0,16)
                            }
                        </div>
                        
                        {/* LOWER TEETH */}
                        <div className=' w-full flex flex-row justify-center items-start gap-3 '>
                            {
                                toothChart.map((val,idx)=>(
                                    <div key={idx}  className={` px-5 py-8 rounded-t-2xl shadow-sm 
                                    ${val.isUnderTreatment?' bg-emerald-500 ':'bg-white'} 
                                    ${val.isUnderTreatment?' text-white ':'text-zinc-600'} 
                                    cursor-pointer `}
                                    onClick={()=>selectTeethButton(val.teethNumber)}
                                    >
                                        <p>{val.teethNumber}</p>
                                    </div>
                                )).slice(16,toothChart.length)
                            }
                        </div>
                    </div>

                    {
                        teethHeader.length > 0 && (
                            <div className=' bg-white rounded-md w-full p-5 mt-2 h-full '>
                                {/* HEADER */}
                                <div className=' w-full border-b-[1px] pb-2 text-zinc-500 grid grid-cols-4 '>
                                    {
                                        teethHeader.map((val,idx)=>(
                                            <p key={idx} className='uppercase text-sm font-bold '>{val}</p>
                                        ))
                                    }
                                </div>

                                <div className=' w-full h-auto max-h-[200px] overflow-auto grid gap-3 mt-2' >
                                    {
                                        teethHistory.map((val,idx)=>(
                                            <div key={idx} className=' grid grid-cols-4 w-full '>
                                                <p  className=' text-sm text-zinc-700 '>{moment(val.treatmentDate).format('MMM DD, YYYY')}</p>
                                                <p className='text-sm text-zinc-700 '>{moment(val.treatmentEnd).format('MMM DD, YYYY')}</p>
                                                <div className=' w-full flex flex-wrap gap-2 '>{
                                                    val.appointment.dentalServices.map((val,idx)=>(
                                                        <p key={idx}  className=' px-3 py-1 rounded-md w-auto bg-cyan-500 text-white capitalize text-sm'>{val.name.toLowerCase()}</p>
                                                    ))
                                                }</div>
                                                <p className=' capitalize text-sm text-zinc-700 '>{val.status === "UNDER_TREATMENT"? "TREATMENT".toLowerCase():val.status.toLowerCase()}</p>
                                            </div>
                                        ))
                                    }
                               </div>

                                
                            </div>
                        )
                    }
                </section>
            </>
        )
    }

    const HistoryPage = () =>{
        return (
            <>
                   
                {/* LEFT */}
                <section className=' h-full flex flex-col flex-grow '>
                        {/* <div   div className=' w-full p-4 flex justify-between items-center '>
                            <div className=' inline-flex gap-2  '>
                                <ExcelButton users={history} title={`${patient.lastname} ${patient.firstname} medical history`} />
                                <PDFButton data={history} />
                            </div>    
                        </div> */}
                        <section className=' w-full px-6 py-3 text-center text-white bg-cyan-600 z-30 font-bold flex justify-between items-center '>
                            <p className=' w-[200px] max-w-[200px] text-left '>Date</p>
                            <p className=' w-[200px] max-w-[200px] text-left '>Dentist</p>
                            <p className=' w-[200px] max-w-[200px] text-left '>Description</p>
                            <p className=' w-[200px] max-w-[200px] text-right '>Status</p>
                        </section>
                        <section className=' w-full min-h-[490px] max-h-[490px] overflow-auto bg-white '>
                        {
                            history.map((val,idx)=>(
                                <div className=' w-full px-6 py-3 shadow-sm hover:bg-gray-100 text-cyan-900 flex justify-between items-center'  key={idx}>
                                    <p className=' w-auto max-w-[100px] text-left '>{val.date}</p>
                                    <p className=' w-[200px] max-w-[200px] '>{val.dentist}</p>
                                    <p className=' w-[400px] max-w-[200px] text-left '>{val.description}</p>
                                    <p className={`
                                    ${val.status === "CANCELLED"?"bg-red-500":" bg-emerald-500 "}
                                     text-white px-5 py-1 capitalize rounded-full 
                                    `}>{val.status.toLowerCase()}</p>
                                </div>
                            ))
                        }
                        {/* <div className=' w-full px-6 py-3 text-cyan-900 flex justify-between items-center'>
                                    <p>val.date</p>
                                    <p>val.time</p>
                                    <p>val.dentist</p>
                                    <p>val.status</p>
                                </div> */}
                        </section>
                    </section>
            </>
        )
    }

    const TreatementPage = () =>{
        return (
            <>
                {/* LEFT */}
                <section className=' h-full flex flex-col flex-grow '>
                        <section className=' w-full px-6 py-3 text-white bg-cyan-600 z-30 font-bold flex justify-between items-center '>
                            <p>Date</p>
                            <p>Time</p>
                            <p>Dentist</p>
                            <p>Status</p>
                        </section>
                        <section className=' w-full min-h-[490px] max-h-[490px] overflow-auto bg-white '>
                        {
                            appointment
                            .filter((val) => {
                                return (
                                  (val.status === "TREATMENT")
                                );
                              })
                            .map((val,idx)=>(
                                <div className=' w-full px-6 py-3 shadow-sm hover:bg-gray-100 text-cyan-900 flex justify-between items-center'  key={idx}>
                                    <p >{moment(val.date).format("MMMM DD YYYY")}</p>
                                    <p>{val.time}</p>
                                    <p>{val.dentist}</p>
                                    <p>{val.status}</p>
                                </div>
                            ))
                        }
                        {/* <div className=' w-full px-6 py-3 text-cyan-900 flex justify-between items-center'>
                                    <p>val.date</p>
                                    <p>val.time</p>
                                    <p>val.dentist</p>
                                    <p>val.status</p>
                                </div> */}
                        </section>
                    </section>
            </>
        )
    }

    return teethList && (
        <section className=" w-full h-screen overflow-hidden relative bg-gray-200">
            
            <section className=' w-full h-full bg-gray-200 '>
                {/* HEADER */}
                <section className=' w-full flex flex-row-reverse justify-between items-center p-5'> 
                    <section className='flex gap-1'>
                    <p className={` ${ headerNavigation=== "overview"? "bg-cyan-600 text-white":" text-cyan-900" } py-3 px-8 cursor-pointer hover:bg-cyan-600 hover:text-white `} onClick={()=>setHeaderNavigation("overview")} >Overview</p>
                    <p className={` ${ headerNavigation=== "history"? "bg-cyan-600 text-white":" text-cyan-900" } py-3 px-8 cursor-pointer hover:bg-cyan-600 hover:text-white `} onClick={()=>setHeaderNavigation("history")} >Dental history</p>
                    <p className={` ${ headerNavigation=== "treatment"? "bg-cyan-600 text-white":" text-cyan-900" } py-3 px-8 cursor-pointer hover:bg-cyan-600 hover:text-white `} onClick={()=>setHeaderNavigation("treatment")} >Treatment</p>
                    </section>
                    <p className=' text-cyan-900 font-bold flex justify-center items-center gap-1 cursor-pointer ' onClick={()=>navigate("/admin/dashboard/patient")}  ><IoArrowBackSharp /> Back</p>
                </section>

                <section className=' h-fit p-5 flex flex-1 gap-3 '>
                    {/* RIGHT */}
                    <section className=' h-full w-1/4 px-5 py-7 bg-white flex flex-col justify-center items-center '>
                        <img src={patient.profile} className=' w-44 h-44 rounded-full ' alt='patient profile' />
                        <h3 className='mt-3 text-lg text-cyan-900 '>{patient.firstname} {patient.lastname}</h3>
                        <p className=' text-cyan-500 text-sm ' >{patient.email}</p>
                        <section className=' w-full flex justify-between p-2 mt-5 border-gray-300 border-t-2 '>
                            <p className='text-cyan-900 font-bold'>Gender</p>
                            <p className=' capitalize text-cyan-600  '>{patient.gender}</p>
                        </section>
                        <section className=' w-full flex justify-between p-2 mt-5 border-gray-300 border-t-2 '>
                            <p className='text-cyan-900 font-bold'>Birthday</p>
                            <p className=' capitalize text-cyan-600 '>{moment(patient.birthday).format("MMM DD, YYYY")}</p>
                        </section>
                        <section className=' w-full flex justify-between p-2 mt-5 border-gray-300 border-t-2 '>
                            <p className='text-cyan-900 font-bold'>Phone</p>
                            <p className=' capitalize text-cyan-600   '>{patient.contactNumber}</p>
                        </section>
                        <section className=' w-full flex justify-between p-2 mt-5 border-gray-300 border-t-2 '>
                            <p className='text-cyan-900 font-bold'>Address</p>
                            <p className=' capitalize text-cyan-600   '>{patient.address}</p>
                        </section>
                    </section>

                    { headerNavigation === "overview" ? <OverviewPage /> : headerNavigation === "history" ? <HistoryPage /> : <TreatementPage />  }

                </section>

                
            </section>

        </section>
    );
}

export default ViewPatient;