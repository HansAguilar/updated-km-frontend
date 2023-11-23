import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createDentist } from "../redux/action/DentistAction";
import { toastHandler } from '../ToastHandler';
import { ToastContainer } from 'react-toastify';

const inputStyle = "p-2 border border-slate-300 focus:border-blue-600  rounded text-sm focus:outline-none";

function DenstistModal({ show, setModal }) {
  const dispatch = useDispatch();
  const [dentistInfo, setDentistInfo] = useState({
    fullname: "",
    birthday: "",
    address: "",
    gender: "",
    contactNumber: "",
    email: "",
    specialty: "",
    username: "",
    password: "",
    confirmPassword: ""
  });
  const [profile, setProfile] = useState(null);

  const handleFormChange = (e) => {
    setDentistInfo({
      ...dentistInfo,
      [e.target.name]: e.target.value
    })
  }

  const handleProfile = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = e => {
        setProfile(e.target.result);
      }
    }
  }

  const isOver18 = (dob) => {
    const birthday = new Date(dob);
    const ageDiff = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDiff);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);
    return age >= 18;
  }

  const clearData = () =>{
    setDentistInfo({
      fullname: "",
      birthday: "",
      address: "",
      gender: "",
      contactNumber: "",
      email: "",
      specialty: "",
      username: "",
      password: "",
      confirmPassword: ""
    });
    setProfile(null)
  }

  const btnSubmit = () => {
    dentistInfo.password = dentistInfo.password.replace(/\s+/g, '');
    dentistInfo.confirmPassword = dentistInfo.confirmPassword.replace(/\s+/g, '');

    const isLegalAge = isOver18(dentistInfo.birthday);
    const contactClean = /^09\d{9}$/;
    const haveGhostAndEmojisChar = /^(?!.*[\u200B-\u200D\uFEFF]).{8,}$/;

    if (!dentistInfo.fullname || !dentistInfo.birthday || !dentistInfo.address || !dentistInfo.gender || !dentistInfo.contactNumber || !dentistInfo.email || !dentistInfo.specialty || !dentistInfo.username || !dentistInfo.password || !dentistInfo.confirmPassword || !profile) {
      return toastHandler("error", "Fill up empty field!");
    }

    else if (!isLegalAge) return toastHandler("error", "Must be 18 or older");

    else if (dentistInfo.password.replace(/\s+/g, '') !== dentistInfo.confirmPassword.replace(/\s+/g, '')) return toastHandler("error", "Passwords do not match");

    else if (!haveGhostAndEmojisChar.test(dentistInfo.password) || !haveGhostAndEmojisChar.test(dentistInfo.confirmPassword)) return toastHandler("error", "Password must be at least 8 characters long")

    else if (!contactClean.test(dentistInfo.contactNumber)) return toastHandler("error", "Please enter an 11-digit number starting with 09");

    const data = { ...dentistInfo, profile };
    dispatch(createDentist(data, toastHandler, setModal,clearData));
  }

  return (
    <div className={`w-full min-h-screen bg-gray-900 bg-opacity-75 absolute -top-10 z-10 flex flex-grow justify-center items-center ${show ? '' : 'hidden'}`}>
      <div className="m-auto w-[900px] h-[700px] bg-zinc-100 rounded overflow-auto">
        <ToastContainer limit={1} autoClose={1500} />

        {/*//~ HEADER */}
        <div className='p-4 bg-blue-400'>
          <h2 className="text-2xl text-slate-100 tracking-wider uppercase font-bold ">Add Dentist</h2>
        </div>
        {/*//~ HEADER */}

        <form action="post" className='grid gap-3 p-4 border-t-2'>

          {/*//~ PERSONAL INFORMATION */}
          <div className='flex flex-col w-full pb-4 '>
            <h1 className='text-xl font-bold mb-6'>Personal Information</h1>
            <div className='flex gap-4'>

              {/*//~ NAME */}
              <div className='flex flex-col w-full'>
                <div className='flex flex-col gap-1'>
                  <label className='font-medium text-slate-600' htmlFor="fullname">Full Name</label>
                  <input type="text" name="fullname" id='fullname' value={dentistInfo.fullname} className={inputStyle} onChange={(e) => handleFormChange(e)} />
                </div>
              </div>
              {/*//~ NAME */}

              {/*//~ B-DAY GENDER */}
              <div className='flex flex-col w-full'>
                <div className='flex flex-col gap-1'>
                  <label className='font-medium text-slate-600' htmlFor="birthday">Birthday</label>
                  <input type="date" name="birthday" id='birthday' value={dentistInfo.birthday} className={inputStyle} onChange={(e) => handleFormChange(e)} />
                </div>
              </div>

              <div className='flex flex-col w-full'>
                <div className='flex flex-col gap-1'>
                  <label className='font-medium text-slate-600' htmlFor="gender">Gender</label>
                  <select name="gender" id='gender' value={dentistInfo.gender} className={inputStyle} onChange={(e) => handleFormChange(e)}>
                    <option value="" disabled>Select Gender</option>
                    <option value="male" >Male</option>
                    <option value="female">Female</option>
                    <option value="others">Other</option>
                  </select>
                </div>
              </div>
              {/*//~ B-DAY GENDER */}
            </div>
          </div>

          {/*//~ CONTACT INFORMATION */}
          <div className='flex flex-col w-full border-t-2 py-4'>
            <h1 className='text-xl font-bold mb-6'>Contact Information</h1>
            <div className='flex gap-4'>

              <div className='flex flex-col w-full'>
                <div className='flex flex-col gap-1'>
                  <label className='font-medium text-slate-600' htmlFor="address">Address</label>
                  <input type="text" id='address' name="address" value={dentistInfo.address} className={inputStyle} onChange={(e) => handleFormChange(e)} />
                </div>
              </div>
              <div className='flex flex-col w-full'>
                <div className='flex flex-col gap-1'>
                  <label className='font-medium text-slate-600' htmlFor="contactNumber">Contact Number</label>
                  <input type="text" id='contactNumber' name="contactNumber" maxLength={11} value={dentistInfo.contactNumber} className={inputStyle} onChange={(e) => handleFormChange(e)} />
                </div>
              </div>
              <div className='flex flex-col w-full'>
                <div className='flex flex-col gap-1'>
                  <label className='font-medium text-slate-600' htmlFor="email">Email</label>
                  <input type="email" id='email' name="email" value={dentistInfo.email} className={inputStyle} onChange={(e) => handleFormChange(e)} />
                </div>
              </div>
            </div>
          </div>
          {/*//~ CONTACT INFORMATION */}


          {/*//~ ACCOUNT INFORMATION */}
          <div className='flex flex-col w-full border-t-2 py-4'>
            <h1 className='text-xl font-bold mb-6'>Account Information</h1>
            <div className='flex gap-4'>
              <div className='flex flex-col w-full gap-1'>
                <label className='font-medium text-slate-600' htmlFor="username">Username</label>
                <input type="text" id='username' name="username" value={dentistInfo.username} className={inputStyle} onChange={(e) => handleFormChange(e)} />
              </div>
              <div className='flex flex-col w-full gap-1'>
                <label className='font-medium text-slate-600' htmlFor="password">Password</label>
                <input type="password" id='password' name="password" value={dentistInfo.password} className={inputStyle} onChange={(e) => handleFormChange(e)} />
              </div>
              <div className='flex flex-col w-full gap-1'>
                <label className='font-medium text-slate-600' htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" id='confirmPassword' name="confirmPassword" value={dentistInfo.confirmPassword} className={inputStyle} onChange={(e) => handleFormChange(e)} />
              </div>
            </div>
          </div>
          {/*//~ ACCOUNT INFORMATION */}

          {/*//~ ADDITIONAL INFORMATION */}
          <div className='flex flex-col w-full border-t-2 py-4'>
            <h1 className='text-xl font-bold mb-6'>Additional Information</h1>
            <div className='flex gap-4'>

              <div className='flex flex-col w-full gap-1'>
                <label className='font-medium text-slate-600' htmlFor="specialty">Doctor Specialty</label>
                <input type="text" id='specialty' name="specialty" value={dentistInfo.specialty} className={inputStyle} onChange={(e) => handleFormChange(e)} />
              </div>

              <div className="flex flex-col w-full gap-1">
                <label className="font-medium text-slate-600" htmlFor="file">Upload Profile</label>
                <input
                  type="file"
                  name="profile"
                  accept="image/*"
                  id="file"
                  className="text-sm p-2 border border-slate-300 bg-white focus:outline-none text-slate-500 font-medium rounded cursor-pointer file:hidden file:rounded-full file:border-0
              file:text-sm file:font-bold file:bg-blue-50 hover:file:bg-blue-100"
                  onChange={(e) => handleProfile(e)}
                />
              </div>
            </div>
          </div>
          {/*//~ ADDITIONAL INFORMATION */}
        </form>

        <div className='flex gap-2 p-4 justify-end border-t-2 mt-auto'>
          <button className='py-2 px-4 font-medium bg-red-500 text-white rounded hover:bg-red-700' onClick={() => setModal(false)}>Cancel</button>
          <button className='py-2 px-4 font-medium bg-blue-500 text-white rounded hover:bg-blue-700' onClick={btnSubmit}>Confirm</button>
        </div>
      </div >
    </div >
  )
}

export default DenstistModal