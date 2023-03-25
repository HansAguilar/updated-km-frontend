import axios from 'axios';
import React,{useState} from 'react';

function DenstistModal({show, setModal}) {
  const [ dentistInfo, setDentistInfo ] = useState({
    fullname:"",
    birthday:"",
    address:"",
    gender:"",
    contactNumber:"",
    email:"",
    specialty:"",
    username:"",
    password:"",
    confirmPassword:""
  });
  const [profile, setProfile] = useState("");

  const handleFormChange = (e) =>{
    setDentistInfo({
      ...dentistInfo,
      [e.target.name]: e.target.value
    })
  }

  const handleProfile = (e) =>{
    const reader = new FileReader();
    if(e.target.files[0]){
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = e =>{
        setProfile(e.target.result);
      }
    }
  }

  const submitData = async(data) =>{
    try{
      const response = await axios.post("http://localhost:8080/api/v1/dentist/register",data,{
        headers: { Accept: "application/json", }
      });
      if(response.data){
        alert(response.data.message);
        window.location.reload();
      }
    }catch(err){
      console.log(err);
    };
  }
  const isOver18 = (dob) =>{
    const birthday = new Date(dob);
    const ageDiff = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDiff);
    const age = Math.abs(ageDate.getUTCFullYear-1970);
    return age < 18;
  }
  const btnSubmit = () =>{
    if(!dentistInfo.fullname || !dentistInfo.birthday || !dentistInfo.address || !dentistInfo.gender || !dentistInfo.contactNumber || !dentistInfo.email || !dentistInfo.specialty || !dentistInfo.username || !dentistInfo.password || !dentistInfo.confirmPassword || !profile){
      return alert("Fill up empty field!");
    }
    if(dentistInfo.password !== dentistInfo.confirmPassword ){
      return alert("Mismatch password and confirmpassword");
    }
    const isLegalAge = isOver18(dentistInfo.birthday);
    if(isLegalAge) return alert("Invalid Age!");

    const regex = /^09\d{9}$/;
    if(!regex.test(dentistInfo.contactNumber)){
      return alert("Contact number must be 11-digit");
    }

    const data = { ...dentistInfo, profile };
    submitData(data);
  }

  return (
    <div className={` w-full h-screen bg-gray-900 bg-opacity-75 absolute top-0 z-40 flex flex-grow justify-center items-center ${show ? '': 'hidden'}`}>
        <div className=" z-50">
          <div className="m-auto w-[550px] h-auto p-8 bg-white rounded-lg shadow-lg">
            <div className="text-left py-4">
              <h2 className="text-xl font-bold mb-2">Add Dentist</h2>
              <hr />
            </div>

            <form action="post" className='grid grid-cols-2 gap-3 ' >
              <div className='flex flex-col'>
                <label htmlFor="fullname">Fullname</label>
                <input type="text" name="fullname" value={dentistInfo.fullname} placeholder='ex. John Dimaguiba' className=' px-4 py-2 text-sm focus:outline-none focus:shadow-md border ' onChange={(e)=>handleFormChange(e)} />
              </div>
              <div className='flex flex-col'>
                <label htmlFor="birthday">Birthday</label>
                <input type="date" name="birthday" value={dentistInfo.birthday} className=' px-4 py-2 text-sm focus:outline-none focus:shadow-md border ' onChange={(e)=>handleFormChange(e)}/>
              </div>
              <div className='flex flex-col'>
                <label htmlFor="address">Address</label>
                <input type="text" name="address" value={dentistInfo.address} placeholder='ex. 123 Sesame St., Malabon City' className=' px-4 py-2 text-sm  focus:outline-none focus:shadow-md border ' onChange={(e)=>handleFormChange(e)}/>
              </div>
              <div className='flex flex-col'>
                <label htmlFor="gender">Gender</label>
                <select name="gender" value={dentistInfo.gender} className='px-4 py-2 text-sm focus:outline-none focus:shadow-md border' onChange={(e)=>handleFormChange(e)}>
                  <option value="male" >Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className='flex flex-col'>
                <label htmlFor="contactNumber">Contact Number</label>
                <input type="text" name="contactNumber" value={dentistInfo.contactNumber} placeholder='ex. 09123456780' className=' px-4 py-2 text-sm focus:outline-none focus:shadow-md border ' onChange={(e)=>handleFormChange(e)}/>
              </div>
              <div className='flex flex-col'>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" value={dentistInfo.email} className=' text-sm px-4 py-2 focus:outline-none focus:shadow-md border ' placeholder='ex. john@email.com' onChange={(e)=>handleFormChange(e)}/>
              </div>
              <div className='flex flex-col'>
                <label htmlFor="specialty">Doctor Specialty</label>
                <input type="text" name="specialty" value={dentistInfo.specialty} placeholder='ex. Oral surgery' className=' px-4 py-2 text-sm focus:outline-none focus:shadow-md border ' onChange={(e)=>handleFormChange(e)}/>
              </div>
              <div className='flex flex-col'>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" value={dentistInfo.username} className=' text-sm px-4 py-2 focus:outline-none focus:shadow-md border ' onChange={(e)=>handleFormChange(e)}/>
              </div>
              <div className='flex flex-col'>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={dentistInfo.password} className=' px-4 py-2 text-sm focus:outline-none focus:shadow-md border ' onChange={(e)=>handleFormChange(e)}/>
              </div>
              <div className='flex flex-col'>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" name="confirmPassword" value={dentistInfo.confirmPassword} className=' text-sm px-4 py-2 focus:outline-none focus:shadow-md border ' onChange={(e)=>handleFormChange(e)}/>
              </div>
              <div className='flex flex-col'>
                <label htmlFor="file">Upload</label>
                <input type="file" name="profile" className=' text-sm py-2 focus:outline-none focus:shadow-md  ' onChange={(e)=>handleProfile(e)}/>
              </div>
            </form>
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

export default DenstistModal