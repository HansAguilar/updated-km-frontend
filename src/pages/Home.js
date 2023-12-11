import React from 'react'
import PageHeader from '../components/PageHeader';
import { FaUsers } from 'react-icons/fa';
import { BsFillCalendarCheckFill, } from 'react-icons/bs';
import { MdPayments, MdOutlinePendingActions } from 'react-icons/md';
import CardInformation from '../components/CardInformation';
import { useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify';

function Home() {
  const patient = useSelector((state) => { return state.patient; });
  const appointment = useSelector((state) => { return state.appointment; });
  const services = useSelector((state) => { return state.service; });
  const treatment = useSelector((state) => { return state.appointment.payload.filter(val=>val.status==="TREATMENT"); });

  return (
    <div className='h-screen bg-gray-200 '>
      <ToastContainer />
      <PageHeader link={'dashboard'} />
      <div className=' w-full h-auto p-4 flex justify-between  gap-4 '>

        <CardInformation
          fromBG={'from-blue-400'}
          toBG={'to-blue-600'}
          iconColor={'text-white'}
          number={patient.payload.length}
          title={'patients'}
          textColor={"text-white"}
          Icon={FaUsers}
        />

        <CardInformation
          fromBG={'from-yellow-400'}
          toBG={'to-yellow-600'}
          iconColor={'text-white'}
          number={appointment.payload.filter((val) => { return val.status === "PENDING" }).length}
          title={'Pending Appointments'}
          textColor={"text-white"}
          Icon={BsFillCalendarCheckFill}
        />

        <CardInformation
          fromBG={'from-orange-400'}
          toBG={'to-orange-600'}
          iconColor={'text-white'}
          number={treatment.length}
          title={'treatment'}
          textColor={"text-white"}
          Icon={MdOutlinePendingActions}
        />

      <CardInformation
          fromBG={'from-green-400'}
          toBG={'to-green-600'}
          iconColor={'text-white'}
          number={services.payload.length}
          title={'Available Services'}
          textColor={"text-white"}
          Icon={MdPayments}
        />

      </div>
    </div>
  )
}

export default Home