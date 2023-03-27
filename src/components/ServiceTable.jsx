import React,{useState, useEffect} from 'react';
import {AiFillEdit, AiOutlineFolderView} from 'react-icons/ai';
import UpdateDentistModal from './UpdateDentistModal';
import axios from 'axios';

function ServiceTable({tableHeaders, results, search, currentPage }) {
    const [update, setUpdateModal] = useState(false);
    const [data, setData] = useState({
        serviceId:"",
        name:"",
        type:"",
        description:"",
        duration:"00:30:00",
        price:0
    });

    const disableAccountBtn = async (id, disable) => {
        try {
            
            const newDisableInformation = { id: id, verified: disable };
            await axios.post(`http://localhost:8080/api/v1/dentist/disable`, newDisableInformation, {
                headers: { Accept: 'application/json' },
            });
            alert(`Disable${disable ? '' : 'd'} Account Successfully!`);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    const updateBtn = (serviceId,name,type,description,duration,price ) =>{
        setData({
            ...data,
            serviceId: serviceId,
            name:name,
            type:type,
            description:description,
            duration:duration,
            price:price,
        })
        setUpdateModal(true);
    }
  return (
    <>
     <UpdateDentistModal show={update} setModal={setUpdateModal} setData={setData} data={data} />
     <div className=' h-[550px] px-4 py-3 overflow-auto '>
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
            <tbody className='h-auto p-6 '>
                {
                    search.length > 0 ? 
                    results
                    .map((result)=>(
                        <tr className='' key={result.serviceId}>
                            <td className=' text-center capitalize '>
                                {result.name}
                            </td>
                            <td className='text-center'>
                                {result.type}
                            </td>
                            <td className='text-center'>
                                {result.duration === "00:30:00" ? "30 Min": "1 Hour"}
                            </td>
                            <td className='text-center'>
                                {result.price}
                            </td>
                            <td className='text-center'>
                                {
                                result.status ? 
                                <p 
                                className=' px-4 py-2 cursor-pointer bg-cyan-600 text-white '
                                >
                                    Disable
                                </p>
                                : <p 
                                className=' px-4 py-2 cursor-pointer bg-red-600 text-white '
                                >
                                    Available
                                </p>
                                }
                            </td>
                            {/* <td className=' text-center '>
                                {result.verified ? 
                                    <p className=' px-2 py-2 rounded-md bg-cyan-500 text-white cursor-pointer hover:shadow-md ' onClick={()=>disableAccountBtn(result.dentistId, false)}>Active</p> : 
                                    <p className=' px-2 py-2 rounded-md bg-red-500 text-white cursor-pointer hover:shadow-md '  onClick={()=>disableAccountBtn(result.dentistId, true)}>Inactive</p> 
                                }   
                            </td> */}
                            <td className=' h-auto relative bottom-2 w-auto flex items-start justify-center gap-3'>
                                <p className=' px-5 py-2 rounded-md bg-blue-500 text-white cursor-pointer hover:shadow-md flex' onClick={()=>updateBtn(
                                    result.serviceId,
                                    result.name,
                                    result.type,
                                    result.description,
                                    result.duration,
                                    result.price
                                )}><AiFillEdit size={25} />&nbsp;Update</p>
                                <p className=' px-5 py-2 rounded-md bg-gray-500 text-white cursor-pointer hover:shadow-md flex'><AiOutlineFolderView size={25} />&nbsp;View</p> 
                            </td>
                        </tr>))
                    : results
                    //       firstItem         LastItem
                    .slice((currentPage*8)-8,currentPage*8 )
                    .map((result)=>(
                        <tr className='mt-2 ' key={result.serviceId}>
                            <td className=' text-center capitalize '>
                                {result.name}
                            </td>
                            <td className='text-center capitalize'>
                                {result.type}
                            </td>
                            <td className='text-center'>
                                {result.duration === "00:30:00" ? "30 Min": "1 Hour"}
                            </td>
                            <td className='text-center'>
                                {result.price}
                            </td>
                            <td className='text-center'>
                                {
                                result.status ? 
                                <p 
                                className=' px-1 py-2 cursor-pointer bg-cyan-600 text-white '
                                >
                                    Disable
                                </p>
                                : <p 
                                className=' px-1 py-2 cursor-pointer rounded-md bg-red-600 text-white '
                                >
                                    Available
                                </p>
                                }
                            </td>
                            {/* <td className=' text-center '>
                                {result.verified ? 
                                    <p className=' px-2 py-2 rounded-md bg-cyan-500 text-white cursor-pointer hover:shadow-md ' onClick={()=>disableAccountBtn(result.dentistId, false)}>Active</p> : 
                                    <p className=' px-2 py-2 rounded-md bg-red-500 text-white cursor-pointer hover:shadow-md '  onClick={()=>disableAccountBtn(result.dentistId, true)}>Inactive</p> 
                                }   
                            </td> */}
                            <td className=' h-auto relative w-auto flex items-end justify-center gap-3'>
                                <p className=' px-5 py-2 rounded-md bg-cyan-500 text-white cursor-pointer hover:shadow-md flex' onClick={()=>updateBtn(
                                    result.serviceId,
                                    result.name,
                                    result.type,
                                    result.description,
                                    result.duration,
                                    result.price
                                )}><AiFillEdit size={25} />&nbsp;Update</p>
                                <p className=' px-5 py-2 rounded-md bg-gray-500 text-white cursor-pointer hover:shadow-md flex'><AiOutlineFolderView size={25} />&nbsp;View</p> 
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
    </>
  )
}

export default ServiceTable