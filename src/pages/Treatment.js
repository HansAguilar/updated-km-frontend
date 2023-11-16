import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { IoAdd } from 'react-icons/io5';
import { ToastContainer } from "react-toastify";
import Table from '../components/AppointmentTable';
import Modal from '../components/TreatmentModal';
import CovidTestModal from '../components/CovidServiceModal';
import Pagination from '../components/Pagination';
import { BiSearchAlt } from 'react-icons/bi';
import { useSelector } from 'react-redux';

function Appointments() {
  const [show, setModal] = useState(false);
  const [covidShow, setCovidModal] = useState(false);
  const [search, setSearch] = useState("");
  const appointmentList = useSelector((state) => { return state.appointment.payload.filter((val) => val.status === "TREATMENT"); })
  const [currentPage, setCurrentPage] = useState(1);
  const tableHeaders = ["Patient Name", "Dentist Name", "Treatment Date", "Treatment Start", "Treatment End", "Treatment Duration", "Teeth Number ", "Status", "Action"];
  const pageNumber = [];

  const [appointment, setAppointment] = useState({
    patient: '',
    patientId: "",
    dentist: '',
    dentistId: "",
    serviceValue: "",
    serviceSelected: [],
    date: "",
    timeStart: "",
    timeEnd: "",
    totalAmount: 0.00,
    method: "",
    type: "",
    insuranceId: "",
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
    <div className=' h-screen overflow-hidden relative bg-gray-200 '>
      <Modal show={show} setModal={setModal} setCovidModal={setCovidModal} appointment={appointment} setAppointment={setAppointment} filteredAppointments={filteredAppointments} />
      <CovidTestModal show={covidShow} setModal={setCovidModal} setAddModal={setModal} data={appointment} />
      <ToastContainer limit={1} autoClose={1500} />
      <PageHeader link={'Treatment'} />

      <div className=' w-full flex flex-col justify-center p-4'>
        <div className=' w-full rounded shadow bg-white'>

          {/*//~ BUTTON FILES SEARCH CONTAINER */}
          <div className='w-full p-4 flex justify-between items-center'>

            {/*//~ ADD BUTTON */}
            {/* <div className='flex items-center justify-between p-2 bg-blue-400 hover:bg-blue-500 rounded cursor-pointer text-white' onClick={() => setModal(true)}>
              <IoAdd size={30} />
              <button className='font-bold pr-2'>Add Treatment</button>
            </div> */}
            {/*//~ ADD BUTTON */}

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

          <Table tableHeaders={tableHeaders} results={search.length > 0 ? filteredServices : appointmentList} search={search} currentPage={currentPage} type="Treatment" />
          <Pagination setCurrentPage={setCurrentPage} pageNumber={pageNumber} />
        </div>
      </div>
    </div>
  )
}

export default Appointments