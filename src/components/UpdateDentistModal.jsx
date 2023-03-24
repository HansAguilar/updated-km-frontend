import axios from 'axios';
import React,{useState} from 'react';

function UpdateDentistModal({show, setModal, setData, data}) {
  const [profile, setProfile] = useState("");

  const handleFormChange = (e) =>{
    setData({
      ...data,
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

  const submitData = async(newData) =>{
    try{
      const response = await axios.put(`http://localhost:8080/api/v1/dentist/updatedentist/${data.dentistId}`,newData,{
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
    if(!data.fullname || !data.birthday || !data.address || !data.gender || !data.contactNumber || !data.email || !data.specialty){
      return alert("Fill up empty field!");
    }
    const isLegalAge = isOver18(data.birthday);
    if(isLegalAge) return alert("Invalid Age!");
    if(!profile){
      return setProfile(data.profile);
    }

    const newData = {
      fullname: data.fullname,
      birthday: data.birthday,
      address: data.address,
      gender: data.gender,
      contactNumber: data.contactNumber,
      email: data.email,
      specialty: data.specialty,
      profile: profile
    }
    submitData(newData);
  }

  return (
    <div className={` w-full h-screen bg-gray-900 bg-opacity-75 absolute left-0 top-0 z-40 flex flex-grow justify-center items-center ${show ? '': 'hidden'}`}>
        <div className=" z-50">
          <div className="m-auto w-[550px] h-auto p-8 bg-white rounded-lg shadow-lg">
            <div className="text-left py-4">
              <h2 className="text-xl font-bold mb-2">Update Dentist</h2>
              <hr />
            </div>

            <form action="post" className=' grid grid-cols-2 gap-3 ' >
              <div className='flex flex-col'>
                <label htmlFor="fullname">Fullname</label>
                <input type="text" name="fullname" value={data.fullname} placeholder='ex. John Dimaguiba' className=' px-4 py-2 text-sm focus:outline-none focus:shadow-md border ' onChange={(e)=>handleFormChange(e)} />
              </div>
              <div className='flex flex-col'>
                <label htmlFor="birthday">Birthday</label>
                <input type="date" name="birthday" value={data.birthday} className=' px-4 py-2 text-sm focus:outline-none focus:shadow-md border ' onChange={(e)=>handleFormChange(e)}/>
              </div>
              <div className='flex flex-col'>
                <label htmlFor="address">Address</label>
                <input type="text" name="address" value={data.address} placeholder='ex. 123 Sesame St., Malabon City' className=' px-4 py-2 text-sm  focus:outline-none focus:shadow-md border ' onChange={(e)=>handleFormChange(e)}/>
              </div>
              <div className='flex flex-col'>
                <label htmlFor="gender">Gender</label>
                <select name="gender" value={data.gender} id="" className='px-4 py-2 text-sm focus:outline-none focus:shadow-md border' onChange={(e)=>handleFormChange(e)}>
                  <option value="" hidden >Choose...</option>
                  <option value="male" >Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className='flex flex-col'>
                <label htmlFor="contactNumber">Contact Number</label>
                <input type="text" name="contactNumber" value={data.contactNumber} placeholder='ex. 09123456780' className=' px-4 py-2 text-sm focus:outline-none focus:shadow-md border ' onChange={(e)=>handleFormChange(e)}/>
              </div>
              <div className='flex flex-col'>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" value={data.email} className=' text-sm px-4 py-2 focus:outline-none focus:shadow-md border ' placeholder='ex. john@email.com' onChange={(e)=>handleFormChange(e)}/>
              </div>
              <div className='flex flex-col'>
                <label htmlFor="specialty">Doctor Specialty</label>
                <input type="text" name="specialty" value={data.specialty} placeholder='ex. Oral surgery' className=' px-4 py-2 text-sm focus:outline-none focus:shadow-md border ' onChange={(e)=>handleFormChange(e)}/>
              </div>
            </form>
            <img src={!profile ? data.profile : profile} alt="Dentist" className=' mt-5 w-52 h-52 '/>
            <div className='flex '>
                <input type="file" name="profile" className=' text-sm py-2 focus:outline-none focus:shadow-md  ' onChange={(e)=>handleProfile(e)}/>
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

export default UpdateDentistModal;