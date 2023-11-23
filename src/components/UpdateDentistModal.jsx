import React from 'react';
import { useDispatch } from 'react-redux';
import { updateDentist } from "../redux/action/DentistAction";
import { ToastContainer } from 'react-toastify';
import { toastHandler } from '../ToastHandler';

const inputStyle = "p-2 border focus:border-blue-400 rounded text-sm focus:outline-none";

function UpdateDentistModal({ show, setModal, setData, data }) {
  const dispatch = useDispatch();
  const handleFormChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const handleProfile = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = e => {
        setData({ ...data, profile: e.target.result });
      }
    }
  }

  const isOver18 = (dob) => {
    const birthday = new Date(dob);
    const ageDiff = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDiff);
    const age = Math.abs(ageDate.getUTCFullYear - 1970);
    return age < 18;
  }
  const btnSubmit = () => {
    if (!data.fullname || !data.birthday || !data.address || !data.gender || !data.contactNumber || !data.email || !data.specialty) {
      return alert("Fill up empty field!");
    }
    const isLegalAge = isOver18(data.birthday);
    if (isLegalAge) return alert("Invalid Age!");
    const regex = /^09\d{9}$/;
    if (!regex.test(data.contactNumber)) {
      return alert("Contact number must be 11-digit and must start with 09");
    }

    const newData = {
      fullname: data.fullname,
      birthday: data.birthday,
      address: data.address,
      gender: data.gender,
      contactNumber: data.contactNumber,
      email: data.email,
      specialty: data.specialty,
      profile: data.profile
    }
    dispatch(updateDentist(data.dentistId, newData,toastHandler,setModal));
  }

  return (
    <div className={`w-full min-h-screen bg-gray-900 bg-opacity-75 absolute left-0 -top-10 z-10 flex flex-grow justify-center items-center ${show ? '' : 'hidden'}`}>
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
                  <input type="text" name="fullname" id='fullname' value={data.fullname} className={inputStyle} onChange={(e) => handleFormChange(e)} />
                </div>
              </div>
              {/*//~ NAME */}

              {/*//~ B-DAY GENDER */}
              <div className='flex flex-col w-full'>
                <div className='flex flex-col gap-1'>
                  <label className='font-medium text-slate-600' htmlFor="birthday">Birthday</label>
                  <input type="date" name="birthday" id='birthday' value={data.birthday} className={inputStyle} onChange={(e) => handleFormChange(e)} />
                </div>
              </div>

              <div className='flex flex-col w-full'>
                <div className='flex flex-col gap-1'>
                  <label className='font-medium text-slate-600' htmlFor="gender">Gender</label>
                  <select name="gender" id='gender' value={data.gender} className={inputStyle} onChange={(e) => handleFormChange(e)}>
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
                  <input type="text" id='address' name="address" value={data.address} className={inputStyle} onChange={(e) => handleFormChange(e)} />
                </div>
              </div>
              <div className='flex flex-col w-full'>
                <div className='flex flex-col gap-1'>
                  <label className='font-medium text-slate-600' htmlFor="contactNumber">Contact Number</label>
                  <input type="text" id='contactNumber' name="contactNumber" maxLength={11} value={data.contactNumber} className={inputStyle} onChange={(e) => handleFormChange(e)} />
                </div>
              </div>
              <div className='flex flex-col w-full'>
                <div className='flex flex-col gap-1'>
                  <label className='font-medium text-slate-600' htmlFor="email">Email</label>
                  <input type="email" id='email' name="email" value={data.email} className={inputStyle} onChange={(e) => handleFormChange(e)} />
                </div>
              </div>
            </div>
          </div>
          {/*//~ CONTACT INFORMATION */}

          {/*//~ ADDITIONAL INFORMATION */}
          <div className='flex flex-col w-full border-y-2 py-4'>
            <h1 className='text-xl font-bold mb-6'>Additional Information</h1>
            <div className="flex w-full gap-1">
              <div className='flex flex-col gap-1'>
                <input type="file" name="profile" className='"text-sm p-2 border bg-white focus:outline-none text-slate-300 font-bold rounded cursor-pointer file:hidden file:rounded-full file:border-0
              file:text-sm file:font-bold file:bg-blue-50 hover:file:bg-blue-100' onChange={(e) => handleProfile(e)} />
              </div>
              <img src={data.profile} alt="Dentist" className=' w-52 h-52 ' />
            </div>
          </div>
          {/*//~ ADDITIONAL INFORMATION */}

        </form>

        <div className='flex gap-2 p-4 justify-end'>
          <button className='py-2 px-4 font-medium bg-red-500 text-white rounded hover:bg-red-700' onClick={() => setModal(false)}>Cancel</button>
          <button className='py-2 px-4 font-medium bg-blue-500 text-white rounded hover:bg-blue-700' onClick={btnSubmit}>Save Changes</button>
        </div>
      </div>
    </div>
  )
}

export default UpdateDentistModal;