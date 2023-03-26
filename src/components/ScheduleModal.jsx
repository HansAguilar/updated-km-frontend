import axios from 'axios';
import React,{useState, useEffect} from 'react'

function ScheduleModal({show, setModal}) {
    const [ dentists, setDentistList ] = useState([]);
    const [ schedule, setSchedule ] = useState({
        date: "",
        timeStart: "",
        dentistId:""
    });

    useEffect(()=>{
        const fetchDentist =async()=>{
            try {
                const response = await axios.get("http://localhost:8080/api/v1/dentist/");
                if(response.data){
                    setDentistList(response.data);
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchDentist();
    },[])
    
    const handleOnChange= (e) =>{
        setSchedule({...schedule, [e.target.name]: e.target.value})
      }

    const btnCloseEventHandler = () =>{
        setSchedule({
            ...schedule,
            date: "",
            timeStart: "",
            dentistId:""
        });
        setModal(false);
    }

    const btnSubmit = async() => {
      if(!schedule.dentistId || !schedule.date)return alert("Fill up empty field");
      const time = new Date(`${schedule.date}T${schedule.timeStart}`);
      setSchedule({...schedule, timeStart:time})
      try {
        const response = await axios.post("http://localhost:8080/api/v1/schedule/", schedule);
        if(response.data){
          alert(response.data.message);
          window.location.reload();
        }
      } catch (error) {
        alert(error.response.data.message)
      }
    };

      console.log(schedule)
  return (
    <div className={` w-full h-screen bg-gray-900 bg-opacity-75 absolute top-0 z-40 flex justify-center items-center ${show ? '': 'hidden'}`}>
    <div className=" z-50">
      <div className="m-auto w-auto h-auto p-8 bg-white rounded-lg shadow-lg">
        <div className="text-left py-4">
          <h2 className="text-xl font-bold mb-2 text-gray-900 ">Add Schedule</h2>
          <hr /><br />
          <form className=' flex flex-col gap-2 '>

            <label htmlFor="dentistId" className=' font-bold text-gray-700 '>Select Dentist</label>
            <select name='dentistId' value={schedule.dentistId} className=' border px-4 p-3 focus:outline-none ' onChange={(e)=>handleOnChange(e)} >
                <option value="" disabled >Choose an option...</option>
                {
                    dentists
                    .filter(val => val.verified !== false)
                    .map((dentist, index)=>(
                      <option className=' px-4 py-3 ' value={dentist.dentistId} key={index} >Dr. {dentist.fullname}</option>
                    ))
                }
            </select>

            <label htmlFor="date" className=' font-bold text-gray-700 '>Appointment Day</label>
            <input type="date" name='date' value={schedule.date} className=' w-full border p-2'  onChange={(e)=>handleOnChange(e)}/>

            <div className=' w-[450px] flex gap-3 '>
                <div  className='flex flex-col gap-2 w-full '>
                    <label htmlFor="timeStart" className='font-bold text-gray-700'>Appointment Start Time</label>
                    <select name='timeStart' value={schedule.start} className=' border px-4 p-3 focus:outline-none ' onChange={(e)=>handleOnChange(e)} >
                      <option value="08:00:00">08:00 Am</option>
                      <option value="09:00:00">09:00 Am</option>
                      <option value="10:00:00">10:00 Am</option>
                      <option value="11:00:00">11:00 Am</option>
                      <option value="12:00:00">12:00 Am</option>
                      <option value="01:00:00">01:00 Pm</option>
                      <option value="02:00:00">02:00 Pm</option>
                      <option value="03:00:00">03:00 Pm</option>
                      <option value="04:00:00">04:00 Pm</option>
                      <option value="05:00:00">05:00 Pm</option>
                  </select>
                </div>
            </div>

          </form>
        </div>
        <div className="flex justify-end pt-2">
            <button className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded" 
            onClick={btnSubmit}
            >
            Submit
          </button>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={btnCloseEventHandler}>
            Close
          </button>
        </div>
      </div>
    </div>
</div>
  )
}

export default ScheduleModal