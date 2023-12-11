import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PageHeader from '../components/PageHeader';
import { IoAdd } from 'react-icons/io5';
import { AiFillPrinter } from 'react-icons/ai';
import { BiSearchAlt } from 'react-icons/bi';
import FileIcons from '../components/FileIcons';
import Table from '../components/AdminTable';
import Modal from '../components/AdminModal';
import Pagination from '../components/Pagination';
import ExcelButton from '../components/ExcelButton';
import PDFButton from '../components/PDFButton';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdmin } from '../redux/action/AdminAction';
import LoadingSpinner from '../components/LoadingSpinner';

function Admin() {
  const [show, setModal] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const tableHeaders = useMemo(()=>["profile", "full name", "address", "gender", "contact number", "email", "role", "status", "actions"],[]);
  const adminList = useSelector((state) => state.admin?.payload?.filter(val => val.role !== "ADMIN"));
  const dispatch = useDispatch();

  const pageNumber = useMemo(()=>{
    const page = [];
    for (let x = 1; x <= Math.ceil(adminList?.length / 8); x++) {
      page.push(x);
    }
    return page;
  },[adminList])

  const searchHandle = (e) => {
    setSearch(e.target.value);
  }

  const filteredAdminList = useCallback(()=>{
    return adminList?.filter((admin) => (admin.firstname + admin.middlename + admin.lastname).toLowerCase().includes(search.toLowerCase()))
  },[search])

  useEffect(()=>{dispatch(fetchAdmin())}, [])

  return (
    <div className=' h-screen overflow-hidden relative bg-gray-200 '>
      {
        !adminList ? (
          <div className=' w-full h-screen flex justify-center items-center '>
            <LoadingSpinner loading={true} />
          </div>
        )
        : (
          <>
            <Modal show={show} setModal={setModal} type="admin" />
            <PageHeader link={'admin'} />

            <div className=' w-full flex flex-col justify-center p-4'>
              <div className=' w-full rounded shadow bg-white'>

                {/*//~ BUTTON FILES SEARCH CONTAINER */}
                <div className='w-full p-4 flex justify-between items-center'>

                  {/*//~ ADD BUTTON */}
                  <div className='flex items-center justify-between p-2 bg-blue-500 hover:bg-blue-800 rounded cursor-pointer text-white' onClick={() => setModal(true)}>
                    <IoAdd size={30} />
                    <button className='font-bold pr-2'>Add Admin</button>
                  </div>
                  {/*//~ ADD BUTTON */}

                  {/*//~ FILES */}
                  <div className=' inline-flex gap-2  '>
                    <ExcelButton users={adminList} title="admin" />
                    <PDFButton data={adminList} type="admin"/>
                    {/* <FileIcons Icon={AiFillPrinter} title={"Print"} /> */}
                  </div>
                  {/*//~ FILES */}

                  {/*//~ SEARCH */}
                  <div className='relative'>
                    <BiSearchAlt className="absolute left-2 top-2 text-gray-400" size={24} />
                    <input
                      type='text'
                      name='search'
                      className=' placeholder:indent-6 indent-6 p-2 w-80 border border-slate-300 focus:bg-blue-100/20 transition-all ease-linear focus:border-blue-400 rounded focus:outline-none '
                      placeholder='Search Admin...'
                      onChange={(e) => searchHandle(e)}
                    />
                  </div>
                  {/*//~ SEARCH */}

                </div>
                {/*//~ BUTTON FILES SEARCH CONTAINER */}

                <Table tableHeaders={tableHeaders} results={search.length > 0 ? filteredAdminList : adminList?.sort()} search={search} currentPage={currentPage} />
                <Pagination setCurrentPage={setCurrentPage} pageNumber={pageNumber} currentPage={currentPage} />
              </div>
            </div>
          </>
        )
      }
    </div>
  )
}

export default Admin