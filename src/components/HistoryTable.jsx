import React from 'react';


function HistoryTable({tableHeaders, results, search, currentPage }) {
  
 console.log(results);
  return (
    <div className=' h-[550px] px-4 py-3 overflow-auto '>
        
        <table className='w-full  '>
            {/*Head*/}
            <thead className=' bg-gray-100 '>
                <tr className=" text-gray-600">
                {
                    tableHeaders.map((header, index)=>(
                        <th className='py-3 px-2 capitalize' key={index}>{header}</th>
                    ))
                }
                </tr>
            </thead>
            <tbody>
                {
                search.length > 0 ? 
                results
                //       firstItem         LastItem
                .slice((currentPage*8)-8,currentPage*8 )
                .map((result)=>(
                    <tr className='' key={result.historyId}>
                        <td className='p-2 text-center '>
                            {result.name}
                        </td>
                        <td className='p-2 text-center  '>
                            {result.description}
                        </td>
                        <td className='p-2 text-center '>
                            {result.appointmentDate}
                        </td>
                        <td className={`p-2 text-center capitalize ${result.status === "DONE" ? `text-green-500`:`text-red-500`}`} >
                            {result.status.toLowerCase()}
                        </td>
                    </tr> 
                ))
                :results
                    //       firstItem         LastItem
                    .slice((currentPage*8)-8,currentPage*8 )
                    .map((result)=>(
                        <tr className='' key={result.historyId}>
                            <td className='p-2 text-center '>
                                {result.name}
                            </td>
                            <td className='p-2 text-center '>
                                {result.dentist}
                            </td>
                            <td className='p-2 text-center  '>
                                {result.description}
                            </td>
                            <td className='p-2 text-center '>
                                {result.appointmentDate}
                            </td>
                            <td className={`p-2 text-center capitalize ${result.status === "DONE" ? `text-green-500`:`text-red-500`}`} >
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