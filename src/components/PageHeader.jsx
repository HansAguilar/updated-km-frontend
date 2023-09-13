import React from 'react'

function PageHeader({link}) {
  return (
    <div className=' py-2 px-5 flex justify-between items-center text-cyan-800 '>
        <div>
            <h1 className=' text-4xl font-bold uppercase'>{link}</h1>
            <h3 className=' text-sm '>{`${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`}</h3>
        </div>
        <div>
            <h4 className=' capitalize '><span className=' text-cyan-600 '>admin</span> / {link}</h4>
        </div>
    </div>
  )
}

export default PageHeader