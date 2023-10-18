import React from 'react';
import { ToastContainer } from 'react-toastify';
import moment from 'moment/moment';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { deleteSchedule } from "../redux/action/ScheduleAction";

function ScheduleTable({ tableHeaders, results, setInfo, setModal }) {
	const dispatch = useDispatch();
	const updateButton = (val) => {
		setInfo(val);
		setModal(true);
	}
	return (
		<div className='p-4'>
			<table className='min-w-full table-fixed'>
				<ToastContainer limit={1} autoClose={1500} />

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
						results
							.map((result) => (
								<tr className='font-medium border text-cyan-900' key={result.serviceId}>
									<td className='text-center'>
										{`Dr. ${result.dentist.fullname}`}
									</td>
									<td className='text-center'>
										{moment(result.dateSchedule).format(`LL`)}
									</td>
									<td className='text-center capitalize'>
										{moment(result.timeStart, "HH:mm:ss").format("LT")}
									</td>
									<td className='text-center'>
										{moment(result.timeEnd, "HH:mm:ss").format("LT")}
									</td>
									<td className='text-center p-4'>
										<div className='flex items-center justify-center gap-2'>
											<span className='transition-all ease-linear duration-150 rounded p-2 bg-blue-500 hover:bg-blue-700 text-white cursor-pointer flex items-center' onClick={() => updateButton(result)}>
												<AiFillEdit size={25} />
												<p className='pr-2'>Update</p>
											</span>

											<span className='transition-all ease-linear duration-150 rounded p-2 bg-red-500 hover:bg-red-700 text-white cursor-pointer flex items-center' onClick={() => dispatch(deleteSchedule(result.scheduleId))}>
												<AiFillDelete size={25} />
												<p className='pr-2'>Delete</p>
											</span>
										</div>
									</td>
								</tr>
							))}
				</tbody>
			</ table>
		</div>
	);
}


export default ScheduleTable;