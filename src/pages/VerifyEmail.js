import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import blob from '../assets/blob.png';

function VerifyEmail() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const btnSentEmail = async () => {
    const formData = new FormData();
    formData.append("email", email);
    try {
      const response = await axios.post("http://localhost:8080/api/v1/admin/verifyemail", formData);
      if (response.data) {
        alert(response.data.message);
      }
    } catch (err) { alert(err.response.data.message); }
  }
  return (
    <div className=" relative w-full min-h-screen flex justify-center items-center flex-col p-4">
      <img src={blob} alt='' className='absolute -z-10 min-w-full h-full object-cover aspect-auto' />

      <div className=' w-[410px] text-[#2d333a] p-4 text-center flex flex-col justify-center gap-5 '>

        <h1 className=' font-bold text-4xl tracking-wide text-[#5f6061] '>Forgot password</h1>
        <p>Resseting your password is easy. Just type your email, and we will send you email to reset your password</p>

        <div className=' relative w-full mt-16 flex flex-col items-start justify-start gap-y-5 '>
          <input type="email" autoFocus name="adminEmail" id='email' value={email} className=' peer appearance-none indent-2 p-3 text-sm w-full rounded bg-transparent outline-none placeholder-transparent border placeholder-shown:border-[#c2c8d0] focus:border-sky-400 border-[#c2c8d0] font-normal text-[#3a332d]' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
          <label htmlFor="email"
            class="absolute left-4 px-1 peer-placeholder-shown:text-[#6f7780] text-black/50 bg-white text-xs peer-focus:text-xs peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:text-sky-400 peer-focus:-top-2 -top-2 transition-all ease-linear duration-100 font-normal">Email</label>
          <button className=' bg-blue-400 p-3 w-full text-white rounded cursor-pointer text-lg hover:bg-blue-500 transition-all' onClick={btnSentEmail}>Sent</button>
        </div>
        <p className=' text-base mt-5 text-[#5f6061] '>Did you remember your password? <span className=' text-blue-400 cursor-pointer truncate truncate-lines-3 whitespace-nowrap hover:text-blue-500 ' onClick={() => navigate("/")}>Login</span></p>

      </div>
    </div>
  )
}

export default VerifyEmail