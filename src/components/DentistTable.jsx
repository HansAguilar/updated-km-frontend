import React, { useState } from 'react';
import { AiFillEdit, AiOutlineFolderView, AiFillDelete } from 'react-icons/ai';
import UpdateDentistModal from './UpdateDentistModal';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { disableDentist, deleteDentist } from '../redux/action/DentistAction';
import ConfirmDeletionModal from './ConfirmDeletionModal';

function DentistTable({ tableHeaders, results, search, currentPage }) {
	const dispatch = useDispatch();
	const [update, setUpdateModal] = useState(false);
	const [data, setData] = useState({
		dentistId: "",
		fullname: "",
		birthday: "",
		address: "",
		gender: "",
		contactNumber: "",
		email: "",
		specialty: "",
		profile: ""
	});
	const [showModal, setShowModal] = useState({
		showIt: false,
		id: null,
		name: ""
	});
	const disableAccountBtn = async (id, disable) => {
		const newDisableInformation = { id: id, verified: disable };
		dispatch(disableDentist(newDisableInformation));
	};

	const updateBtn = (dentistId, fullname, birthday, address, gender, contactNumber, email, specialty, profile) => {
		setData({
			...data,
			dentistId: dentistId,
			fullname: fullname,
			birthday: birthday,
			address: address,
			gender: gender,
			contactNumber: contactNumber,
			email: email,
			specialty: specialty,
			profile: profile
		})
		setUpdateModal(true);
	}

	const confirmDeletion = (patientID, patientName) => {
		// if (window.confirm(`Are you sure do you want to delete ${patientName}?`)) return dispatch(deletePatient(patientID));
		setShowModal(prev => ({ showIt: !prev.showIt, id: patientID, name: patientName }));
	}

	return (
		<>
			<UpdateDentistModal show={update} setModal={setUpdateModal} setData={setData} data={data} />
			<ToastContainer limit={1} autoClose={1500} />
			{showModal.showIt && (<ConfirmDeletionModal setShowModal={setShowModal} showModal={showModal} />)}

			<div className='p-4'>

				<table className='min-w-full'>

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

					<tbody>
						{
							search.length > 0 ?
								results
									.map((result) => (
										<tr className='font-medium border text-cyan-900 even:bg-slate-100' key={result.dentistId}>
											<td className='py-2 text-center'>
												<img src={result.profile} className='m-auto w-14 h-14 rounded-full object-fill aspect-auto border border-gray-400 ' alt="User" />
											</td>
											<td className=' text-center capitalize '>
												{`Dr. ${result.fullname}`}
											</td>
											<td className='text-center'>
												{
													result.address.length >= 18 ?
														<span>{result.address.substring(0, 18) + "..."}</span>
														:
														<span>{result.address}</span>
												}
											</td>
											<td className='text-center capitalize'>
												{result.gender}
											</td>
											<td className='text-center'>
												{result.contactNumber}
											</td>
											<td className='text-center'>
												{
													result.email.length >= 18 ?
														<span>{result.email.substring(0, 18) + "..."}</span>
														:
														<span>{result.email}</span>
												}
											</td>
											<td className='text-center'>
												{result.specialty}
											</td>
											<td className=' text-center '>
												<span className={`transition-all ease-linear duration-150 py-1 px-3 rounded-full max-w-max mx-auto cursor-pointer hover:text-white ${result.verified ? 'bg-green-100 text-green-600 hover:bg-green-400' : 'bg-red-100 text-red-600 hover:bg-red-400'}`}
													onClick={
														result.verified ? () => disableAccountBtn(result.dentistId, false) : () => disableAccountBtn(result.dentistId, true)
													}
												>
													• {result.verified ? "Active" : "Inactive"}
												</span>
											</td>
											<td className='text-center'>
												<div className='flex items-center justify-center gap-2'>
													<span className='transition-all ease-linear duration-150 rounded p-2 bg-blue-500 hover:bg-blue-700 text-white cursor-pointer flex items-center' onClick={() => updateBtn(
														result.dentistId,
														result.fullname,
														result.birthday,
														result.address,
														result.gender,
														result.contactNumber,
														result.email,
														result.specialty,
														result.profile
													)}>
														<AiFillEdit size={25} />
														<p className='pr-2'>Update</p>
													</span>
													<span className='transition-all ease-linear duration-150 rounded p-2 bg-red-500 hover:bg-red-700 text-white cursor-pointer flex items-center'>
														<AiFillDelete size={25} />
														<p className='pr-2'>Delete</p>
													</span>
												</div>
											</td>
										</tr>))
								: results
									//       firstItem         LastItem
									.slice((currentPage * 8) - 8, currentPage * 8)
									.map((result) => (
										<tr className='font-medium border text-cyan-900 even:bg-slate-100' key={result.dentistId}>
											<td className='py-2 text-center'>
												<img src={result.profile} className='m-auto w-14 h-14 rounded-full object-fill aspect-auto border border-gray-400 ' alt="User" />
											</td>
											<td className=' text-center capitalize '>
												{`Dr. ${result.fullname}`}
											</td>
											<td className='text-center'>
												{
													result.address.length >= 18 ?
														<span>{result.address.substring(0, 18) + "..."}</span>
														:
														<span>{result.address}</span>
												}
											</td>
											<td className='text-center capitalize'>
												{result.gender}
											</td>
											<td className='text-center'>
												{result.contactNumber}
											</td>
											<td className='text-center'>
												{
													result.email.length >= 18 ?
														<span>{result.email.substring(0, 18) + "..."}</span>
														:
														<span>{result.email}</span>
												}
											</td>
											<td className='text-center'>
												{result.specialty}
											</td>
											<td className=' text-center '>
												<span className={`transition-all ease-linear duration-150 py-1 px-3 rounded-full max-w-max mx-auto cursor-pointer hover:text-white ${result.verified ? 'bg-green-100 text-green-600 hover:bg-green-400' : 'bg-red-100 text-red-600 hover:bg-red-400'}`}
													onClick={
														result.verified ? () => disableAccountBtn(result.dentistId, false) : () => disableAccountBtn(result.dentistId, true)
													}
												>
													• {result.verified ? "Active" : "Inactive"}
												</span>
											</td>
											<td className='text-center'>
												<div className='flex items-center justify-center gap-2'>
													<span className='transition-all ease-linear duration-150 rounded p-2 bg-blue-500 hover:bg-blue-700 text-white cursor-pointer flex items-center' onClick={() => updateBtn(
														result.dentistId,
														result.fullname,
														result.birthday,
														result.address,
														result.gender,
														result.contactNumber,
														result.email,
														result.specialty,
														result.profile
													)}>
														<AiFillEdit size={25} />
														<p className='pr-2'>Update</p>
													</span>
													<span className='transition-all ease-linear duration-150 rounded p-2 bg-red-500 hover:bg-red-700 text-white cursor-pointer flex items-center'
														onClick={() => confirmDeletion(result.patientID, `${result.firstname} ${result.lastname}`)}>
														<AiFillDelete size={25} />
														<p className='pr-2'>Delete</p>
													</span>
												</div>
											</td>
										</tr>
									))
						}
					</tbody>
				</table>
			</div >
		</>
	)
}

export default DentistTable