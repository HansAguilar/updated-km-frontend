import axios from 'axios';
import React,{useState} from 'react';
import {SERVICES_LINK} from '../ApiLinks';

function AppointmentModal({show, setModal}) {
  const [ services, setServices ] = useState({
    name:"",
    type:"",
    description:"",
    duration:"00:30:00",
    price: 0
  });
  const serviceType = [ 'oral prophylaxis', 'tooth restoration', 'cosmetics', 'teeth whitening', 'oral surgery', 'odontectomy', 'pedia dentistry', 'Orthodontcs','none'];

  const handleOnChange = (e) =>{
    const words = services.description.split(' ');
    if(words.length > 60){
        return alert("Description should be less than 60 words")
    }
    setServices({...services, [e.target.name]:e.target.value})
  }

  const submitButton = async() =>{
    try {
        if(!services.name || !services.type || !services.description || services.price === 0) return alert("Fill up empty field.")
        const response = await axios.post(SERVICES_LINK, services);
        if(response.data){
            alert(response.data.message);
            window.location.reload();
        }
    } catch (error) {alert(error.response.data.message);}
  }

  const btnClose = () =>{
    setServices({
        ...services,
        name:"",
        type:"",
        description:"",
        duration:"00:30:00",
        price: 0
      });
    setModal(false);
  }
  console.log(services);
  return (
    <div className={` w-full h-screen bg-gray-900 bg-opacity-75 absolute top-0 z-40 flex justify-center items-center ${show ? '': 'hidden'}`}>
        <div className=" z-50">
          <div className="m-auto w-[500px] h-auto p-8 bg-white rounded-lg shadow-lg">
            <div className="text-left py-4">
              <h2 className="text-xl font-bold mb-2">Add Appointment</h2>
              <hr /><br />
              <form className=' flex flex-col '>
                
                <div className=' mb-2 flex flex-col gap-1 '>
                    <label htmlFor="name" className='font-bold text-gray-600 '>Service Name</label>
                    <input type="text" name='name' value={services.name} className=' px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:shadow-md ' 
                    onChange={(e)=>handleOnChange(e)} />
                </div>
                <div className=' mb-2 flex flex-col gap-1 '>
                    <label htmlFor="type" className='font-bold text-gray-600 '>Service Type</label>
                    <select 
                    name="type" 
                    value={services.type}
                    className='px-4 py-2 border border-gray-400 rounded-md capitalize focus:outline-none '
                    onChange={(e)=>handleOnChange(e)}
                    >
                        <option value="" disabled >Select Service Type...</option>
                        {
                            serviceType.map((val,index)=>(
                                <option 
                                value={val} 
                                key={index}
                                className='px-4 py-2 capitalize'
                                >{val}</option>
                            ))
                        }
                    </select>
                </div>
                <div className=' mb-2 flex flex-col gap-1 '>
                    <label htmlFor="description" className='font-bold text-gray-600 '>Service Name</label>
                    <textarea type="text" name='description' value={services.description} className=' px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:shadow-md resize-none ' 
                    onChange={(e)=>handleOnChange(e)} 
                    />
                </div>
                <div className=' mb-2 flex flex-col gap-1 '>
                    <label htmlFor="type" className='font-bold text-gray-600 '>Time Duration</label>
                    <select 
                    name="duration" 
                    value={services.duration}
                    className='px-4 py-2 border border-gray-400 rounded-md capitalize focus:outline-none '
                    onChange={(e)=>handleOnChange(e)}
                    >
                        <option value="00:30:00">30 Min</option>
                        <option value="01:00:00">1 Hour</option>
                    </select>
                </div>
                <div className=' mb-2 flex flex-col gap-1 '>
                    <label htmlFor="price" className='font-bold text-gray-600 '>Service Price</label>
                    <input type="price" name='price' value={services.price} className='  px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:shadow-md ' 
                    onChange={(e)=>handleOnChange(e)} 
                    />
                </div>
              </form>
            </div>
            <div className="flex justify-end pt-2 gap-2">
                <button className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded" 
                onClick={submitButton}
                >
                Submit
              </button>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={btnClose}>
                Close
              </button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default AppointmentModal