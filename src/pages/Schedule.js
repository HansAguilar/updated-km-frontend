import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { IoAdd } from "react-icons/io5";
import { useSelector } from 'react-redux';
import Table from '../components/ScheduleTable';
import ScheduleModal from '../components/ScheduleModal';
import UpdateScheduleModal from '../components/UpdateScheduleModal';
import { BiSearchAlt } from 'react-icons/bi';

function Schedule() {
  const [modal, setModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [info, setInfo] = useState(null);
  const schedule = useSelector((state) => state.schedule.payload);
  const tableHeaders = ["Dentist Name", "Date", "Time Start", "Time End", "Action"];

  return (
    <div className='h-screen overflow-hidden relative bg-gray-200'>
      {modal && <ScheduleModal setModal={setModal} />}
      {updateModal && <UpdateScheduleModal setModal={setUpdateModal} info={info} />}
      <PageHeader link={'Schedule'} />
      <div className='w-full flex flex-col justify-center p-4'>
        <div className=' w-full rounded shadow bg-white'>

          {/*//~ BUTTON FILES SEARCH CONTAINER */}
          <div className='w-full p-4 flex justify-between items-center'>

            {/*//~ ADD BUTTON */}
            <div className='flex items-center justify-between p-2 bg-blue-400 hover:bg-blue-500 rounded cursor-pointer text-white' onClick={() => setModal(true)}>
              <IoAdd size={30} />
              <button className='font-bold pr-2'>Add Schedule</button>
            </div>
            {/*//~ ADD BUTTON */}

            {/*//~ SEARCH */}
            <div className='relative z-0'>
              <BiSearchAlt className="absolute left-2 top-2 text-gray-400" size={24} />
              <input
                type='text'
                name='search'
                className=' placeholder:indent-6 indent-6 p-2 w-80 border border-slate-300 focus:bg-blue-100/20 transition-all ease-linear focus:border-blue-400 rounded focus:outline-none '
                placeholder='Search Schedule...'
              // onChange={(e) => searchHandle(e)}
              />
            </div>
            {/*//~ SEARCH */}

          </div>
          {/*//~ BUTTON FILES SEARCH CONTAINER */}

          {/* <Table tableHeaders={tableHeaders} results={ payload } currentPage={currentPage} />  */}
          <Table tableHeaders={tableHeaders} results={schedule} setInfo={setInfo} setModal={setUpdateModal} />
          {/* <Pagination setCurrentPage={setCurrentPage} pageNumber={pageNumber} /> */}
        </div>
      </div>
    </div>
  )
}

export default Schedule