import React,{useState} from 'react';
import {AiFillEdit, AiFillDelete} from 'react-icons/ai';
import UpdateAdminModal from './UpdateAdminModal';
import { useDispatch } from 'react-redux';
import { deleteAdmin,changeAdminStatus } from "../redux/action/AdminAction";
import { toastHandler } from '../ToastHandler';

function AdminTable({tableHeaders, results, search, currentPage }) {
  const dispatch = useDispatch();
  const [ updateModel, setUpdateModal] = useState(false);
  const [adminInfo, setAdminInfo] = useState({
        userId:"",
        firstname:"",
        middlename:"",
        lastname:"",
        address:"",
        birthday:"",
        email:"",
        gender:"",
        contactNumber:"",
        profile:""
  });
  const disableAccountBtn = async (id, disable) => {
    const newDisableInformation = { id: id, verified: disable };
    dispatch(changeAdminStatus(newDisableInformation));
    toastHandler("success",`Disable${disable ? '' : 'd'} Account Successfully!`);
   };

const update = ( adminId,firstname,middlename,lastname,address,birthday,email,gender,contactNumber,profile) =>{
    setAdminInfo({
        ...adminInfo,
        userId: adminId,
        firstname:firstname,
        middlename:middlename,
        lastname:lastname,
        address:address,
        birthday: birthday,
        email:email,
        gender: gender,
        contactNumber: contactNumber,
        profile:profile
})
setUpdateModal(true);
}

  return (
   <>
    <UpdateAdminModal show={updateModel} setModal={setUpdateModal} setAdminInfo={setAdminInfo} adminInfo={adminInfo} type="admin"/>
    <div className=' h-auto overflow-auto '>
        
        <table className='w-full  '>
            {/*Head*/}
            <thead className=' shadow-md '>
                <tr className=" text-gray-600">
                {
                    tableHeaders.map((header, index)=>(
                        <th className='py-5 px-2 capitalize text-cyan-900' key={index}>{header}</th>
                    ))
                }
                </tr>
            </thead>

            {/*Body*/}
            <tbody className='h-auto p-6 mt-5'>
                
                {
                    search.length > 0 ? 
                    results
                    .filter((val)=>{ return val.role === "STAFF"; })
                    .map((result)=>(
                        <tr className='' key={result.adminId}>
                        <td className='p-2 text-center flex justify-center '>
                            <img src={result.profile} className=' w-11 h-11 rounded-full border border-gray-400 ' alt="User" />
                        </td>
                        <td className=' text-center capitalize '>
                            {`${result.firstname} ${!result.middlename ? "" : result.middlename.charAt(0).concat(".")  } ${result.lastname}`}
                        </td>
                        <td className='text-center'>
                            {result.address}
                        </td>
                        <td className='text-center capitalize'>
                            {result.gender}
                        </td>
                        <td className='text-center'>
                            {result.contactNumber}
                        </td>
                        <td className='text-center'>
                            {result.email}
                        </td>
                        <td className='text-center'>
                            {result.role}
                        </td>
                        <td className=' text-center '>
                            {result.enabled ? 
                                <p className=' px-2 py-2 rounded-md ml-5 bg-cyan-500 text-white cursor-pointer hover:shadow-md ' onClick={()=>disableAccountBtn(result.adminId, false)}>Active</p> : 
                                <p className=' px-2 py-2 rounded-md ml-5 bg-red-500 text-white cursor-pointer hover:shadow-md '  onClick={()=>disableAccountBtn(result.adminId, true)}>Inactive</p> 
                            }
                        </td>
                        <td className=' h-auto relative bottom-2 w-auto flex items-start justify-center gap-3'>
                            <button className=' bg-blue-500 text-white flex items-center px-4 py-2 rounded-md' onClick={()=>update(
                                result.adminId,
                                result.firstname,
                                result.middlename,
                                result.lastname,
                                result.address,
                                result.birthday,
                                result.email,
                                result.gender,
                                result.contactNumber,
                                result.profile
                            )}>
                                <AiFillEdit size={25} />&nbsp;Update
                            </button>
                            <button className='bg-red-500 text-white flex items-center px-4 py-2 rounded-md'>
                                <AiFillDelete size={25} />&nbsp;Delete
                            </button>
                        </td>
                    </tr>  
                          ))
                    : results
                    //       firstItem         LastItem
                    .slice((currentPage*8)-8,currentPage*8 )
                    .filter((val)=>{ return val.role === "STAFF"; })
                    .map((result)=>(
                        <tr className='' key={result.adminId}>
                            <td className='p-2 text-center flex justify-center '>
                                <img src={result.profile} className=' w-11 h-11 rounded-full border border-gray-400 ' alt="User" />
                            </td>
                            <td className=' text-center capitalize '>
                                {`${result.firstname} ${!result.middlename ? "" : result.middlename.charAt(0).concat(".")  } ${result.lastname}`}
                            </td>
                            <td className='text-center'>
                                {result.address}
                            </td>
                            <td className='text-center capitalize'>
                                {result.gender}
                            </td>
                            <td className='text-center'>
                                {result.contactNumber}
                            </td>
                            <td className='text-center'>
                                {result.email}
                            </td>
                            <td className='text-center'>
                                {result.role}
                            </td>
                            <td className=' text-center '>
                                {result.enabled ? 
                                    <p className=' px-2 py-2 rounded-md ml-5 bg-cyan-500 text-white cursor-pointer hover:shadow-md ' onClick={()=>disableAccountBtn(result.adminId, false)}>Active</p> : 
                                    <p className=' px-2 py-2 rounded-md ml-5 bg-red-500 text-white cursor-pointer hover:shadow-md '  onClick={()=>disableAccountBtn(result.adminId, true)}>Inactive</p> 
                                }
                            </td>
                            <td className=' h-auto relative bottom-2 w-auto flex items-start justify-center gap-3'>
                                <button className=' bg-blue-500 text-white flex items-center px-4 py-2 rounded-md' onClick={()=>update(
                                    result.adminId,
                                    result.firstname,
                                    result.middlename,
                                    result.lastname,
                                    result.address,
                                    result.birthday,
                                    result.email,
                                    result.gender,
                                    result.contactNumber,
                                    result.profile
                                )}>
                                    <AiFillEdit size={25} />&nbsp;Update
                                </button>
                                <button className='bg-red-500 text-white flex items-center px-4 py-2 rounded-md' onClick={()=>dispatch(deleteAdmin(result.adminId))}>
                                    <AiFillDelete size={25} />&nbsp;Delete
                                </button>
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

export default AdminTable