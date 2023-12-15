import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import QRCode from 'qrcode';
import bg from "../assets/reception.jpg";
import moment from 'moment/moment';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import { APPOINTMENT_LINK, PAYMENT_LINK } from '../ApiLinks';

function AppointmentInformation() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [payment, setPayment] = useState(null);
  const [appointment, setAppointment] = useState(null);
  // const details = useSelector((state) => { return state.appointment.payload.filter((val) => { return val.appointmentId === id }) });
  // const payment = useSelector((state) => { return state.payment.payload.filter(val => { return val.appointment.appointmentId === id }) });
  const [qrcode, setQrcode] = useState("");

  const generateToQrCode = () => {
    QRCode.toDataURL(`${id}`, {
      width: 400,
      margin: 2,
      color: {
        dark: "#082f49",  // white foreground color
        light: "#ffffff"  // background color
      }
    }, (err, url) => {
      if (err) return console.log();
      setQrcode(url);
    })
  }

  const fetchPaymentAppointment = async() =>{
    await axios.get(`${PAYMENT_LINK}/fetch/payment_details/${id}`)
    .then(response=>setPayment(response.data))
    .catch(err=>console.log());
  }
  const fetchAppointment = async() =>{
    await axios.get(`${APPOINTMENT_LINK}/${id}`)
    .then(response=>setAppointment(response.data))
    .catch(err=>console.log());
  }

  useEffect(() => {
    fetchAppointment();
    fetchPaymentAppointment();
    generateToQrCode();
  }, [id]);


  const getTime = (value) => {
    const time = moment(new Date(`1997-12-30T${value}`)).format('LT');
    const timeSplit = time.split(" ");
    let newTime = ""
    if (
      timeSplit[0] === "12:30" || timeSplit[0] === "1:00" || timeSplit[0] === "1:30" || timeSplit[0] === "2:00" || timeSplit[0] === "2:30" || timeSplit[0] === "3:00" || timeSplit[0] === "3:30" || timeSplit[0] === "4:00" || timeSplit[0] === "4:30" || timeSplit[0] === "5:00"
    ) {
      newTime = timeSplit[0].concat(" ").concat("Pm");
    } else {
      newTime = timeSplit[0].concat(" ").concat("Am");
    }
    return newTime;
   }

  return (
    <>
    {
       (!payment || !appointment )? 
       (<div className=' w-full h-screen flex justify-center items-center '>
          <LoadingSpinner loading={true} />
        </div>)
        : (
          <div className=' min-h-screen overflow-hidden relative '>
            <div className=' w-full flex flex-col justify-center p-4 '>
              <div className=' w-full h-[870px] flex gap-5 p-4 '>
                <div className=' w-1/4 bg-white flex border-t-cyan-500 border-2 flex-col justify-center p-4 items-center '>
                  <img src={appointment.patient.profile} alt="patient profile" className=' w-44 h-44 rounded-full mb-2 ' />
                  <div className=' text-gray-700 text-xl mt-1 font-normal '>
                    <p className=' capitalize ' >
                      {appointment.patient.firstname} {appointment.patient?.middlename ? appointment.patient?.middlename.charAt(0).concat(".") : ""} {appointment.patient?.lastname}
                    </p>
                    <p className=' text-center mb-2 text-cyan-700 uppercase text-sm font-bold'>
                      Patient
                    </p>
                  </div>
                  <div className=' w-full mt-2 p-2 border border-b-0 border-l-0 border-r-0 border-t-gray-300 '>
                    <p className=' text-gray-700 flex justify-between font-bold '>Gender <span className=' text-gray-400 capitalize font-normal ' >{appointment.patient.gender}</span></p>
                  </div>
                  <div className=' w-full p-2 border border-b-0 border-l-0 border-r-0 border-t-gray-300 '>
                    <p className=' text-gray-700 flex justify-between font-bold '>Birthdate <span className=' text-gray-400 capitalize font-normal ' >{appointment.patient.birthday}</span></p>
                  </div>
                  <div className=' w-full p-2 border border-b-0 border-l-0 border-r-0 border-t-gray-300 '>
                    <p className=' text-gray-700 flex justify-between font-bold '>Age<span className=' text-gray-400 capitalize font-normal ' >{appointment.patient?.age}</span></p>
                  </div>
                  <div className=' w-full p-2 border border-b-0 border-l-0 border-r-0 border-t-gray-300 '>
                    <p className=' text-gray-700 flex justify-between font-bold '>Phone <span className=' text-gray-400 capitalize font-normal ' >{appointment.patient.contactNumber}</span></p>
                  </div>
                  <div className=' w-full p-2 border border-l-0 border-r-0 border-t-gray-300 '>
                    <p className=' text-gray-700 flex justify-between font-bold '>Email <span className=' text-gray-400 font-normal ' >{appointment.patient?.email}</span></p>
                  </div>

                  <div className=' mt-3 flex flex-col justify-center items-center '>
                    {
                      qrcode && (
                        <>
                          <div className=' w-auto h-auto relative '>
                            <img src={qrcode} alt="qrcode" className=' rounded-xl w-72 h-72 ' />
                          </div>
                          <a href={qrcode} download={`${appointment.patient?.firstname} ${appointment.patient?.middlename ? appointment.patient?.middlename.charAt(0).concat(".") : ""} ${appointment.patient?.lastname}-appointment-qrcode.png`}
                            className=' text-gray-700 text-center uppercase hover:text-gray-900 '
                          >Download</a>
                        </>
                      )
                    }
                  </div>
                </div>


                <div className=' flex-grow bg-white relative'>
                  <div className=' w-full h-96 p-4 flex justify-start items-end ' style={{ background: `linear-gradient(rgba(8,145,178,0.4), rgba(8,145,178,0.4)), url(${bg})`, backgroundPosition: "center", backgroundSize: "cover" }} >

                    <div className=' flex justify-center items-center gap-3 '>
                      <img src={appointment.dentist.profile} alt="patient profile" className=' w-52 h-52 rounded-full mb-2 ' />
                      <div>
                        <h1 className=' text-white text-2xl capitalize  '>Dr. {appointment.dentist.fullname}</h1>
                        <p className=' text-gray-100 text-md font-bold '>Dentist</p>
                        <div className={`mt-3 w-fit px-5 p-1 rounded-full text-white text-sm capitalize ${appointment.status === "PENDING" ? "bg-orange-500"
                            : appointment.status === "APPROVED" ? "bg-green-500"
                              : "bg-cyan-500"
                          } `}>{appointment.status.toLowerCase()}</div>
                      </div>
                    </div>
                  </div>

                  <div className='p-4'>
                    <div className='  w-96 '>
                      <div className=' text-gray-600 text-left'>

                        <h1 className=' text-md font-semibold '>{moment(appointment.appointmentDate).format("dddd, MMM Do")}</h1>
                        <h2 className=' text-xs '>{
                          getTime(appointment.timeStart)
                        }</h2>
                      </div>
                      {/* <Calendar  selectedDate={details.appointmentDate}/> */}
                    </div>
                    <h1 className=' mt-3 mb-1 text-lg font-bold text-gray-600 '>Services</h1>
                    <div className=' w-full flex gap-2 '>
                      <div className='w-1/2 h-[330px] flex flex-col p-3 gap-2 overflow-auto scrollbar-hide'>
                        {
                          appointment.dentalServices.map((service, index) => (
                            <div
                              key={service.serviceId}
                              className={`h-auto border-l-4 shadow-md px-3 py-2 ${index % 2 === 0
                                  ? "border-l-cyan-500"
                                  : index % 3 === 0
                                    ? "border-l-yellow-500"
                                    : "border-l-purple-500"
                                }`}
                            >
                              <h1 className='font-bold text-md text-gray-700'>{service.name}</h1>
                              <h2 className='capitalize'>{service.type}</h2>
                            </div>
                          ))
                        }
                        {
                          appointment.status !== "TREATMENT" && (
                            <h1 className=' text-red-500 text-sm '>For Dentist Viewing*</h1>
                          )
                        }
                      </div>
                      <div className=' flex-grow h-[330px] p-4 '>
                        <h1 className=' text-lg font-bold text-gray-700 '>Payment Summary</h1>
                        <div className=' pt-3 text-gray-500 font-semibold flex justify-between '>Total <span className=' capitalize  text-gray-700 font-normal '>{payment.totalPayment}</span></div>
                        <div className=' pt-3 text-gray-500 font-semibold flex justify-between '>Payment Method <span className=' capitalize font-normal text-gray-700 '>{payment.method === "hmo" ? "Health Insurance" : payment.method}</span></div>
                        <div className=' pt-3 text-gray-500 font-semibold flex justify-between '>Payment Type <span className=' capitalize font-normal text-gray-700 '>{payment.type}</span></div>
                        <div className={` float-right w-32 mt-3 p-1 text-xs rounded-full text-center text-white font-semibold ${payment.status === "PENDING" ? "bg-orange-500"
                            : "bg-green-500"
                          } `}>{
                            payment.status
                          }</div>
                      </div>
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