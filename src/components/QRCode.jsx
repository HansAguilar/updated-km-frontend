import React from 'react'

function QRCode() {
  return (
    <div
    className={` w-full h-screen bg-gray-900 bg-opacity-75 absolute top-0 z-40 flex justify-center items-center ${
    show ? '' : 'hidden'
    }`}
>
    <div className=' z-50 h-auto relative'>
        <div className='m-auto w-[900px] h-[750px] overflow-auto p-8 bg-white rounded-lg relative shadow-lg '>

          {/* Title */}
          <div className=' w-full p-4 flex flex-col justify-center items-center gap-y-4 relative '>
            <div className=' w-auto h-auto p-2 text-white rounded-full absolute top-0 left-0 bg-cyan-500 cursor-pointer ' onClick={backPrevious}>
              <IoMdArrowRoundBack size={35} />
            </div>
            <img src={logo} alt="logo" className=' w-20 h-20 rounded-full shadow-md ' />
            <h1 className=' text-3xl font-semibold text-cyan-500 '>Terms and Conditions</h1>
          </div>

           {/* Header */}
           <div className=' w-full p-4  '>
            <h1 className=' text-2xl font-bold text-gray-500 '>Appointment Usage</h1>
            <h3 className=' text-md font-bold mb-4 text-cyan-500 '>Last Revised: April 22, 2023</h3>
            <p className=' text-gray-500 '>These terms and conditions outline the policies and procedures for scheduling and attending appointments at our dental clinic. They cover important topics such as appointment scheduling, cancellation and payment policies, insurance coverage, personalized treatment plans, consent forms, patient privacy, emergency procedures, and agreement to these terms and conditions. By scheduling an appointment with our dental clinic, patients agree to abide by these terms and conditions.</p>
          </div>

          {/* Conditions */}
            {
              rules.map((rule, index)=>(
                <div className=' w-full p-4  ' key={index}>
                  <h1 className=' text-lg font-bold text-gray-500 '>{index+1}. {rule.title}</h1>
                  <p className=' text-gray-500 '>{rule.description}</p>
                  </div>
              ))
            }
          
          <div className='w-full p-4 flex justify-end gap-3 '>
              <button className='px-6 py-4 rounded-md bg-cyan-500 text-white ' onClick={btnSubmit}>I accept, the agreement</button>
              <button className='px-10 py-4 rounded-md bg-gray-500 text-white' onClick={()=>setModal(false)}>Close</button>
          </div>
        </div>
    </div>
</div>
  )
}

export default QRCode