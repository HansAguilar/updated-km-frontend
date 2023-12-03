import React, { useState } from 'react';
import { AiFillEdit, AiOutlineFolderView, AiFillDelete } from 'react-icons/ai';
import Modal from './UpdateAdminModal';
import moment from 'moment/moment';
import { ToastContainer } from 'react-toastify';
import { deletePatient, disablePatient } from "../redux/action/PatientAction"
import { toastHandler } from "../ToastHandler";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ConfirmDeletionModal from './ConfirmDeletionModal';

function Table({ tableHeaders, results, search, currentPage }) {
	const dispatch = useDispatch();
	const [showModal, setShowModal] = useState({
		showIt: false,
		id: null,
		name: ""
	});
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

	const confirmDeletion = (patientID, patientName) => {
		setShowModal(prev => ({ showIt: !prev.showIt, id: patientID, name: patientName }));
	}

	function handleDelete() {
		dispatch(deletePatient(showModal.id))
		setShowModal(prev => ({ showIt: !prev.showIt }));
	}

	return (
		<div className='p-4 '>
			<Modal show={updateModel} setModal={setUpdateModal} setAdminInfo={setPatientInfo} adminInfo={patient} type="patient" />
			<ToastContainer limit={1} autoClose={1500} />
			{showModal.showIt && (<ConfirmDeletionModal setShowModal={setShowModal} showModal={showModal} onConfirm={handleDelete} />)}

			<table className='min-w-full table-fixed'>
				{/*//~ HEAD */}
				<thead className='bg-slate-700'>
					<tr>
						{
							tableHeaders.map((header, index) => (
								<th className='p-2 uppercase text-slate-100' key={index}>{header}</th>
							))
						}
					</tr>
				</thead>
				{/*//~ HEAD */}

				{/*//~ BODY */}
				<tbody>
					{
						search.length > 0 ?
							results
								.map((result) => (
									<tr className='font-medium border text-slate-900 even:bg-slate-100' key={result.patientId} >
										<td className='p-2 text-center'>
											<img src={result.profile} className='m-auto w-14 h-14 rounded-full object-fill aspect-auto border border-gray-400' alt="User" />
										</td>
										<td className='text-center capitalize  '>
											{`${result.firstname} ${result.middlename !== "" ? result.middlename.charAt(0).concat(".") : ''} ${result.lastname}`}
										</td>
										<td className='text-center '>
											{moment(result.birthday).format(`LL`)}
										</td>
										<td className='text-center capitalize '>
											{result.gender}
										</td>
										<td className='text-center '>
											{result.contactNumber}
										</td>
										<td className='text-center '>
											{
												result.email.length >= 18 ?
													<span>{result.email.substring(0, 18) + "..."}</span>
													:
													<span>{result.email}</span>
											}
										</td>
										<td className=' text-center  '>
											<span className={`transition-all ease-linear duration-150 py-1 px-3 rounded-full max-w-max mx-auto cursor-pointer hover:text-white ${result.verified ? 'bg-green-100 text-green-600 hover:bg-green-400' : 'bg-red-100 text-red-600 hover:bg-red-400'}`}
												onClick={
													result.verified ? () => disableAccountBtn(result.patientId, false) : () => disableAccountBtn(result.patientId, true)
												}
											>
												• {result.verified ? "Active" : "Inactive"}
											</span>
										</td>
										<td className='text-center'>
											<div className='flex items-center justify-center gap-2'>
												<span className=' transition-all ease-linear duration-150 rounded p-2 bg-blue-500 hover:bg-blue-700 text-white cursor-pointer flex items-center'
													onClick={() => update(
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
													)}>
													<AiFillEdit size={25} />
													<p className='pr-2'>Update</p>
												</span>
												<span className=' transition-all ease-linear duration-150 rounded p-2 bg-red-500 hover:bg-red-700 text-white cursor-pointer flex items-center' onClick={() => dispatch(deletePatient(result.patientId))}>
													<AiFillDelete size={25} />
													<p className='pr-2'>Delete</p>
												</span>
												<span className=' transition-all ease-linear duration-150 rounded p-2 bg-gray-500 hover:bg-gray-700 text-white cursor-pointer flex items-center' onClick={() => navigate(`/admin/dashboard/patient/${result.patientId}`)}>
													<AiOutlineFolderView size={25} />
													<p className='pr-2'>View</p>
												</span>
											</div>
										</td>
									</tr>))
							: results
								//       firstItem         LastItem
								.slice((currentPage * 8) - 8, currentPage * 8)
								.map((result) => (
									<tr className='font-medium border text-slate-900 even:bg-slate-100' key={result.patientId} >
										<td className='py-2 text-center'>
											<img src={result.profile} className='m-auto w-14 h-14 rounded-full object-fill aspect-auto border border-gray-400 ' alt="User" />
										</td>
										<td className=' text-center capitalize  '>
											{`${result.firstname} ${result.middlename !== "" ? result.middlename.charAt(0).concat(".") : ''} ${result.lastname}`}
										</td>
										<td className='text-center '>
											{moment(result.birthday).format(`LL`)}
										</td>
										<td className='text-center capitalize '>
											{result.gender}
										</td>
										<td className='text-center '>
											{result.contactNumber}
										</td>
										<td className='text-center '>
											{
												result.email.length >= 18 ?
													<span>{result.email.substring(0, 18) + "..."}</span>
													:
													<span>{result.email}</span>
											}
										</td>
										<td className=' text-center  '>
											<span className={`transition-all ease-linear duration-150 py-1 px-3 rounded-full max-w-max mx-auto cursor-pointer hover:text-white ${result.verified ? 'bg-green-100 text-green-600 hover:bg-green-400' : 'bg-red-100 text-red-600 hover:bg-red-400'}`}
												onClick={
													result.verified ? () => disableAccountBtn(result.patientId, false) : () => disableAccountBtn(result.patientId, true)
												}
											>
												• {result.verified ? "Active" : "Inactive"}
											</span>
											{/* {result.verified ?
												<span className=' p-2 rounded bg-green-500 text-white cursor-pointer' onClick={() => disableAccountBtn(result.patientId, false)}>Active</span> :
												<span className=' p-2 rounded bg-red-500 hover:bg-red-700 text-white cursor-pointer' onClick={() => disableAccountBtn(result.patientId, true)}>Inactive</span>
											} */}
										</td>
										<td className='text-center'>
											<div className='flex items-center justify-center gap-2'>
												<span className='transition-all ease-linear duration-150 rounded p-2 bg-blue-500 hover:bg-blue-700 text-white cursor-pointer flex items-center'
													onClick={() => update(
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
													)}>
													<AiFillEdit size={25} />
													<p className='pr-2'>Update</p>
												</span>
												<span className='transition-all ease-linear duration-150 rounded p-2 bg-red-500 hover:bg-red-700 text-white cursor-pointer flex items-center' onClick={() => confirmDeletion(result.patientId, `${result.firstname} ${result.lastname}`)}>
													<AiFillDelete size={25} />
													<p className='pr-2'>Delete</p>
												</span>
												<span className='transition-all ease-linear duration-150 rounded p-2 bg-gray-500 hover:bg-gray-700 text-white cursor-pointer flex items-center' onClick={() => navigate(`/admin/dashboard/patient/${result.patientId}`)}>
													<AiOutlineFolderView size={25} />
													<p className='pr-2'>View</p>
												</span>
											</div>
										</td>
									</tr>
								))
					}
				</tbody>
				{/*//~ BODY */}

			</table>
		</div>
	)
}

export default Table