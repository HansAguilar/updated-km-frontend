import React from 'react'
import PageHeader from '../components/PageHeader';
import { FaUsers } from 'react-icons/fa';
import { BsFillCalendarCheckFill,  } from 'react-icons/bs';
import { MdPayments, MdOutlinePendingActions } from 'react-icons/md';
import CardInformation from '../components/CardInformation';

function Home({patients, pendingAppointment,approvedAppointment}) {
  
  return (
    <div className=' h-screen '>
      <PageHeader link={'dashboard'} />
      <div className=' w-full h-auto p-4 flex justify-between  gap-4 '>
        
        <CardInformation
          background={'bg-cyan-600'}
          iconColor={'text-cyan-700'} 
          number={patients}
          title={'patients'}
          Icon={FaUsers}
        />

        <CardInformation
          background={'bg-green-600'}
          iconColor={'text-green-700'}
          number={approvedAppointment}
          title={'Confirmed Appointments'}
          Icon={BsFillCalendarCheckFill}
        />

        <CardInformation
          background={'bg-yellow-600'}
          iconColor={'text-yellow-700'}
          number={pendingAppointment}
          title={'pending payments'}
          Icon={MdPayments}
        />

        <CardInformation
          background={'bg-red-600'}
          iconColor={'text-red-700'}
          number={0}
          title={'pending payments'}
          Icon={MdOutlinePendingActions}
        />

        {/* <MdOutlinePendingActions className='bg-green-600 text-green-700 ' /> */}
      </div>
    </div>
  )
}

export default Home