import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Routes, Route } from 'react-router-dom';

// REDUX FUNCTION
import { useDispatch, useSelector } from 'react-redux';
import { fetchPatient } from '../redux/action/PatientAction';
import { fetchDentist } from '../redux/action/DentistAction';
import { fetchAppointment, deleteByPatientAppointment, fetchPatientAppointment, patientChanges } from '../redux/action/AppointmentAction';
import { fetchLoginAdmin } from '../redux/action/AdminAction';
import { fetchServices } from '../redux/action/ServicesAction';
import { fetchAllNotification } from '../redux/action/NotificationAction';
import { fetchNewAdminMessage } from '../redux/action/MessageAction';
import { fetchAppointmentFee } from '../redux/action/AppointmentFeeAction';
import LoadingSpinner from "../components/LoadingSpinner";
import { AiOutlineScan } from 'react-icons/ai';
import * as io from "socket.io-client";
import { SOCKET_LINK } from '../ApiLinks';
import { fetchPatientPayments, fetchPaymentDetails } from "../redux/action/PaymentAction";
import { fetchIncomingMessage } from "../redux/action/MessageAction";
import NotificationModal from '../components/NotificationModal';
import { fetchInsurance } from '../redux/action/InsuranceAction';
import { fetchSchedule } from '../redux/action/ScheduleAction';

import Header from '../components/Header';
import QRCodeModal from '../components/QRCodeModal'; 

// ROUTE COMPONENT
const Home = React.lazy(()=>import('./Home'));
const Admin = React.lazy(()=>import('./Admin'));
const Appointments = React.lazy(()=>import('./Appointments'));
const Dentist = React.lazy(()=>import('./Dentist'));
const Patients = React.lazy(()=>import('./Patients'));
const Profile = React.lazy(()=>import('./Profile'));
const Services = React.lazy(()=>import('./Services'));
const Messages = React.lazy(()=>import('./Messages'));
const PageNotFound = React.lazy(()=>import('./PageNotFound'));
const History = React.lazy(()=>import('./History'));
const AppointmentInformation = React.lazy(()=>import('./AppointmentInformation'));
const Announcement = React.lazy(()=>import('./Announcement'));
const AppointmentCalendar = React.lazy(()=>import('./AppointmentCalendar'));
const ViewPatient = React.lazy(()=>import('../components/ViewPatient'));
const Treatment = React.lazy(()=>import('./Treatment'));
const Payment = React.lazy(()=>import('./Payment'));
const Schedule = React.lazy(()=>import('./Schedule'));
const QRScanPage = React.lazy(()=>import('./QRScanPage')); 
const AppointmentFee = React.lazy(()=>import('./AppointmentFee')); 

