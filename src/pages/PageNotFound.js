import React from 'react';
import notfound from '../assets/notfound.png';

function PageNotFound(props) {
    return (
        <div className='flex items-center justify-center flex-col relative'>
            <img src={notfound} className='w-full aspect-auto object-contain absolute left-0 top-[115px]' />
            <h1 className='max-w-max text-[10rem] font-black text-slate-500'>
                404
            </h1>
            <h1 className=' uppercase text-3xl tracking-wider'  >page not found</h1>
            <p className=' mt-5 text-center text-2xl'>The page you are looking for doesn't exist or an other error occurred. <br></br>Kindly go back to the previous page.</p>
        </div>
    );
}

export default PageNotFound;