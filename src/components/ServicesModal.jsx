import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createService } from "../redux/action/ServicesAction"
import { toastHandler } from '../ToastHandler';

const inputStyle = "p-2 border border-slate-300 focus:border-blue-400 rounded text-sm focus:outline-none";
const serviceType = ['oral prophylaxis', 'tooth restoration', 'cosmetics', 'teeth whitening', 'oral surgery', 'odontectomy', 'pedia dentistry', 'Orthodontcs', 'none'];

function ServicesModal({ show, setModal }) {
  const dispatch = useDispatch();
  const [services, setServices] = useState({
    name: "",
    type: "",
    description: "",
    duration: "00:30:00",
    price: 0
  });

  const handleOnChange = (e) => {
    setServices({ ...services, [e.target.name]: e.target.value })
  }

  const submitButton = async () => {
    if (!services.name || !services.type || !services.description || services.price == 0 || !services.price) return toastHandler("error", "Fill up empty field.")

    const words = services.description.split(' ');
    if (words.length > 60) return toastHandler("error", "Description must be under 60 words")

    dispatch(createService(services));
    setServices({ ...services, name: "", type: "", description: "", duration: "00:30:00", price: 0 });
    setModal(false);
  }

  const btnClose = () => {
    setServices({ ...services, name: "", type: "", description: "", duration: "00:30:00", price: 0 });
    setModal(false);
  }

  return (
    <div className={`w-full min-h-screen bg-gray-900 bg-opacity-75 absolute -top-10 z-10 flex flex-grow justify-center items-center ${show ? '' : 'hidden'}`}>
      <div className="m-auto w-[900px] min-h-max bg-zinc-100 rounded overflow-auto ">

        {/*//~ HEADER */}
        <div className='p-4 bg-blue-400'>
          <h2 className="text-2xl text-slate-100 tracking-wider uppercase font-bold">Add Service</h2>
        </div>
        {/*//~ HEADER */}

        <form className='grid gap-3 p-4'>

          {/*//~ SERVICE NAME */}
          <div className=' flex flex-col gap-1 w-full '>
            <label htmlFor="name" className='font-medium text-slate-600'>Service Name</label>
            <input type="text" name='name' id='name' value={services.name} className={inputStyle} onChange={(e) => handleOnChange(e)} />
          </div>
          {/*//~ SERVICE NAME */}


          {/*//~ SERVICE TYPE */}
          <div className=' flex flex-col gap-1 w-full '>
            <label htmlFor="type" className='font-medium text-slate-600'>Service Type</label>
            <select name="type" id='type' value={services.type} className={`${inputStyle} capitalize`} onChange={(e) => handleOnChange(e)}>
              <option value="" disabled >Select Service Type...</option>
              {
                serviceType.map((val, index) => (
                  <option value={val} key={index}>{val}</option>
                ))
              }
            </select>
          </div>
          {/*//~ SERVICE TYPE */}


          {/*//~ SERVICE DESCRIPTION */}
          <div className=' flex flex-col gap-1 w-full '>
            <label htmlFor="description" className='font-medium text-slate-600'>Service Description <span className='text-sm font-normal italic text-gray-400'>(under 80 words only)</span></label>
            <textarea name='description' id='description' rows={3} value={services.description} className={inputStyle} onChange={(e) => handleOnChange(e)}
            />
          </div>
          {/*//~ SERVICE DESCRIPTION */}


          {/*//~ SERVICE DURATION */}
          <div className=' flex flex-col gap-1 w-full '>
            <label htmlFor="duration" className='font-medium text-slate-600'>Time Duration</label>
            <select name="duration" id='duration' value={services.duration} className={inputStyle} onChange={(e) => handleOnChange(e)}>
              <option value="00:30:00">30 Min</option>
              <option value="01:00:00">1 Hour</option>
            </select>
          </div>
          {/*//~ SERVICE DURATION */}


          {/*//~ SERVICE PRICE */}
          <div className=' flex flex-col gap-1 w-full '>
            <label htmlFor="price" className='font-medium text-slate-600'>Service Price</label>
            <input type="number" name='price' id='price' value={services.price} className={inputStyle} onChange={(e) => handleOnChange(e)} />
          </div>
          {/*//~ SERVICE PRICE */}

        </form>


        {/*//~ BUTTONS */}
        <div className='flex gap-2 p-4 justify-end mt-auto'>
          <button className="py-2 px-4 font-medium bg-red-500 text-white rounded hover:bg-red-700" onClick={btnClose}>Cancel</button>
          <button className="py-2 px-4 font-medium bg-blue-500 text-white rounded hover:bg-blue-700" onClick={submitButton}>Confirm</button>
        </div>
        {/*//~ BUTTONS */}
      </div>
    </div>
  )
}

export default ServicesModal