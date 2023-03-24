import React from 'react';

function PageNotFound(props) {
    return (
        <div className='h-screen flex flex-grow justify-center items-center '>
            <div className=' w-[550px] relative flex flex-col justify-center items-center '>
                <div className=' w-auto text-[250px] relative top-14 font-black text-gray-800 '>
                    404
                </div>
                <h1 className=' uppercase text-2xl ' style={{letterSpacing:"4px"}} >page not found</h1>
                <p className=' mt-5 text-center '>The page you are looking for doesn't exist or an other error occurred. Kindly go back to the previous page.</p>
            </div>
        </div>
    );
}

export default PageNotFound;