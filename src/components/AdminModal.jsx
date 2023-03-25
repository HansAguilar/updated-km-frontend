import axios from 'axios';
import React,{useState} from 'react';

function AdminModal({show, setModal, type}) {
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
      confirmPassword:""
    });
    const [profile, setProfile] = useState("");
  
    const handleFormChange = (e) =>{
      setAdminInfo({
        ...adminInfo,
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
        const response = await axios.post(`http://localhost:8080/api/v1/${type}/registration`,data,{
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
      if(!adminInfo.firstname ||!adminInfo.lastname || !adminInfo.birthday || !adminInfo.address || !adminInfo.gender || !adminInfo.contactNumber || !adminInfo.email || !adminInfo.username || !adminInfo.password || !adminInfo.confirmPassword || !profile){
        return alert("Fill up empty field!");
      }
      if(adminInfo.password !== adminInfo.confirmPassword ){
        return alert("Mismatch password and confirmpassword");
      }
      const isLegalAge = isOver18(adminInfo.birthday);
      if(isLegalAge) return alert("Invalid Age!");

      const regex = /^09\d{9}$/;
      if(!regex.test(adminInfo.contactNumber)){
        return alert("Contact number must be 11-digit and must start with 09");
      }
  
      const data = { ...adminInfo, profile };
      submitData(data);
    }
  
    return (
      <div className={` w-full h-screen bg-gray-900 bg-opacity-75 absolute top-0 z-40 flex flex-grow justify-center items-center ${show ? '': 'hidden'}`}>
          <div className=" z-50">
            <div className="m-auto w-[550px] h-auto p-8 bg-white rounded-lg shadow-lg">
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
                
              </form>
              <div className='flex flex-col mt-3'>
                  <label htmlFor="file">Upload</label>
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
export default AdminModal;