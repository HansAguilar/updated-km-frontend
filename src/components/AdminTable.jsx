import React, { useState } from 'react';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import UpdateAdminModal from './UpdateAdminModal';
import { useDispatch } from 'react-redux';
import { deleteAdmin, changeAdminStatus } from "../redux/action/AdminAction";
import { toastHandler } from '../ToastHandler';
import { ToastContainer } from 'react-toastify';
import ConfirmDeletionModal from './ConfirmDeletionModal';

function AdminTable({ tableHeaders, results, search, currentPage }) {
	const dispatch = useDispatch();
	const [updateModel, setUpdateModal] = useState(false);
	const [adminInfo, setAdminInfo] = useState({
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
	const disableAccountBtn = async (id, disable) => {
		const newDisableInformation = { id: id, verified: disable };
		dispatch(changeAdminStatus(newDisableInformation));
		toastHandler("success", `Disable${disable ? '' : 'd'} Account Successfully!`);
	};

	const update = (adminId, firstname, middlename, lastname, address, birthday, email, gender, contactNumber, profile) => {
		setAdminInfo({
			...adminInfo,
			userId: adminId,
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

	const [showModal, setShowModal] = useState({
		showIt: false,
		id: null,
		name: "",
	});


	const confirmDeletion = (patientID, patientName) => {
		setShowModal(prev => ({ showIt: !prev.showIt, id: patientID, name: patientName }));
	}

	function handleDelete() {
		console.log('Deleted!');
		dispatch(deleteAdmin(showModal.id));
		setShowModal(prev => ({ showIt: !prev.showIt }));
	}

	return (
		<>
			<ToastContainer limit={1} autoClose={1500} />
			<UpdateAdminModal show={updateModel} setModal={setUpdateModal} setAdminInfo={setAdminInfo} adminInfo={adminInfo} type="admin" />
			{showModal.showIt && (<ConfirmDeletionModal setShowModal={setShowModal} showModal={showModal} onConfirm={handleDelete} />)}

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

					{/*//~ BODY */}
					<tbody>
						{
							search.length > 0 ?
								results
									.filter((val) => { return val.role === "STAFF"; })
									.map((result, idx) => (
										<tr className='font-medium border text-cyan-900 even:bg-slate-100' key={idx}>
											<td className='p-2 text-center flex justify-center '>
												<img src={result.profile} className='m-auto w-14 h-14 rounded-full object-fill aspect-auto border border-gray-400' alt="User" />
											</td>
											<td className=' text-center capitalize '>
												{`${result.firstname} ${!result.middlename ? "" : result.middlename.charAt(0).concat(".")} ${result.lastname}`}
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
												{
													result.email.length >= 18 ?
														<span>{result.email.substring(0, 18) + "..."}</span>
														:
														<span>{result.email}</span>
												}
											</td>
											<td className='text-center'>
												{result.role}
											</td>
											<td className=' text-center '>
												{result.enabled ?
													<span className='p-2 max-w-max rounded bg-green-500 text-white cursor-pointer' onClick={() => disableAccountBtn(result.adminId, false)}>Active</span> :
													<span className='p-2 max-w-max rounded bg-red-500 text-white cursor-pointer' onClick={() => disableAccountBtn(result.adminId, true)}>Inactive</span>
												}
											</td>
											<td className='text-center'>
												<div className='flex items-center justify-center gap-2'>
													<span className='transition-all ease-linear duration-150 rounded p-2 bg-blue-500 hover:bg-blue-700 text-white cursor-pointer flex items-center'
														onClick={() => update(
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
														<AiFillEdit size={25} />
														<p className='pr-2'>Update</p>
													</span>
													<span className='transition-all ease-linear duration-150 rounded p-2 bg-red-500 hover:bg-red-700 text-white cursor-pointer flex items-center'
														onClick={() => confirmDeletion(result.adminId, `${result.firstname} ${result.lastname}`)}>
														<AiFillDelete size={25} />
														<p className='pr-2'>Delete</p>
													</span>
												</div>
											</td>
										</tr>
									))
								: results
									//       firstItem         LastItem
									.slice((currentPage * 8) - 8, currentPage * 8)
									.filter((val) => { return val.role === "STAFF"; })
									.map((result, idx) => (
										<tr className='font-medium border text-cyan-900 even:bg-slate-100' key={idx}>
											<td className='p-2 text-center'>
												<img src={result.profile} className='m-auto w-14 h-14 rounded-full object-fill aspect-auto border border-gray-400' alt="User" />
											</td>
											<td className=' text-center capitalize'>
												{`${result.firstname} ${!result.middlename ? "" : result.middlename.charAt(0).concat(".")} ${result.lastname}`}
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
												{
													result.email.length >= 18 ? <span>{result.email.substring(0, 18) + "..."}</span> : <span>{result.email}</span>
												}
											</td>
											<td className='text-center'>
												{result.role}
											</td>
											<td className='text-center'>
												<span className={`transition-all ease-linear duration-150 py-1 px-3 rounded-full max-w-max mx-auto cursor-pointer hover:text-white ${result.enabled ? 'bg-green-100 text-green-600 hover:bg-green-400' : 'bg-red-100 text-red-600 hover:bg-red-400'}`}
													onClick={
														result.enabled ? () => disableAccountBtn(result.adminId, false) : () => disableAccountBtn(result.adminId, true)
													}
												>
													• {result.enabled ? "Active" : "Inactive"}
												</span>
											</td>
											<td className='text-center'>
												<div className='flex items-center justify-center gap-2'>
													<span className='transition-all ease-linear duration-150 rounded p-2 bg-blue-500 hover:bg-blue-700 text-white cursor-pointer flex items-center'
														onClick={() => update(
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
														<AiFillEdit size={25} />
														<p className='pr-2'>Update</p>
													</span>
													<span className='transition-all ease-linear duration-150 rounded p-2 bg-red-500 hover:bg-red-700 text-white cursor-pointer flex items-center'
														onClick={() => confirmDeletion(result.adminId, `${result.firstname} ${result.lastname}`)}>
														<AiFillDelete size={25} />
														<p className='pr-2'>Delete</p>
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
		</>
	)
}

export default AdminTable