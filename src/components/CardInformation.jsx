import React from 'react'

function CardInformation({background, iconColor, number,title,Icon}) {
  return (
    <div className={` rounded-md shadow-lg ${background} h-48 w-1/4 p-4 flex justify-between `}> 
            <div className=' text-white h-full w-auto flex flex-col justify-center  gap-y-2 '>
              <h1 className=' text-5xl font-semibold '>{number}</h1>
              <h3 className=' text-lg capitalize '>{title}</h3>
            </div>
            <div>
              <Icon size={150} className={`${iconColor}`}/>
            </div>
    </div>
  )
}

export default CardInformation