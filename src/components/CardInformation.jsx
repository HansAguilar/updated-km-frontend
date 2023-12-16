import React from 'react'

function CardInformation({fromBG, toBG, iconColor, number,title,Icon,textColor}) {
  return (
    <div className={` rounded shadow-lg bg-gradient-to-tr ${fromBG} ${toBG} h-48 w-1/4 p-4 flex justify-between `}> 
            <div className={` ${textColor} h-full w-auto flex flex-col justify-center  gap-y-2 `}>
              <h1 className=' text-5xl font-semibold '>{number}</h1>
              <h3 className=' text-lg capitalize '>{title}</h3>
            </div>
            <div>
              <Icon size={100} className={`${iconColor}`}/>
            </div>
    </div>
  )
}

export default React.memo(CardInformation)