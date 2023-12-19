import React, { useEffect, useMemo, useState } from 'react';
import PageHeader from '../components/PageHeader';
import { IoAdd } from 'react-icons/io5';
import { BiSearchAlt } from 'react-icons/bi';
import Table from '../components/Table';
import Modal from '../components/AdminModal';
import Pagination from '../components/Pagination';
import ExcelButton from '../components/ExcelButton';
import PDFButton from '../components/PDFButton';
import { useSelector,useDispatch } from 'react-redux';
import { ToastContainer } from "react-toastify";
import LoadingSpinner from '../components/LoadingSpinner';
import { fetchPatient } from '../redux/action/PatientAction';
import moment from 'moment';

function Patients() {
  const patient = useSelector((state) => { return state?.patient?.payload });
  const {firstname, lastname} = useSelector((state) => { return state?.admin?.loginAdmin});
  const tableHeaders = useMemo(()=>["profile", "full name", "birthday", "gender", "contact number", "email", "status", "action"],[]);
  const [show, setModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  const pageNumber = useMemo(()=>{
    const page = [];
    for (let x = 1; x <= Math.ceil(patient?.length / 8); x++) {
      page.push(x);
    }
    return page;
  },[patient]);

  const searchHandle = (e) => {
    setSearch(e.target.value);
  }

  const filteredPatient = useMemo(()=>{
    return patient?.sort()?.filter((val) =>
    (val.firstname + val.middlename + val.lastname + val.birthday + val.phoneNumber + val.email).toLowerCase()
      .includes(search.toLowerCase())
  );
  },[search]);

  useEffect(()=>{
    if(!patient){
      dispatch(fetchPatient());
    }
  },[])

  return (
    <>
      {!patient ? (<div className='w-full h-screen flex justify-center items-center'>
        <LoadingSpinner loading={true} />
      </div>)
      : (
        <div className='h-screen overflow-hidden relative bg-gray-200'>
          <Modal show={show} setModal={setModal} type="patient" />
          <PageHeader link={'patient'} />
          <ToastContainer limit={1} autoClose={1500} />

          <div className='w-full flex flex-col justify-center p-4'>
            <div className=' w-full rounded shadow bg-white'>

              {/*//~ BUTTON FILES SEARCH CONTAINER */}
              <div className='w-full p-4 flex justify-between items-center'>

                {/*//~ ADD BUTTON */}
                <div className='flex items-center justify-between p-2 bg-blue-500 hover:bg-blue-800 rounded cursor-pointer text-white' onClick={() => setModal(true)}>
                  <IoAdd size={30} />
                  <button className='font-bold pr-2'>Add Patient</button>
                </div>
                {/*//~ ADD BUTTON */}

                {/*//~ FILES */}
                <div className=' inline-flex gap-2  '>
                  <ExcelButton users={patient} title={"Patient List"} authorizedPerson={`Admin ${firstname} ${lastname}`} time={`${moment().format('MMMM Do YYYY dddd, h:mm:ss a')}`} />
                  {/* authorizedPerson={`Admin ${firstname} ${lastname}`} time={`${moment().tz('Asia/Manila').format('YYYY-MM-DD HH:mm:ss')}`} */}
                  <PDFButton data={patient} type="patients" title={"Patient List Report"} authorizedPerson={`Admin ${firstname} ${lastname}`} time={`${moment().format('MMMM Do YYYY dddd, h:mm:ss a')}`}/>
                  {/* <FileIcons Icon={AiFillPrinter} title={"Print"} /> */}
                </div>
                {/*//~ FILES */}

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
              {/*//~ BUTTON FILES SEARCH CONTAINER */}

              <Table tableHeaders={tableHeaders} results={search.length > 0 ? filteredPatient : patient?.sort()} search={search} currentPage={currentPage} />
              <Pagination setCurrentPage={setCurrentPage} pageNumber={pageNumber} currentPage={currentPage}/>
            </div>
          </div>
        </div>
      )  
    }
    </>
  )
}

export default React.memo(Patients)