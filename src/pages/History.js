import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import Table from '../components/HistoryTable';
import { BiSearchAlt } from 'react-icons/bi';
import Pagination from '../components/Pagination';
import { useSelector } from 'react-redux';
import ExcelButton from '../components/HistoryExcel';
import PDFButton from '../components/HistoryPdfButton';
import moment from 'moment';

function History() {
  const tableHeaders = ["Name", "Dentist", "Description", "Date", "Status"];
  const [search, setSearch] = useState("");
  const historyList = useSelector((state) => state.appointment.payload.filter((val) => val.status === "DONE" || val.status === "CANCELLED"))
  const [currentPage, setCurrentPage] = useState(1);
  const pageNumber = [];

  const searchHandle = (e) => {
    setSearch(e.target.value);
  }

  for (let x = 1; x <= Math.ceil(historyList.length / 8); x++) {
    pageNumber.push(x);
  }
  const filteredHistory = historyList.filter((val) =>
    (val.name + val.appointmentDate).toLowerCase().includes(search.toLowerCase())
  )
  console.log(historyList);

  const history = historyList.filter(val => val.status === "DONE" || val.status === "CANCELLED")
    .map(val => {
      const formattedName = `${val.patient.firstname.charAt(0).toUpperCase() + val.patient.firstname.substring(1)} ${val.patient.lastname.charAt(0).toUpperCase() + val.patient.lastname.substring(1)}`;
      return {
        appointmentDate: moment(val.appointmentDate).format("L"),
        name: `${formattedName}`,
        dentist: `Dr. ${val.dentist.fullname}`,
        description: val.status === "DONE" ? `Appointment for ${formattedName} was successful` : `Appointment for ${formattedName} has been cancelled`,
        status: val.status
      }
    });


  // const fetchHistory = async() => {
  //   try {
  //       const response = await axios.get(HISTORY_LINK);
  //       if(response.data){
  //           setHistoryList(response.data);
  //       }
  //   } catch (error) {console.log(error); }
  // }
  // useEffect(()=>{
  //   fetchHistory();
  // },[]);

  return (
    <div className=' h-screen overflow-hidden relative bg-gray-200 '>
      <PageHeader link={'History'} />

      <div className=' w-full flex flex-col justify-center p-4'>
        <div className=' w-full rounded shadow bg-white'>

          <div className='w-full p-4 flex justify-between items-center'>

            {/*//~ TITLE */}
            <h1 className=' text-xl font-bold '>Appointment History</h1>
            {/*//~ TITLE */}

            {/*//~ FILES */}
            <div className=' inline-flex gap-2  '>
              <ExcelButton users={history} title={"medical-record-list"} />
              <PDFButton data={history} />
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

          <Table tableHeaders={tableHeaders} results={search.length > 0 ? filteredHistory : history} search={search} currentPage={currentPage} />
          <Pagination setCurrentPage={setCurrentPage} pageNumber={pageNumber} />
        </div>
      </div>
    </div>
  )
}

export default History