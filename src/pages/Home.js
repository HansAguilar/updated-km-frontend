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
  const payment = useSelector((state) => { return state.payment; });
  const installment = useSelector((state) => { return state.installment; });

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
          fromBG={'from-green-400'}
          toBG={'to-green-600'}
          iconColor={'text-white'}
          number={payment.payload.filter(val => { return val.status === "CHECKING" }).length}
          title={'pending payments'}
          textColor={"text-white"}
          Icon={MdPayments}
        />

        <CardInformation
          fromBG={'from-orange-400'}
          toBG={'to-orange-600'}
          iconColor={'text-white'}
          number={installment.payload.filter(val => { return val.status === "CHECKING" }).length}
          title={'pending installment'}
          textColor={"text-white"}
          Icon={MdOutlinePendingActions}
        />
      </div>
    </div>
  )
}

export default Home