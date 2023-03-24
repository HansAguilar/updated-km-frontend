import React from 'react';

function InputField({type,name,value,handleOnChange}) {
    return (
        <div>
            <p className=' font-bold text-gray-600 capitalize'>{name}</p>
                <input type={type} name={name} value={value} className=' border border-gray-500 px-4 py-3 w-full focus:outline-none ' onChange={(e)=>handleOnChange(e)}/>
        </div>
    );
}

export default InputField;