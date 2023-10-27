import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { IoAdd } from 'react-icons/io5';
import { AiOutlineHistory } from 'react-icons/ai';
import Table from '../components/AppointmentTable';
import Modal from '../components/AppointmentModal';
import CovidTestModal from '../components/CovidServiceModal';
import Pagination from '../components/Pagination';
import { fetchPatientAppointment, responseToCancelledAppointment, fetchAppointment } from "../redux/action/AppointmentAction";
import { fetchPatientPayments } from "../redux/action/PaymentAction";
import { useDispatch, useSelector } from 'react-redux';
import * as io from "socket.io-client";
import { SOCKET_LINK } from '../ApiLinks';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { BiSearchAlt } from 'react-icons/bi';
import { ToastContainer } from 'react-toastify';

const socket = io.connect(SOCKET_LINK);
function Appointments() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setModal] = useState(false);
  const [covidShow, setCovidModal] = useState(false);
  const [search, setSearch] = useState("");
  const appointmentHistory = useSelector((state) => { return state.appointment.payload })
  const appointmentList = useSelector((state) => { return state.appointment.payload.filter((val) => val.status === "PENDING" || val.status === "APPROVED") })
  const fee = useSelector((state) => { return state.fee.payload; });
  const [currentPage, setCurrentPage] = useState(1);
  const tableHeaders = ["Patient Name", "Date Submitted", "Appointment Date", "Start Time", "End Time", "Status", "ATC", "Action"];
  const pageNumber = [];

  const [appointment, setAppointment] = useState({
    patient: '',
    patientId: "",
    dentist: '',
    dentistId: "",
    serviceValue: "",
    serviceSelected: [],
    date: "",
    numberOfMonths: 0,
    timeStart: "",
    timeEnd: "",
    totalAmount: fee.status === "AVAILABLE" ? fee.price : 0.00,
    timeSubmitted: "",
    method: "",
    type: "",
    insuranceId: "",
  });

  const history = appointmentHistory.filter(val => val.status === "DONE" || val.status === "CANCELLED")
    .map(val => {
      return {
        date: moment(val.appointmentDate).format("L"),
        name: `${`${val.patient.firstname} ${val.patient.lastname}`}`,
        description: val.status === "DONE" ? `Appointment for  was successful` : `Appointment for ${val.patient} has been cancelled`,
        status: val.status
      }
    });

  for (let x = 1; x <= Math.ceil(appointmentList.length / 8); x++) {
    pageNumber.push(x);
  }

  const searchHandle = (e) => {
    setSearch(e.target.value);
  }

  const filteredServices = appointmentList.filter(val =>
    (val.patient.firstname + val.patient.middlename + val.patient.lastname).toLowerCase().includes(search)
  );

  const filteredAppointments = appointmentList.map((appointment) => {
    return {
      date: appointment.appointmentDate,
      timeStart: appointment.timeStart,
      timeEnd: appointment.timeEnd,
      status: appointment.status
    };
  });

  return (
    <div className='h-screen overflow-hidden relative bg-gray-200 '>
      <Modal show={show} setModal={setModal} setCovidModal={setCovidModal} appointment={appointment} setAppointment={setAppointment} filteredAppointments={filteredAppointments} />
      <CovidTestModal show={covidShow} setModal={setCovidModal} setAddModal={setModal} data={appointment} setAppointment={setAppointment} />
      <PageHeader link={'Appointment'} />
      <ToastContainer limit={1} autoClose={1500} />

      <div className='w-full flex flex-col justify-center p-4'>
        <div className=' w-full rounded shadow bg-white'>

          {/*//~ BUTTON HISTORY SEARCH CONTAINER */}
          <div className='w-full p-4 flex justify-between items-center'>

            {/*//~ BUTTON */}
            <div className='flex items-center gap-4'>
              <div className='flex items-center justify-between p-2 bg-blue-500 hover:bg-blue-800 rounded cursor-pointer text-white' onClick={() => setModal(true)}>
                <IoAdd size={30} />
                <button className='font-bold pr-2'>Add Appointment</button>
              </div>
              <div className='flex items-center justify-between gap-2 p-2 bg-slate-400 hover:bg-slate-500 rounded cursor-pointer text-white' onClick={() => navigate("/admin/dashboard/history")}>
                <AiOutlineHistory size={30} />
                <button className='font-bold pr-2'>History</button>
              </div>
            </div>
            {/*//~ BUTTON */}


            {/*//~ SEARCH */}
            <div className='relative z-0'>
              <BiSearchAlt className="absolute left-2 top-2 text-gray-400" size={24} />
              <input
                type='text'
                name='search'
                className=' placeholder:indent-6 indent-6 p-2 w-80 border border-slate-300 focus:bg-blue-100/20 transition-all ease-linear focus:border-blue-400 rounded focus:outline-none '
                placeholder='Search Patient...'
                onChange={(e) => searchHandle(e)}
              />
            </div>
            {/*//~ SEARCH */}

          </div>
          {/*//~ BUTTON HISTORY SEARCH CONTAINER */}

          <Table tableHeaders={tableHeaders} results={search.length > 0 ? filteredServices : appointmentList} search={search} currentPage={currentPage} />
          <Pagination setCurrentPage={setCurrentPage} pageNumber={pageNumber} currentPage={currentPage}/>
        </div>
      </div>
    </div>
  )
}

export default Appointments