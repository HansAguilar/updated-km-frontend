import React, { useEffect, useMemo } from 'react'
import PageHeader from '../components/PageHeader';
import { FaUsers } from 'react-icons/fa';
import { BsFillCalendarCheckFill, } from 'react-icons/bs';
import { MdPayments, MdOutlinePendingActions } from 'react-icons/md';
import CardInformation from '../components/CardInformation';
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify';
import LoadingSpinner from '../components/LoadingSpinner';
import { fetchAppointment } from '../redux/action/AppointmentAction';
import { fetchPatient } from '../redux/action/PatientAction';
import { fetchServices } from '../redux/action/ServicesAction';

function Home() {
  const dispatch = useDispatch();
  const appointment = useSelector((state) => { return state?.appointment?.payload; });

  const treatment = useMemo(()=>{
    return appointment?.filter(val=>val.status==="TREATMENT"); 
  },[appointment]);
  const approved = useMemo(()=>{
    return appointment?.filter(val=>val.status==="APPROVED");
  },[appointment]);
  const pending = useMemo(()=>{
    return appointment?.filter(val=>val.status==="APPROVED");
  },[appointment]);
  const cancelled = useMemo(()=>{
    return appointment?.filter(val=>val.status==="CANCELLED");
  },[appointment]);

  useEffect(()=>{
    dispatch(fetchAppointment());
  },[])
  return (
    <>
      {
        !appointment ? (
          <div className='w-full h-screen flex justify-center items-center '>
              <LoadingSpinner loading={true} />
          </div>)
          : (
            <div className='h-screen bg-gray-200 '>
              <ToastContainer />
              <PageHeader link={'dashboard'} />
              <div className=' w-full h-auto p-4 flex justify-between  gap-4 '>

                <CardInformation
                  fromBG={'from-blue-400'}
                  toBG={'to-blue-600'}
                  iconColor={'text-white'}
                  number={approved?.length}
                  title={'Approved Appointments'}
                  textColor={"text-white"}
                  Icon={FaUsers}
                />

                <CardInformation
                  fromBG={'from-yellow-400'}
                  toBG={'to-yellow-600'}
                  iconColor={'text-white'}
                  number={pending?.length}
                  title={'Pending Appointments'}
                  textColor={"text-white"}
                  Icon={BsFillCalendarCheckFill}
                />

                <CardInformation
                  fromBG={'from-orange-400'}
                  toBG={'to-orange-600'}
                  iconColor={'text-white'}
                  number={treatment?.length}
                  title={'treatment'}
                  textColor={"text-white"}
                  Icon={MdOutlinePendingActions}
                />

              <CardInformation
                  fromBG={'from-green-400'}
                  toBG={'to-green-600'}
                  iconColor={'text-white'}
                  number={cancelled?.length}
                  title={'Cancelled Appointments'}
                  textColor={"text-white"}
                  Icon={MdPayments}
                />

              </div>
            </div>
          )
      }
    </>
  )
}

export default React.memo(Home)