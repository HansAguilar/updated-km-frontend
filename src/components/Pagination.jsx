import React from 'react';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';

function Pagination({ setCurrentPage, pageNumber }) {
    return (
        <div className='py-3 flex justify-center '>
            <button className='py-2 px-4 text-blue-900 border-gray-500 cursor-pointer flex items-center hover:bg-blue-600 hover:text-white ' onClick={() => { setCurrentPage(prev => prev === 1 ? prev = 1 : prev -= 1) }} >
                <AiFillCaretLeft />
            </button>
            {
                pageNumber.map((page, index) => (
                    <button key={index} className='py-2 px-4 text-blue-900 border-gray-500 cursor-pointer flex items-center hover:bg-blue-600 hover:text-white' onClick={() => { setCurrentPage(page) }} >
                        {page}
                    </button>
                ))
            }
            <button className='py-2 px-4 text-blue-900 border-gray-500 cursor-pointer flex items-center hover:bg-blue-600 hover:text-white'>
                <AiFillCaretRight onClick={() => { setCurrentPage(prev => prev === pageNumber.length ? prev = pageNumber.length : prev += 1) }} />
            </button>
        </div>
    )
}

export default Pagination