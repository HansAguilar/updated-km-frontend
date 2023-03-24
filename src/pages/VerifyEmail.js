import React,{ useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function VerifyEmail() {
  const navigate = useNavigate();
  const [ email, setEmail ] = useState("");

  const btnSentEmail = async() =>{
    const formData = new FormData();
    formData.append("email", email);
    try{
      const response = await axios.post("http://localhost:8080/api/v1/admin/verifyemail", formData);
      if(response.data){
        alert(response.data.message);
      }
    }catch(err){ alert(err.response.data.message); }
  }
  return (
    <div className=" w-full h-screen bg-gray-100 flex justify-center items-center flex-col">
      <div className=' w-[450px] text-gray-800 p-4 text-center flex flex-col justify-center gap-5 '>
          
          <h1 className=' text-4xl font-bold '>Forgot password</h1>
          <h2>Resseting your password is easy. Just type your email, and we will send you email to reset your password</h2>

          <div className=' w-full mt-20 flex flex-col items-start justify-start gap-y-5 '>
            <input type="email" name="adminEmail" value={email} className=' w-full bg-transparent border-b-2 px-4 py-2 shadow-md focus:outline-none focus:s ' placeholder='Email' onChange={(e)=>setEmail(e.target.value)}/>
            <button className=' w-full bg-cyan-500 py-3 text-white rounded-md' onClick={btnSentEmail}>Sent</button>
          </div>
          <p className=' mt-5 '>Did you remember your password? <span className=' text-cyan-500 cursor-pointer ' onClick={()=>navigate("/")}>Login</span></p>

        </div>
    </div>
  )
}

export default VerifyEmail