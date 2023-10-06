import React, { useState } from 'react';
import { IoAddSharp, IoRemoveOutline } from 'react-icons/io5';
import { createPatient } from '../redux/action/PatientAction';
import { createAdmin } from '../redux/action/AdminAction';
import { useDispatch } from 'react-redux';
import { toastHandler } from '../ToastHandler';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inputStyle = "p-2 border border-slate-300 focus:border-blue-400  rounded text-sm focus:outline-none";

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
      } else {
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
    console.log("age: " + age);
    return age >= 18;
  }

  const btnSubmit = () => {
    adminInfo.password = adminInfo.password.replace(/\s+/g, '');
    adminInfo.confirmPassword = adminInfo.confirmPassword.replace(/\s+/g, '');
    console.log(adminInfo);

    if (!adminInfo.firstname || !adminInfo.lastname || !adminInfo.birthday || !adminInfo.address || !adminInfo.gender || !adminInfo.contactNumber || !adminInfo.email || !adminInfo.username || !profile) {
      return toastHandler("error", "Fill up empty field!");
    }

    const haveGhostAndEmojisChar = /^(?!.*[\u200B-\u200D\uFEFF]).{8,}$/;
    if (!haveGhostAndEmojisChar.test(adminInfo.password) || !haveGhostAndEmojisChar.test(adminInfo.confirmPassword)) {
      return toastHandler("error", "Password must be at least 8 characters long")
    }

    if (/[^\w\s]/.test(adminInfo.firstname)) {
      return toastHandler("error", "Invalid first name format");
    }

    if (adminInfo.middlename && /[^\w\s]/.test(adminInfo.middlename)) {
      return toastHandler("error", "Invalid middle name format");
    }

    if (/[^\w\s]/.test(adminInfo.lastname)) {
      return toastHandler("error", "Invalid last name format");
    }

    if (adminInfo.password.replace(/\s+/g, '') !== adminInfo.confirmPassword.replace(/\s+/g, '')) {
      return toastHandler("error", "Passwords do not match");
    }

    const isLegalAge = isOver18(adminInfo.birthday);
    console.log(isLegalAge);
    if (!isLegalAge) return toastHandler("error", "Must be 18 or older");

    const regex = /^09\d{9}$/;
    if (!regex.test(adminInfo.contactNumber)) {
      return toastHandler("error", "Please enter an 11-digit number starting with 09");
    }
    let data = {};
    if (type === "patient") {
      data = { ...adminInfo, insuranceInfo, profile };
      submitData(data);
    } else {
      data = { ...adminInfo, profile };
      submitData(data);
    }
  }

  return (
    <div className={` w-full h-screen bg-gray-900 bg-opacity-75 absolute -top-10 z-40 flex flex-grow justify-center items-center ${show ? '' : 'hidden'}`}>
      <ToastContainer limit={1} />
      <div className=" z-50">
        <div className="m-auto w-[550px] h-[700px] overflow-auto p-8 bg-white rounded scroll-m-24 ">
          <div className="text-left py-4">
            <h2 className="text-2xl font-semibold capitalize mb-2">{`Add ${type}`}</h2>
            <hr />
          </div>

          <form action="post" className='grid grid-cols-2 gap-3 ' >
            <div className='flex flex-col'>
              <label className='text-[#5f6061]' htmlFor="firstname">First name</label>
              <input type="text" id='firstname' name="firstname" value={adminInfo.firstname} placeholder='ex. John' className={`${inputStyle}`} onChange={(e) => handleFormChange(e)} />
            </div>
            <div className='flex flex-col'>
              <label className='text-[#5f6061]' htmlFor="middlename">Middle name</label>
              <input type="text" id='middlename' name="middlename" value={adminInfo.middlename} placeholder='ex. Cruz' className={`${inputStyle}`} onChange={(e) => handleFormChange(e)} />
            </div>
            <div className='flex flex-col'>
              <label className='text-[#5f6061]' htmlFor="lastname">Last name</label>
              <input type="text" id='lastname' name="lastname" value={adminInfo.lastname} placeholder='ex. Dimaguiba' className={`${inputStyle}`} onChange={(e) => handleFormChange(e)} />
            </div>
            <div className='flex flex-col'>
              <label className='text-[#5f6061]' htmlFor="birthday">Birthday</label>
              <input type="date" id='birthday' name="birthday" max={(new Date(Date.now() + 86400000)).toISOString().split('T')[0]} value={adminInfo.birthday} className={`${inputStyle}`} onChange={(e) => handleFormChange(e)} />
            </div>
            <div className='flex flex-col'>
              <label className='text-[#5f6061]' htmlFor="address">Address</label>
              <input type="text" id='address' name="address" value={adminInfo.address} placeholder='ex. 123 Sesame St., Malabon City' className={`${inputStyle}`} onChange={(e) => handleFormChange(e)} />
            </div>
            <div className='flex flex-col'>
              <label className='text-[#5f6061]' htmlFor="gender">Gender</label>
              <select name="gender" id='gender' value={adminInfo.gender} className={`${inputStyle} accent-blue-400`} onChange={(e) => handleFormChange(e)}>
                <option value="" hidden >Choose...</option>
                <option value="male" >Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </div>
            <div className='flex flex-col'>
              <label className='text-[#5f6061]' htmlFor="contactNumber">Contact Number</label>
              <input type="text" id='contactNumber' name="contactNumber" maxLength={11} value={adminInfo.contactNumber} placeholder='ex. 09123456780' className={`${inputStyle}`} onChange={(e) => handleFormChange(e)} />
            </div>
            <div className='flex flex-col'>
              <label className='text-[#5f6061]' htmlFor="email">Email</label>
              <input type="email" id='email' name="email" value={adminInfo.email} className={`${inputStyle}`} placeholder='ex. john@email.com' onChange={(e) => handleFormChange(e)} />
            </div>
            <div className='flex flex-col'>
              <label className='text-[#5f6061]' htmlFor="username">Username</label>
              <input type="text" id='username' name="username" value={adminInfo.username} className={`${inputStyle}`} onChange={(e) => handleFormChange(e)} />
            </div>
            <div className='flex flex-col'>
              <label className='text-[#5f6061]' htmlFor="password">Password</label>
              <input type="password" id='password' name="password" value={adminInfo.password} className={`${inputStyle}`} onChange={(e) => handleFormChange(e)} />
            </div>
            <div className='flex flex-col'>
              <label className='text-[#5f6061]' htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" id='confirmPassword' name="confirmPassword" value={adminInfo.confirmPassword} className={`${inputStyle}`} onChange={(e) => handleFormChange(e)} />
            </div>

            {
              type !== "patient" ? " " :
                <div className='flex flex-col'>
                  <label className='text-[#5f6061]' htmlFor='haveInsurance'>Do you have HMO? </label>
                  <select name="haveInsurance" id='haveInsurance' value={adminInfo.haveInsurance} className={`${inputStyle}`} onChange={(e) => handleFormChange(e)}>
                    <option value="yes">Yes</option>
                    <option value="no" >No</option>
                  </select>
                </div>
            }
            {[...Array(numberOfComponents)].map((_, index) => (
              <div key={index}>
                {adminInfo.haveInsurance === "yes" ? (
                  <>
                    <div className='flex flex-col'>

                      <div className=' w-full flex justify-end gap-1 '>
                        <button onClick={(e) => {
                          e.preventDefault();
                          setNumberOfComponents(numberOfComponents + 1);
                          setInsuranceInfo([...insuranceInfo, { card: "", cardNumber: "", company: "" }]);
                        }}
                          className=' p-1 bg-cyan-500 rounded-full text-white hover:shadow-2xl '
                        ><IoAddSharp size={15} /></button>

                        <button
                          className={` p-1 ${numberOfComponents === 1 ? 'bg-slate-500' : 'bg-red-500'} rounded-full text-white hover:shadow-2xl`}
                          onClick={(e) => {
                            e.preventDefault();
                            if (numberOfComponents === 1) {
                              return alert("You can't remove input field");
                            }
                            const updatedList = insuranceInfo;
                            updatedList.splice(index, 1);
                            setInsuranceInfo([...updatedList]);
                            setNumberOfComponents(numberOfComponents - 1);
                          }}
                        ><IoRemoveOutline size={15} /></button>
                      </div>

                      <label className='text-[#5f6061]' htmlFor="card">HMO Card</label>
                      <select name="card" value={insuranceInfo[index].card} className={`${inputStyle}`} onChange={(e) => handleInsuranceChange(e, index)}>
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
                    <div className='flex flex-col'>
                      <label className='text-[#5f6061]' htmlFor="cardNumber">HMO Card Number</label>
                      <input type="text" name="cardNumber" value={insuranceInfo[index].cardNumber} className={`${inputStyle}`} onChange={(e) => handleInsuranceChange(e, index)} />
                    </div>
                    <div className='flex flex-col'>
                      <label className='text-[#5f6061]' htmlFor="company">Company <span className=' text-xs '>(if none please type N/A)</span></label>
                      <input type="text" name="company" value={insuranceInfo[index].company} className={`${inputStyle}`} onChange={(e) => handleInsuranceChange(e, index)} />
                    </div>
                  </>
                ) : null}
              </div>
            ))}

          </form>
          <div className="flex flex-col mt-3">
            <label className="text-[#5f6061]" htmlFor="file">
              Upload
            </label>
            <input
              type="file"
              name="profile"
              accept="image/*"
              className="text-sm p-2 focus:outline-none bg-blue-400 hover:bg-blue-500 text-white font-semibold rounded cursor-pointer file:rounded-full file:border-0
              file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-500 hover:file:bg-blue-100"
              onChange={(e) => handleProfile(e)}
            />
          </div>

          <hr />
          <div className='mt-3 flex justify-end gap-2'>
            <button className='px-10 py-2 bg-red-400 text-white rounded hover:bg-red-500' onClick={() => setModal(false)}>Close</button>
            <button className='px-10 py-2 bg-blue-400 text-white rounded hover:bg-blue-500' onClick={btnSubmit} >Save</button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default AdminModal;