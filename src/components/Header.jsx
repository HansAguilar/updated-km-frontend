import React, { useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoNotificationsSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { createNotification } from "../redux/action/NotificationAction";
import * as io from "socket.io-client";
import { SOCKET_LINK } from '../ApiLinks';
import { BsCalendar2Check } from "react-icons/bs";
// BsCalendar2Check

const socket = io.connect(SOCKET_LINK);
function Header({ toggleBar, setToggleBar }) {
  const [isNotificationToggle, setNotificationToggle] = useState(false);
  const { loginAdmin } = useSelector((state) => { return state.admin; });
  const notification = useSelector((state) => { return state.notification.payload; });
  const dispatch = useDispatch();
  const toggleMenuEvent = () => {
    if (toggleBar) return setToggleBar(false);
    setToggleBar(true)
  }

  useEffect(() => {
    socket.on(("receive_notification"), (data) => {
      dispatch(createNotification(data.value))
    })
    return () => {
      socket.off();
    }
  }, [socket])

  const countUnread = notification.filter(val => {
    return val.status === "UNREAD";
  })

  return (
    <div className=' w-full h-auto sticky top-0 z-50  bg-transparent ' >
      <div className=' bg-zinc-100 p-4 shadow-sm flex justify-between items-center '>
        <GiHamburgerMenu onClick={toggleMenuEvent} size={30} className=' text-blue-400 cursor-pointer ' />
        <div className='flex justify-between items-center'>
          <h3 className=' text-cyan-900 '>Hello, <span className='font-semibold'>{loginAdmin?.firstname}</span></h3>
          <div className=' relative w-12 h-12 flex justify-center items-center ' >
            <IoNotificationsSharp size={30} className=' text-blue-400 cursor-pointer ' onClick={() => setNotificationToggle((state) => { return !state; })} />
            {
              countUnread.length !== 0 && (
                <div className=' w-5 h-5 absolute bg-red-600 p-1 rounded-full flex items-center justify-center bottom-2 right-1 '>
                  <span className=' text-white font-bold '>{notification.length}</span>
                </div>
              )
            }
          </div>
        </div>
      </div>

      {/* NOTIFICATION BOX */}
      {
        isNotificationToggle && (
          <div className=' bg-white w-96 h-96 max-h-96  overflow-auto absolute rounded-br-md rounded-bl-md shadow-lg top-20 right-5 p-3 z-30 '>
            {
              notification.map((data, idx) => (
                <div key={idx} className={`w-full ${data.status === "READ" ? "bg-white" : "bg-zinc-100"}  flex gap-3 px-3 py-2 `}>
                  <div className={` bg-cyan-400 p-3 `}>
                    <BsCalendar2Check size={25} className=' text-white ' />
                  </div>
                  <p className=' text-sm text-zinc-600'>{data.description}</p>
                </div>
              ))
            }
          </div>
        )
      }
    </div>
  )
}

export default Header