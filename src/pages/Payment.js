import React, { useEffect, useMemo, useState } from 'react';
import PageHeader from '../components/PageHeader';
import { BiSearchAlt } from 'react-icons/bi';
import Table from '../components/PaymentTable';
import Modal from '../components/AdminModal';
import Pagination from '../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import UpdatePaymentModal from '../components/UpdatePayment';
import AcceptPayment from '../components/AcceptPayment';
import { fetchPayments, paymentCancelation } from "../redux/action/PaymentAction";
import { toastHandler } from '../ToastHandler';
import LoadingSpinner from '../components/LoadingSpinner';

function Payments() {
  const dispatch = useDispatch();
  const payload = useSelector((state) => { return state?.payment?.payload?.filter((val) => val.status === "PENDING" || val.status === "CHECKING") });
  const tableHeaders = useMemo(()=>["photo", "patient", "appointment date", "method", "type", "payment total", "status", "action"],[]);
  const [show, setModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const [updateData, setUpdateData] = useState({
    id: "",
    method: "",
    totalAmount: ""
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [acceptData, setAcceptData] = useState({
    isActive: false,
    data: null
  });

  const pageNumber = useMemo(()=>{
    const page = [];
    for (let x = 1; x <= Math.ceil(payload?.length / 8); x++) {
      page.push(x);
    }
    return page;
  },[payload]);
  

  const searchHandle = (e) => {
    setSearch(e.target.value);
  }

  const filteredPatient = useMemo(()=>{
    return payload?.sort()?.filter((val) =>
    (val.appointment.patient.firstname + val.appointment.patient.middlename + val.appointment.patient.lastname).toLowerCase()
      .includes(search.toLowerCase())
  );
  },[search]);

  useEffect(() => {
    if(!payload){
      dispatch(fetchPayments());
    }
  }, []);

  const CancelModal = () => {
    const handleDescription = (e) => {
      setDescription(e.target.value);
    };

    const [description, setDescription] = useState("")

    const buttonSubmitCancelation = () => {
      if (!description) return toastHandler("error", "Fill up empty field!");
      const data = { description: description };
      dispatch(paymentCancelation(acceptData.data.paymentId, data));
      setCancelModal(false);
    }

    return (
      <div className={` w-full h-screen bg-gray-900 bg-opacity-75 absolute top-0 left-0 z-40 flex flex-grow justify-center items-center `}>
        <div className=" z-50">
          <div className="m-auto w-[550px] h-auto p-8 bg-white rounded-lg shadow-lg">
            <div className="text-left py-4">
              <h2 className="text-xl font-bold capitalize mb-2 text-gray-600 ">Cancel Appointment</h2>
              <hr />
            </div>
            <div className=' mb-2 flex flex-grow flex-col relative '>
              <label htmlFor='patient' className='font-bold text-gray-600 '>
                Reason for your cancellation
              </label>
              <input
                type="text"
                className='px-4 py-2 w-full border border-gray-400 rounded-md focus:outline-none focus:shadow-md'
                value={description}
                onChange={(e) => handleDescription(e)}
              />
            </div>
            <div className=" w-full flex justify-end relative left-0 px-7 py-4 bottom-0 pt-2 gap-2 z-40">
              <button className="bg-cyan-500 px-6 py-3 hover:bg-cyan-700 text-white font-bold  rounded"
                onClick={buttonSubmitCancelation}
              >
                Submit
              </button>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold px-6 py-3 rounded" onClick={() => {
                setDescription("")
                setCancelModal(false);
              }}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {
        !payload ? <div className=' w-full h-screen justify-center items-center '><LoadingSpinner loading={true} /></div>
        : (
          <div className=' h-screen overflow-hidden relative bg-gray-200 '>
            <Modal show={show} setModal={setModal} type="patient" />
            {updateModal && (<UpdatePaymentModal show={updateModal} setModal={setUpdateModal} updateData={updateData} setUpdateData={setUpdateData} />)}
            {acceptData.isActive && (<AcceptPayment info={acceptData} setAcceptData={setAcceptData} setCancelModal={setCancelModal} />)}
            {cancelModal && (<CancelModal />)}
            <PageHeader link={'payment'} />

            <div className=' w-full flex flex-col justify-center p-4'>
              <div className=' w-full rounded shadow bg-white'>

                <div className='w-full p-4 flex justify-between items-center'>
                  {/*//~ SEARCH */}
                  <div className='relative'>
                    <BiSearchAlt className="absolute left-2 top-2 text-gray-400" size={24} />
                    <input
                      type='text'
                      name='search'
                      className=' placeholder:indent-6 indent-6 p-2 w-80 border border-slate-300 focus:bg-blue-100/20 transition-all ease-linear focus:border-blue-400 rounded focus:outline-none '
                      placeholder='Search Payment...'
                      onChange={(e) => searchHandle(e)}
                    />
                  </div>
                  {/*//~ SEARCH */}
                  {/* <div className=' w-full p-4 flex justify-between items-center '> */}
                  {/* <button className=' bg-cyan-500 text-white flex justify-start items-center pl-1 pr-6 py-2 cursor-pointer rounded-md font-bold capitalize ' onClick={()=>setModal(true)}><IoAdd size={30} />&nbsp;Add patient</button> */}
                  {/* <div className=' inline-flex gap-2  '> */}
                  {/* <ExcelButton users={payload} title={"patients"} /> */}
                  {/*  */}
                  {/* <PDFButton data={payload} />
                              <FileIcons Icon={AiFillPrinter} title={"Print"} /> */}
                  {/* </div> */}

                  {/* </div> */}
                </div>

                <Table tableHeaders={tableHeaders} results={search.length > 0 ? filteredPatient : payload.sort()} search={search} setUpdateModal={setUpdateModal} currentPage={currentPage} updateData={updateData} setUpdateData={setUpdateData} acceptData={acceptData} setAcceptData={setAcceptData} />
                <Pagination setCurrentPage={setCurrentPage} pageNumber={pageNumber} currentPage={currentPage}/>
                <div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}

export default Payments