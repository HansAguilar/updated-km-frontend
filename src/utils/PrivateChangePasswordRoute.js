import axios from 'axios';
import React,{useEffect, useState} from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

function PrivateChangePasswordRoute() {
  const {id} = useParams();
  const [auth, setAuth] = useState({ token: false });
  const [loading, setLoading] = useState(true);

  const fetchData = async() => {
    try {
      const formData = new FormData();
      formData.append("token", id)
      const response = await axios.post(`http://localhost:8080/api/v1/admin/resetpassword/${id}`, formData)
      if(response.data){
        setAuth({...auth, token: true});
       }
       setLoading(false);
    } catch (error) {
      // alert(error.response.data.message);
      setLoading(false);
    }
  }

  useEffect(()=>{
    fetchData();
  });
  
  console.log(id);
  if(loading){ return <div className='w-100 h-screen flex justify-center items-center'>
     <LoadingSpinner loading={loading} />
  </div> }
  return (
    <>
    {
      auth.token ? <Outlet /> : <Navigate to='/' />
    }
    </>
  )
}

export default PrivateChangePasswordRoute