import React,{ useState } from 'react';
import PageHeader from '../components/PageHeader';
import { IoAdd } from 'react-icons/io5';
import { AiFillPrinter } from 'react-icons/ai';
import FileIcons from '../components/FileIcons';
import Table from '../components/PaymentTable';
import Modal from '../components/AdminModal';
import Pagination from '../components/Pagination';
import ExcelButton from '../components/ExcelButton';
import PDFButton from '../components/PDFButton';
import { useSelector } from 'react-redux';

  function Payments() {
    const payload = useSelector((state)=>{ return state.payment.payload.filter((val)=>val.status==="PENDING") });
    const tableHeaders = [ "photo", "patient","method","type","payment total","action" ];
    const [ show, setModal ] = useState(false);
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ search, setSearch ] = useState("");
    const pageNumber = [];
    
    for(let x = 1; x <= Math.ceil(payload.length/8);x++){
      pageNumber.push(x);
    }

    const searchHandle = (e) =>{ 
      setSearch(e.target.value);
    }

    const filteredPatient = payload.sort().filter((val)=>
       (val.appointment.patient.firstname+val.appointment.patient.middlename+val.appointment.patient.lastname).toLowerCase()
      .includes(search.toLowerCase())
    );

    return (
      <div className=' h-screen overflow-hidden relative bg-gray-200 '>
          <Modal show={show} setModal={setModal} type="patient" />
          <PageHeader link={'payment'} />
          
          <div className=' w-full flex flex-col justify-center p-4 '> 
            
              <div className=' w-full h-auto '>
  
                  {/*Sub header*/}
                    {/* <div className=' w-full p-4 flex justify-between items-center '>
                      <h1 className=' text-xl '>Patient List</h1>
                      
                    </div> */}
                   
                    {/*Tables*/}
                    <div className=' w-full h-auto p-5 rounded-lg bg-white ' >
                      {/*Searchbar and files*/}
                    <div className=' w-full p-4 flex justify-between items-center '>
                    {/* <button className=' bg-cyan-500 text-white flex justify-start items-center pl-1 pr-6 py-2 cursor-pointer rounded-md font-bold capitalize ' onClick={()=>setModal(true)}><IoAdd size={30} />&nbsp;Add patient</button> */}
                      <div className=' inline-flex gap-2  '>
                        {/* <ExcelButton users={payload} title={"patients"} /> */}
                        {/*  */}
                        {/* <PDFButton data={payload} />
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
                      <Table tableHeaders={tableHeaders} results={ search.length > 0 ? filteredPatient : payload.sort()  } search={search} currentPage={currentPage} />
                      {/*Pagination */}
                      <Pagination setCurrentPage={setCurrentPage} pageNumber={pageNumber} />
                    </div>
                  <div>
                </div>
            </div>
          </div>
      </div>
    )
  }
  
  export default Payments