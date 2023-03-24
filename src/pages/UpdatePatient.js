import React,{useState,useEffect} from 'react';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from '../components/Modal';
import PageHeader from '../components/PageHeader';
import { MdDone,MdCancel } from 'react-icons/md';
import InputField from '../components/InputField';
import PageNotFound from './PageNotFound';

function UpdatePatient(props) {
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const [ show, setModal ] = useState(false);
    const navigate = useNavigate();
    const [ patient, setPatient ] = useState({
      firstname: "",
      middlename:"",
      lastname:"",
      email:"",
      address:"",
      birthday:"",
      gender:""
    });
    const [profile, setNewProfile] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false)
    useEffect(()=>{
        const fetchPatient = async()=>{
          try {
            const response = await axios.get(`http://localhost:8080/api/v1/patient/fetch/${id}`);
            setPatient({
              firstname: response.data.firstname,
              middlename: response.data.middlename,
              lastname: response.data.lastname,
              email: response.data.email,
              address: response.data.address,
              birthday: response.data.birthday,
              gender: response.data.gender
            });
            console.log(response)
            setNewProfile(response.data.profile);
            setVerified(response.data.verified);
            setLoading(false);
          } catch (error) { 
            setError(true)
            setLoading(false);
           }
        }
        fetchPatient();
      },[id,navigate]);

    const cancelBtn = ( ) =>{
      navigate('/admin/dashboard/patient');
    }

    const updateNewProfile = (e) =>{
      const reader = new FileReader();
      if(e.target.files[0]){
        reader.readAsDataURL(e.target.files[0])
        reader.onload = (e) =>{
          setNewProfile(e.target.result);
        }
      }
    }
    const handleOnChange = (e) =>{
      setPatient({...patient, [e.target.name]:e.target.value})
    }

    const submitBtnHandler = async() =>{
      const isEmpty = !patient.firstname || !patient.lastname || !patient.email || !patient.address || !patient.birthday;
      if(isEmpty){
        return alert("Please fill up empty field!");
      }
      const formData = new FormData();
      formData.append("firstname", patient.firstname);
      formData.append("middlename", patient.middlename);
      formData.append("lastname", patient.lastname);
      formData.append("email", patient.email);
      formData.append("address",patient.address);
      formData.append("birthday", patient.birthday);
      formData.append("gender", patient.gender);
      formData.append("profile", profile);
      formData.append("verified", verified);
      
      await updateInformation(formData);
      await window.location.reload(navigate("/admin/dashboard/patient"));
    }

    const updateInformation = async(formData) =>{
      
      try {
        await axios.put(`http://localhost:8080/api/v1/patient/update/${id}`, formData);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    }
    if(loading){ 
        return <div className=' w-full h-screen flex justify-center items-center '>
            <LoadingSpinner loading={loading} />
         </div> }
    if(error){
      return <PageNotFound />
    }
    
    return (
        <div className=' h-screen overflow-hidden relative '>
          <Modal show={show} setModal={setModal} />
          <PageHeader link={'patient'} />
          <div className='flex flex-col justify-center p-4 '>
            <div className=' flex-grow bg-white h-auto rounded-xl shadow-lg'>
               {/*Sub header*/}
              <div className=' w-full p-4 border-t-2 border-t-cyan-500 rounded-t-xl flex justify-between items-center border-b-2 '>
                        <h1 className=' text-xl '>Patient Information</h1>
                        <div className='pl-4 flex gap-3 '>
                          <button className=' bg-cyan-500 text-white flex justify-start items-center pl-1 pr-6 py-2 cursor-pointer rounded-md font-bold capitalize ' onClick={submitBtnHandler}><MdDone size={30} />&nbsp;Update</button>
                          <button className=' bg-red-500 text-white flex justify-start items-center pl-1 pr-6 py-2 cursor-pointer rounded-md font-bold capitalize ' onClick={cancelBtn}><MdCancel size={30} />&nbsp;Cancel</button>
                        </div>
              </div>
              <div className=' bg-white flex justify-center px-4 py-8 '>
                  <div className=' w-1/3 p-5 flex flex-col justify-center items-center gap-y-5 '>
                    <img src={profile} alt='profile' className=' w-96 h-96 ' />
                    <input type='file' onChange={updateNewProfile} className=' w-56 whitespace-nowrap overflow-hidden truncate '/>
                  </div>
                  <div className=' w-1/2 flex flex-col gap-2 py-4 ' >
                    <div className='w-full h-auto grid grid-cols-2 gap-x-2 ' >
                      <InputField type='text' name='firstname' value={patient.firstname} handleOnChange={handleOnChange} />
                      <InputField type='text' name='middlename' value={patient.middlename} handleOnChange={handleOnChange}/>
                    </div>
                    <div className='w-full h-auto grid grid-cols-2 gap-x-2 ' >
                      <InputField type='text' name='lastname' value={patient.lastname} handleOnChange={handleOnChange}/>
                      <InputField type='email' name='email' value={patient.email} handleOnChange={handleOnChange} />
                    </div>
                    
                    <InputField type='text' name='address' value={patient.address} handleOnChange={handleOnChange}/>
                    <div className='w-full h-auto grid grid-cols-2 gap-x-2 justify-center items-center relative ' >
                      <InputField type='date' name='birthday' value={patient.birthday} handleOnChange={handleOnChange}/>
                      <div className='px-4 py-3 '>
                        <p className=' font-bold text-gray-600 capitalize'>Gender</p>
                        {
                          patient.gender === "Male" ?
                          <div className='flex gap-x-4 ' >
                          <div className='flex gap-x-2'>
                            <input type="radio" name='gender' value='Male' onChange={handleOnChange} defaultChecked/> 
                            <p>Male</p>
                          </div>
                          <div className='flex gap-x-2'>
                          <input type="radio" name='gender' value='Female' onChange={handleOnChange} /> 
                            <p>Female</p>
                          </div>
                        </div>
                        : <div className='flex gap-x-4 ' >
                        <div className='flex gap-x-2'>
                          <input type="radio" name='gender' value='Male'  onChange={handleOnChange}/> 
                          <p>Male</p>
                        </div>
                        <div className='flex gap-x-2'>
                        <input type="radio" name='gender' value='Female' defaultChecked onChange={handleOnChange}/> 
                          <p>Female</p>
                        </div>
                      </div>
                        }
                      </div>
                    </div>
                    
                  </div>
              </div>
            </div>
          </div>
        </div>
    );
}

export default UpdatePatient;