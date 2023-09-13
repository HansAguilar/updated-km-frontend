import React,{useState} from 'react';
import {AiFillEdit, AiFillDelete} from 'react-icons/ai';
import UpdateDentistModal from './UpdateServicesModal';
import axios from 'axios';
import { SERVICES_LINK } from '../ApiLinks';
import { useDispatch } from 'react-redux';
import { deleteService } from "../redux/action/ServicesAction";

function ServiceTable({tableHeaders, results, search, currentPage }) {
    const dispatch = useDispatch();
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
            await axios.post(`${SERVICES_LINK}disable`, newDisableInformation, {
                headers: { Accept: 'application/json' },
            });
            alert(`Disable${disable ? '' : 'd'} Account Successfully!`);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    const deleteButton = async(id) =>{
        dispatch(deleteService(id));
    }

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
     <div className=' h-auto overflow-auto '>
        <table className='w-full  '>
            {/*Head*/}
            <thead className=' shadow-md '>
                <tr className=" text-gray-600">
                {
                    tableHeaders.map((header, index)=>(
                        <th className='py-5 px-2 capitalize text-white' key={index}>{header}</th>
                    ))
                }
                </tr>
            </thead>

            {/*Body*/}
            <tbody className='h-auto p-6 mt-5 '>
                {
                    search.length > 0 ? 
                    results
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
                                result.isAvailable ? 
                                <p 
                                className=' px-1 py-2 cursor-pointer rounded-md bg-cyan-500 text-white '
                                onClick={()=>disableAccountBtn(result.serviceId, false)}
                                >
                                    Disable
                                </p>
                                : <p 
                                className=' px-1 py-2 cursor-pointer rounded-md bg-red-500 text-white '
                                onClick={()=>disableAccountBtn(result.serviceId, true)}
                                >
                                    Available
                                </p>
                                }
                            </td>
                            <td className=' h-auto relative w-auto flex items-end justify-center gap-3'>
                                <p className=' px-5 py-2 rounded-md bg-cyan-500 text-white cursor-pointer hover:shadow-md flex' onClick={()=>updateBtn(
                                    result.serviceId,
                                    result.name,
                                    result.type,
                                    result.description,
                                    result.duration,
                                    result.price
                                )}><AiFillEdit size={25} />&nbsp;Update</p>
                                <p className=' px-5 py-2 rounded-md bg-red-500 text-white cursor-pointer hover:shadow-md flex' onClick={()=>deleteButton(result.serviceId)}><AiFillDelete size={25} />&nbsp;Delete</p> 
                            </td>
                        </tr>))
                    : results
                    //       firstItem         LastItem
                    .slice((currentPage*8)-8,currentPage*8 )
                    .map((result)=>(
                        <tr className='mt-2 ' key={result.serviceId}>
                            <td className=' text-center capitalize text-white px-5'>
                                {result.name}
                            </td>
                            <td className='text-center capitalize text-white'>
                                {result.type}
                            </td>
                            <td className='text-center text-white'>
                                {result.duration === "00:30:00" ? "30 Min": "1 Hour"}
                            </td>
                            <td className='text-center text-white'>
                                {result.price}
                            </td>
                            <td className='text-center'>
                                {
                                result.isAvailable ? 
                                <p 
                                className=' px-1 py-2 cursor-pointer rounded-md bg-cyan-500 text-white '
                                onClick={()=>disableAccountBtn(result.serviceId, false)}
                                >
                                    Disable
                                </p>
                                : <p 
                                className=' px-1 py-2 cursor-pointer rounded-md bg-red-500 text-white '
                                onClick={()=>disableAccountBtn(result.serviceId, true)}
                                >
                                    Available
                                </p>
                                }
                            </td>
                            <td className=' h-auto relative w-auto flex items-end justify-center gap-3'>
                                <p className=' px-5 py-2 rounded-md bg-cyan-500 text-white cursor-pointer hover:shadow-md flex' onClick={()=>updateBtn(
                                    result.serviceId,
                                    result.name,
                                    result.type,
                                    result.description,
                                    result.duration,
                                    result.price
                                )}><AiFillEdit size={25} />&nbsp;Update</p>
                                <p className=' px-5 py-2 rounded-md bg-red-500 text-white cursor-pointer hover:shadow-md flex' onClick={()=>deleteButton(result.serviceId)}><AiFillDelete size={25} />&nbsp;Delete</p> 
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