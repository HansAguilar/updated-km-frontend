import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { IoArrowBackSharp } from "react-icons/io5";
import ExcelButton from './MedicalRecordExcel';
import PDFButton from './PDFMedicalButton';
import { TEETH_LINK } from '../ApiLinks';
import axios from 'axios';

function ViewPatient(props) {
	const [headerNavigation, setHeaderNavigation] = useState("overview");
	const { id } = useParams();
	const navigate = useNavigate();
	const patient = useSelector((state) => { return state.patient.payload.find((val) => { return val.patientId === id }); });
	const appointment = useSelector((state) => {
		return state.appointment.payload
			.filter((val) => {
				return (val.patient.patientId === id);
			})
			.map((val) => {
				return { date: val.appointmentDate, time: `${moment(val.timeStart, "HH:mm").format("LT")} - ${moment(val.timeEnd, "HH:mm").format("LT")}`, dentist: `Dr. ${val.dentist.fullname}`, status: val.status, patient: `${val.patient.firstname} ${val.patient.lastname}` };
			});
	});

	const history = appointment.filter(val => val.status === "DONE" || val.status === "CANCELLED")
		.map(val => {
			return {
				date: moment(val.appointmentDate).format("L"),
				dentist: val.dentist,
				description: val.status === "DONE" ? `Appointment for ${val.patient} was successful` : `Appointment for ${val.patient} has been cancelled`,
				status: val.status
			}
		});


	const [teethList, setTeethList] = useState([]);
	const toothChart = [...Array(32)].map((_, idx) => {
		const filterTeeth = teethList.filter((val) => val.teethNumber === idx + 1 && val.status === "UNDER_TREATMENT");
		return {
			teethNumber: idx + 1,
			isUnderTreatment: filterTeeth.length > 0 ? true : false,
		}
	});
	const [teethHistory, setHistory] = useState([]);
	const teethHeader = ["Appointment Start", "Appointment End", "Services", "Status"]

	const selectTeethButton = (idx) => {
		const filteredSelectedTeeth = teethList.filter((val) => val.teethNumber === idx);
		setHistory(filteredSelectedTeeth);
	}

	useEffect(() => {
		const fetchTeeth = async () => {
			try {
				const response = await axios.get(`${TEETH_LINK}/${id}`);
				setTeethList(response.data);
			} catch (error) {

			}
		}
		fetchTeeth();
	}, []);


	const OverviewPage = () => {
		return (
			<section className='w-full h-full bg-white flex flex-col gap-4'>

				{/* TOOTH CHART */}
				<div className=' w-full flex flex-col gap-2 bg-red-300'>
					{/* UPPER TEETH */}
					<div className=' w-full flex flex-row justify-center items-start '>
						{
							toothChart.map((val, idx) => (
								<div key={idx} className={` px-5 py-8 rounded-b-2xl shadow-sm 
                                    ${val.isUnderTreatment ? ' bg-emerald-500 ' : 'bg-white'} 
                                    ${val.isUnderTreatment ? ' text-white ' : 'text-zinc-600'} 
                                    ${val.isUnderTreatment ? ' font-bold ' : ''} 
                                    cursor-pointer border-x-2`}
									onClick={() => selectTeethButton(val.teethNumber)}
								>
									<p>{val.teethNumber < 10 ? `0${val.teethNumber}` : val.teethNumber}</p>
								</div>
							)).slice(0, 16)
						}
					</div>

					{/* LOWER TEETH */}
					<div className=' w-full flex flex-row justify-center items-start '>
						{
							toothChart.map((val, idx) => (
								<div key={idx} className={` px-5 py-8 rounded-t-2xl shadow-sm 
                                    ${val.isUnderTreatment ? ' bg-emerald-500 ' : 'bg-white'} 
                                    ${val.isUnderTreatment ? ' text-white ' : 'text-zinc-600'} 
                                    cursor-pointer border-x-2`}
									onClick={() => selectTeethButton(val.teethNumber)}
								>
									<p>{val.teethNumber}</p>
								</div>
							)).slice(16, toothChart.length)
						}
					</div>
				</div>

				{
					teethHeader.length > 0 && (
						<div className=' bg-white rounded-md w-full h-full '>
							{/* HEADER */}
							<div className=' w-full grid grid-cols-4 bg-slate-700 border p-2 uppercase text-slate-100 even:bg-slate-100 '>
								{
									teethHeader.map((val, idx) => (
										<p key={idx} className='uppercase text-sm font-bold '>{val}</p>
									))
								}
							</div>

							<div className=' w-full h-full overflow-auto grid gap-3' >
								{
									teethHistory.map((val, idx) => (
										<div key={idx} className=' grid grid-cols-4 w-full '>
											<p className=' text-sm text-zinc-700 '>{moment(val.treatmentDate).format('MMM DD, YYYY')}</p>
											<p className='text-sm text-zinc-700 '>{moment(val.treatmentEnd).format('MMM DD, YYYY')}</p>
											<div className=' w-full flex flex-wrap gap-2 '>{
												val.appointment.dentalServices.map((val, idx) => (
													<p key={idx} className=' px-3 py-1 rounded-md w-auto bg-cyan-500 text-white capitalize text-sm'>{val.name.toLowerCase()}</p>
												))
											}</div>
											<p className=' capitalize text-sm text-zinc-700 '>{val.status === "UNDER_TREATMENT" ? "TREATMENT".toLowerCase() : val.status.toLowerCase()}</p>
										</div>
									))
								}
							</div>
						</div>
					)
				}
			</section>
		)
	}

	const HistoryPage = () => {
		return (

			<section className='w-full h-full flex flex-col '>
				{/* <div   div className=' w-full p-4 flex justify-between items-center '>
                            <div className=' inline-flex gap-2  '>
                                <ExcelButton users={history} title={`${patient.lastname} ${patient.firstname} medical history`} />
                                <PDFButton data={history} />
                            </div>    
                        </div> */}
				<section className=' w-full p-2 text-center text-white bg-slate-700 font-bold uppercase flex justify-around items-center '>
					<p className=' w-[200px] max-w-[200px] text-left '>Date</p>
					<p className=' w-[200px] max-w-[200px] text-left '>Dentist</p>
					<p className=' w-[200px] max-w-[200px] text-left '>Description</p>
					<p className=' w-[200px] max-w-[200px] text-right '>Status</p>
				</section>
				<section className=' w-full min-h-[490px] max-h-[490px] overflow-auto bg-white'>
					{
						history.map((val, idx) => (
							<div className=' w-full px-6 py-3 shadow-sm hover:bg-gray-100 text-cyan-900 flex justify-between items-center' key={idx}>
								<p className=' w-auto max-w-[100px] text-left '>{val.date}</p>
								<p className=' w-[200px] max-w-[200px] '>{val.dentist}</p>
								<p className=' w-[400px] max-w-[200px] text-left '>{val.description}</p>
								<p className={`
                                    ${val.status === "CANCELLED" ? "bg-red-500" : " bg-emerald-500 "}
                                     text-white px-5 py-1 capitalize rounded-full 
                                    `}>{val.status.toLowerCase()}</p>
							</div>
						))
					}
					{/* <div className=' w-full px-6 py-3 text-cyan-900 flex justify-between items-center'>
                                    <p>val.date</p>
                                    <p>val.time</p>
                                    <p>val.dentist</p>
                                    <p>val.status</p>
                                </div> */}
				</section>
			</section>
		)
	}

	const TreatementPage = () => {
		return (
			<section section className=' h-full flex flex-col flex-grow ' >
				<section className=' w-full px-6 py-3 text-white bg-slate-700 font-bold uppercase flex justify-around items-center '>
					<p>Date</p>
					<p>Time</p>
					<p>Dentist</p>
					<p>Status</p>
				</section>
				<section className=' w-full min-h-[490px] max-h-[490px] overflow-auto bg-white '>
					{
						appointment
							.filter((val) => {
								return (
									(val.status === "TREATMENT")
								);
							})
							.map((val, idx) => (
								<div className=' w-full px-6 py-3 shadow-sm hover:bg-gray-100 text-cyan-900 flex justify-between items-center' key={idx}>
									<p >{moment(val.date).format("MMMM DD YYYY")}</p>
									<p>{val.time}</p>
									<p>{val.dentist}</p>
									<p>{val.status}</p>
								</div>
							))
					}
					{/* <div className=' w-full px-6 py-3 text-cyan-900 flex justify-between items-center'>
                                    <p>val.date</p>
                                    <p>val.time</p>
                                    <p>val.dentist</p>
                                    <p>val.status</p>
                                </div> */}
				</section>
			</section >
		)
	}


	{/*//~ OVERVIEW */ }
	return teethList && (
		<section className='w-full'>

			{/*//~ HEADER */}
			<div className='w-full flex justify-between items-center p-4'>
				<div className='text-slate-600 font-bold flex justify-center items-center gap-1 cursor-pointer' onClick={() => navigate("/admin/dashboard/patient")}>
					<IoArrowBackSharp size={24} />
					<span className='text-xl'>Back</span>
				</div>

				<div className='flex rounded border-2 border-blue-500 divide-x divide-blue-500'>
					<p className={`px-6 w-fit py-2 cursor-pointer font-medium transition-all ease-linear duration-150 ${headerNavigation === "overview" ? "bg-blue-500 text-white" : " text-blue-600"}`} onClick={() => setHeaderNavigation("overview")} >Overview</p>
					<p className={`px-6 w-fit py-2 cursor-pointer font-medium transition-all ease-linear duration-150 ${headerNavigation === "history" ? "bg-blue-500 text-white" : " text-blue-600"}`} onClick={() => setHeaderNavigation("history")}>Dental history</p>
					<p className={`px-6 w-fit py-2 cursor-pointer font-medium transition-all ease-linear duration-150 ${headerNavigation === "treatment" ? "bg-blue-500 text-white" : " text-blue-600"}`} onClick={() => setHeaderNavigation("treatment")} >Treatment</p>
				</div>
			</div>
			{/*//~ HEADER */}


			<div className='p-4 flex gap-4 w-full'>

				{/*//~ PROFILE */}
				<div className='w-1/4 shadow rounded px-5 py-5 bg-white flex flex-col justify-center items-center gap-4'>

					{/*//~ IMAGE AND NAME */}
					<div className='flex flex-col gap-2'>
						<img src={patient.profile} className='w-44 h-44 rounded-full aspect-auto mx-auto' alt='patient profile' />
						<div className='flex flex-col gap-2 items-center'>
							<h3 className='text-3xl font-semibold text-cyan-900'>{patient.firstname.charAt(0).toUpperCase() + patient.firstname.substring(1)} {patient.lastname.charAt(0).toUpperCase() + patient.lastname.substring(1)}</h3>
							<p className='text-blue-500' >{patient.email}</p>
						</div>
					</div>
					{/*//~ IMAGE AND NAME */}


					<div className='divide-y flex items-center flex-col justify-between w-full'>
						{/*//~ GENDER */}
						<div className=' w-full flex justify-between p-2 border-gray-300 '>
							<p className='text-slate-800 font-medium'>Gender</p>
							<p className='capitalize text-slate-600'>{patient.gender}</p>
						</div>
						{/*//~ GENDER */}

						{/*//~ BIRTHDAY */}
						<div className=' w-full flex justify-between p-2 border-gray-300 '>
							<p className='text-slate-800 font-medium'>Birthday</p>
							<p className='capitalize text-slate-600'>{moment(patient.birthday).format("MMM DD, YYYY")}</p>
						</div>
						{/*//~ BIRTHDAY */}

						{/*//~ PHONE */}
						<div className=' w-full flex justify-between p-2 border-gray-300 '>
							<p className='text-slate-800 font-medium'>Phone</p>
							<p className='capitalize text-slate-600'>{patient.contactNumber}</p>
						</div>
						{/*//~ PHONE */}

						{/*//~ ADDRESS */}
						<div className=' w-full flex justify-between p-2 border-gray-300 '>
							<p className='text-slate-800 font-medium'>Address</p>
							<p className='capitalize text-slate-600'>{patient.address}</p>
						</div>
						{/*//~ ADDRESS */}
					</div>
				</div>
				{/*//~ PROFILE */}

				<div className='w-9/12'>
					{headerNavigation === "overview" ? <OverviewPage /> : headerNavigation === "history" ? <HistoryPage /> : <TreatementPage />}
				</div>
			</div>


		</section>
	);
}

export default ViewPatient;