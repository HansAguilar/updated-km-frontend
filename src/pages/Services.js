import React,{ useState,} from 'react';
import PageHeader from '../components/PageHeader';
import { IoAdd } from 'react-icons/io5';
import Table from '../components/ServiceTable';
import Modal from '../components/ServicesModal';
import Pagination from '../components/Pagination';
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

function Services() {
  const [ show, setModal ] = useState(false);
  const [ search, setSearch ] = useState("");
  const [ currentPage, setCurrentPage ] = useState(1);
  const tableHeaders = [ "Service Name", "Service Type", "Service Duration", "Service Price", "Action"];
  const pageNumber = [];

  const {payload} = useSelector((state)=>{ return state.service });

  for(let x = 1; x <= Math.ceil(payload.length/8);x++){
    pageNumber.push(x);
  }


  const searchHandle = (e) =>{ 
    setSearch(e.target.value);
  }

  const filteredServices = payload.filter(val=>
    (val.name+val.type+val.duration+val.price).toLowerCase().includes(search)
    );

  return (
    <div className=' h-screen overflow-hidden relative bg-gray-200 '>
      <ToastContainer />
      <Modal show={show} setModal={setModal} />
      <PageHeader link={'Service'} />
      <div className=' w-full flex flex-col justify-center p-4 '> 

        <div className=' w-full h-auto p-5 rounded-lg bg-white '>
           {/*Searchbar and files*/}
           <div className=' w-full p-4 flex justify-between items-center '>
              <button className=' bg-cyan-500 text-white flex justify-start items-center pl-1 pr-6 py-2 cursor-pointer rounded-md font-bold capitalize ' onClick={()=>setModal(true)}><IoAdd size={30} />&nbsp;Add service</button>
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

            <Table tableHeaders={tableHeaders} results={ search.length > 0 ? filteredServices : payload  } search={search} currentPage={currentPage} /> 
              <Pagination setCurrentPage={setCurrentPage} pageNumber={pageNumber} />
        </div>
      </div>
    </div>
  )
}

export default Services