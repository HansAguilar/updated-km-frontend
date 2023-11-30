import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { IoArrowBackSharp } from "react-icons/io5";
import { TEETH_LINK } from '../ApiLinks';
import axios from 'axios';
import PDFPatientRecord from "../components/PDFPatientRecord";

function ViewPatient(props) {
	const [headerNavigation, setHeaderNavigation] = useState("overview");
	const { id } = useParams();
	const navigate = useNavigate();
	const patient = useSelector((state) => { return state.patient.payload.find((val) => { return val.patientId === id }); });
	const payment = useSelector((state)=>state.payment.payload.filter((val)=>val.patient.patientId===id));
	const appointment = useSelector((state) =>state.appointment.payload.filter((val) =>val.patient.patientId === id)); 

	// TREATMENT
	const headerTreatment = ["Date", "Tooth No.","Dentist", "Procedure", "Amount Charged", "Amount Paid", "Balance","status"];
	const history = appointment.filter(val => val.status === "DONE" || val.status === "CANCELLED")
		.map(val => {
			return {
				date: moment(val.appointmentDate).format("L"),
				dentist: `Dr. ${val.dentist.fullname}`,
				description: val.status === "DONE" ? `Appointment was successful` : `${val.cancellation}`,
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
	const teethHeader = ["Appointment Start", "Appointment End", "Services", "Status"];
	const [treatmentRenderData, setTreatmentRenderData] = useState([]);

	const fetchData = ()=>{
		const result = payment
		.filter((val)=>val.appointment.status==="TREATMENT" || val.appointment.status==="TREATMENT_DONE")
		.map((paymentData)=>{
			const teethResult = teethList?.filter((val)=>val.appointment.appointmentId===paymentData.appointment.appointmentId).map((val)=>val.teethNumber);
			let procedure="";
			for(let x = 0; x < paymentData.appointment.dentalServices.length; x++){
				procedure = procedure.concat(paymentData.appointment.dentalServices[x].name+ ", ");
			}
			let teethPrinter="";
			for(let x = 0; x < teethResult.length; x++){
				teethPrinter = teethPrinter.concat(teethResult[x]+ " ");
			}
			return {
				date:paymentData.appointment.appointmentDate,
				procedure: procedure,
				teeth: teethPrinter,
				dentist: `Dr. ${paymentData.appointment.dentist.fullname}`,
				amountCharged: paymentData.amountCharge,
				amountPaid: paymentData.totalPayment,
				balance:paymentData.balance,
				status:paymentData.appointment.status
			};
		})
		setTreatmentRenderData(result);
	}
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
	
	useEffect(() => {
		fetchData();
	}, [teethList]);
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

				<table className='table-fixed relative text-center'>
					<thead className='bg-slate-700'>
						<tr>
							{
								teethHeader.map((val, idx) => (
									<th key={idx} className='p-2 uppercase text-slate-100'>{val}</th>
								))
							}
						</tr>
					</thead>

					{
						teethHistory.length > 0 ?
							<tbody>
								{
									teethHistory.map((val, idx) => (
										<tr key={idx} className='font-medium border text-slate-900 even:bg-slate-100'>
											<td className='text-zinc-700 '>{moment(val.treatmentDate).format('MMM DD, YYYY')}</td>
											<td className='text-zinc-700 '>{moment(val.treatmentEnd).format('MMM DD, YYYY')}</td>
											<td className='flex gap-2 justify-center p-2'>{
												val.appointment.dentalServices.map((val, idx) => (
													<span key={idx} className=' p-2 rounded-md w-auto bg-blue-400 text-white capitalize'>{val.name.toLowerCase()}</span>
												))
											}
											</td>
											<td className=' capitalize text-zinc-700 '>{val.status === "UNDER_TREATMENT" ? "TREATMENT".toLowerCase() : val.status.toLowerCase()}</td>
										</tr>
									))
								}
							</tbody>
							:
							<h2 className='absolute top-1/2 text-center text-xl text-slate-400 w-full'>Sorry, no data found!</h2>
					}

				</table >
			</section >
		)
	}

	const HistoryPage = () => {
		const headerHistory = ["Date", "Dentist", "Description", "Status"];

		return (
			<section className='w-full h-full flex flex-col bg-white'>
				<table className='table-fixed relative text-center'>
					<thead className='bg-slate-700'>
						<tr>
							{
								headerHistory.map((val, idx) => (
									<th key={idx} className='p-2 uppercase text-slate-100'>{val}</th>
								))
							}
						</tr>
					</thead>

					{
						history.length > 0 ?
							<tbody>
								{
									history.map((val, idx) => (
										<tr key={idx} className='font-medium border text-slate-900 even:bg-slate-100'>
											<td>{val.date}</td>
											<td>{val.dentist}</td>
											<td>{val.description}</td>
											<td className='flex gap-2 justify-center p-2'>
												<span className={`${val.status === "CANCELLED" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"} py-1 px-3 rounded-full max-w-max mx-auto capitalize`}>• {val.status.toLowerCase()}</span>
											</td>
										</tr>
									))
								}
							</tbody>
							:
							<h2 className='absolute top-1/2 text-center text-xl text-slate-400 w-full'>Sorry, no data found!</h2>
					}
				</table>

				{/* <div   div className=' w-full p-4 flex justify-between items-center '>
                            <div className=' inline-flex gap-2  '>
                                <ExcelButton users={history} title={`${patient.lastname} ${patient.firstname} medical history`} />
                                <PDFButton data={history} />
                            </div>    
                        </div> */}
				{/* <div className=' w-full px-6 py-3 text-cyan-900 flex justify-between items-center'>
                                    <p>val.date</p>
                                    <p>val.time</p>
                                    <p>val.dentist</p>
                                    <p>val.status</p>
                                </div> */}
			</section>
		)
	}

	const TreatementPage = () => {
		
		return (
			<section section className='bg-white h-full flex flex-col flex-grow ' >

				<table className='table-fixed relative text-center'>
					<thead className='bg-slate-700'>
						<tr>
							{
								headerTreatment.map((val, idx) => (
									<th key={idx} className='p-2 uppercase text-slate-100'>{val}</th>
								))
							}
						</tr>
					</thead>

					{
						appointment.length > 0 ?
							<tbody>
								{
									treatmentRenderData
										.map((val, idx) => (


											<tr key={idx} className='font-medium border text-slate-900 even:bg-slate-100'>
												<td>{moment(val.date).format("MMMM DD YYYY")}</td>
												<td>{val.teeth}</td>
												<td>{val.dentist}</td>
												<td>{val.procedure}</td>
												<td>Php. {val.amountCharged.toLocaleString()}</td>
												<td>Php. {val.amountPaid.toLocaleString()}</td>
												<td>Php. {val.balance.toLocaleString()}</td>
												<td>{val.status === "TREATMENT_DONE" ? "DONE" : "PENDING"}</td>
											</tr>
										))
								}
							</tbody>
							:
							<h2 className='absolute top-1/2 text-center text-xl text-slate-400 w-full'>Sorry, no data found!</h2>
					}
				</table>
				{/* <div className=' w-full px-6 py-3 text-cyan-900 flex justify-between items-center'>
                                    <p>val.date</p>
                                    <p>val.time</p>
                                    <p>val.dentist</p>
                                    <p>val.status</p>
                                </div> */}
			</section >
		)
	}

	console.log(treatmentRenderData);

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
				<div className='w-1/4 shadow rounded p-5 bg-white flex flex-col justify-center items-center gap-4'>

					{/*//~ IMAGE AND NAME */}
					<div className='flex flex-col gap-2'>
						<img src={patient.profile} className='w-44 h-44 rounded-full aspect-auto mx-auto' alt='patient profile' />
						<div className='flex flex-col gap-2 items-center'>
							<h3 className='text-3xl font-semibold text-cyan-900'>{patient.firstname.charAt(0).toUpperCase() + patient.firstname.substring(1)} {patient.lastname.charAt(0).toUpperCase() + patient.lastname.substring(1)}</h3>
						</div>
						<PDFPatientRecord patient={patient} tableHeaderList={headerTreatment} data={treatmentRenderData} type="patient" />
					</div>
					{/*//~ IMAGE AND NAME */}


					<div className='divide-y flex items-center flex-col justify-between w-full gap-4'>
						{/*//~ GENDER */}
						<div className=' w-full flex justify-between p-2 border-gray-300 '>
							<p className='text-slate-800 font-medium'>Gender</p>
							<p className='capitalize text-slate-600'>{patient.gender}</p>
						</div>
						{/*//~ GENDER */}

						{/*//~ EMAIL */}
						<div className=' w-full flex justify-between p-2 border-gray-300 '>
							<p className='text-slate-800 font-medium'>Email</p>
							<p className='text-slate-600'>{patient.email.toLowerCase()}</p>
						</div>
						{/*//~ EMAIL */}

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
						<div className=' w-full flex justify-between p-2 border-gray-300'>
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