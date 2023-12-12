import React from 'react';
import { useDispatch } from 'react-redux';
import { updatePatient } from "../redux/action/PatientAction";
import { updateAdmin } from "../redux/action/AdminAction";
import { toastHandler } from '../ToastHandler';
import { ToastContainer } from 'react-toastify';

const inputStyle = "p-2 border focus:border-blue-400 rounded text-sm focus:outline-none";

function UpdateAdminModal({ show, setModal, setAdminInfo, adminInfo, type }) {

  const dispatch = useDispatch();
  const handleFormChange = (e) => {
    setAdminInfo({
      ...adminInfo,
      [e.target.name]: e.target.value
    })
  }

  const handleProfile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    if (file) {
      const fileExtension = file.name.split('.').pop().toLowerCase();
      const acceptedFormats = ['jpeg', 'jpg', 'png', 'gif', 'bmp'];
      if (acceptedFormats.includes(fileExtension)) {
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = e => {
          setAdminInfo({ ...adminInfo, profile: e.target.result });
        }
      } else {
        toastHandler("error", 'Invalid file format. Please provide an image file.');
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
  const btnSubmit =() => {
      if (
        !adminInfo.firstname ||
        !adminInfo.lastname ||
        !adminInfo.birthday ||
        !adminInfo.address ||
        !adminInfo.gender ||
        !adminInfo.contactNumber ||
        !adminInfo.email
      ) {
        return toastHandler("error", "Fill up empty field!");
      }
      if (adminInfo.password !== adminInfo.confirmPassword) {
        return toastHandler("error", "Mismatch password and confirmpassword");
      }
      const isLegalAge = isOver18(adminInfo.birthday);
      if (isLegalAge) return toastHandler("error", "Invalid Age!");

      const regex = /^09\d{9}$/;
      if (!regex.test(adminInfo.contactNumber)) {
        return toastHandler("error", "Contact number must be 11-digit and must start with 09");
      }

      const data = {
        firstname: adminInfo.firstname,
        middlename: adminInfo.middlename,
        lastname: adminInfo.lastname,
        address: adminInfo.address,
        birthday: adminInfo.birthday,
        email: adminInfo.email,
        gender: adminInfo.gender,
        contactNumber: adminInfo.contactNumber,
        profile: adminInfo.profile,
      };

      if (type === "patient") {
        dispatch(updatePatient(adminInfo.userId, data, toastHandler, setModal));
      } else {
        dispatch(updateAdmin(adminInfo.userId, data,toastHandler,setModal));
      }
  };

  return (
    <div className={`w-screen min-h-screen bg-gray-900 bg-opacity-75 fixed inset-0 z-50 flex flex-grow justify-center items-center ${show ? '' : 'hidden'}`}>
      <div className="m-auto w-[900px] h-[700px] bg-zinc-100 rounded overflow-auto">
        <ToastContainer limit={1} autoClose={1500} />

        {/*//~ HEADER */}
        <div className='p-4 bg-blue-400'>
          <h2 className="text-2xl text-slate-100 tracking-wider uppercase font-bold ">{`Update ${type}`}</h2>
        </div>
        {/*//~ HEADER */}


        <form action="post" className='grid gap-3 p-4 border-t-2'>

          {/*//~ PERSONAL INFORMATION */}
          <div className='flex flex-col w-full pb-4'>
            <h1 className='text-xl font-bold mb-6'>Personal Information</h1>
            <div className='flex flex-col gap-4'>

              {/*//~ NAME */}
              <div className='flex gap-4'>
                <div className='flex flex-col w-full gap-1'>
                  <label className='font-medium text-slate-600' htmlFor="firstname">First name</label>
                  <input type="text" id='firstname' name="firstname" value={adminInfo.firstname} className={`${inputStyle}`} onChange={(e) => handleFormChange(e)} />
                </div>
                <div className='flex flex-col w-full gap-1'>
                  <label className='font-medium text-slate-600' htmlFor="middlename">Middle name</label>
                  <input type="text" id='middlename' name="middlename" value={adminInfo.middlename} className={`${inputStyle}`} onChange={(e) => handleFormChange(e)} />
                </div>
                <div className='flex flex-col w-full gap-1'>
                  <label className='font-medium text-slate-600' htmlFor="lastname">Last name</label>
                  <input type="text" id='lastname' name="lastname" value={adminInfo.lastname} className={`${inputStyle}`} onChange={(e) => handleFormChange(e)} />
                </div>
              </div>
              {/*//~ NAME */}

              {/*//~ B-DAY GENDER */}
              <div className='flex gap-4'>
                <div className='flex flex-col w-[32%] gap-1'>
                  <label className='font-medium text-slate-600' htmlFor="birthday">Birthday</label>
                  <input type="date" id='birthday' name="birthday" max={(new Date(Date.now() + 86400000)).toISOString().split('T')[0]} value={adminInfo.birthday} className={`${inputStyle}`} onChange={(e) => handleFormChange(e)} />
                </div>
                <div className='flex flex-col w-[32%] gap-1'>
                  <label className='font-medium text-slate-600' htmlFor="gender">Gender</label>
                  <select name="gender" id='gender' value={adminInfo.gender} className={`${inputStyle} `} onChange={(e) => handleFormChange(e)}>
                    <option value="" hidden >Choose...</option>
                    <option value="male" >Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                  </select>
                </div>
              </div>
              {/*//~ B-DAY GENDER */}
            </div>
          </div>
          {/*//~ PERSONAL INFORMATION */}

          {/*//~ CONTACT INFORMATION */}
          <div className='flex flex-col w-full border-t-2 py-4'>
            <h1 className='text-xl font-bold mb-6'>Contact Information</h1>
            <div className='flex gap-4'>
              <div className='flex flex-col w-full gap-1'>
                <label className='font-medium text-slate-600' htmlFor="address">Address</label>
                <input type="text" id='address' name="address" value={adminInfo.address} className={`${inputStyle}`} onChange={(e) => handleFormChange(e)} />
              </div>
              <div className='flex flex-col w-full gap-1'>
                <label className='font-medium text-slate-600' htmlFor="contactNumber">Contact Number</label>
                <input type="text" id='contactNumber' name="contactNumber" maxLength={11} value={adminInfo.contactNumber} className={`${inputStyle}`} onChange={(e) => handleFormChange(e)} />
              </div>
              <div className='flex flex-col w-full gap-1'>
                <label className='font-medium text-slate-600' htmlFor="email">Email</label>
                <input type="email" id='email' name="email" value={adminInfo.email} className={`${inputStyle}`} onChange={(e) => handleFormChange(e)} />
              </div>
            </div>
          </div>
          {/*//~ CONTACT INFORMATION */}

          {/*//~ ADDITIONAL INFORMATION */}
          <div className='flex flex-col w-full border-y-2 py-4'>
            <h1 className='text-xl font-bold mb-6'>Additional Information</h1>
            <div className="flex w-full gap-1">
              <div className='flex flex-col gap-1'>
                <label className="font-medium text-slate-600" htmlFor="file">Upload</label>
                <input type="file" name="profile" accept="image/*" id="file"
                  className="text-sm p-2 border bg-white focus:outline-none text-slate-300 font-bold rounded cursor-pointer file:hidden file:rounded-full file:border-0
              file:text-sm file:font-bold file:bg-blue-50 hover:file:bg-blue-100"
                  onChange={(e) => handleProfile(e)}
                />
              </div>
              <img src={adminInfo.profile} alt="Dentist" className=' w-52 h-52 ' />
            </div>
          </div>
          {/*//~ ADDITIONAL INFORMATION */}

        </form>

        <div className='flex gap-2 p-4 justify-end'>
          <button className='py-2 px-4 font-medium bg-gray-300 text-gray-700 rounded hover:bg-gray-400' onClick={() => setModal(false)}>Cancel</button>
          <button className='py-2 px-4 font-medium bg-blue-500 text-white rounded hover:bg-blue-700' onClick={btnSubmit}>Save Changes</button>
        </div>
      </div>
    </div>
  )
}

export default React.memo(UpdateAdminModal)