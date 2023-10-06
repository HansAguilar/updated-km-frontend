import React,{ useState, useEffect } from 'react';
import logo from '../assets/logo.jpg';
import { FaUser } from 'react-icons/fa';
import { BsFillKeyFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ADMIN_LINK } from '../ApiLinks';

function Login() {
  const [ account, setAccount ] = useState({
    username: "",
    password: ""
  });
  const [result, setResult] = useState({
    status: false,
    message: ""
  })
  const navigate = useNavigate();
  useEffect(()=>{ localStorage.removeItem("token") },[]);
  const handleOnChange = (e) =>{ setAccount({...account, [e.target.name]: e.target.value}); }

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(account.username === "" || account.password === "") return modifyResult(false, "Please fill up empty field*");

    const formData = new FormData();
    formData.append("username", account.username);
    formData.append("password", account.password);
    fetchAccount(formData);
    
  }

  const fetchAccount = async(formData) =>{
    try{
      const response = await axios.post(`${ADMIN_LINK}/login`,formData)
      modifyResult(response.data.status, response.data.message)
      if(response.data.status){
        localStorage.setItem("token", response.data.message);
        navigate("/admin/dashboard")
      }
    }catch(err){ console.log(err); }
  }
  const modifyResult = (s, m) =>{
    return setResult(prev=>({ ...prev, status: s, message:m}))
  }
  return (
    <div className=' w-full h-screen bg-gray-100 flex flex-col justify-center items-center gap-5 ' >
      <div className=' px-4 py-8 rounded-md shadow-sm bg-white flex flex-col gap-4 '>
        <img src={logo} alt='Dental logo' width={450}/>
        <form className='flex flex-col gap-5 p-3 '>
          <div className='py-1 px-4 flex w-full h-auto items-center bg-gray-100 '>
            <FaUser 
              size={20}
              className=' text-gray-400 '
            />
            <input 
            type='text' 
            name='username' 
            value={account.username} 
            onChange={(e)=>handleOnChange(e)}
            placeholder='Username'
            className='focus:outline-none bg-transparent p-4 w-full '/> 
          </div>

          {/*Password*/}
          <div className='py-1 px-4 flex w-full h-auto items-center bg-gray-100 '>
            <BsFillKeyFill
              size={20}
              className=' text-gray-400 '
            />
            <input 
            type='password' 
            name='password'
            value={account.password} 
            onChange={(e)=>handleOnChange(e)}
            placeholder='Password'
            className='focus:outline-none bg-transparent p-4 w-full '/> 
          </div>
          
          <input 
            type='submit' 
            value='Login'
            onClick={(e)=>handleSubmit(e)}
            className=' bg-cyan-500 p-4 text-white rounded-md cursor-pointer tracking-widest uppercase hover:shadow-md '/> 
            <p className=' text-cyan-600 text-lg cursor-pointer truncate truncate-lines-3 whitespace-nowrap hover:text-cyan-700' onClick={()=>navigate("/recoveraccount")}>Forgot password?</p>
        </form>
      </div>
      {
        !result.status ? <h1 className=' text-red-500 '>{result.message}</h1>: ""
      }
    </div>
  )
}

export default Login