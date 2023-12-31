import React, { useState } from 'react';
import { AiFillEdit, AiOutlineFolderView, AiFillDelete } from 'react-icons/ai';
import { MdCancel } from "react-icons/md";
import UpdateAppointmentModal from './UpdateAppointmentModal';
import CancelModal from './CancelModal';
import ViewAppointment from './ViewAppointment';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { toastHandler } from "../ToastHandler";
import { approvedAppointment, deleteAppointment } from "../redux/action/AppointmentAction";
import { fetchPaymentDetails } from "../redux/action/PaymentAction";
import { sendNotification } from "../redux/action/NotificationAction";
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { AiFillCheckSquare } from "react-icons/ai"
import ConfirmDeletionModal from './ConfirmDeletionModal';


function AppointmentTable({ tableHeaders, results, search, currentPage, type }) {
	const dispatch = useDispatch();
	const [cancelModal, setCancelModal] = useState(false);
	const [update, setUpdate] = useState(false);
	const navigate = useNavigate();
	const [view, setView] = useState({
		isShow: false,
		appointment: ""
	});

	const [statusValue, setStatusValue] = useState({
		isClick: false,
		statusCode: ""
	});

	const [appointmentId, setAppointmentId] = useState(null)
	const [status1, setStatus1] = useState({
		selectedId: null,
		remarks: "PENDING",
		isSelected: false
	});

	const [showModal, setShowModal] = useState({
		showIt: false,
		id: null,
		name: ""
	});

	const [status, setStatus] = useState({
		id: "",
		status: "",
		description: ""
	})

	const confirmDeletion = (patientID, patientName) => {
		// if (window.confirm(`Are you sure do you want to delete ${patientName}?`)) return dispatch(deletePatient(patientID));
		setShowModal(prev => ({ showIt: !prev.showIt, id: patientID, name: patientName }));
	}

	function handleDelete() {
		dispatch(deleteAppointment(showModal.id, toastHandler))
		setShowModal(prev => ({ showIt: !prev.showIt }));
	}

	const updateButton = (id) => {
		setAppointmentId(id)
		setUpdate(true);
	}

	const statusSubmit = (id, data) => {
		const notificationData = {
			name: "Approved Appointment",
			time: moment().format("HH:mm:ss"),
			date: moment().format("YYYY-MM-DD"),
			patientId: data.patientId,
			description: `You're appointment ${moment(data.date).format("L").toString() === moment().format("L").toString() ? "today" : "on"} ${moment(data.date).format("MMM DD YYYY")} has been approved`,
			receiverType: "PATIENT"
		}

		dispatch(approvedAppointment(id));
		dispatch(fetchPaymentDetails(id));
		dispatch(sendNotification(notificationData));
		alert("Approved appointment successfully!");
		setStatus({ ...status, selectedId: null });
	}

	const cancelButton = (id) => {
		setStatus1({
			...status1,
			id: id
		})
		setCancelModal(true);
	}
	return (
		<>
			{update && (<UpdateAppointmentModal show={update} setModal={setUpdate} initialAppointment={appointmentId} />)}
			<CancelModal show={cancelModal} setShow={setCancelModal} status={status1} setStatus={setStatus1} />
			<ViewAppointment view={view} setView={setView} />
			{showModal.showIt && (<ConfirmDeletionModal setShowModal={setShowModal} showModal={showModal} onConfirm={handleDelete} />)}

			<div className='p-4'>
				<ToastContainer limit={1} autoClose={1500} />

				<table className='min-w-full table-fixed'>

					{/*//~ HEAD */}
					<thead className='bg-slate-700'>
						<tr>
							{
								tableHeaders.map((header, index) => (
									<th className="p-2 uppercase text-slate-100 cursor-pointer" key={index} onClick={() => setStatusValue({ ...statusValue, isClick: true })}>
										<p className={`${statusValue.isClick ? "hidden" : ""}`}>{header}</p>
									</th>
								))
							}
						</tr>
					</thead>
					{/*//~ HEAD */}


					{/*//~ BODY */}
					<tbody>
						{
							results
								// .filter((val)=>{ return statusValue.statusCode !== "" ? val.status === statusValue.statusCode && type !== "" :
								// statusValue.statusCode === "DONE" ? val.status === "DONE"  
								// : statusValue.statusCode === "APPROVED" ? val.status === "APPROVED" 
								// : val.status === "PENDING"})
								.slice((currentPage * 8) - 8, currentPage * 8)
								.map((result) => (
									<tr key={result.appointmentId} className='font-medium border text-cyan-900 even:bg-slate-100'>
										<td className='text-center capitalize'>
											{result.patient.firstname} {result.patient.middlename ? result.patient.middlename.charAt(0).concat(".") : ""} {result.patient.lastname}
										</td>
										<td className='text-center'>
											{moment(result.dateSubmitted).format("LL")}
										</td>
										<td className='text-center'>
											{moment(result.appointmentDate).format("LL")}
										</td>
										<td className='text-center'>
											{moment(result.timeStart, 'HH:mm:ss').format('h:mm A')}
										</td>
										<td className='text-center'>
											{moment(result.timeEnd, 'HH:mm:ss').format('h:mm A')}
										</td>
										<td className='text-center capitalize'>
											{
												status.selectedId === result.appointmentId && result.status !== "CANCELLED" && result.status !== "DONE" ?
													(
														<select name="status" value={result.status} className='p-2 border focus:border-blue-400 rounded focus:outline-none'
															onChange={(e) => {
																if (e.target.value === "CANCELLED") return cancelButton(result.appointmentId);
																const data = { status: e.target.value, description: "", patientId: result.patient.patientId, date: result.appointmentDate }
																statusSubmit(result.appointmentId, data);
															}}
															onBlur={() => setStatus({ ...status, selectedId: null })}
														>
															<option value="PENDING" disabled>Pending</option>
															<option value="APPROVED" >Approved</option>
														</select>
													)
													:
													(
														<span
															className={`
															${result.status === "PENDING" ? "bg-yellow-100 text-yellow-600 hover:bg-yellow-400"
																	:
																	result.status === "APPROVED" ? "bg-green-100 text-green-600 hover:bg-green-400"
																		:
																		result.status === "TREATMENT" ? "bg-red-100 text-red-600 hover:bg-red-400"
																			:
																			"bg-red-100 text-red-600"} 
																			transition-all ease-linear duration-150 py-1 px-3 rounded-full max-w-max mx-auto cursor-pointer hover:text-white`}
															onClick={() => {
																setStatus({
																	selectedId: result.appointmentId,
																	remarks: result.status,
																	isSelected: true,
																})
															}}>
															• {result.status.toLowerCase()}
														</span>
													)}
										</td>
										<td className='text-center'>
											{
												result.doneReadingTC ?
													<AiFillCheckSquare size={40} className='text-slate-500 m-auto' />
													:
													<input type="checkbox" />
											}
										</td>
										<td className='text-center p-4'>
											<div className='flex items-center justify-center gap-2 text-white'>
												<span className='transition-all ease-linear duration-150 rounded p-2 bg-blue-500 hover:bg-blue-700 text-white cursor-pointer flex items-center' onClick={() => updateButton(result)}>
													<AiFillEdit size={25} />
													<p className='pr-2'>Update</p>
												</span>

												{
													result.status !== "TREATMENT" && (
														<span className='transition-all ease-linear duration-150 rounded p-2 bg-orange-500 hover:bg-orange-700 cursor-pointer flex items-center' onClick={() => {
															setStatus1({ ...status1, selectedId: result.appointmentId })
															setCancelModal(true)
														}}>
															<MdCancel size={25} />
															<p className='pr-2'>Cancel</p>
														</span>
													)
												}

												<span className='transition-all ease-linear duration-150 rounded p-2 bg-red-500 hover:bg-red-700 cursor-pointer flex items-center' onClick={() => confirmDeletion(result.appointmentId, `${result.patient.firstname} ${result.patient.lastname}`)()}>
													<AiFillDelete size={25} />
													<p className='pr-2'>Delete</p>
												</span>

												<span className='transition-all ease-linear duration-150 rounded p-2 bg-gray-500 hover:bg-gray-700 cursor-pointer flex items-center' onClick={() => { navigate(`/admin/dashboard/appointment/details/${result.appointmentId}`) }}>
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
		</>
	)
}

export default AppointmentTable