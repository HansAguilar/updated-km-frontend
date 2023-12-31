import React, { useCallback, useMemo, useState,useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import { IoAdd } from 'react-icons/io5';
import Table from '../components/AnnouncementTable';
import Modal from '../components/AnnouncementModal';
import Pagination from '../components/Pagination';
import { ToastContainer } from 'react-toastify';
import { BiSearchAlt } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnnouncement } from '../redux/action/AnnouncementAction';
import LoadingSpinner from '../components/LoadingSpinner';

function Announcement() {
  const tableHeaders = useMemo(()=>["picture", "title", "description", "type", "action"],[])
  const announcement = useSelector((state)=>state?.announcement?.payload)
  const [show, setModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchAnnouncement());
  },[]);

  const pageNumber = useMemo(()=>{
    const page = [];
    for(let x = 1; x <= Math.ceil(announcement?.length / 8); x++){
      page.push(x);
    }
    return page;
  },[announcement]);

  const searchHandle = (e) => {
    setSearch(e.target.value);
  }

  const filteredAnnouncement = useCallback(()=>{
    const result = announcement.filter(val =>
      (val.title + val.type).toLowerCase().includes(search)
    );
    return result;
  },[search])

  return announcement && (
    <>
      {announcement?.loading && <LoadingSpinner loading={announcement?.loading} />}
      {
        !announcement.loading && (
          <div className=' h-screen overflow-hidden relative bg-gray-200 '>
        <Modal show={show} setModal={setModal} />
        <PageHeader link={'Announcement'} />
        <ToastContainer limit={1} autoClose={1500} />
  
        <div className=' w-full flex flex-col justify-center p-4'>
          <div className=' w-full rounded shadow bg-white'>
  
            {/*//~ BUTTON FILES SEARCH CONTAINER */}
            <div className='w-full p-4 flex justify-between items-center'>
  
              {/*//~ ADD BUTTON */}
              <div className='flex items-center justify-between p-2 bg-blue-500 hover:bg-blue-800 rounded cursor-pointer text-white' onClick={() => setModal(true)}>
                <IoAdd size={30} />
                <button className='font-bold pr-2'>Add Announcement</button>
              </div>
              {/*//~ ADD BUTTON */}
  
  
              {/*//~ SEARCH */}
              <div className='relative'>
                <BiSearchAlt className="absolute left-2 top-2 text-gray-400" size={24} />
                <input
                  type='text'
                  name='search'
                  className=' placeholder:indent-6 indent-6 p-2 w-80 border border-slate-300 focus:bg-blue-100/20 transition-all ease-linear focus:border-blue-400 rounded focus:outline-none '
                  placeholder='Search Announcement...'
                  onChange={(e) => searchHandle(e)}
                />
              </div>
              {/*//~ SEARCH */}
  
            </div>
            {/*//~ BUTTON FILES SEARCH CONTAINER */}
  
            <Table tableHeaders={tableHeaders} results={search.length > 0 ? filteredAnnouncement : announcement} search={search} currentPage={currentPage} />
            <Pagination setCurrentPage={setCurrentPage} pageNumber={pageNumber} currentPage={currentPage}/>
          </div>
        </div>
      </div>
        )
      }
    </>
  )
}

export default React.memo(Announcement)