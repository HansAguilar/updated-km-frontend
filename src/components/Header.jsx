import React, { useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoNotificationsSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewNotification } from "../redux/action/NotificationAction";
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
    socket.on("receive_notification", (data) => {
      const parseData = JSON.parse(data);
      dispatch(fetchNewNotification(parseData.value))
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
        <GiHamburgerMenu onClick={toggleMenuEvent} size={30} className=' text-blue-500 cursor-pointer ' />

        <div className='flex justify-between items-center'>
          <h3 className=' text-cyan-900 '>Hello, <span className='font-semibold'>{loginAdmin?.firstname}</span></h3>

          <div className=' relative h-12 flex justify-center items-center max-w-max cursor-pointer' onClick={() => setNotificationToggle((state) => { return !state; })}>
            <IoNotificationsSharp size={30} className=' text-blue-500 ' />
            {
              countUnread.length !== 0 && (
                <div className=' w-4 h-4 absolute bg-red-600 p-1 rounded-full flex items-center justify-center bottom-2 right-1 '>
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
          <div className=' bg-slate-100 w-96 h-96 max-h-96 overflow-auto absolute rounded shadow-xl border-2 top-16 right-5 p-3 z-30 flex flex-col-reverse gap-4 '>
            {
              notification.map((data, idx) => (
                <div key={idx} className={`w-full ${data.status === "READ" ? "bg-white" : "bg-slate-200"}  flex gap-3 p-4 `}>
                  <div className="bg-blue-400 p-3">
                    <BsCalendar2Check size={25} className=' text-white ' />
                  </div>
                  <p className=' text-sm text-slate-600'>{data.description}</p>
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