import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Admin from './Admin';
import Appointments from './Appointments';
import Dentist from './Dentist';
import Patients from './Patients';
import Profile from './Profile';
import Services from './Services';
import Messages from './Messages';
import Header from '../components/Header';
import PageNotFound from './PageNotFound';
import History from './History';
import AppointmentInformation from './AppointmentInformation';
import Announcement from './Announcement';
import AppointmentCalendar from './AppointmentCalendar';
import ViewPatient from '../components/ViewPatient';
import Treatment from "./Treatment";
import Payment from "./Payment";
import Schedule from "./Schedule";
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
import QRScanPage from './QRScanPage';
import QRCodeModal from '../components/QRCodeModal';
import * as io from "socket.io-client";
import { SOCKET_LINK } from '../ApiLinks';
import { fetchPatientPayments, fetchPaymentDetails } from "../redux/action/PaymentAction";
import { fetchIncomingMessage } from "../redux/action/MessageAction";
import NotificationModal from '../components/NotificationModal';
import AppointmentFee from './AppointmentFee';
import { fetchInsurance } from '../redux/action/InsuranceAction';
import { fetchSchedule } from '../redux/action/ScheduleAction';

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
  }, [socket]);

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
                    <Home />}
                    path='/' />

                  <Route element={
                    <Admin />
                  } path='/admin' />

                  <Route path='/appointment'>
                    <Route element={<Appointments />} path='/appointment/' />
                    <Route element={<AppointmentCalendar />} path='/appointment/calendar' />
                    <Route path='/appointment/details/:id' element={<AppointmentInformation />} />
                    <Route path='*' element={<PageNotFound />} />
                  </Route>

                  <Route element={
                    <Messages />
                  } path='/messages' />

                  <Route element={
                    <Dentist />
                  } path='/dentist' />

                  <Route
                    path='/patient' >
                    <Route element={<Patients />} path='/patient/' />
                    <Route element={<ViewPatient />} path='/patient/:id' />
                  </Route>

                  <Route element={
                    <Profile />
                  } path='/profile' />

                  <Route element={
                    <History />
                  } path='/history' />

                  <Route element={
                    <Treatment />
                  } path='/treatment' />

                  <Route element={
                    <Services />
                  } path='/services' />

                  <Route element={
                    <Schedule />
                  } path='/schedule' />

                  <Route element={
                    <Payment />
                  } path='/payment' />

                  <Route element={
                    <Announcement />
                  } path='/announcement' />

                  <Route element={
                    <AppointmentFee />
                  } path='/appointmentFee' />

                  <Route element={<QRScanPage />}
                    path='/scan/:id' />


                  <Route path='*' element={<PageNotFound />} />
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

export default React.memo(Dashboard)