import React, { useState } from 'react';
import Update from './UpdateAnnouncement';


function AnnouncementTable({tableHeaders, results, search, currentPage }) {
    const [details, setDetails] = useState(null);
    const [update, setUpdate] = useState(false);
    console.log(details);

  return (
    <div className=' h-[550px] px-4 py-3 overflow-auto '>
        <Update show={update} setModal={setUpdate} details={details} setDetails={setDetails} />
        <table className='w-full  '>
            {/*Head*/}
            <thead className=' bg-gray-100 '>
                <tr className=" text-gray-600">
                {
                    tableHeaders.map((header, index)=>(
                        <th className='py-3 px-2 capitalize' key={index}>{header}</th>
                    ))
                }
                </tr>
            </thead>

            {/*Body*/}
            <tbody className='h-auto p-6'>
                {
                    results.map((val)=>(
                    <tr key={val.announcementId} className=' ' >
                    <td className='p-2 text-center flex justify-center '>
                        <img src={val.picture} className=' w-11 h-11 rounded-full border border-gray-400 border-2 ' alt="User" />
                    </td>
                    <td className=' text-center capitalize '>
                        {val.title}
                    </td>
                    <td className='text-center'>
                        {val.description}
                    </td>
                    <td className='text-center capitalize'>
                        {val.type.toLowerCase()}
                    </td>
                    <td className=' text-center '>
                        {
                           val.isAvailable ? 
                            <p className=' px-2 py-2 rounded-md ml-5 bg-cyan-500 text-white cursor-pointer hover:shadow-md ' >Disabled</p> : 
                            <p className=' px-2 py-2 rounded-md ml-5 bg-red-500 text-white cursor-pointer hover:shadow-md '  >Enabled</p> 
                        }
                    </td>
                    <td className=' h-auto relative bottom-2 w-auto flex items-start justify-center gap-3'>
                        <button className=' bg-blue-500 text-white flex items-center px-4 py-2 rounded-md' onClick={()=>{
                            setDetails({
                                ...details,
                                id: val.announcementId,
                                title: val.title,
                                type: val.type,
                                description: val.description,
                                picture: val.picture
                            })
                            setUpdate(true)
                        }}>
                            Update
                        </button>
                        <button className='bg-red-500 text-white flex items-center px-4 py-2 rounded-md'>
                           Delete
                        </button>
                    </td>
                    </tr> 
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}

export default AnnouncementTable