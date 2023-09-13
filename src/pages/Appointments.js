import React,{ useEffect, useState} from 'react';
import PageHeader from '../components/PageHeader';
import { IoAdd } from 'react-icons/io5';
// import { AiFillPrinter } from 'react-icons/ai';
// import FileIcons from '../components/FileIcons';
import Table from '../components/AppointmentTable';
import Modal from '../components/AppointmentModal';
import CovidTestModal from '../components/CovidServiceModal';
import Pagination from '../components/Pagination';
import { fetchPatientAppointment,responseToCancelledAppointment,fetchAppointment} from "../redux/action/AppointmentAction";
import { fetchPatientPayments } from "../redux/action/PaymentAction";
import { useDispatch, useSelector } from 'react-redux';
import * as io from "socket.io-client";
import { SOCKET_LINK } from '../ApiLinks';
// import { useNavigate } from 'react-router-dom';
// import ExcelButton from '../components/ExcelButton';
// import PDFButton from '../components/PDFButton';


const socket = io.connect(SOCKET_LINK);
function Appointments() {
  const dispatch = useDispatch();
  const [ show, setModal ] = useState(false);
  const [ covidShow, setCovidModal ] = useState(false);
  const [ search, setSearch ] = useState("");
  const appointmentList = useSelector((state)=>{ return state.appointment.payload; })
  const fee = useSelector((state)=>{ return state.fee.payload; });
  const [ currentPage, setCurrentPage ] = useState(1);
  const tableHeaders = [ "Patient Name", "Date Submitted", "Appointment Date", "Appointment Start", "Appointment End", "Status","ATC", "Action"];
  const pageNumber = [];
  
  const [appointment, setAppointment] = useState({
    patient: '',
    patientId:"",
    dentist: '',
    dentistId:"",
    serviceValue: "",
    serviceSelected:[],
    date:"",
    numberOfMonths:0,
    timeStart: "",
    timeEnd:"",
    totalAmount:fee.status === "AVAILABLE"?fee.price:0.00,
    timeSubmitted:"",
    method: "",
    type: "",
    insuranceId: "",
  });

  console.log(appointment.totalAmount);
  for(let x = 1; x <= Math.ceil(appointmentList.length/8);x++){
    pageNumber.push(x);
  }


  const searchHandle = (e) =>{ 
    setSearch(e.target.value);
  }
  // console.log(appointmentList);

  const filteredServices = appointmentList.filter(val=>
    (val.patient.firstname+val.patient.middlename+val.patient.lastname).toLowerCase().includes(search)
    );

    const filteredAppointments = appointmentList.map((appointment) => {
      return {
        date: appointment.appointmentDate,
        timeStart: appointment.timeStart,
        timeEnd: appointment.timeEnd,
        status: appointment.status
      };
    });
   

    useEffect(()=>{
      socket.on("response_changes",(data)=>{
        dispatch(fetchPatientAppointment());
        dispatch(fetchPatientPayments());
      })

      socket.on("response_cancel",(data)=>{
        dispatch(responseToCancelledAppointment(data.value));
      })

      return ()=>{socket.off()}
    },[socket]);
  return (
    <div className=' h-screen overflow-hidden relative '>
      <Modal show={show} setModal={setModal} setCovidModal={setCovidModal} appointment={appointment} setAppointment={setAppointment} filteredAppointments={filteredAppointments} />
      <CovidTestModal show={covidShow} setModal={setCovidModal} setAddModal={setModal} data={appointment} setAppointment={setAppointment} />
      
      <PageHeader link={'Appointment'} />
      <div className=' w-full flex flex-col justify-center p-4 '> 
        <div className=' w-full bg-white h-auto rounded-xl shadow-lg'>
          {/*Sub header*/}
          {/* <div className=' w-full h-auto p-4 border-t-2 border-t-cyan-500 rounded-t-xl flex justify-between items-center border-b-2 '>
              <h1 className=' text-xl '>Appointment List</h1>
              <div className='flex gap-3 '>
                <button className=' bg-gray-500 text-white flex justify-start items-center pl-4 pr-8 py-2 cursor-pointer rounded-md font-bold capitalize ' onClick={()=>navigate("/admin/dashboard/history")}><AiOutlineHistory size={30} />&nbsp;History</button>
                <button className=' bg-cyan-500 text-white flex justify-start items-center pl-1 pr-6 py-2 cursor-pointer rounded-md font-bold capitalize ' onClick={()=>setModal(true)}><IoAdd size={30} />&nbsp;Add Appointment</button> 
              </div>
          </div> */}
           {/*Searchbar and files*/}
           <div className=' w-full p-4 flex justify-between '>
              <button className=' bg-cyan-500 text-white flex justify-start items-center pl-1 pr-6 py-2 cursor-pointer rounded-md font-bold capitalize ' onClick={()=>setModal(true)}><IoAdd size={30} />&nbsp;Add Appointment</button> 
              <div className=' inline-flex gap-2  '>
                  {/* <ExcelButton user={patients} title={"patients"} />
                  <PDFButton data={patients} />
                  <FileIcons Icon={AiFillPrinter} title={"Print"} /> */}
              </div>    
              <input
                  type='text'
                  name='search'
                  className=' px-4 py-1 w-80 border border-gray-300 outline-none '
                  placeholder='Search'
                  onChange={(e)=>searchHandle(e)}
                />

              
    
            </div>
            <Table tableHeaders={tableHeaders} results={ search.length > 0 ? filteredServices : appointmentList  } search={search} currentPage={currentPage} /> 
              <Pagination setCurrentPage={setCurrentPage} pageNumber={pageNumber} />
        </div>
      </div>
    </div>
  )
}

export default Appointments