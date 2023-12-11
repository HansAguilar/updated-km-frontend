import React from 'react';

function HistoryTable({ tableHeaders, results, search, currentPage }) {
	return (
		<div className='p-5'>
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

				<tbody>
					{
						search.length > 0 ?
							results
								//       firstItem         LastItem
								.slice((currentPage * 8) - 8, currentPage * 8)
								.map((result, index) => (
									<tr className="font-medium border text-cyan-900 even:bg-slate-100" key={index}>
										<td className='text-center p-5 '>
											{result.name}
										</td>
										<td className='text-center p-5  '>
											{result.description}
										</td>
										<td className='text-center p-5 '>
											{result.appointmentDate}
										</td>
										<td className={`text-center p-5 capitalize ${result.status === "DONE" ? `text-green-500` : `text-red-500`}`} >
											{result.status.toLowerCase()}
										</td>
									</tr>
								))
							: results
								//       firstItem         LastItem
								.slice((currentPage * 8) - 8, currentPage * 8)
								.map((result, index) => (
									<tr className="font-medium border text-cyan-900 even:bg-slate-100" key={index}>
										<td className='text-center p-5'>
											{result.name}
										</td>
										<td className='text-center p-5'>
											{result.dentist}
										</td>
										<td className='text-center p-5'>
											{result.description}
										</td>
										<td className='text-center p-5'>
											{result.appointmentDate}
										</td>
										<td className={`text-center p-5 capitalize ${result.status === "DONE" ? `text-green-500` : `text-red-500`}`} >
											{result.status.toLowerCase()}
										</td>
									</tr>
								))
					}
				</tbody>
			</table>
		</div>
	)
}

export default HistoryTable