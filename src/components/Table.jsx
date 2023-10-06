import React, { useState } from 'react';
import { AiFillEdit, AiOutlineFolderView, AiFillDelete } from 'react-icons/ai';
import Modal from './UpdateAdminModal';
import moment from 'moment/moment';
import { ToastContainer } from 'react-toastify';
import { deletePatient, disablePatient } from "../redux/action/PatientAction"
import { toastHandler } from "../ToastHandler";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Table({ tableHeaders, results, search, currentPage }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [updateModel, setUpdateModal] = useState(false);
    const [patient, setPatientInfo] = useState({
        userId: "",
        firstname: "",
        middlename: "",
        lastname: "",
        address: "",
        birthday: "",
        email: "",
        gender: "",
        contactNumber: "",
        profile: ""
    });
    const update = (patientId, firstname, middlename, lastname, address, birthday, email, gender, contactNumber, profile) => {
        setPatientInfo({
            ...patient,
            userId: patientId,
            firstname: firstname,
            middlename: middlename,
            lastname: lastname,
            address: address,
            birthday: birthday,
            email: email,
            gender: gender,
            contactNumber: contactNumber,
            profile: profile
        })
        setUpdateModal(true);
    }


    const disableAccountBtn = (id, disable) => {
        const newDisableInformation = { id: id, verified: disable };
        dispatch(disablePatient(newDisableInformation));
        toastHandler("success", `Disable${disable ? '' : 'd'} Account Successfully!`);
    };



    return (
        <>
            <ToastContainer />
            <Modal show={updateModel} setModal={setUpdateModal} setAdminInfo={setPatientInfo} adminInfo={patient} type="patient" />
            <div className=' h-auto overflow-auto '>
                <table className='w-full '>
                    {/*Head*/}
                    <thead className=' shadow-md '>
                        <tr className=" text-gray-600">
                            {
                                tableHeaders.map((header, index) => (
                                    <th className='py-5 px-2 capitalize text-cyan-900 ' key={index}>{header}</th>
                                ))
                            }
                        </tr>
                    </thead>

                    {/*Body*/}
                    <tbody className='h-auto p-6 mt-5 '>

                        {
                            search.length > 0 ?
                                results
                                    .map((result) => (
                                        <tr className=' hover:bg-gray-100 ' key={result.patientId} >
                                            <td className='p-2 flex justify-center  '>
                                                <img src={result.profile} className=' w-11 h-11 rounded-full border border-gray-400 ' alt="User" />
                                            </td>
                                            <td className=' text-center capitalize text-cyan-900 '>
                                                {`${result.firstname} ${result.middlename !== "" ? result.middlename.charAt(0).concat(".") : ''} ${result.lastname}`}
                                            </td>
                                            <td className='text-center text-cyan-900'>
                                                {moment(result.birthday).format(`LL`)}
                                            </td>
                                            <td className='text-center capitalize text-cyan-900'>
                                                {result.gender}
                                            </td>
                                            <td className='text-center text-cyan-900'>
                                                {result.contactNumber}
                                            </td>
                                            <td className='text-center text-cyan-900'>
                                                {result.email}
                                            </td>
                                            <td className=' text-center text-cyan-900 '>
                                                {result.verified ?
                                                    <p className=' px-2 py-2 rounded-md bg-cyan-500 text-white cursor-pointer hover:shadow-md ' onClick={() => disableAccountBtn(result.patientId, false)}>Active</p> :
                                                    <p className=' px-2 py-2 rounded-md bg-red-500 text-white cursor-pointer hover:shadow-md ' onClick={() => disableAccountBtn(result.patientId, true)}>Inactive</p>
                                                }
                                            </td>
                                            <td className=' h-auto relative bottom-2 w-auto flex items-start justify-center gap-3'>
                                                <p className=' px-5 py-2 rounded-md bg-blue-500 text-white cursor-pointer hover:shadow-md flex' onClick={() => update(
                                                    result.patientId,
                                                    result.firstname,
                                                    result.middlename,
                                                    result.lastname,
                                                    result.address,
                                                    result.birthday,
                                                    result.email,
                                                    result.gender,
                                                    result.contactNumber,
                                                    result.profile
                                                )}><AiFillEdit size={25} />&nbsp;Update</p>
                                                <p className=' px-5 py-2 rounded-md bg-red-500 text-white cursor-pointer hover:shadow-md flex' onClick={() => dispatch(deletePatient(result.patientId))} >
                                                    <AiFillDelete size={25} />&nbsp;Delete</p>
                                                <p className=' px-5 py-2 rounded-md bg-gray-500 text-white cursor-pointer hover:shadow-md flex' onClick={() => navigate(`/admin/dashboard/patient/${result.patientId}`)}><AiOutlineFolderView size={25} />&nbsp;View</p>
                                            </td>
                                        </tr>))
                                : results
                                    //       firstItem         LastItem
                                    .slice((currentPage * 8) - 8, currentPage * 8)
                                    .map((result) => (
                                        <tr className=' hover:bg-gray-100 ' key={result.patientId} >
                                            <td className='p-2 flex justify-center  '>
                                                <img src={result.profile} className=' w-11 h-11 rounded-full object-contain aspect-auto border border-gray-400 ' alt="User" />
                                            </td>
                                            <td className=' text-center capitalize text-cyan-900 '>
                                                {`${result.firstname} ${result.middlename !== "" ? result.middlename.charAt(0).concat(".") : ''} ${result.lastname}`}
                                            </td>
                                            <td className='text-center text-cyan-900'>
                                                {moment(result.birthday).format(`LL`)}
                                            </td>
                                            <td className='text-center capitalize text-cyan-900'>
                                                {result.gender}
                                            </td>
                                            <td className='text-center text-cyan-900'>
                                                {result.contactNumber}
                                            </td>
                                            <td className='text-center text-cyan-900'>
                                                {result.email}
                                            </td>
                                            <td className=' text-center text-cyan-900 '>
                                                {result.verified ?
                                                    <p className=' px-2 py-2 rounded-md bg-cyan-500 text-white cursor-pointer hover:shadow-md ' onClick={() => disableAccountBtn(result.patientId, false)}>Active</p> :
                                                    <p className=' px-2 py-2 rounded-md bg-red-500 text-white cursor-pointer hover:shadow-md ' onClick={() => disableAccountBtn(result.patientId, true)}>Inactive</p>
                                                }
                                            </td>
                                            <td className=' h-auto relative bottom-2 w-auto flex items-start justify-center gap-3'>
                                                <p className=' px-5 py-2 rounded-md bg-blue-500 text-white cursor-pointer hover:shadow-md flex' onClick={() => update(
                                                    result.patientId,
                                                    result.firstname,
                                                    result.middlename,
                                                    result.lastname,
                                                    result.address,
                                                    result.birthday,
                                                    result.email,
                                                    result.gender,
                                                    result.contactNumber,
                                                    result.profile
                                                )}><AiFillEdit size={25} />&nbsp;Update</p>
                                                <p className=' px-5 py-2 rounded-md bg-red-500 text-white cursor-pointer hover:shadow-md flex' onClick={() => dispatch(deletePatient(result.patientId))} >
                                                    <AiFillDelete size={25} />&nbsp;Delete</p>
                                                <p className=' px-5 py-2 rounded-md bg-gray-500 text-white cursor-pointer hover:shadow-md flex' onClick={() => navigate(`/admin/dashboard/patient/${result.patientId}`)}><AiOutlineFolderView size={25} />&nbsp;View</p>
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

export default Table