const socket = io.connect(SOCKET_LINK);
function Dashboard() {
  const dispatch = useDispatch();
  const [isToggleQR, setToggleQR] = useState(false);
  const [toggleBar, setToggleBar] = useState(false);
  const [notificationToggle, setNotificationToggle] = useState({
    data: null,
    isShow: false
  });
  const patient = useSelector(state => state?.patient );
  const service = useSelector(state => state?.service );
  // const dentist = useSelector(state => state?.dentist );
  const admin = useSelector(state => state?.admin );
  const appointment = useSelector(state => state?.appointment );
  const insurance = useSelector((state)=>state?.insurance)
  const appointmentFee = useSelector((state)=>state?.fee)
  const schedule= useSelector((state)=>state?.schedule)

  useEffect(() => {
    const token = localStorage.getItem('token');
    dispatch(fetchLoginAdmin(token));
  }, []);

  useEffect(() => {
      if(!service.payload){
        dispatch(fetchServices());
      }
      if(!appointmentFee.payload){
        dispatch(fetchAppointmentFee());
      }
      if(!insurance.payload){
        dispatch(fetchInsurance());
      }
      if(!schedule.payload){
        dispatch(fetchSchedule());
      }
  }, [admin.loginAdmin]);

  useEffect(() => {
    socket.on("response_payment_changes", (data) => {
      const parseData = JSON.parse(data);
      dispatch(fetchPaymentDetails(parseData.value));
    });
    socket.on("new_response_patient_changes", (data) => {
      const parseData = JSON.parse(data);
      dispatch(fetchPatientAppointment(parseData.value));
      dispatch(fetchPatientPayments(parseData.value));
    });
    socket.on("response_changes", (data) => {
      const parseData = JSON.parse(data);
      dispatch(patientChanges(parseData.value));
      dispatch(fetchPaymentDetails(parseData.value));
    });
    socket.on("response_cancel", (data) => {
      const parseData = JSON.parse(data);
      dispatch(deleteByPatientAppointment(parseData.value));
    });
    socket.on("received_by_admin", (data) => {
      dispatch(fetchIncomingMessage(data.key, data.value));
    })

    socket.on("create_received_by_admin", (data) => {
      const parseData = JSON.parse(data);
      const adminLoginId = localStorage.getItem("adminId")
      if (parseData.admin === adminLoginId) {
        dispatch(fetchNewAdminMessage(parseData.key));
      }
    })

    return () => { socket.off() }
  }, [SOCKET_LINK]);

  // if 
  return (
    <>
      {
        (!appointmentFee?.payload || !schedule?.payload || !insurance?.payload || !service.payload ) ? <section className='w-full h-screen flex justify-center items-center '><LoadingSpinner loading={true} /></section>
          : (
            <div className='w-full h-screen flex z-10 relative '>
              <Sidebar toggleBar={toggleBar} />
              <div className=' relative flex flex-grow flex-col bg-slate-200'>

                {isToggleQR && (<QRCodeModal setToggleQR={setToggleQR} />)}
                {notificationToggle.isShow && (<NotificationModal notificationToggle={notificationToggle} setNotificationToggle={setNotificationToggle} />)}

                <Header toggleBar={toggleBar} setToggleBar={setToggleBar} setNotificationToggleModal={setNotificationToggle} notificationToggle={notificationToggle} />

                <Routes>

                  <Route element={
                    <React.Suspense>
                      <Home />
                    </React.Suspense>
                    }
                    path='/' />

                  <Route element={
                    <React.Suspense>
                      <Admin />
                    </React.Suspense>
                  } path='/admin' />

                  <Route path='/appointment'>

                    <Route element={
                      <React.Suspense>
                        <Appointments />
                      </React.Suspense>
                    } path='/appointment/' />

                    <Route element={
                      <React.Suspense>
                        <AppointmentCalendar />
                      </React.Suspense>
                    } path='/appointment/calendar' />

                    <Route path='/appointment/details/:id' element={
                      <React.Suspense>
                        <AppointmentInformation />
                      </React.Suspense>
                    } />

                    <Route path='*' element={
                        <PageNotFound />
                    } />
                  </Route>

                  <Route element={
                    <React.Suspense>
                      <Messages />
                    </React.Suspense>
                  } path='/messages' />

                  <Route element={
                    <React.Suspense>
                      <Dentist />
                    </React.Suspense>
                  } path='/dentist' />

                  <Route
                    path='/patient' >

                    <Route element={
                      <React.Suspense>
                        <Patients />
                      </React.Suspense>
                    } path='/patient/' />

                    <Route element={
                      <React.Suspense>
                        <ViewPatient />
                      </React.Suspense>
                    } path='/patient/:id' />
                  </Route>

                  <Route element={
                    <React.Suspense>
                      <Profile />
                    </React.Suspense>
                  } path='/profile' />

                  <Route element={
                    <React.Suspense>
                      <History />
                    </React.Suspense>
                  } path='/history' />

                  <Route element={
                    <React.Suspense>
                      <Treatment />
                    </React.Suspense>
                  } path='/treatment' />

                  <Route element={
                    <React.Suspense>
                      <Services />
                    </React.Suspense>
                  } path='/services' />

                  <Route element={
                    <React.Suspense>
                      <Schedule />
                    </React.Suspense>
                  } path='/schedule' />

                  <Route element={
                    <React.Suspense>
                      <Payment />
                    </React.Suspense>
                  } path='/payment' />

                  <Route element={
                    <React.Suspense>
                      <Announcement />
                    </React.Suspense>
                  } path='/announcement' />

                  <Route element={
                    <React.Suspense>
                      <AppointmentFee />
                    </React.Suspense>
                  } path='/appointmentFee' />

                  <Route element={
                    <React.Suspense>
                      <QRScanPage />
                    </React.Suspense>
                  }
                    path='/scan/:id' />


                  <Route path='*' element={
                      <PageNotFound />
                  } />

                </Routes>


                {/*//~ FLOATING QR */}
                <div className=' flex justify-center items-center flex-col bg-blue-500 absolute p-3 right-10 bottom-8 rounded cursor-pointer shadow-md hover:bg-blue-700 ' onClick={() => setToggleQR(true)} >
                  <AiOutlineScan size={40} className=' text-white ' />
                  <h3 className=' font-bold text-white '>QR Code</h3>
                </div>
                {/*//~ FLOATING QR */}

              </div>
            </div>
          )
      }
    </>
  )
}

export default Dashboard