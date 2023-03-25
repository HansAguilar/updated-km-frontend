import React,{ useState } from 'react';
import PageHeader from '../components/PageHeader';
import { IoAdd } from 'react-icons/io5';
// import { AiFillPrinter } from 'react-icons/ai';
// import FileIcons from '../components/FileIcons';
// import Table from '../components/Table';
import Modal from '../components/ScheduleModal';
// import Pagination from '../components/Pagination';
// import { useNavigate } from 'react-router-dom';
// import ExcelButton from '../components/ExcelButton';
// import PDFButton from '../components/PDFButton';

function Schedule() {
  const [ show, setModal ] = useState(false);
  const [ search, setSearch ] = useState("");

  const searchHandle = (e) =>{ 
    setSearch(e.target.value);
  }
  console.log(search);
  return (
    <div className=' h-screen overflow-hidden relative '>
      <Modal show={show} setModal={setModal} />
      <PageHeader link={'Schedule'} />
      <div className=' w-full flex flex-col justify-center p-4 '> 
        <div className=' w-full bg-white h-auto rounded-xl shadow-lg'>
          {/*Sub header*/}
          <div className=' w-full p-4 border-t-2 border-t-cyan-500 rounded-t-xl flex justify-between items-center border-b-2 '>
              <h1 className=' text-xl '>Schedule List</h1>
              <button className=' bg-cyan-500 text-white flex justify-start items-center pl-1 pr-6 py-2 cursor-pointer rounded-md font-bold capitalize ' onClick={()=>setModal(true)}><IoAdd size={30} />&nbsp;Add schedule</button>
          </div>
           {/*Searchbar and files*/}
           <div className=' w-full p-4 flex justify-between '>
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

              {/* <Table tableHeaders={tableHeaders} results={ search.length > 0 ? filteredPatient : patients  } search={search} currentPage={currentPage} update={updatePatient} /> 
              <Pagination setCurrentPage={setCurrentPage} pageNumber={pageNumber} />
              */}
            </div>
        </div>
      </div>
    </div>
  )
}

export default Schedule