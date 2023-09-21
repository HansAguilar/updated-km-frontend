import React,{ useState } from 'react';
import PageHeader from '../components/PageHeader';
import { IoAdd } from "react-icons/io5";
import { useSelector } from 'react-redux';
import Table from '../components/ScheduleTable';
import ScheduleModal from '../components/ScheduleModal';
import UpdateScheduleModal from '../components/UpdateScheduleModal';

function Schedule() {
  const [modal, setModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [info, setInfo] = useState(null);
  const schedule = useSelector((state)=>state.schedule.payload);
  const tableHeaders = [ "Dentist Name", "Date", "Time Start", "Time End","Action"];

  return (
    <div className=' h-screen overflow-hidden relative '>
      
      {modal && <ScheduleModal setModal={setModal} />}
      {updateModal && <UpdateScheduleModal setModal={setUpdateModal} info={info} />}
      <PageHeader link={'Schedule'} />
      <div className=' w-full flex flex-col justify-center p-4 '> 
        <div className=' w-full bg-white h-auto shadow-lg rounded-md '>
           {/*Searchbar and files*/}
           <div className=' w-full p-4 flex justify-between '>

              <div className='flex gap-3 '>
                <button className=' bg-cyan-500 text-white flex justify-start items-center pl-1 pr-6 py-2 cursor-pointer rounded-md font-bold capitalize ' onClick={()=>setModal(true)}><IoAdd size={30} />&nbsp;Add Schedule</button> 
              </div>

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
                  //onChange={(e)=>searchHandle(e)}
                />

              
    
            </div>
            {/* <Table tableHeaders={tableHeaders} results={ payload } currentPage={currentPage} />  */}
            <Table tableHeaders={tableHeaders} results={ schedule} setInfo={setInfo} setModal={setUpdateModal} /> 
            {/* <Pagination setCurrentPage={setCurrentPage} pageNumber={pageNumber} /> */}
        </div>
      </div>
    </div>
  )
}

export default Schedule