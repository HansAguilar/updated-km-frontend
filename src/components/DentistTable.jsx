import axios from 'axios';
import React,{useState} from 'react';
import {AiFillEdit, AiOutlineFolderView} from 'react-icons/ai';
import UpdateDentistModal from './UpdateDentistModal';

function DentistTable({tableHeaders, results, search, currentPage }) {

    const [update, setUpdateModal] = useState(false);
    const [data, setData] = useState({
         dentistId: "",
         fullname:"",
         birthday:"",
         address:"",
         gender:"",
         contactNumber:"",
         email:"",
         specialty:"",
         profile:""
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

    const updateBtn = (dentistId, fullname, birthday, address, gender, contactNumber, email, specialty, profile ) =>{
        setData({
            ...data,
            dentistId: dentistId,
            fullname:fullname,
            birthday:birthday,
            address:address,
            gender:gender,
            contactNumber:contactNumber,
            email:email,
            specialty:specialty,
            profile:profile
        })
        setUpdateModal(true);
    }
  return (
    <>
        <UpdateDentistModal show={update} setModal={setUpdateModal} setData={setData} data={data} />
    <div className=' h-auto overflow-auto '>
        <table className='w-full  '>
            {/*Head*/}
            <thead className=' shadow-md  '>
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
                        <tr className='' key={result.dentistId}>
                            <td className='p-2 flex justify-center  '>
                                <img src={result.profile} className=' w-11 h-11 rounded-full border border-gray-400 border-2 ' alt="User" />
                            </td>
                            <td className=' text-center capitalize '>
                                {`Dr. ${result.fullname}`}
                            </td>
                            <td className='text-center'>
                                {result.address}
                            </td>
                            <td className='text-center'>
                                {result.gender}
                            </td>
                            <td className='text-center'>
                                {result.contactNumber}
                            </td>
                            <td className='text-center'>
                                {result.email}
                            </td>
                            <td className='text-center'>
                                {result.specialty}
                            </td>
                            <td className=' text-center '>
                                {result.verified ? 
                                    <p className=' px-2 py-2 rounded-md bg-cyan-500 text-white cursor-pointer hover:shadow-md ' onClick={()=>disableAccountBtn(result.dentistId, false)}>Active</p> : 
                                    <p className=' px-2 py-2 rounded-md bg-red-500 text-white cursor-pointer hover:shadow-md '  onClick={()=>disableAccountBtn(result.dentistId, true)}>Inactive</p> 
                                }   
                            </td>
                            <td className=' h-auto relative bottom-2 w-auto flex items-start justify-center gap-3'>
                                <p className=' px-5 py-2 rounded-md bg-blue-500 text-white cursor-pointer hover:shadow-md flex' onClick={()=>updateBtn(
                                    result.dentistId,
                                    result.fullname,
                                    result.birthday,
                                    result.address,
                                    result.gender,
                                    result.contactNumber,
                                    result.email,
                                    result.specialty,
                                    result.profile
                                )}><AiFillEdit size={25} />&nbsp;Update</p>
                                <p className=' px-5 py-2 rounded-md bg-gray-500 text-white cursor-pointer hover:shadow-md flex'><AiOutlineFolderView size={25} />&nbsp;View</p> 
                            </td>
                        </tr>))
                    : results
                    //       firstItem         LastItem
                    .slice((currentPage*8)-8,currentPage*8 )
                    .map((result)=>(
                        <tr className='' key={result.dentistId}>
                            <td className='p-2 flex justify-center  '>
                                <img src={result.profile} className=' w-11 h-11 rounded-full border border-gray-400 border-2 ' alt="User" />
                            </td>
                            <td className=' text-center capitalize '>
                                {`Dr. ${result.fullname}`}
                            </td>
                            <td className='text-center'>
                                {result.address}
                            </td>
                            <td className='text-center'>
                                {result.gender}
                            </td>
                            <td className='text-center'>
                                {result.contactNumber}
                            </td>
                            <td className='text-center'>
                                {result.email}
                            </td>
                            <td className='text-center'>
                                {result.specialty}
                            </td>
                            <td className=' text-center '>
                                {result.verified ? 
                                    <p className=' px-2 py-2 rounded-md bg-cyan-500 text-white cursor-pointer hover:shadow-md ' onClick={()=>disableAccountBtn(result.dentistId, false)}>Active</p> : 
                                    <p className=' px-2 py-2 rounded-md bg-red-500 text-white cursor-pointer hover:shadow-md '  onClick={()=>disableAccountBtn(result.dentistId, true)}>Inactive</p> 
                                }   
                            </td>
                            <td className=' h-auto relative bottom-2 w-auto flex items-start justify-center gap-3'>
                                <p className=' px-5 py-2 rounded-md bg-blue-500 text-white cursor-pointer hover:shadow-md flex' onClick={()=>updateBtn(
                                    result.dentistId,
                                    result.fullname,
                                    result.birthday,
                                    result.address,
                                    result.gender,
                                    result.contactNumber,
                                    result.email,
                                    result.specialty,
                                    result.profile
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

export default DentistTable