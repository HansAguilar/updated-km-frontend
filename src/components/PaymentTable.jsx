import React from 'react';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import moment from 'moment/moment';

function PaymentTable({ tableHeaders, results, search, currentPage, setUpdateModal, updateData, setUpdateData, acceptData, setAcceptData }) {
	return (
		<>
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
									.map((result) => (
										<tr className='font-medium border text-cyan-900 even:bg-slate-100' key={result.paymentId}>
											<td className='p-2 text-center flex justify-center '>
												<img src={result.appointment.patient.profile} className='m-auto w-14 h-14 rounded-full object-fill aspect-auto border border-gray-400' alt="User" />
											</td>
											<td className=' text-center capitalize '>
												{`${result.appointment.patient.firstname} ${!result.appointment.patient.middlename ? "" : result.appointment.patient.middlename.charAt(0).concat(".")} ${result.appointment.patient.lastname}`}
											</td>
											<td className='text-center'>
												{moment(result.appointment.appointmentDate).format("MMMM DD, YYYY")}
											</td>
											<td className='text-center'>
												{result.method}
											</td>
											<td className='text-center capitalize'>
												{result.type}
											</td>
											<td className='text-center'>
												{result.totalPayment}
											</td>
											<td className='text-center capitalize'>
												<span className={`py-1 px-3 rounded-full max-w-max mx-auto ${result.status.toLowerCase() === 'pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'}`}>• {result.status.toLowerCase()}</span>
											</td>
											<td className='text-center p-4'>
												<div className='flex items-center justify-center gap-2'>
													<span className='transition-all ease-linear duration-150 rounded p-2 bg-blue-500 hover:bg-blue-700 text-white cursor-pointer flex items-center' onClick={() => {
														setUpdateData({ ...updateData, id: result.paymentId, method: result.method ? result.method : "", totalPayment: result.totalPayment })
														setUpdateModal(true);
													}}>
														<AiFillEdit size={25} />
														<p className='pr-2'>Update</p>
													</span>
												</div>
											</td>
										</tr>
									))
								: results
									//       firstItem         LastItem
									.slice((currentPage * 8) - 8, currentPage * 8)
									.map((result) => (
										<tr className='font-medium border text-cyan-900 even:bg-slate-100' key={result.paymentId}>
											<td className='p-2 text-center flex justify-center '>
												<img src={result.appointment.patient.profile} className='m-auto w-14 h-14 rounded-full object-fill aspect-auto border border-gray-400' alt="User" />
											</td>
											<td className=' text-center capitalize '>
												{`${result.appointment.patient.firstname} ${!result.appointment.patient.middlename ? "" : result.appointment.patient.middlename.charAt(0).concat(".")} ${result.appointment.patient.lastname}`}
											</td>
											<td className='text-center'>
												{moment(result.appointment.appointmentDate).format("MMMM DD, YYYY")}
											</td>
											<td className='text-center'>
												{result.method}
											</td>
											<td className='text-center capitalize'>
												{result.type}
											</td>
											<td className='text-center'>
												Php. {result.totalPayment.toLocaleString()}
											</td>
											<td className='text-center capitalize'>
												<span className={`py-1 px-3 rounded-full max-w-max mx-auto ${result.status.toLowerCase() === 'pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'}`}>• {result.status.toLowerCase()}</span>
											</td>
											<td className='text-center p-4'>
												<div className='flex items-center justify-center gap-2'>
													<span className='transition-all ease-linear duration-150 rounded p-2 bg-blue-500 hover:bg-blue-700 text-white cursor-pointer flex items-center' onClick={() => {
														setUpdateData({ ...updateData, id: result.paymentId, method: result.method ? result.method : "", totalPayment: result.totalPayment })
														setUpdateModal(true);
													}}>
														<AiFillEdit size={25} />
														<p className='pr-2'>Update</p>
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

export default PaymentTable