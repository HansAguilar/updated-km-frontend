import React,{ useState  } from 'react';
import PageHeader from '../components/PageHeader';
import { IoAdd } from 'react-icons/io5';
import { AiFillPrinter } from 'react-icons/ai';
import FileIcons from '../components/FileIcons';
import Table from '../components/AdminTable';
import Modal from '../components/AdminModal';
import Pagination from '../components/Pagination';
import ExcelButton from '../components/ExcelButton';
import PDFButton from '../components/PDFButton';
import { useSelector } from 'react-redux';

function Admin() {
  const [ show, setModal ] = useState(false);
  const [ search, setSearch ] = useState("");
  const [ currentPage, setCurrentPage ] = useState(1);
  const tableHeaders = [ "profile", "fullname", "address","gender", "contact number", "email", "role", "status", "actions" ];
  const pageNumber = [];
  const { loginAdmin } =  useSelector((state)=>state.admin);
  const adminList = useSelector((state)=>state.admin.payload.filter(val=>val.adminId!==loginAdmin.adminId));

  for(let x = 1; x <= Math.ceil(adminList.length/8);x++){
    pageNumber.push(x);
  }
  

  const searchHandle = (e) =>{ 
    setSearch(e.target.value);
  }

  const filteredAdminList = adminList.filter((admin)=>
    (admin.firstname+admin.middlename+admin.lastname).toLowerCase().includes(search.toLowerCase())
  )
  return (
    <div className=' h-screen overflow-hidden relative bg-gray-200 '>
          <Modal show={show} setModal={setModal} type="admin" />
          <PageHeader link={'admin'} />
          
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
                    <button className=' bg-cyan-500 text-white flex justify-start items-center pl-1 pr-6 py-2 cursor-pointer rounded-md font-bold capitalize ' onClick={()=>setModal(true)}><IoAdd size={30} />&nbsp;Add Admin</button>
                      <div className=' inline-flex gap-2  '>
                        <ExcelButton users={adminList} title={"patients"} />
                        {/*  */}
                        <PDFButton data={adminList} />
                        <FileIcons Icon={AiFillPrinter} title={"Print"} />
                      </div>    
                      <input
                        type='text'
                        name='search'
                        className=' px-4 py-1 w-80 border border-gray-300 outline-none '
                        placeholder='Search'
                        onChange={(e)=>searchHandle(e)}
                      />
                    </div>
                      <Table tableHeaders={tableHeaders} results={ search.length > 0 ? filteredAdminList : adminList.sort()  } search={search} currentPage={currentPage} />
                      {/*Pagination */}
                      <Pagination setCurrentPage={setCurrentPage} pageNumber={pageNumber} />
                    </div>
                  <div>
                </div>
            </div>
          </div>
      </div>
    // <div className=' h-screen overflow-hidden relative '>
    //   <Modal show={show} setModal={setModal} type="admin" />
    //   <PageHeader link={'Admin'} />
    //   <div className=' w-full flex flex-col justify-center p-4 '> 
    //     <div className=' w-full bg-white h-auto rounded-xl shadow-lg'>
    //       {/*Sub header*/}
    //       {/* <div className=' w-full p-4 border-t-2 border-t-cyan-500 rounded-t-xl flex justify-between items-center border-b-2 '>
    //           <h1 className=' text-xl '>Admin List</h1>
    //           <button className=' bg-cyan-500 text-white flex justify-start items-center pl-1 pr-6 py-2 cursor-pointer rounded-md font-bold capitalize ' onClick={()=>setModal(true)}><IoAdd size={30} />&nbsp;Add admin</button>
    //       </div> */}

    //        <button className=' bg-cyan-500 text-white flex justify-start items-center pl-1 pr-6 py-2 cursor-pointer rounded-md font-bold capitalize '><IoAdd size={30} />&nbsp;Add Admin</button>

    //        {/*Searchbar and files*/}
    //        <div className=' w-full p-4 flex justify-between '>
    //           <div className=' inline-flex gap-2  '>
    //               <ExcelButton users={adminList} title={"admin-report"} />
    //               <PDFButton data={adminList} />
    //               <FileIcons Icon={AiFillPrinter} title={"Print"} />
    //           </div>    
    //           <input
    //               type='text'
    //               name='search'
    //               className=' px-4 py-1 w-80 border border-gray-300 outline-none '
    //               placeholder='Search'
    //               onChange={(e)=>searchHandle(e)}
    //             />
    //         </div>
    //         <Table tableHeaders={tableHeaders} results={ search.length > 0 ? filteredAdminList : adminList } search={search} currentPage={currentPage} /> 
    //           <Pagination setCurrentPage={setCurrentPage} pageNumber={pageNumber} />
    //     </div>
    //   </div>
    // </div>
  )
}

export default Admin