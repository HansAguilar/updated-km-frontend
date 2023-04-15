import axios from 'axios';
import React,{ useState, useEffect } from 'react'
import { APPOINTMENT_LINK } from '../ApiLinks';
import QRCode from "react-qr-code";

function ViewAppointment({view, setView,}) {
  // const [details, setDetails] = useState({});
  const details = view.appointmentId

  // const fetchAppointmentData = async()=>{
  //   try {
  //       const response = await axios.get(`${APPOINTMENT_LINK}${view.appointmentId}`);
  //       if(response.data){
  //           setDetails(response.data);
  //       }
  //   } catch (error) {
  //       console.log(error);
  //   }
  // }
  // useEffect(()=>{
  //   fetchAppointmentData();
  // },[])
  console.log(details);


  const download = (e) => {
    e.preventDefault();
    const svg = document.getElementById("QRCode");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `${details.patient.lastname}-appointment-qr-code`;
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };
  
  const { appointmentId } =details;
  const val = `${appointmentId}`;
  
  return (
    <div
    className={` w-full h-screen bg-gray-900 bg-opacity-75 absolute top-0 left-0 z-40 flex justify-center items-center ${
      view.isShow ? '' : 'hidden'
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
                    {details.patient?.firstname} {details.patient?.middlename ? details.patient?.middlename.charAt(0).concat("."): ""} {details.patient?.lastname}
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
                    <p className=' text-white flex justify-between '>Email <span className=' text-gray-200 capitalize ' >{details.patient?.email}</span></p>
                </div>

                <div style={{ height: "auto", margin: "0 auto", maxWidth: 64, width: "100%" }}>
              <QRCode
                id="QRCode"
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                title="Custom Title"
                value={val}
                viewBox={`0 0 256 256`}
              />
            </div>

              <button onClick={(e)=>download(e)}>Download</button>
            </div>





            <div className=' flex-grow font-semibold text-green-700 '>
            dw
            </div>
          </form>
        </div>
       </div>
    </div>
    </div>
  )
}

export default ViewAppointment