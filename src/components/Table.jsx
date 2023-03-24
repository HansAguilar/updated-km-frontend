import axios from 'axios';
import React from 'react';
import {AiFillEdit, AiOutlineFolderView} from 'react-icons/ai';

function Table({tableHeaders, results, search, currentPage, update }) {

  const disableAccountBtn = async (id, disable) => {
    try {
        
        const newDisableInformation = { id: id, verified: disable };
        await axios.post(`http://localhost:8080/api/v1/patient/disable`, newDisableInformation, {
            headers: { Accept: 'application/json' },
        });
        alert(`Disable${disable ? '' : 'd'} Account Successfully!`);
        window.location.reload();
    } catch (err) {
        console.log(err);
    }
};

  return (
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
            <tbody className='h-auto p-6'>
                
                {
                    search.length > 0 ? 
                    results
                    .map((result)=>(
                        <tr className='' key={result.patientId}>
                            <td className='p-2 text-center'>
                                <img src={result.profile} className=' w-11 h-11 rounded-full border border-gray-400 border-2 ' alt="User" />
                            </td>
                            <td className=' text-center capitalize '>
                                {`${result.firstname} ${result.middlename !== "" ? result.middlename.charAt(0).concat(".") : '' } ${result.lastname}`}
                            </td>
                            <td className='text-center'>
                                {result.birthday}
                            </td>
                            <td className='text-center capitalize'>
                                {result.gender}
                            </td>
                            <td className='text-center'>
                                {result.phoneNumber}
                            </td>
                            <td className='text-center'>
                                {result.email}
                            </td>
                            <td className=' text-center '>
                                {result.verified ? 
                                    <p className=' px-2 py-2 rounded-md bg-cyan-500 text-white cursor-pointer hover:shadow-md ' onClick={()=>disableAccountBtn(result.patientId, false)}>Active</p> : 
                                    <p className=' px-2 py-2 rounded-md bg-red-500 text-white cursor-pointer hover:shadow-md '  onClick={()=>disableAccountBtn(result.patientId, true)}>Inactive</p> 
                                }
                            </td>
                            <td className=' mt-2 flex justify-center gap-x-1 '>
                                <button className='bg-blue-500 text-white flex items-center px-4 py-2 rounded-md' onClick={()=>update(result.patientId)}>
                                    <AiFillEdit size={25} />&nbsp;Update
                                </button>
                                <button className='bg-gray-500 text-white flex items-center px-4 py-2 rounded-md'>
                                    <AiOutlineFolderView size={25} />&nbsp;View
                                </button>
                            </td>
                        </tr> ))
                    : results
                    //       firstItem         LastItem
                    .slice((currentPage*8)-8,currentPage*8 )
                    .map((result)=>(
                        <tr className='' key={result.patientId}>
                            <td className='p-2 flex justify-center  '>
                                <img src={result.profile} className=' w-11 h-11 rounded-full border border-gray-400 border-2 ' alt="User" />
                            </td>
                            <td className=' text-center capitalize '>
                                {`${result.firstname} ${result.middlename !== "" ? result.middlename.charAt(0).concat(".") : '' } ${result.lastname}`}
                            </td>
                            <td className='text-center'>
                                {result.birthday}
                            </td>
                            <td className='text-center'>
                                {result.gender}
                            </td>
                            <td className='text-center'>
                                {result.phoneNumber}
                            </td>
                            <td className='text-center'>
                                {result.email}
                            </td>
                            <td className=' text-center '>
                                {result.verified ? 
                                    <p className=' px-2 py-2 rounded-md bg-cyan-500 text-white cursor-pointer hover:shadow-md ' onClick={()=>disableAccountBtn(result.patientId, false)}>Active</p> : 
                                    <p className=' px-2 py-2 rounded-md bg-red-500 text-white cursor-pointer hover:shadow-md '  onClick={()=>disableAccountBtn(result.patientId, true)}>Inactive</p> 
                                }   
                            </td>
                            <td className=' h-auto relative bottom-2 w-auto flex items-start justify-center gap-3'>
                                <p className=' px-5 py-2 rounded-md bg-blue-500 text-white cursor-pointer hover:shadow-md flex' onClick={()=>update(result.patientId)}><AiFillEdit size={25} />&nbsp;Update</p>
                                <p className=' px-5 py-2 rounded-md bg-gray-500 text-white cursor-pointer hover:shadow-md flex' onClick={()=>update(result.patientId)}><AiOutlineFolderView size={25} />&nbsp;View</p> 
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}

export default Table