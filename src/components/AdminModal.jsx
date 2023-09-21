import React,{useState} from 'react';
import { IoAddSharp, IoRemoveOutline} from 'react-icons/io5';
import { createPatient } from '../redux/action/PatientAction';
import { useDispatch } from 'react-redux';
import { toastHandler } from '../ToastHandler';

function AdminModal({show, setModal, type}) {
    const dispatch = useDispatch();
    const [ adminInfo, setAdminInfo ] = useState({
      firstname:"",
      middlename:"",
      lastname:"",
      birthday:"",
      address:"",
      gender:"",
      contactNumber:"",
      email:"",
      username:"",
      password:"",
      confirmPassword:"",
      haveInsurance: "no"
    });

    const [profile, setProfile] = useState("");
    const [numberOfComponents, setNumberOfComponents] = useState(1);
    const [insuranceInfo, setInsuranceInfo] = useState([{card: "", cardNumber: "", company: ""}]);

    const handleInsuranceChange = (e, index) => {
      const { name, value } = e.target;
      const updatedInsurance = [...insuranceInfo];
      updatedInsurance[index] = {...updatedInsurance[index], [name]: value};
      setInsuranceInfo(updatedInsurance);
    };
  
    const handleFormChange = (e) =>{
      if(e.target.name === "haveInsurance" && e.target.value === "no"){
        setInsuranceInfo([{card: "", cardNumber: "", company: ""}]);
        setNumberOfComponents(1);
      }
      setAdminInfo({
        ...adminInfo,
        [e.target.name]: e.target.value
      })
      
    }

    const handleProfile = (e) =>{
      const file = e.target.files[0];
      const reader = new FileReader();
      if(file){
        const fileExtension = file.name.split('.').pop().toLowerCase();
        const acceptedFormats = ['jpeg', 'jpg', 'png', 'gif', 'bmp'];
        if (acceptedFormats.includes(fileExtension)) {
          reader.readAsDataURL(e.target.files[0]);
          reader.onload = e =>{
            setProfile(e.target.result);
          }
        } else {
          toastHandler("error",'Invalid file format. Please provide an image file.');
        }
      }
    }
  
    const submitData = async(data) =>{
      if(type==="patient"){
        dispatch(createPatient(data,setModal,setAdminInfo,setProfile));
      }else{
        console.log("");
      }
    }
    const isOver18 = (dob) =>{
      const birthday = new Date(dob);
      const ageDiff = Date.now() - birthday.getTime();
      const ageDate = new Date(ageDiff);
      const age = Math.abs(ageDate.getUTCFullYear-1970);
      return age < 18;
    }
    const btnSubmit = () =>{
      if(!adminInfo.firstname ||!adminInfo.lastname || !adminInfo.birthday || !adminInfo.address || !adminInfo.gender || !adminInfo.contactNumber || !adminInfo.email || !adminInfo.username || !adminInfo.password || !adminInfo.confirmPassword || !profile){
        return toastHandler("error","Fill up empty field!");
      }
      
      if (/[^\w\s]/.test(adminInfo.firstname)) {
        return toastHandler("error", "Invalid characters for firstname");
      }
      if (adminInfo.middlename && /[^\w\s]/.test(adminInfo.middlename)) {
          return toastHandler("error", "Invalid number and special characters for middlename");
      }
      
      if (/[^\w\s]/.test(adminInfo.lastname)) {
          return toastHandler("error", "Invalid number and special characters for lastname");
      }
      
      // if((type === "patient" && adminInfo.haveInsurance === "yes" )&& (!insurance.card || !insurance.cardNumber || !insurance.company)){
      //   return alert("Fill up empty field!");
      // }
      if(adminInfo.password !== adminInfo.confirmPassword ){
        return toastHandler("error","Mismatch password and confirmpassword");
      }
      const isLegalAge = isOver18(adminInfo.birthday);
      if(isLegalAge) return toastHandler("error","Invalid Age!");

      const regex = /^09\d{9}$/;
      if(!regex.test(adminInfo.contactNumber)){
        return toastHandler("error","Contact number must be 11-digit and must start with 09");
      }
      let data = { };
      if(type === "patient"){
        data = { ...adminInfo, insuranceInfo,  profile};
        submitData(data);
      }else{ 
      data = { ...adminInfo, profile };
      submitData(data);
     }
      
    }
  
    return (
      <div className={` w-full h-screen bg-gray-900 bg-opacity-75 absolute top-0 z-40 flex flex-grow justify-center items-center ${show ? '': 'hidden'}`}>
          <div className=" z-50">
            <div className="m-auto w-[550px] h-[700px] overflow-auto p-8 bg-white rounded-lg shadow-lg">
              <div className="text-left py-4">
                <h2 className="text-xl font-bold capitalize mb-2">{`Add ${type}`}</h2>
                <hr />
              </div>
  
              <form action="post" className='grid grid-cols-2 gap-3 ' >
                <div className='flex flex-col'>
                  <label htmlFor="firstname">Firstname</label>
                  <input type="text" name="firstname" value={adminInfo.firstname} placeholder='ex. John' className=' px-4 py-2 text-sm focus:outline-none focus:shadow-md border ' onChange={(e)=>handleFormChange(e)} />
                </div>
                <div className='flex flex-col'>
                  <label htmlFor="middlename">Middlename</label>
                  <input type="text" name="middlename" value={adminInfo.middlename} placeholder='ex. Cruz' className=' px-4 py-2 text-sm focus:outline-none focus:shadow-md border ' onChange={(e)=>handleFormChange(e)} />
                </div>
                <div className='flex flex-col'>
                  <label htmlFor="lastname">Lastname</label>
                  <input type="text" name="lastname" value={adminInfo.lastname} placeholder='ex. Dimaguiba' className=' px-4 py-2 text-sm focus:outline-none focus:shadow-md border ' onChange={(e)=>handleFormChange(e)} />
                </div>
                <div className='flex flex-col'>
                  <label htmlFor="birthday">Birthday</label>
                  <input type="date" name="birthday" value={adminInfo.birthday} className=' px-4 py-2 text-sm focus:outline-none focus:shadow-md border ' onChange={(e)=>handleFormChange(e)}/>
                </div>
                <div className='flex flex-col'>
                  <label htmlFor="address">Address</label>
                  <input type="text" name="address" value={adminInfo.address} placeholder='ex. 123 Sesame St., Malabon City' className=' px-4 py-2 text-sm  focus:outline-none focus:shadow-md border ' onChange={(e)=>handleFormChange(e)}/>
                </div>
                <div className='flex flex-col'>
                  <label htmlFor="gender">Gender</label>
                  <select name="gender" value={adminInfo.gender} id="" className='px-4 py-2 text-sm focus:outline-none focus:shadow-md border' onChange={(e)=>handleFormChange(e)}>
                    <option value="" hidden >Choose...</option>
                    <option value="male" >Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div className='flex flex-col'>
                  <label htmlFor="contactNumber">Contact Number</label>
                  <input type="text" name="contactNumber" value={adminInfo.contactNumber} placeholder='ex. 09123456780' className=' px-4 py-2 text-sm focus:outline-none focus:shadow-md border ' onChange={(e)=>handleFormChange(e)}/>
                </div>
                <div className='flex flex-col'>
                  <label htmlFor="email">Email</label>
                  <input type="email" name="email" value={adminInfo.email} className=' text-sm px-4 py-2 focus:outline-none focus:shadow-md border ' placeholder='ex. john@email.com' onChange={(e)=>handleFormChange(e)}/>
                </div>
                <div className='flex flex-col'>
                  <label htmlFor="username">Username</label>
                  <input type="text" name="username" value={adminInfo.username} className=' text-sm px-4 py-2 focus:outline-none focus:shadow-md border ' onChange={(e)=>handleFormChange(e)}/>
                </div>
                <div className='flex flex-col'>
                  <label htmlFor="password">Password</label>
                  <input type="password" name="password" value={adminInfo.password} className=' px-4 py-2 text-sm focus:outline-none focus:shadow-md border ' onChange={(e)=>handleFormChange(e)}/>
                </div>
                <div className='flex flex-col'>
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input type="password" name="confirmPassword" value={adminInfo.confirmPassword} className=' text-sm px-4 py-2 focus:outline-none focus:shadow-md border ' onChange={(e)=>handleFormChange(e)}/>
                </div>
                
                  {
                    type !== "patient" ? " ":
                    <div className='flex flex-col'>
                      <label htmlFor='haveInsurance'>Do you have HMO? </label>
                      <select name="haveInsurance" value={adminInfo.haveInsurance} className='px-4 py-2 text-sm focus:outline-none focus:shadow-md border' onChange={(e)=>handleFormChange(e)}>
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
                            <button onClick={(e) =>{
                            e.preventDefault();
                            setNumberOfComponents(numberOfComponents + 1);
                            setInsuranceInfo([...insuranceInfo, {card: "", cardNumber: "", company: ""}]);}}
                            className=' p-1 bg-cyan-500 rounded-full text-white hover:shadow-2xl '
                            ><IoAddSharp size={15} /></button>

                            <button 
                            className=' p-1 bg-red-500 rounded-full text-white hover:shadow-2xl'
                            onClick={(e)=>{
                              e.preventDefault();
                              if(numberOfComponents === 1 ){
                                return alert("You can't remove input field");
                              }
                              const updatedList = insuranceInfo;
                                updatedList.splice(index, 1);
                                setInsuranceInfo([...updatedList]);
                                setNumberOfComponents(numberOfComponents-1);
                            }}
                            ><IoRemoveOutline size={15} /></button>
                          </div>


                          <label htmlFor="card">HMO Card</label>
                          <select name="card" value={insuranceInfo[index].card} className='px-4 py-2 text-sm focus:outline-none focus:shadow-md border' onChange={(e)=>handleInsuranceChange(e, index)}>
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
                          <label htmlFor="cardNumber">HMO Card Number</label>
                          <input type="text" name="cardNumber" value={insuranceInfo[index].cardNumber} className=' px-4 py-2 text-sm focus:outline-none focus:shadow-md border ' onChange={(e)=>handleInsuranceChange(e, index)}/>
                        </div>
                        <div className='flex flex-col'>
                          <label htmlFor="company">Company <span className=' text-xs '>(if none please type N/A)</span></label>
                          <input type="text" name="company" value={insuranceInfo[index].company} className=' px-4 py-2 text-sm focus:outline-none focus:shadow-md border ' onChange={(e)=>handleInsuranceChange(e, index)}/>
                        </div>
                      </>
                    ) : null}
                  </div>
                ))}

              </form>
              <div className='flex flex-col mt-3'>
                  <label htmlFor="file">Upload</label>
                  <input type="file" name="profile"  accept="image/*
                  " className=' text-sm py-2 focus:outline-none focus:shadow-md  ' onChange={(e)=>handleProfile(e)}/>
                </div>
              <hr/>
              <div className='mt-3 flex justify-end gap-2'>
                <button className='px-10 py-2 bg-gray-400 text-white rounded-md hover:shadow-lg' onClick={()=>setModal(false)}>Close</button>
                <button className='px-10 py-2 bg-cyan-500 text-white rounded-md hover:shadow-lg' onClick={btnSubmit} >Save</button>
              </div>
            </div>
          </div>
      </div>
    )
}
export default AdminModal;