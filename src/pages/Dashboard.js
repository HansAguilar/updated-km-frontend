import React,{ useEffect, useState } from 'react';
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
import axios from 'axios';
import PageNotFound from './PageNotFound';
import History from './History';
import {ADMIN_LINK, APPOINTMENT_LINK, PATIENT_LINK} from '../ApiLinks';
import AppointmentInformation from './AppointmentInformation';
import Announcement from './Announcement';
import AppointmentCalendar from './AppointmentCalendar';

function Dashboard() {
  const [ admin, setAdmin ] = useState({});
  const [loading, setLoading] = useState(false);
  const [ toggleBar, setToggleBar ] = useState(false);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(()=>{
    const fetchData = async() =>{
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${ADMIN_LINK}getAdmin/${token}`);
        setAdmin(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    fetchData();
    const fetchAllPatient = async() =>{
      try{
        const response = await axios.get(`${PATIENT_LINK}fetch`)
        setPatients(response.data);
      }catch(err){ console.log(err); }
    }
    fetchAllPatient();
    const fetchAllAppointment= async() =>{
      try{
        const response = await axios.get(`${APPOINTMENT_LINK}`)
        setAppointments(response.data);
      }catch(err){ console.log(err); }
    }
    fetchAllAppointment();
  },[]);

  
  const pendingAppointment = appointments.filter(val=>{
    return val.status === "PENDING";
  })
  const approvedAppointment = appointments.filter(val=>{
    return val.status === "APPROVED";
  })
  if(loading)return <h1>Loading...</h1>
  return (
      <div className='w-full h-screen bg-gray-100 flex z-10 '>
        <Sidebar toggleBar={toggleBar} />
        <div className=' flex flex-grow flex-col bg-gray-200 '>
          <Header name={admin.firstname} toggleBar={toggleBar} setToggleBar={setToggleBar} />
          <Routes>
                  <Route element={
                  <Home patients={patients.length} pendingAppointment={pendingAppointment.length} approvedAppointment={approvedAppointment.length} />} 
                  path='/' />

                  <Route element={
                  <Admin  />
                  } path='/admin' />

                  <Route path='/appointment'>
                    <Route element={<Appointments/>} path='/appointment/' />
                    <Route element={<AppointmentCalendar appointments={appointments} />} path='/appointment/calendar' />
                    <Route path='/appointment/details/:id' element={<AppointmentInformation/>} />
                    <Route path='*' element={<PageNotFound/>} />
                  </Route>

                  <Route element={
                  <Messages admin={admin} />
                  } path='/messages' />

                  <Route element={
                  <Dentist />
                  } path='/dentist' />

                  <Route 
                  path='/patient' 
                  element={<Patients patients={patients}/>} 
                  />

                  <Route element={
                  <Profile />
                  } path='/profile' />

                  <Route element={
                  <History />
                  } path='/history' />

                  <Route element={
                  <Services />
                  } path='/services' />

                  <Route element={
                  <Announcement />
                  } path='/announcement' />

          <Route path='*' element={<PageNotFound />} />
          </Routes>
        </div>
    </div>
    )
}

export default Dashboard