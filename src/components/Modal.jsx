import React,{useState} from 'react';
import axios from 'axios';

function Modal({show, setModal}) {
  const [ patient, setPatient ] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    gender: "",
    address: "",
    email: "",
    phoneNumber: "",
    birthday: "",
    username: "",
    password: "",
  });
  const [profile, setProfile] = useState("");

  const calculateAge = () =>{
    const currentDate = new Date();
    const dob = new Date(patient.birthday);

    const diffInMs = currentDate - dob;
    const ageInMs = new Date(diffInMs).getTime();
    const ageInYears = Math.floor(ageInMs / 31536000000);
    return ageInYears;
  }
  const handleOnChange= (e) =>{
    setPatient({...patient, [e.target.name]: e.target.value})
  }
  const handleProfile = (e) =>{
    const reader = new FileReader();
    if(e.target.files[0]){
        reader.readAsDataURL(e.target.files[0])
        reader.onload = (e) =>{
            setProfile(e.target.result);
        }
    }
  }
  const submitButton = () =>{
    const formData = new FormData();
    formData.append("firstname", patient.firstname );
    formData.append("middlename", patient.middlename );
    formData.append("lastname", patient.lastname );
    formData.append("gender", patient.gender );
    formData.append("address", patient.address );
    formData.append("email", patient.email );
    formData.append("phoneNumber", patient.phoneNumber );
    formData.append("birthday", patient.birthday);
    formData.append("age", calculateAge());
    formData.append("profile", profile );
    formData.append("username", patient.username);
    formData.append("password", patient.password);
    
    submitInformation(formData);
    setPatient({
      firstname: "",
      middlename: "",
      lastname: "",
      gender: "",
      address: "",
      email: "",
      phoneNumber: "",
      birthday: "",
      username: "",
      password: "",
    });
    setProfile(" ");
    setModal(false);
    window.location.reload();
  }
  const submitInformation = async(formData)=>{
    try{
      const response = await axios.post("http://localhost:8080/api/v1/patient/registration", formData,{
        headers: { Accept: "application/json" }
      })
      console.log(response.data);
    }catch(err){
      console.log(err);
    }
  }
  return (
    <div className={` w-full h-screen bg-gray-900 bg-opacity-75 absolute top-0 z-40 flex justify-center items-center ${show ? '': 'hidden'}`}>
        <div className=" z-50">
          <div className="m-auto w-auto h-auto p-8 bg-white rounded-lg shadow-lg">
            <div className="text-left py-4">
              <h2 className="text-xl font-bold mb-2">Add Patient</h2>
              <hr /><br />
              <form className=' flex flex-col '>

                <input type="text" name='firstname' value={patient.firstname} className=' w-96 border p-2' placeholder='Enter firstname' onChange={(e)=>handleOnChange(e)}/>

                <input type="text" name='middlename' value={patient.middlename} className=' w-96 border p-2' placeholder='Enter middlename' onChange={(e)=>handleOnChange(e)}/>

                <input type="text" name='lastname' value={patient.lastname} className=' w-96 border p-2' placeholder='Enter lastname' onChange={(e)=>handleOnChange(e)}/>

                <input type="text" name='gender' value={patient.gender} className=' w-96 border p-2' placeholder='Enter gender' onChange={(e)=>handleOnChange(e)}/>

                <input type="text" name='address' value={patient.address} className=' w-96 border p-2' placeholder='Enter address' onChange={(e)=>handleOnChange(e)}/>

                <input type="email" name='email' value={patient.email} className=' w-96 border p-2' placeholder='Enter email' onChange={(e)=>handleOnChange(e)}/>

                <input type="text" name='phoneNumber' value={patient.phoneNumber} className=' w-96 border p-2' placeholder='Enter phone number' onChange={(e)=>handleOnChange(e)}/>

                <input type="date" name='birthday' value={patient.birthday} className=' w-96 border p-2' placeholder='Enter birthday' onChange={(e)=>handleOnChange(e)}/>

                <input type="text" name='username' value={patient.username} className=' w-96 border p-2' placeholder='Enter username' onChange={(e)=>handleOnChange(e)}/>

                <input type="password" name='password' value={patient.password} className=' w-96 border p-2' placeholder='Enter password' onChange={(e)=>handleOnChange(e)}/>

                <input type="file" className=' w-96 border p-2' placeholder='Enter file' onChange={(e)=>handleProfile(e)}/>

              </form>
            </div>
            <div className="flex justify-end pt-2">
                <button className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded" 
                onClick={submitButton}
                >
                Submit
              </button>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => setModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Modal