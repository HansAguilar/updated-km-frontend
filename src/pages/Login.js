import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.jpg';
import blob from '../assets/blob.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ADMIN_LINK } from '../ApiLinks';

function Login() {
  const [account, setAccount] = useState({
    username: "",
    password: ""
  });
  const [result, setResult] = useState({
    status: false,
    message: ""
  })
  const navigate = useNavigate();
  useEffect(() => { localStorage.removeItem("token") }, []);
  const handleOnChange = (e) => { setAccount({ ...account, [e.target.name]: e.target.value }); }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (account.username === "" || account.password === "") return modifyResult(false, "Please fill up empty field*");

    const formData = new FormData();
    formData.append("username", account.username);
    formData.append("password", account.password);
    fetchAccount(formData);
  }

  const fetchAccount = async (formData) => {
    try {
      const response = await axios.post(`${ADMIN_LINK}/login`, formData, {
        headers: { Accept: "application/json" }
      })
      modifyResult(response.data.status, response.data.message)
      if (response.data.status) {
        localStorage.setItem("token", response.data.message);
        navigate("/admin/dashboard")
      }
    } catch (err) { console.log(err); }
  }

  const modifyResult = (s, m) => {
    return setResult(prev => ({ ...prev, status: s, message: m }))
  }

  return (
    <div className=' relative w-full min-h-screen flex flex-col justify-center items-center gap-5 p-4 ' >
      <img src={blob} className='absolute -z-10 min-w-full h-full object-cover aspect-auto' />
      <h1 className='font-bold text-4xl tracking-wide text-[#5f6061]'>Welcome back</h1>
      <div className=' px-4 py-8 rounded shadow-sm bg-white flex flex-col gap-4 border '>
        <img src={logo} alt='Dental logo' width={350} />
        {
          !result.status ? <p className=' my-2 text-red-400 text-center'>{result.message}</p> : ""
        }
        <form className='flex flex-col gap-5 p-3 '>
          <div className='relative flex w-full items-center'>
            <input
              type='text'
              name='username'
              value={account.username}
              onChange={(e) => handleOnChange(e)}
              placeholder='Username'
              id="username"
              autoFocus
              className=' peer appearance-none indent-2 p-3 text-sm w-full rounded bg-transparent outline-none placeholder-transparent border  placeholder-shown:border-[#c2c8d0] focus:border-sky-400 border-[#c2c8d0] font-normal text-[#3a332d]' />
            <label htmlFor="username"
              class="absolute left-4 px-1 peer-placeholder-shown:text-[#6f7780] text-black/50 bg-white text-xs peer-focus:text-xs peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:text-sky-400 peer-focus:-top-2 -top-2 transition-all ease-linear duration-100 font-normal">Username*</label>
          </div>

          {/*Password*/}
          <div className='relative flex w-full items-center'>
            <input
              type='password'
              name='password'
              value={account.password}
              onChange={(e) => handleOnChange(e)}
              placeholder='Password'
              id="password"
              className=' peer appearance-none indent-2 p-3 text-sm w-full rounded bg-transparent outline-none placeholder-transparent border  placeholder-shown:border-[#c2c8d0] focus:border-sky-400 border-[#c2c8d0] font-normal text-[#3a332d]' />
            <label htmlFor="password"
              className="absolute left-4 px-1 peer-placeholder-shown:text-[#6f7780] text-black/50 bg-white text-xs peer-focus:text-xs peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:text-sky-400 peer-focus:-top-2 -top-2 transition-all ease-linear duration-100 font-normal">Password*</label>
          </div>

          <input
            type='submit'
            value='Login'
            onClick={(e) => handleSubmit(e)}
            className=' bg-blue-400 p-3 text-white rounded cursor-pointer text-lg hover:bg-blue-500 transition-all' />
          <p className=' text-blue-400 text-sm cursor-pointer truncate truncate-lines-3 whitespace-nowrap hover:text-blue-500' onClick={() => navigate("/recoveraccount")}>Forgot password?</p>
        </form>
      </div>

    </div>
  )
}

export default Login