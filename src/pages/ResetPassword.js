import React,{ useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function ResetPassword() {
  const {id} = useParams();
  const navigate = useNavigate();
  const [ newPassword, setNewPassword ] = useState({
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) =>{
    setNewPassword({...newPassword, [e.target.name]: e.target.value });
  }

  const savePassword = async() => {
    if(!newPassword.password || !newPassword.confirmPassword) return alert("Please fill up empty field!");
    if(newPassword.password !== newPassword.confirmPassword) return alert("Password and confirm password not match.");

    try {
      const formData = new FormData();
      formData.append("token", id);
      formData.append("password", newPassword.password);
      const response = await axios.post("http://localhost:8080/api/v1/admin/changepassword", formData);
      if(response.data){
        alert(response.data.message);
      }
      navigate("/");
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className=" w-full h-screen bg-gray-100 flex justify-center items-center flex-col">
      <div className=' w-[450px] text-gray-800 p-4 text-center flex flex-col justify-center gap-5 '>
          
          <h1 className=' text-4xl font-bold '>Forgot password</h1>
          <h2>In order to protect your account, make sure your password is strong, unique, and not easily guessed. </h2>
          {/* Avoid using common words, phrases, or personal information, and consider using a combination of letters, numbers, and symbols. */}

          <div className=' w-full mt-20 flex flex-col items-start justify-start gap-y-5 '>
            <input type="password" name="password" value={newPassword.password} className=' w-full bg-transparent border-b-2 px-4 py-2 shadow-md focus:outline-none focus:s ' placeholder='Password' onChange={(e)=>handleChange(e)}/>
            <input type="password" name="confirmPassword" value={newPassword.confirmPassword} className=' w-full bg-transparent border-b-2 px-4 py-2 shadow-md focus:outline-none focus:s ' placeholder='Confirm password' onChange={(e)=>handleChange(e)}/>
            <button className=' w-full bg-cyan-500 py-3 text-white rounded-md' onClick={savePassword}>Change Password</button>
          </div>

        </div>
    </div>
  )
}

export default ResetPassword;