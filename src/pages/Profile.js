import React, { useState } from 'react'
import clinic from "../assets/dental-clinic.jpg"
import { useDispatch, useSelector } from 'react-redux';
import { toastHandler } from '../ToastHandler';
import { updateAdminLogin } from '../redux/action/AdminAction';

function Profile() {
  const admin = useSelector((state)=>state.admin.loginAdmin);
  const dispatch = useDispatch();
  const [adminInfo, setAdminInfo] = useState({
    firstname:admin.firstname,
    middlename:admin.middlename ? admin.middlename : "",
    lastname:admin.lastname,
    birthday: admin.birthday,
    contactNumber: admin.contactNumber,
    address: admin.address,
    email:admin.email,
    password: "",
    confirmPassword: "",
  })

  const [profile, setProfile] = useState(null);
  
  const handleOnChange = (e) =>setAdminInfo({...adminInfo, [e.target.name]:e.target.value});
  const handleProfile = (e) =>{
    const file = e.target.files[0];
      const reader = new FileReader();
      if (file) {
        const fileExtension = file.name.split('.').pop().toLowerCase();
        const acceptedFormats = ['jpeg', 'jpg', 'png', 'gif', 'bmp'];
        if (acceptedFormats.includes(fileExtension)) {
          reader.readAsDataURL(e.target.files[0]);
          reader.onload = e => {
            setProfile(e.target.result);
          }
        }
        else { toastHandler("error", 'Invalid file format. Please provide an image file.'); }
      }
  }
 
 const submitButton = () =>{
  // Add ka ng validation dito hans
  if(adminInfo.password!==adminInfo.confirmPassword){
    toastHandler("error", "Password mismatch");
  }
  const data = {
    ...adminInfo,
    profile:profile
  }
  dispatch(updateAdminLogin(admin.adminId, data))
 }

  return (
    <div className=' h-screen overflow-hidden relative bg-gray-200'>
      <div className='flex justify-between p-4 gap-8'>
        <div className='flex flex-col items-center justify-between w-[28rem] gap-8'>

          <div className='bg-white w-full h-72 flex items-center justify-center rounded'>
            {
              !admin.profile 
              ? <img src={clinic} className='h-52 w-52 aspect-auto rounded-full border-2' alt='admin' /> 
              : <img src={admin.profile} className='h-52 w-52 aspect-auto rounded-full border-2' alt='admin' />
            }
          </div>
          <div className='bg-white divide-y flex items-center flex-col justify-between w-full gap-4 p-4 rounded'>
            {/*//~ NAME */}
            <div className=' w-full flex justify-between items-center p-2 border-gray-300 '>
              <p className='text-slate-800 font-medium min-w-max'>Name</p>
              <p className='capitalize text-slate-600'>{`${admin.firstname} ${!admin.middlename ? "" : admin.middlename} ${admin.lastname}`}</p>
            </div>
            {/*//~ NAME */}

            {/*//~ GENDER */}
            <div className=' w-full flex justify-between p-2 border-gray-300 '>
              <p className='text-slate-800 font-medium'>Gender</p>
              <p className='capitalize text-slate-600'>{admin.gender}</p>
            </div>
            {/*//~ GENDER */}

            {/*//~ BIRTHDAY */}
            <div className=' w-full flex justify-between p-2 border-gray-300 '>
              <p className='text-slate-800 font-medium'>Birthday</p>
              <p className='capitalize text-slate-600'>{admin.birthday}</p>
            </div>
            {/*//~ BIRTHDAY */}

            {/*//~ PHONE */}
            <div className=' w-full flex justify-between p-2 border-gray-300 '>
              <p className='text-slate-800 font-medium'>Phone</p>
              <p className='capitalize text-slate-600'>{admin.contactNumber}</p>
            </div>
            {/*//~ PHONE */}

            {/*//~ ADDRESS */}
            <div className=' w-full flex justify-between p-2 border-gray-300 '>
              <p className='text-slate-800 font-medium'>Address</p>
              <p className='capitalize text-slate-600'>{admin.address}</p>
            </div>
            {/*//~ ADDRESS */}

            {/*//~ ROLE */}
            <div className=' w-full flex justify-between p-2 mb-4 border-gray-300 '>
              <p className='text-slate-800 font-medium'>Role</p>
              <p className='capitalize text-slate-600'>{admin.role}</p>
            </div>
            {/*//~ ROLE */}
          </div>
        </div>

        {/* TEXT FIELD */}
        <div className='flex-1 bg-white rounded w-full p-5 '>

            {/* FIRSTNAME */}
          <div className=' mb-5 '>
            <p>Firstname</p>
            <input type='text' name="firstname" value={adminInfo.firstname} onChange={handleOnChange} placeholder='Firstname' className=' border-2 ' />
          </div>

            {/* MIDDLENAME */}
          <div className=' mb-5 '>
            <p>Middlename</p>
            <input type='text' name="middlename" value={adminInfo.middlename} onChange={handleOnChange} placeholder='Middlename' className=' border-2 ' />
          </div>

          {/* LASTNAME */}
          <div className=' mb-5 '>
            <p>Lastname</p>
            <input type='text' name="lastname" value={adminInfo.lastname} onChange={handleOnChange} placeholder='Lastname' className=' border-2 ' />
          </div>

           {/* BIRTHDAY */}
           <div className=' mb-5 '>
            <p>Birthday</p>
            <input type='date' name="birthday" value={adminInfo.birthday} onChange={handleOnChange} placeholder='Birthday' className=' border-2 ' />
          </div>

            {/* Contact Number */}
           <div className=' mb-5 '>
            <p>Contact Number</p>
            <input type='text' name="contactNumber" value={adminInfo.contactNumber} onChange={handleOnChange} placeholder='Contact Number' className=' border-2 ' />
          </div>

          {/* Address  */}
          <div className=' mb-5 '>
            <p>Address </p>
            <input type='text' name="address" value={adminInfo.address} onChange={handleOnChange} placeholder='Address ' className=' border-2 ' />
          </div>

          {/* Email  */}
          <div className=' mb-5 '>
            <p>Email </p>
            <input type='text' name="email" value={adminInfo.email} onChange={handleOnChange} placeholder='Email ' className=' border-2 ' />
          </div>

          {/* Password */}
          <div className=' mb-5 '>
            <p>Password</p>
            <input type='password' name="password" value={adminInfo.password} onChange={handleOnChange} placeholder='Password' className=' border-2 ' />
          </div>

          {/* Confirm Password */}
          <div className=' mb-5 '>
            <p>Confirm Password</p>
            <input type='password' name="confirmPassword" value={adminInfo.confirmPassword} onChange={handleOnChange} placeholder='Confirm Password' className=' border-2 ' />
          </div>

          {/* Profile */}
          <div className=' mb-5 '>
            <p>Profile</p>
            <input type='file' name="profile" onChange={(e)=>handleProfile(e)} accept="image/*" className=' border-2 ' />
            {
              profile && (
                <img src={profile} className=' w-20 h-20 ' alt='new admin profile'/>
              )
            }
          </div>

          {/* BUTTON */}
          <button className=' bg-red-400 ' onClick={submitButton}>Submit</button>
        </div>

      </div>
    </div>
  )
}

export default Profile