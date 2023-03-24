import React,{ useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import { IoAdd } from 'react-icons/io5';
// import { AiFillPrinter } from 'react-icons/ai';
// import FileIcons from '../components/FileIcons';
import Table from '../components/AdminTable';
import Modal from '../components/AdminModal';
import axios from 'axios';
import Pagination from '../components/Pagination';
// import { useNavigate } from 'react-router-dom';
// import ExcelButton from '../components/ExcelButton';
// import PDFButton from '../components/PDFButton';

function Admin() {
  const [ show, setModal ] = useState(false);
  const [ search, setSearch ] = useState("");
  const [ adminList, setAdminList ] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(1);
  const tableHeaders = [ "profile", "fullname", "address","gender", "contact number", "email", "role", "status", "actions" ];
  const pageNumber = [];

  const fetchAdminList = async() =>{
    try {
      const response = await axios.get("http://localhost:8080/api/v1/admin/")
      setAdminList(response.data);
    } catch (error) { console.log(error);}
  }
  useEffect(()=>{
    fetchAdminList();
  },[])
  console.log(adminList)

  const searchHandle = (e) =>{ 
    setSearch(e.target.value);
  }

  const filteredAdminList = adminList.filter((admin)=>
    (admin.adminFirstname+admin.adminMiddlename+admin.adminLastname+admin.address+admin.birthday).toLowerCase().includes(search)
  )
  return (
    <div className=' h-screen overflow-hidden relative '>
      <Modal show={show} setModal={setModal} />
      <PageHeader link={'Admin'} />
      <div className=' w-full flex flex-col justify-center p-4 '> 
        <div className=' w-full bg-white h-auto rounded-xl shadow-lg'>
          {/*Sub header*/}
          <div className=' w-full p-4 border-t-2 border-t-cyan-500 rounded-t-xl flex justify-between items-center border-b-2 '>
              <h1 className=' text-xl '>Admin List</h1>
              <button className=' bg-cyan-500 text-white flex justify-start items-center pl-1 pr-6 py-2 cursor-pointer rounded-md font-bold capitalize ' onClick={()=>setModal(true)}><IoAdd size={30} />&nbsp;Add admin</button>
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
            </div>
            <Table tableHeaders={tableHeaders} results={ search.length > 0 ? filteredAdminList : adminList } search={search} currentPage={currentPage} /> 
              <Pagination setCurrentPage={setCurrentPage} pageNumber={pageNumber} />
        </div>
      </div>
    </div>
  )
}

export default Admin