import React from 'react'

function PageHeader({ link }) {
  return (
    <div className=' py-2 px-5 flex justify-between items-center text-slate-600 '>
      <div>
        <h1 className=' text-4xl font-bold uppercase'>{link}</h1>
        <h3 className='  '>{`${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`}</h3>
      </div>
      <div>
        <h4 className=' text-lg capitalize '>admin / <span className=' text-blue-600 font-medium'>{link}</span></h4>
      </div>
    </div>
  )
}

export default PageHeader