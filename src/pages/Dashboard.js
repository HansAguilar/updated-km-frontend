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

function Dashboard() {
  const [ admin, setAdmin ] = useState({});
  const [loading, setLoading] = useState(false);
  const [ toggleBar, setToggleBar ] = useState(false);
  const [patients, setPatients] = useState([]);

  useEffect(()=>{
    const fetchData = async() =>{
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:8080/api/v1/admin/getAdmin/${token}`);
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
        const response = await axios.get("http://localhost:8080/api/v1/patient/fetch")
        setPatients(response.data);
      }catch(err){ console.log(err); }
    }
    fetchAllPatient();
  },[]);

  console.log(admin);
  if(loading)return <h1>Loading...</h1>
  return (
      <div className='w-full h-screen bg-gray-100 flex z-10 '>
        <Sidebar toggleBar={toggleBar} />
        <div className=' flex flex-grow flex-col bg-gray-200 '>
          <Header name={admin.firstname} toggleBar={toggleBar} setToggleBar={setToggleBar} />
          <Routes>
                  <Route element={
                  <Home patients={patients.length}  />} 
                  path='/' />

                  <Route element={
                  <Admin  />
                  } path='/admin' />

                  <Route element={
                  <Appointments />
                  } path='/appointments' />

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
                  <Services />
                  } path='/services' />

          <Route path='*' element={<PageNotFound />} />
          </Routes>
        </div>
    </div>
    )
}

export default Dashboard