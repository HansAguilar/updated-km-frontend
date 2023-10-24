import React, { useState } from 'react';
import { IoAddSharp, IoRemoveOutline } from 'react-icons/io5';
import { createPatient } from '../redux/action/PatientAction';
import { createAdmin } from '../redux/action/AdminAction';
import { useDispatch } from 'react-redux';
import { toastHandler } from '../ToastHandler';
import { ToastContainer } from 'react-toastify';

const inputStyle = "p-2 border border-slate-300 focus:border-blue-600 rounded text-sm focus:outline-none";

function AdminModal({ show, setModal, type }) {
  const dispatch = useDispatch();
  const [adminInfo, setAdminInfo] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    birthday: "",
    address: "",
    gender: "",
    contactNumber: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    haveInsurance: "no"
  });

  const [profile, setProfile] = useState("");
  const [numberOfComponents, setNumberOfComponents] = useState(1);
  const [insuranceInfo, setInsuranceInfo] = useState([{ card: "", cardNumber: "", company: "" }]);

  const handleInsuranceChange = (e, index) => {
    const { name, value } = e.target;
    const updatedInsurance = [...insuranceInfo];
    updatedInsurance[index] = { ...updatedInsurance[index], [name]: value };
    setInsuranceInfo(updatedInsurance);
  };

  const handleFormChange = (e) => {
    if (e.target.name === "haveInsurance" && e.target.value === "no") {
      setInsuranceInfo([{ card: "", cardNumber: "", company: "" }]);
      setNumberOfComponents(1);
    }
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
          setProfile(e.target.result);
        }
      }
      else {
        toastHandler("error", 'Invalid file format. Please provide an image file.');
      }
    }
  }

  const submitData = async (data) => {
    if (type === "patient") {
      dispatch(createPatient(data, setModal, setAdminInfo, setProfile));
    } else {
      dispatch(createAdmin(data, setModal, setAdminInfo, setProfile));
    }
  }

  const isOver18 = (dob) => {
    const birthday = new Date(dob);
    const ageDiff = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDiff);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);
    return age >= 18;
  }

  const btnSubmit = () => {
    adminInfo.password = adminInfo.password.replace(/\s+/g, '');
    adminInfo.confirmPassword = adminInfo.confirmPassword.replace(/\s+/g, '');

    const haveGhostAndEmojisChar = /^(?!.*[\u200B-\u200D\uFEFF]).{8,}$/;
    const isLegalAge = isOver18(adminInfo.birthday);
    const contactClean = /^09\d{9}$/;
    let data = {};

    if (!adminInfo.firstname || !adminInfo.lastname || !adminInfo.birthday || !adminInfo.address || !adminInfo.gender || !adminInfo.contactNumber || !adminInfo.email || !adminInfo.username || !profile) {
      return toastHandler("error", "Fill up empty field!");
    }

    else if (!haveGhostAndEmojisChar.test(adminInfo.password) || !haveGhostAndEmojisChar.test(adminInfo.confirmPassword)) return toastHandler("error", "Password must be at least 8 characters long")

    else if (/[^\w\s]/.test(adminInfo.firstname)) return toastHandler("error", "Invalid first name format");

    else if (adminInfo.middlename && /[^\w\s]/.test(adminInfo.middlename)) return toastHandler("error", "Invalid middle name format");

    else if (/[^\w\s]/.test(adminInfo.lastname)) return toastHandler("error", "Invalid last name format");

    else if (adminInfo.password.replace(/\s+/g, '') !== adminInfo.confirmPassword.replace(/\s+/g, '')) return toastHandler("error", "Passwords do not match");

    else if (!isLegalAge && type != "patient" ) return toastHandler("error", "Must be 18 or older");

    else if (!contactClean.test(adminInfo.contactNumber)) return toastHandler("error", "Please enter an 11-digit number starting with 09");

    if (type === "patient") {
      data = { ...adminInfo, insuranceInfo, profile };
      submitData(data);
    } else {
      data = { ...adminInfo, profile };
      submitData(data);
    }
  }

  return (
    <div className={`w-full h-screen bg-gray-900 bg-opacity-75 absolute -top-10 left-0 z-10 flex flex-grow justify-center items-center ${show ? '' : 'hidden'}`}>
      <div className="m-auto w-[900px] h-[700px] bg-zinc-100 rounded overflow-auto">
        <ToastContainer limit={1} autoClose={1500} />

        {/*//~ HEADER */}
        <div className='p-4 bg-blue-400'>
          <h2 className="text-2xl text-slate-100 tracking-wider uppercase font-bold ">{`Add ${type}`}</h2>
        </div>
        {/*//~ HEADER */}

        <form action="post" className='grid gap-3 p-4 border-t-2' >

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


          {/*//~ ACCOUNT INFORMATION */}
          <div className='flex flex-col w-full border-t-2 py-4'>
            <h1 className='text-xl font-bold mb-6'>Account Information <span className='text-sm font-normal italic text-gray-400'>(Password must be atleast 8 characters)</span> </h1>
            <div className='flex gap-4'>
              <div className='flex flex-col w-full gap-1'>
                <label className='font-medium text-slate-600' htmlFor="username">Username</label>
                <input type="text" id='username' name="username" value={adminInfo.username} className={`${inputStyle}`} onChange={(e) => handleFormChange(e)} />
              </div>
              <div className='flex flex-col w-full gap-1'>
                <label className='font-medium text-slate-600' htmlFor="password">Password</label>
                <input type="password" id='password' name="password" value={adminInfo.password} className={`${inputStyle}`} onChange={(e) => handleFormChange(e)} />
              </div>
              <div className='flex flex-col w-full gap-1'>
                <label className='font-medium text-slate-600' htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" id='confirmPassword' name="confirmPassword" value={adminInfo.confirmPassword} className={`${inputStyle}`} onChange={(e) => handleFormChange(e)} />
              </div>
            </div>
          </div>
          {/*//~ ACCOUNT INFORMATION */}


          {/*//~ ADDITIONAL INFORMATION */}
          <div className='flex flex-col w-full border-y-2 py-4'>
            <h1 className='text-xl font-bold mb-6'>Additional Information</h1>
            <div className='flex gap-4'>
              <div className="flex flex-col w-full gap-1">
                <label className="font-medium text-slate-600" htmlFor="file">Upload</label>
                <input
                  type="file"
                  name="profile"
                  accept="image/*"
                  id="file"
                  className="text-sm p-2 border border-slate-300 bg-white focus:outline-none text-slate-300 font-bold rounded cursor-pointer file:hidden file:rounded-full file:border-0
              file:text-sm file:font-bold file:bg-blue-50 hover:file:bg-blue-100"
                  onChange={(e) => handleProfile(e)}
                />
              </div>
              <div className='flex flex-col gap-2 w-full'>
                {
                  type !== "patient" ? " " :
                    <div className='flex flex-col gap-1'>
                      <label className='font-medium text-slate-600' htmlFor='haveInsurance'>Do you have HMO? </label>
                      <select name="haveInsurance" id='haveInsurance' value={adminInfo.haveInsurance} className={`${inputStyle}`} onChange={(e) => handleFormChange(e)}>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                }
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4 mt-4'>
              {[...Array(numberOfComponents)].map((_, index) => (
                <div key={index}>
                  {adminInfo.haveInsurance === "yes" ? (
                    <>
                      <div className='flex flex-col border border-slate-300 p-4 rounded gap-2'>
                        <div className=' w-full flex justify-end gap-2'>
                          <button onClick={(e) => {
                            e.preventDefault();
                            setNumberOfComponents(numberOfComponents + 1);
                            setInsuranceInfo([...insuranceInfo, { card: "", cardNumber: "", company: "" }]);
                          }}
                            className=' p-1 bg-blue-500 rounded-full text-white '
                          ><IoAddSharp size={20} /></button>

                          <button
                            className={` p-1 ${numberOfComponents === 1 ? 'bg-slate-500' : 'bg-red-500'} rounded-full text-white`}
                            onClick={(e) => {
                              e.preventDefault();
                              if (numberOfComponents === 1) {
                                return toastHandler("warning", "You can't remove input field");
                              }
                              const updatedList = insuranceInfo;
                              updatedList.splice(index, 1);
                              setInsuranceInfo([...updatedList]);
                              setNumberOfComponents(numberOfComponents - 1);
                            }}
                          ><IoRemoveOutline size={20} /></button>
                        </div>

                        <div className='flex flex-col gap-2'>
                          <label className='font-medium text-slate-600' htmlFor="card">HMO Card</label>
                          <select name="card" id='card' value={insuranceInfo[index].card} className={`${inputStyle}`} onChange={(e) => handleInsuranceChange(e, index)}>
                            <option value="" disabled>Select Insurance Card...</option>
                            <option value="Cocolife Health Care">Cocolife Health Care</option>
                            <option value="Inlife Insular Health Care">Inlife Insular Health Care</option>
                            <option value="Health Partners Dental Access, Inc.">Health Partners Dental Access, Inc.</option>
                            <option value="Maxicare">Maxicare</option>
                            <option value="eTiQa">eTiQa</option>
                            <option value="PhilCare">PhilCare</option>
                            <option value="Health Maintenance, Inc.">Health Maintenance, Inc.</option>
                            <option value="Generali">Generali</option>
                            <option value="Health Access">Health Access</option>
                          </select>
                        </div>
                        <div className='flex flex-col gap-2'>
                          <label className='font-medium text-slate-600' htmlFor="cardNumber">HMO Card Number</label>
                          <input type="text" id='cardNumber' name="cardNumber" value={insuranceInfo[index].cardNumber} className={`${inputStyle}`} onChange={(e) => handleInsuranceChange(e, index)} />
                        </div>
                        <div className='flex flex-col gap-2'>
                          <label className='font-medium text-slate-600' htmlFor="company">Company <span className='italic text-red-200'>(if none please type N/A)</span></label>
                          <input type="text" id='company' name="company" value={insuranceInfo[index].company} className={`${inputStyle}`} onChange={(e) => handleInsuranceChange(e, index)} />
                        </div>
                      </div>
                    </>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
          {/*//~ ADDITIONAL INFORMATION */}
        </form>

        <div className='flex gap-2 p-4 justify-end'>
          <button className='py-2 px-4 font-medium bg-red-500 text-white rounded hover:bg-red-700' onClick={() => setModal(false)}>Cancel</button>
          <button className='py-2 px-4 font-medium bg-blue-500 text-white rounded hover:bg-blue-700' onClick={btnSubmit}>Confirm</button>
        </div>
      </div>
    </div>
  )
}
export default AdminModal;