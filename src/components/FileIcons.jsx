import React from 'react'

function FileIcons({Icon, title, eventHandler}) {
  return (
    <div className='flex gap-2 items-center p-2 border border-slate-300 hover:border-blue-800 hover:bg-blue-600 hover:text-white cursor-pointer rounded' onClick={eventHandler}>
        <Icon size={20} />
        <p>{title}</p>
    </div>
  )
}

export default FileIcons