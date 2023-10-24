import React, { useState, } from 'react';
import PageHeader from '../components/PageHeader';
import { IoAdd } from 'react-icons/io5';
import Table from '../components/ServiceTable';
import Modal from '../components/ServicesModal';
import Pagination from '../components/Pagination';
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { BiSearchAlt } from 'react-icons/bi';

function Services() {
  const [show, setModal] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const tableHeaders = ["Service Name", "Service Type", "Service Duration", "Service Price", "Action"];
  const pageNumber = [];

  const { payload } = useSelector((state) => { return state.service });

  for (let x = 1; x <= Math.ceil(payload.length / 8); x++) {
    pageNumber.push(x);
  }


  const searchHandle = (e) => {
    setSearch(e.target.value);
  }

  const filteredServices = payload.filter(val =>
    (val.name + val.type + val.duration + val.price).toLowerCase().includes(search)
  );

  return (
    <div className='h-screen overflow-hidden relative bg-gray-200'>
      <ToastContainer limit={1} autoClose={1500} />
      <Modal show={show} setModal={setModal} />
      <PageHeader link={'Service'} />
      <div className='w-full flex flex-col justify-center p-4'>
        <div className=' w-full rounded shadow bg-white'>

          {/*//~ BUTTON FILES SEARCH CONTAINER */}
          <div className='w-full p-4 flex justify-between items-center'>

            {/*//~ ADD BUTTON */}
            <div className='flex items-center justify-between p-2 bg-blue-400 hover:bg-blue-500 rounded cursor-pointer text-white' onClick={() => setModal(true)}>
              <IoAdd size={30} />
              <button className='font-bold pr-2'>Add Service</button>
            </div>
            {/*//~ ADD BUTTON */}


            {/*//~ SEARCH */}
            <div className='relative z-0'>
              <BiSearchAlt className="absolute left-2 top-2 text-gray-400" size={24} />
              <input
                type='text'
                name='search'
                className=' placeholder:indent-6 indent-6 p-2 w-80 border border-slate-300 focus:bg-blue-100/20 transition-all ease-linear focus:border-blue-400 rounded focus:outline-none '
                placeholder='Search Services...'
                onChange={(e) => searchHandle(e)}
              />
            </div>
            {/*//~ SEARCH */}

          </div>
          {/*//~ BUTTON FILES SEARCH CONTAINER */}

          <Table tableHeaders={tableHeaders} results={search.length > 0 ? filteredServices : payload} search={search} currentPage={currentPage} />
          <Pagination setCurrentPage={setCurrentPage} pageNumber={pageNumber} currentPage={currentPage}/>
        </div>
      </div>
    </div>
  )
}

export default Services