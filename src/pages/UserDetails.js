import React from 'react';
import PageHeader from '../components/PageHeader';

function UserDetails() {
  return (
    <div className=' h-screen overflow-hidden relative '>
        <PageHeader link={'patient'} />
        <div className=' w-full flex flex-col justify-center p-4 '> 
            <div className=' w-full bg-white h-auto rounded-xl shadow-lg'>
                <div className=' w-full p-4 flex justify-between '>
                </div>
            </div>
        </div>  
    </div>
  )
}

export default UserDetails