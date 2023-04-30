import axios from 'axios';
import React, { useState, useRef } from 'react';
import {ToastContainer, toast}  from 'react-toastify';
import { ANNOUNCEMENT_LINK } from '../ApiLinks';

function AnnouncementModal({show, setModal}) {
  const [details, setDetails] = useState({
    title:"",
    type:"",
    description:""
  });
  const [picture, setPicture] = useState(""); 
  const profile = useRef();

  const handleOnChange = (e)=>{
    setDetails({
        ...details,
        [e.target.name]: e.target.value
    })
  }

  const handlePicture = (e) =>{
    const reader = new FileReader();
    if(e.target.files[0]){
        reader.readAsDataURL(e.target.files[0]);
        reader.onload=(e)=>{
            setPicture(e.target.result);
        }
    }
  }
  
  const insertDetails = async(data) =>{
    try {
        const response = await axios.post(`${ANNOUNCEMENT_LINK}`, data,{
            headers: { Accept: "application/json", }
          });
        if(response.data){
            toast.success(`${response.data.message}`, {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                pauseOnHover: false,
                closeOnClick: false,
                draggable: false,
                progress: undefined,
                theme: "colored",
                });
                
            window.setTimeout(()=>{
                    window.location.reload();
                },1500)
        }
    } catch (error) { console.log(error.response); }
  }
  const submitButton = () =>{
    if(!details.title || !details.type || !details.description|| !profile){
        return toast.error(`Fill up empty field!`, {
                        position: "top-right",
                        autoClose: 1500,
                        hideProgressBar: false,
                        pauseOnHover: false,
                        closeOnClick: false,
                        draggable: false,
                        progress: undefined,
                        theme: "colored",
                        });
    }
    const data = { ...details, picture }
    insertDetails(data);
  }
  return (
    <div className={` w-full h-screen bg-gray-900 bg-opacity-75 absolute top-0 z-40 flex flex-grow justify-center items-center ${show ? '': 'hidden'}`}>
        <ToastContainer />
          <div className=" z-50">
            <div className="m-auto w-[550px] h-auto overflow-auto p-8 bg-white rounded-lg shadow-lg">
              <div className="text-left py-4">
                <h2 className="text-xl font-bold capitalize mb-2">Add Announcement</h2>
                <hr />
              </div>
  
              <form action="post" className='grid grid-cols-1 gap-3'>
                <div className='flex flex-col'>
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" value={details.title} className='px-4 py-2 text-sm focus:outline-none focus:shadow-md border' onChange={handleOnChange} />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="title">Type</label>
                    <select name='type' className='px-4 py-2 text-sm focus:outline-none focus:shadow-md border' value={details.type} onChange={handleOnChange} >
                    <option value="" disabled>Select type...</option>
                    <option value="PROMO">Promo</option>
                    <option value="NEWS">News</option>
                    </select>
                </div>
                <div className=' w-full mb-2 flex flex-col gap-1'>
                    <label htmlFor="description" className='font-bold text-gray-600'>Description</label>
                    <textarea type="text" name='description' className='px-4 py-2 border  rounded-md focus:outline-none focus:shadow-md resize-none w-full' value={details.description} onChange={handleOnChange}  />
                </div>
                <div className=' w-full mb-2 flex flex-col gap-1'>
                    <label htmlFor="picture">Picture</label>
                    <input type="file" name="picture" ref={profile} className='px-4 py-2 text-sm focus:outline-none focus:shadow-md border' accept='image/*' onChange={handlePicture} />
                </div>
                {
                    picture && (
                        <img src={picture} alt='announcement' className=' w-52 h-52 ' />
                    )
                }
                <hr />
                </form>
                <div className="flex justify-end pt-2 gap-2">
                    <button className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded" 
                    onClick={submitButton}
                    >
                    Submit
                    </button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={()=>{
                        setDetails({
                            ...details,
                            title:"",
                            type:"",
                            description:""
                        });
                        setPicture("");
                        profile.current.value=""
                        setModal(false);
                    }} >
                        Close
                    </button>
                </div>
            </div>
          </div>
      </div>
  )
}

export default AnnouncementModal