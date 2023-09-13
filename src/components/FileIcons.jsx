import React from 'react'

function FileIcons({Icon, title, eventHandler}) {
  return (
    <div className=' text-cyan-900 flex items-center gap-x-1 border border-cyan-900 py-1 px-3 rounded-sm cursor-pointer hover:bg-white hover:text-cyan-700 hover:border-cyan-900 ' onClick={eventHandler}>
        <Icon size={20} />
        <p>{title}</p>
    </div>
  )
}

export default FileIcons