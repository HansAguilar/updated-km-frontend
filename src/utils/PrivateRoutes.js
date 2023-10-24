import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import { ADMIN_LINK } from '../ApiLinks';

function PrivateRoutes() {
  const [auth, setAuth] = useState({ token: false });
  const [loading, isLoading] = useState(true);

  useEffect(() => {
    const verifyLogin = async () => {
      try {
        const token = localStorage.getItem("token");
        const formData = new FormData()
        formData.append("token", token);
        const response = await axios.post(`${ADMIN_LINK}/verifyAccount`, formData, {
          headers: { Accept: 'application/json' }
        })

        const adminInfo = await axios.get(`${ADMIN_LINK}/getAdmin/${token}`);
        localStorage.setItem("adminInfo", JSON.stringify(adminInfo.data))

        if (response.data === "valid") {
          setAuth({ token: true })
        };

        setInterval(() => {
          isLoading(false);
        }, 1000);
      }
      catch (err) { console.log(err); isLoading(false); }
    }
    verifyLogin();
  }, [])

  if (loading) return <div className=' w-full min-h-screen flex justify-center items-center '>
    <LoadingSpinner loading={loading} />
  </div>
  return (
    auth.token ? <Outlet /> : <Navigate to='/' />
  )
}
export default PrivateRoutes