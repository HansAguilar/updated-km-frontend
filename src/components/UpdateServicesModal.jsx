import React from 'react';
import { useDispatch } from 'react-redux';
import { updateService } from "../redux/action/ServicesAction";

const inputStyle = "p-2 border border-slate-300 focus:border-blue-600 rounded text-sm focus:outline-none";

function UpdateServicesModal({ show, setModal, setData, data }) {
  const dispatch = useDispatch();
  const serviceType = ['oral prophylaxis', 'tooth restoration', 'cosmetics', 'teeth whitening', 'oral surgery', 'odontectomy', 'pedia dentistry', 'Orthodontcs', 'none'];

  const handleFormChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const submitData = async () => {
    dispatch(updateService(data.serviceId, data));
    setData({
      ...data,
      serviceId: "",
      name: "",
      type: "",
      description: "",
      duration: "00:30:00",
      price: 0
    });

    setModal(false);
  }

  const btnSubmit = async () => {
    if (!data.name || !data.type || !data.description || data.price === 0) return alert("Fill up empty field.")
    submitData();
  }

  return (
    <div className={`w-full h-screen bg-gray-900 bg-opacity-75 absolute top-0 left-0 z-10 flex flex-grow justify-center items-center ${show ? '' : 'hidden'}`}>
      <div className="m-auto w-[900px] min-h-max bg-zinc-100 rounded overflow-auto ">

        {/*//~ HEADER */}
        <div className='p-4 bg-blue-400'>
          <h2 className="text-2xl text-slate-100 tracking-wider uppercase font-bold">Update Service</h2>
        </div>
        {/*//~ HEADER */}

        <form action="post" className='grid gap-3 p-4 border-t-2' >

          {/*//~ SERVICE NAME */}
          <div className=' flex flex-col gap-1 w-full '>
            <label htmlFor='name' className='font-medium text-slate-600'>Service Name</label>
            <input type="text" name='name' id='name' value={data.name} className={inputStyle} onChange={(e) => handleFormChange(e)} />
          </div>
          {/*//~ SERVICE NAME */}


          {/*//~ SERVICE TYPE */}
          <div className=' flex flex-col gap-1 w-full '>
            <label htmlFor="type" className='font-medium text-slate-600'>Service Type</label>
            <select name="type" id='type' value={data.type} className={`${inputStyle} capitalize`} onChange={(e) => handleFormChange(e)}>
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
            <textarea name='description' id='description' rows={3} value={data.description} className={inputStyle} onChange={(e) => handleFormChange(e)}
            />
          </div>
          {/*//~ SERVICE DESCRIPTION */}


          {/*//~ SERVICE DURATION */}
          <div className=' flex flex-col gap-1 w-full '>
            <label htmlFor="duration" className='font-medium text-slate-600'>Time Duration</label>
            <select name="duration" id='duration' value={data.duration} className={inputStyle} onChange={(e) => handleFormChange(e)}>
              <option value="00:30:00">30 Min</option>
              <option value="01:00:00">1 Hour</option>
            </select>
          </div>
          {/*//~ SERVICE DURATION */}


          {/*//~ SERVICE PRICE */}
          <div className=' flex flex-col gap-1 w-full '>
            <label htmlFor="price" className='font-medium text-slate-600'>Service Price</label>
            <input type="number" name='price' id='price' value={data.price} className={inputStyle} onChange={(e) => handleFormChange(e)} />
          </div>
        </form>

        {/*//~ BUTTONS */}
        <div className='flex gap-2 p-4 justify-end mt-auto'>
          <button className="py-2 px-4 font-medium bg-red-500 text-white rounded hover:bg-red-700" onClick={() => setModal(false)}>Cancel</button>
          <button className="py-2 px-4 font-medium bg-blue-500 text-white rounded hover:bg-blue-700" onClick={btnSubmit}>Save Changes</button>
        </div>
        {/*//~ BUTTONS */}

      </div>
    </div>
  )
}

export default UpdateServicesModal;