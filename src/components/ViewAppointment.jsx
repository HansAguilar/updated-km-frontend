import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ViewAppointment({ view, setView }) {
  const { id } = useParams();
  const info = useSelector((state) => state.appointment.payload.filter(val => val.appointmentId === id));
  const details = [...info];
  const [qrcode, setQrcode] = useState("");

  const generateToQrCode = () => {
    QRCode.toDataURL(`${details.appointmentId}`, {
      width: 400,
      margin: 2,
    }, (err, url) => {
      if (err) return console.error(err);
      setQrcode(url);
    })
  }

  useEffect(() => {
    generateToQrCode();
  }, [id]);

  return (
    <div
      className={` w-full h-screen bg-gray-900 bg-opacity-75 absolute top-0 left-0 z-40 flex justify-center items-center ${view.isShow ? '' : 'hidden'
        }`}
    >
      <div className=' z-50 h-auto relative'>
        <div className='m-auto w-[900px] h-[750px] bg-white overflow-auto p-8 rounded-lg relative shadow-lg'>
          <div className=' w-full text-left py-4 h-auto overflow-auto'>
            <h2 className='text-2xl font-bold mb-2 text-gray-700 '>Appointment Information</h2>
            <hr />
            <br />
            <form className=' w-full flex gap-2 '>
              <div className=' w-80 p-4 h-auto font-semibold shadow-md bg-cyan-600 rounded-md flex flex-col items-center gap-2 '>
                <img src={details.patient?.profile} alt="patient profile" className=' w-36 h-36 rounded-full border border-2 border-gray-300 ' />
                <div className=' text-white text-xl mt-1 font-normal '>
                  <p className=' uppercase ' >
                    {details.patient?.firstname} {details.patient?.middlename ? details.patient?.middlename.charAt(0).concat(".") : ""} {details.patient?.lastname}
                  </p>
                  <p className=' text-center mt-1 text-gray-300 text-xs font-bold'>
                    Patient
                  </p>
                </div>
                <div className=' w-full mt-2 p-2 border border-b-0 border-l-0 border-r-0 border-t-white '>
                  <p className=' text-white flex justify-between '>Gender <span className=' text-gray-200 capitalize ' >{details.patient?.gender}</span></p>
                </div>
                <div className=' w-full p-2 border border-b-0 border-l-0 border-r-0 border-t-white '>
                  <p className=' text-white flex justify-between '>Birthdate <span className=' text-gray-200 capitalize ' >{details.patient?.birthday}</span></p>
                </div>
                <div className=' w-full p-2 border border-b-0 border-l-0 border-r-0 border-t-white '>
                  <p className=' text-white flex justify-between '>Age<span className=' text-gray-200 capitalize ' >{details.patient?.age}</span></p>
                </div>
                <div className=' w-full p-2 border border-b-0 border-l-0 border-r-0 border-t-white '>
                  <p className=' text-white flex justify-between '>Phone <span className=' text-gray-200 capitalize ' >{details.patient?.contactNumber}</span></p>
                </div>
                <div className=' w-full p-2 border border-l-0 border-r-0 border-t-white '>
                  <p className=' text-white flex justify-between '>Email <span className=' text-gray-200 ' >{details.patient?.email}</span></p>
                </div>

                <div className=' mt-3 flex flex-col justify-center gap-y-3 '>
                  {
                    qrcode && (
                      <>
                        <img src={qrcode} alt="qrcode" className=' rounded-xl ' />
                        <a href={qrcode} download={`${details.patient?.firstname} ${details.patient?.middlename ? details.patient?.middlename.charAt(0).concat(".") : ""} ${details.patient?.lastname}-appointment-qrcode.png`}
                          className=' text-white text-center uppercase '
                        >Download</a>
                      </>
                    )
                  }
                </div>
              </div>

              <div className=' flex-grow font-semibold text-green-700 '>
                dw
              </div>
            </form>
            <button onClick={() => setView({
              ...view,
              isShow: false,
            })}>Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewAppointment