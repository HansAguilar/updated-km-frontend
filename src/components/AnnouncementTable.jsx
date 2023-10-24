import React, { useState } from 'react';
import Update from './UpdateAnnouncement';
import axios from 'axios';
import { ANNOUNCEMENT_LINK } from '../ApiLinks';
import { ToastContainer } from 'react-toastify';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { toastHandler } from '../ToastHandler';

function AnnouncementTable({ tableHeaders, results, search, currentPage }) {
	const [details, setDetails] = useState(null);
	const [update, setUpdate] = useState(false);

	const deleteAnnouncement = async (id) => {
		try {
			await axios.delete(`${ANNOUNCEMENT_LINK}/${id}`)
			toastHandler("success", "Successfully deleted!")
			return window.setTimeout(() => {
				window.location.reload();
			}, 1500)
		}
		catch (error) {
			console.log(error);
		}
	}

	const disableAccountBtn = async (id, disable) => {
		try {
			const newDisableInformation = { id: id, verified: disable };
			await axios.put(`${ANNOUNCEMENT_LINK}/disable`, newDisableInformation, {
				headers: { Accept: 'application/json' },
			});
			toastHandler("success", `Disable${disable ? '' : 'd'} Account Successfully!}`)

			return window.setTimeout(() => {
				window.location.reload();
			}, 1500)
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className='p-4'>
			<ToastContainer limit={1} autoClose={1500} />
			<Update show={update} setModal={setUpdate} details={details} setDetails={setDetails} />

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
						results.map((val) => (
							<tr key={val.announcementId} className='font-medium border text-cyan-900'>
								<td className='py-2 text-center flex justify-center '>
									<img src={val.picture} className='m-auto w-28 h-28 object-fill aspect-auto ' alt="User" />
								</td>
								<td className=' text-center capitalize '>
									{val.title}
								</td>
								<td className='text-center'>
									{val.description}
								</td>
								<td className='text-center capitalize'>
									{val.type.toLowerCase()}
								</td>
								<td className='text-center'>
									{
										val.isAvailable ?
											<span className='p-2 rounded bg-red-500 text-white cursor-pointer' onClick={() => { disableAccountBtn(val.announcementId, false) }} >Disabled</span> :
											<span className='p-2 rounded bg-green-500 text-white cursor-pointer' onClick={() => { disableAccountBtn(val.announcementId, true) }}>Enabled</span>
									}
								</td>
								<td className='text-center'>
									<div className='flex items-center justify-center gap-2'>
										<span className='transition-all ease-linear duration-150 rounded p-2 bg-blue-500 hover:bg-blue-700 text-white cursor-pointer flex items-center'
											onClick={() => {
												setDetails({
													...details,
													id: val.announcementId,
													title: val.title,
													type: val.type,
													description: val.description,
													picture: val.picture
												})
												setUpdate(true)
											}}>
											<AiFillEdit size={25} />
											<p className='pr-2'>Update</p>
										</span>

										<span className='transition-all ease-linear duration-150 rounded p-2 bg-red-500 hover:bg-red-700 text-white cursor-pointer flex items-center' onClick={() => { deleteAnnouncement(val.announcementId) }}>
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
	)
}

export default AnnouncementTable