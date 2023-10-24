import React, { useState, useRef } from 'react';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import { ANNOUNCEMENT_LINK } from '../ApiLinks';
import { toastHandler } from '../ToastHandler';

const inputStyle = "p-2 border border-slate-300 focus:border-blue-600 rounded text-sm focus:outline-none";

function UpdateAnnouncement({ show, setModal, details, setDetails }) {
    const [picture, setPicture] = useState("");
    const profile = useRef();

    const handleOnChange = (e) => {
        setDetails({
            ...details,
            [e.target.name]: e.target.value
        })
    }

    const handlePicture = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = (e) => {
                setPicture(e.target.result);
            }
        }
    }

    const insertDetails = async (data) => {
        try {
            const response = await axios.put(`${ANNOUNCEMENT_LINK}/${data.id}`, data, {
                headers: { Accept: "application/json", }
            });
            if (response.data) toastHandler("success", "Announcement Successfully Updated!");
            return window.setTimeout(() => {
                window.location.reload();
            }, 1500)
        }
        catch (error) { console.log(error.response); }
    }

    const submitButton = () => {
        if (!details.title || !details.type || !details.description || !picture) {
            return toastHandler("error", "Fill up empty field!");
        }
        else {
            const data = { ...details, picture }
            insertDetails(data);
        }
    }

    return (
        <>
            {
                details && (
                    <div className={`w-full min-h-screen bg-gray-900 bg-opacity-75 absolute left-0 -top-10 z-10 flex flex-grow justify-center items-center ${show ? '' : 'hidden'}`}>
                        <div className="m-auto w-[700px] min-h-max bg-zinc-100 rounded overflow-auto">
                            <ToastContainer limit={1} autoClose={1500} />

                            {/*//~ HEADER */}
                            <div className='p-4 bg-blue-400'>
                                <h2 className="text-2xl text-slate-100 tracking-wider uppercase font-bold ">Update Announcement</h2>
                            </div>
                            {/*//~ HEADER */}


                            <form action="post" className='grid gap-3 p-4 border-t-2' >
                                <div className='flex flex-col w-full gap-1'>
                                    <label htmlFor="title">Title</label>
                                    <input type="text" name="title" value={details.title} className={inputStyle} onChange={handleOnChange} />
                                </div>

                                <div className='flex flex-col w-full gap-1'>
                                    <label htmlFor="title">Type</label>
                                    <select name='type' className={inputStyle} value={details.type} onChange={handleOnChange} >
                                        <option value="" disabled>Select type...</option>
                                        <option value="PROMO">Promo</option>
                                        <option value="NEWS">News</option>
                                    </select>
                                </div>

                                <div className='flex flex-col w-full gap-1'>
                                    <label htmlFor="description" className='font-bold text-gray-600'>Description</label>
                                    <textarea type="text" name='description' className={inputStyle} value={details.description} onChange={handleOnChange} />
                                </div>

                                <div className='flex flex-col w-full gap-1'>
                                    <label htmlFor="picture">Picture</label>
                                    <input type="file" name="picture" ref={profile} className="text-sm p-2 border border-slate-300 bg-white focus:outline-none text-slate-300 font-bold rounded cursor-pointer file:hidden file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-blue-50 hover:file:bg-blue-100" accept='image/*' onChange={handlePicture} />
                                </div>

                                {
                                    picture && (
                                        <img src={picture} alt='announcement' className=' w-52 h-52 ' />
                                    )
                                }
                            </form>

                            <div className='flex gap-2 p-4 justify-end mt-auto'>
                                <button className='py-2 px-4 font-medium bg-red-500 text-white rounded hover:bg-red-700' onClick={() => {
                                    setDetails({
                                        ...details,
                                        title: "",
                                        type: "",
                                        description: ""
                                    });
                                    setPicture("");
                                    profile.current.value = ""
                                    setModal(false);
                                }}>Cancel</button>
                                <button className='py-2 px-4 font-medium bg-blue-500 text-white rounded hover:bg-blue-700' onClick={submitButton}>Confirm</button>
                            </div>
                        </div>
                    </div >
                )
            }
        </>
    )
}

export default UpdateAnnouncement