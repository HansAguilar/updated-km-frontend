import React, { useEffect, useMemo, useState } from 'react';
import PageHeader from '../components/PageHeader';
import { IoAdd } from 'react-icons/io5';
import DentistModal from '../components/DentistModal';
import Pagination from '../components/Pagination';
import DentistTable from '../components/DentistTable';
import DentistExcelButton from '../components/DentistExcelButton';
import PDFButton from '../components/PDFButton';
import { BiSearchAlt } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { fetchDentist } from '../redux/action/DentistAction';
import LoadingSpinner from "../components/LoadingSpinner"
import moment from 'moment';

function Dentist() {
  const {firstname, lastname} = useSelector((state) => { return state?.admin?.loginAdmin});
  const dispatch = useDispatch();
  const [show, setModal] = useState(false);
  const [search, setSearch] = useState("");
  const dentistList = useSelector((state) => state?.dentist?.payload)
  const [currentPage, setCurrentPage] = useState(1);
  const tableHeaders = useMemo(() => ["profile", "fullname", "address", "gender", "contact number", "email", "specialty", "status", "action"], []);

  const pageNumber = useMemo(() => {
    const page = [];
    for (let x = 1; x <= Math.ceil(dentistList?.length / 8); x++) {
      page.push(x);
    }
    return page;
  }, [dentistList]);


  const searchHandle = (e) => {
    setSearch(e.target.value);
  }
  const filteredDentist = useMemo(() => {
    return dentistList?.filter(dentist =>
      (dentist.fullname + dentist.address + dentist.specialty).toLowerCase().includes(search)
    );
  }, [dentistList]);

  useEffect(()=>{
    if(!dentistList){
      dispatch(fetchDentist());
    }
  })


  return (
    <>
      {
        !dentistList ? <div className=' w-full h-screen flex justify-center items-center '><LoadingSpinner loading={true} /></div>
        : (
          <div className=' h-screen overflow-hidden relative bg-gray-200 '>
            <DentistModal show={show} setModal={setModal} />
            <PageHeader link={'Dentist'} />
            <ToastContainer limit={1} autoClose={1500} />

            <div className=' w-full flex flex-col justify-center p-4'>
              <div className=' w-full rounded shadow bg-white'>

                {/*//~ BUTTON FILES SEARCH CONTAINER */}
                <div className='w-full p-4 flex justify-between items-center'>

                  {/*//~ ADD BUTTON */}
                  <div className='flex items-center justify-between p-2 bg-blue-500 hover:bg-blue-800 rounded cursor-pointer text-white' onClick={() => setModal(true)}>
                    <IoAdd size={30} />
                    <button className='font-bold pr-2'>&nbsp;Add Dentist</button>
                  </div>
                  {/*//~ ADD BUTTON */}

                  {/*//~ FILES */}
                  <div className=' inline-flex gap-2  '>
                    <DentistExcelButton users={dentistList} title={"Dentist List Report"} authorizedPerson={`Admin ${firstname} ${lastname}`} time={`${moment().format('MMMM Do YYYY dddd, h:mm:ss a')}`} />
                    <PDFButton data={dentistList} type="dentist" title={"Dentist List Report"} authorizedPerson={`Admin ${firstname} ${lastname}`} time={`${moment().format('MMMM Do YYYY dddd, h:mm:ss a')}`}/>
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
                      placeholder='Search Dentist...'
                      onChange={(e) => searchHandle(e)}
                    />
                  </div>
                  {/*//~ SEARCH */}

                </div>
                {/*//~ BUTTON FILES SEARCH CONTAINER */}

                <DentistTable tableHeaders={tableHeaders} results={search.length > 0 ? filteredDentist : dentistList} search={search} currentPage={currentPage} />
                <Pagination setCurrentPage={setCurrentPage} pageNumber={pageNumber} currentPage={currentPage} />
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}

export default React.memo(Dentist);