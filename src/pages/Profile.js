import React, { useState } from 'react'
import clinic from "../assets/dental-clinic.jpg"
import { useDispatch, useSelector } from 'react-redux';
import { toastHandler } from '../ToastHandler';
import { updateAdminLogin } from '../redux/action/AdminAction';
import { ToastContainer } from 'react-toastify';

const inputStyle = "p-2 border border-slate-300 focus:border-blue-600 rounded text-sm focus:outline-none";

function Profile() {
  const admin = useSelector((state) => state.admin.loginAdmin);
  const dispatch = useDispatch();
  const [adminInfo, setAdminInfo] = useState({
    firstname: admin.firstname,
    middlename: admin.middlename ? admin.middlename : "",
    lastname: admin.lastname,
    birthday: admin.birthday,
    contactNumber: admin.contactNumber,
    address: admin.address,
    email: admin.email,
    password: "",
    confirmPassword: "",
  })

  const [profile, setProfile] = useState(null);

  const handleOnChange = (e) => setAdminInfo({ ...adminInfo, [e.target.name]: e.target.value });

  const handleProfile = (e) => {
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

  const isOver18 = (dob) => {
    const birthday = new Date(dob);
    const ageDiff = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDiff);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);
    return age >= 18;
  }

  const submitButton = (e) => {
    e.preventDefault();
    adminInfo.password = adminInfo.password.replace(/\s+/g, '');
    adminInfo.confirmPassword = adminInfo.confirmPassword.replace(/\s+/g, '');

    const haveGhostAndEmojisChar = /^(?!.*[\u200B-\u200D\uFEFF]).{8,}$/;
    const isLegalAge = isOver18(adminInfo.birthday);
    const contactClean = /^09\d{9}$/;

    // Add ka ng validation dito hans
    if (!adminInfo.firstname || !adminInfo.lastname || !adminInfo.birthday || !adminInfo.address || !adminInfo.contactNumber || !adminInfo.email) {
      return toastHandler("error", "Fill up empty field!");
    }

    else if (!haveGhostAndEmojisChar.test(adminInfo.password) || !haveGhostAndEmojisChar.test(adminInfo.confirmPassword)) return toastHandler("error", "Password must be at least 8 characters long")

    else if (/[^\w\s]/.test(adminInfo.firstname)) return toastHandler("error", "Invalid first name format");

    else if (/[^\w\s]/.test(adminInfo.lastname)) return toastHandler("error", "Invalid last name format");

    else if (adminInfo.password.replace(/\s+/g, '') !== adminInfo.confirmPassword.replace(/\s+/g, '')) return toastHandler("error", "Passwords do not match");

    else if (!isLegalAge) return toastHandler("error", "Must be 18 or older");

    else if (!contactClean.test(adminInfo.contactNumber)) return toastHandler("error", "Please enter an 11-digit number starting with 09");

    const data = {
      ...adminInfo,
      profile: !profile ? admin.profile : profile
    }
    dispatch(updateAdminLogin(admin.adminId, data))
  }

  return (
    <div className=' h-screen overflow-hidden relative bg-gray-200'>
      <ToastContainer limit={1} autoClose={1500} />

      <div className='flex justify-between p-4 gap-8'>
        <div className='flex flex-col items-center w-[28rem] gap-8'>

          <div className='bg-white w-full h-72 flex items-center justify-center rounded'>
            {
              !admin.profile
                ? <img src={clinic} className='h-52 w-52 aspect-auto rounded-full border-2' alt='admin' />
                : <img src={admin.profile} className='h-52 w-52 aspect-auto rounded-full border-2' alt='admin' />
            }
          </div>
          <div className='bg-white divide-y flex items-center flex-col justify-between w-full gap-4 p-4 rounded flex-1'>
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
              <p className='text-slate-800 font-medium'>Phone No.</p>
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


        <div className='grid gap-3 p-4 border-t-2 bg-white rounded flex-1' >
          {/*//~ PERSONAL INFORMATION */}
          <div className='flex flex-col w-full pb-4'>
            <h1 className='text-xl font-bold mb-6'>Personal Information</h1>
            <div className='flex flex-col gap-4'>

              {/*//~ NAME */}
              <div className='flex gap-4 flex-col'>
                <div className='flex gap-4'>
                  <div className='flex flex-col w-full gap-1'>
                    <label className='font-medium text-slate-600' htmlFor="firstname">First name</label>
                    <input type="text" name="firstname" value={adminInfo.firstname} className={`${inputStyle}`} onChange={(e) => handleOnChange(e)} />
                  </div>
                  <div className='flex flex-col w-full gap-1'>
                    <label className='font-medium text-slate-600' htmlFor="middlename">Middle name</label>
                    <input type="text" name="middlename" value={adminInfo.middlename} className={`${inputStyle}`} onChange={(e) => handleOnChange(e)} />
                  </div>
                </div>

                <div className='flex gap-4'>
                  <div className='flex flex-col w-full gap-1'>
                    <label className='font-medium text-slate-600' htmlFor="lastname">Last name</label>
                    <input type="text" name="lastname" value={adminInfo.lastname} className={`${inputStyle}`} onChange={(e) => handleOnChange(e)} />
                  </div>
                  <div className='flex flex-col w-full gap-1'>
                    <label className='font-medium text-slate-600' htmlFor="birthday">Birthday</label>
                    <input type="date" name="birthday" max={(new Date(Date.now() + 86400000)).toISOString().split('T')[0]} value={adminInfo.birthday} className={`${inputStyle}`} onChange={(e) => handleOnChange(e)} />
                  </div>
                </div>

              </div>
              {/*//~ NAME */}
            </div>
          </div>
          {/*//~ PERSONAL INFORMATION */}


          {/*//~ CONTACT INFORMATION */}
          <div className='flex flex-col w-full border-t-2 py-4'>
            <h1 className='text-xl font-bold mb-6'>Contact Information</h1>
            <div className='flex gap-4'>
              <div className='flex flex-col w-full gap-1'>
                <label className='font-medium text-slate-600' htmlFor="address">Address</label>
                <input type="text" name="address" value={adminInfo.address} className={`${inputStyle}`} onChange={(e) => handleOnChange(e)} />
              </div>
              <div className='flex flex-col w-80 gap-1'>
                <label className='font-medium text-slate-600' htmlFor="contactNumber">Contact Number</label>
                <input type="text" name="contactNumber" maxLength={11} value={adminInfo.contactNumber} className={`${inputStyle}`} onChange={(e) => handleOnChange(e)} />
              </div>
              <div className='flex flex-col w-full gap-1'>
                <label className='font-medium text-slate-600' htmlFor="email">Email</label>
                <input type="email" name="email" value={adminInfo.email} className={`${inputStyle}`} onChange={(e) => handleOnChange(e)} />
              </div>
            </div>
          </div>
          {/*//~ CONTACT INFORMATION */}


          {/*//~ ACCOUNT INFORMATION */}
          <div className='flex flex-col w-full border-t-2 py-4'>
            <h1 className='text-xl font-bold mb-6'>Account Information <span className='text-sm font-normal italic text-gray-400'>(Password must be atleast 8 characters)</span> </h1>
            <div className='flex gap-4 flex-col'>
              <div className='flex gap-4'>
                <div className='flex flex-col w-full gap-1'>
                  <label className='font-medium text-slate-600' htmlFor="password">Password</label>
                  <input type="password" name="password" value={adminInfo.password} className={`${inputStyle}`} onChange={(e) => handleOnChange(e)} />
                </div>
                <div className='flex flex-col w-full gap-1'>
                  <label className='font-medium text-slate-600' htmlFor="confirmPassword">Confirm Password</label>
                  <input type="password" name="confirmPassword" value={adminInfo.confirmPassword} className={`${inputStyle}`} onChange={(e) => handleOnChange(e)} />
                </div>
              </div>
              <div>
                <div className="flex flex-col w-full gap-1">
                  <label className="font-medium text-slate-600" htmlFor="file">Upload Profile</label>
                  <input
                    type="file"
                    name="profile"
                    accept="image/*"
                    className="text-sm p-2 border border-slate-300 bg-white focus:outline-none text-slate-300 font-bold rounded cursor-pointer file:hidden file:rounded-full file:border-0
    file:text-sm file:font-bold file:bg-blue-50 hover:file:bg-blue-100"
                    onChange={(e) => handleProfile(e)}
                  />
                </div>
              </div>

            </div>
          </div>
          {/*//~ ACCOUNT INFORMATION */}

          <div className='flex gap-2 p-4 justify-start'>
            <button className='py-2 px-4 font-medium bg-red-500 text-white rounded hover:bg-red-700' >Cancel</button>
            <button className='py-2 px-4 font-medium bg-blue-500 text-white rounded hover:bg-blue-700' onClick={(e) => submitButton(e)}>Save Changes</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Profile