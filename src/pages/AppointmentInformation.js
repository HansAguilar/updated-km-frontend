import React,{useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { APPOINTMENT_LINK } from "../ApiLinks";
import axios from 'axios';
import QRCode from 'qrcode';
import bg from "../assets/reception.jpg";
import moment from 'moment/moment';
import logo from "../assets/logo.jpg";

function AppointmentInformation() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [details, setDetails] = useState(null);
    const [qrcode, setQrcode] = useState("");

    const fetchAppointmentDetails = async() =>{
        try {
            const response = await axios.get(`${APPOINTMENT_LINK}${id}`);
            if(response.data){
                setDetails(response.data);
            }
        } catch (error) { console.log(error); }
    }

    const generateToQrCode = () =>{
        QRCode.toDataURL(`${id}`, {
          width: 400,
          margin: 2,
          color: {
            dark: "#082f49",  // white foreground color
            light: "#ffffff"  // background color
          }
        }, (err,url)=>{
          if(err) return console.error(err);
          setQrcode(url);
        })
      }

    useEffect(()=>{
        fetchAppointmentDetails();
        generateToQrCode();
    },[])
    


   const getTime = (value) =>{
    const time = moment(new Date(`1997-12-30T${value}`)).format('LT');
    const timeSplit = time.split(" ");
    let newTime = ""
    if(
        timeSplit[0]==="12:30" || timeSplit[0]==="1:00" || timeSplit[0]==="1:30" || timeSplit[0]==="2:00" || timeSplit[0]==="2:30" || timeSplit[0]==="3:00" || timeSplit[0]==="3:30" || timeSplit[0]==="4:00" || timeSplit[0]==="4:30"|| timeSplit[0]==="5:00"
    ){
        newTime = timeSplit[0].concat(" ").concat("Pm");
    }else{
        newTime = timeSplit[0].concat(" ").concat("Am");
    }
    return newTime;
   }
  return (
    <>
        {
        details && (
            <div className=' h-screen overflow-hidden relative '>
              <div className=' w-full flex flex-col justify-center p-4 '> 
                <div className=' w-full h-[870px] flex gap-5 p-4 '>
                    <div className=' w-1/4 bg-white flex border border-t-cyan-500 border-2 flex-col justify-center p-4 items-center '>
                        <img src={details.patient.profile} alt="patient profile" className=' w-44 h-44 rounded-full mb-2 ' />
                        <div className=' text-gray-700 text-xl mt-1 font-normal '>
                          <p className=' capitalize ' >
                            {details.patient.firstname} {details.patient?.middlename ? details.patient?.middlename.charAt(0).concat("."): ""} {details.patient?.lastname}
                            </p>
                            <p className=' text-center mb-2 text-cyan-700 uppercase text-sm font-bold'>
                            Patient
                            </p>
                        </div>
                        <div className=' w-full mt-2 p-2 border border-b-0 border-l-0 border-r-0 border-t-gray-300 '>
                            <p className=' text-gray-700 flex justify-between font-bold '>Gender <span className=' text-gray-400 capitalize font-normal ' >{details.patient.gender}</span></p>
                        </div>
                        <div className=' w-full p-2 border border-b-0 border-l-0 border-r-0 border-t-gray-300 '>
                            <p className=' text-gray-700 flex justify-between font-bold '>Birthdate <span className=' text-gray-400 capitalize font-normal ' >{details.patient.birthday}</span></p>
                        </div>
                        <div className=' w-full p-2 border border-b-0 border-l-0 border-r-0 border-t-gray-300 '>
                            <p className=' text-gray-700 flex justify-between font-bold '>Age<span className=' text-gray-400 capitalize font-normal ' >{details.patient?.age}</span></p>
                        </div>
                        <div className=' w-full p-2 border border-b-0 border-l-0 border-r-0 border-t-gray-300 '>
                            <p className=' text-gray-700 flex justify-between font-bold '>Phone <span className=' text-gray-400 capitalize font-normal ' >{details.patient.contactNumber}</span></p>
                        </div>
                        <div className=' w-full p-2 border border-l-0 border-r-0 border-t-gray-300 '>
                            <p className=' text-gray-700 flex justify-between font-bold '>Email <span className=' text-gray-400 font-normal ' >{details.patient?.email}</span></p>
                        </div>
        
                        <div className=' mt-3 flex flex-col justify-center items-center '>
                          {
                            qrcode && (
                             <>
                               <div className=' w-auto h-auto relative '>
                                  <img src={qrcode} alt="qrcode" className=' rounded-xl w-72 h-72 ' />
                               </div>
                               <a href={qrcode} download={`${details.patient?.firstname} ${details.patient?.middlename ? details.patient?.middlename.charAt(0).concat("."): ""} ${details.patient?.lastname}-appointment-qrcode.png`} 
                               className=' text-gray-700 text-center uppercase hover:text-gray-900 '
                               >Download</a>
                             </>
                            )
                          }
                    </div>
                </div>
        
        
                <div className=' flex-grow bg-white relative'>
                    <div className=' w-full h-96 p-4 flex justify-start items-end ' style={{background: `linear-gradient(rgba(8,145,178,0.4), rgba(8,145,178,0.4)), url(${bg})`, backgroundPosition: "center", backgroundSize:"cover" }} >

                        <div className=' flex justify-center items-center gap-3 '>
                            <img src={details.dentist.profile} alt="patient profile" className=' w-52 h-52 rounded-full mb-2 ' />
                            <div>
                            <h1 className=' text-white text-2xl capitalize  '>Dr. {details.dentist.fullname}</h1>
                            <p className=' text-gray-100 text-md font-bold '>Dentist</p>
                            <div className={`mt-3 w-fit px-5 p-1 rounded-full text-white text-sm capitalize ${
                                details.status === "PENDING" ? "bg-orange-500"
                                :details.status === "APPROVED" ? "bg-green-500"
                                :"bg-cyan-500"
                            } `}>{details.status.toLowerCase()}</div>
                            </div>
                        </div>
                    </div>

                    <div className='p-4'>
                            <div className='  w-96 h-52'>
                                <div className=' text-gray-600 text-left'>
                                    
                                  <h1 className=' text-lg font-bold '>{moment(details.appointmentDate).format("dddd, MMM Do")}</h1>
                                  <h2>{
                                  getTime(details.timeStart)
                                  }</h2>
                                </div>
                                {/* <Calendar  selectedDate={details.appointmentDate}/> */}
                            </div>
                            
                    </div>
                </div>


                </div>
              </div>
            </div>
          )
    }    
    </>
  )
}

export default AppointmentInformation