import React from 'react'

function FileIcons({Icon, title, eventHandler}) {
  return (
    <div className=' text-gray-600 flex items-center gap-x-1 border border-gray-600 py-1 px-3 rounded-sm cursor-pointer hover:bg-cyan-700 hover:text-white hover:border-cyan-700 ' onClick={eventHandler}>
        <Icon size={20} />
        <p>{title}</p>
    </div>
  )
}

export default FileIcons