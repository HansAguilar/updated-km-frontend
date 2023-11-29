import React, { useState } from 'react';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import UpdateDentistModal from './UpdateServicesModal';
import axios from 'axios';
import { SERVICES_LINK } from '../ApiLinks';
import { useDispatch } from 'react-redux';
import { deleteService } from "../redux/action/ServicesAction";
import { ToastContainer } from 'react-toastify';

function ServiceTable({ tableHeaders, results, search, currentPage }) {
	const dispatch = useDispatch();
	const [update, setUpdateModal] = useState(false);
	const [data, setData] = useState({
		serviceId: "",
		name: "",
		type: "",
		description: "",
		duration: "00:30:00",
		price: 0
	});

	const disableAccountBtn = async (id, disable) => {
		try {
			const newDisableInformation = { id: id, verified: disable };
			await axios.post(`${SERVICES_LINK}disable`, newDisableInformation, {
				headers: { Accept: 'application/json' },
			});
			alert(`Disable${disable ? '' : 'd'} Account Successfully!`);
			window.location.reload();
		} catch (err) {
			console.log(err);
		}
	};

	const deleteButton = async (id) => {
		dispatch(deleteService(id));
	}

	const updateBtn = (serviceId, name, type, description, duration, price) => {
		setData({
			...data,
			serviceId: serviceId,
			name: name,
			type: type,
			description: description,
			duration: duration,
			price: price,
		})
		setUpdateModal(true);
	}

	return (
		<>
			<UpdateDentistModal show={update} setModal={setUpdateModal} setData={setData} data={data} />
			<ToastContainer limit={1} autoClose={1500} />

			<div className='p-4'>
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
										<tr className='font-medium border text-cyan-900 even:bg-slate-100' key={result.serviceId}>
											<td className=' text-center capitalize '>
												{result.name}
											</td>
											<td className='text-center capitalize'>
												{result.type}
											</td>
											<td className='text-center'>
												{result.duration === "00:30:00" ? "30 Min" : "1 Hour"}
											</td>
											<td className='text-center'>
												{result.price}
											</td>
											{/* <td className='text-center'>
												{
													result.isAvailable ?
														<p
															className=' px-1 py-2 cursor-pointer rounded-md bg-cyan-500 text-white '
															onClick={() => disableAccountBtn(result.serviceId, false)}
														>
															Disable
														</p>
														: <p
															className=' px-1 py-2 cursor-pointer rounded-md bg-red-500 hover:bg-red-700 text-white '
															onClick={() => disableAccountBtn(result.serviceId, true)}
														>
															Available
														</p>
												}
											</td> */}
											<td className='text-center p-3'>
												<div className='flex items-center justify-center gap-2'>
													<span className='transition-all ease-linear duration-150 rounded p-2 bg-blue-500 hover:bg-blue-700 text-white cursor-pointer flex items-center' onClick={() => updateBtn(
														result.serviceId,
														result.name,
														result.type,
														result.description,
														result.duration,
														result.price
													)}>
														<AiFillEdit size={25} />
														<p className='pr-2'>Update</p>
													</span>

													<span className='transition-all ease-linear duration-150 rounded p-2 bg-red-500 hover:bg-red-700 text-white cursor-pointer flex items-center' onClick={() => deleteButton(result.serviceId)}>
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
										<tr className='font-medium border text-cyan-900 even:bg-slate-100' key={result.serviceId}>
											<td className='text-center'>
												{result.name}
											</td>
											<td className='text-center capitalize'>
												{result.type}
											</td>
											<td className='text-center'>
												{result.duration === "00:30:00" ? "30 Min" : "1 Hour"}
											</td>
											<td className='text-center'>
												{result.price}
											</td>
											<td className='text-center p-3'>
												<div className='flex items-center justify-center gap-2'>
													<span className='transition-all ease-linear duration-150 rounded p-2 bg-blue-500 hover:bg-blue-700 text-white cursor-pointer flex items-center' onClick={() => updateBtn(
														result.serviceId,
														result.name,
														result.type,
														result.description,
														result.duration,
														result.price
													)}>
														<AiFillEdit size={25} />
														<p className='pr-2'>Update</p>
													</span>

													<span className='transition-all ease-linear duration-150 rounded p-2 bg-red-500 hover:bg-red-700 text-white cursor-pointer flex items-center' onClick={() => deleteButton(result.serviceId)}>
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
			</div >
		</>
	)
}

export default ServiceTable