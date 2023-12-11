import React, { useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoNotificationsSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewNotification, readPatientNotification } from "../redux/action/NotificationAction";
import * as io from "socket.io-client";
import { SOCKET_LINK } from '../ApiLinks';
import { BsCalendar2Check } from "react-icons/bs";
// BsCalendar2Check
import moment from 'moment/moment';

const socket = io.connect(SOCKET_LINK);
function Header({ toggleBar, setToggleBar, setNotificationToggleModal, notificationToggle }) {
  const [isNotificationToggle, setNotificationToggle] = useState(false);
  const { loginAdmin } = useSelector((state) => { return state.admin; });

  const notificationCounter = useSelector((state) => {
    return state.notification.payload.filter(val => {
      return val.status === "UNREAD";
    });
  });

  const notification = useSelector((state) => { return state.notification.payload });
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
    return () => { socket.off(); }
  }, [socket])

  const readNotification = (data) => {
    dispatch(readPatientNotification(data.notificationId, notificationToggle, setNotificationToggleModal));
    setNotificationToggle(false);
  }

  return (
    <div className=' w-full h-auto sticky top-0 z-10  bg-transparent ' >
      <div className=' bg-zinc-100 p-4 shadow-sm flex justify-between items-center '>
        <GiHamburgerMenu onClick={toggleMenuEvent} size={30} className=' text-blue-500 cursor-pointer ' />

        <div className='flex justify-between items-center'>
          <h3 className=' text-cyan-900 text-lg pr-4'>Hello, <span className='font-semibold'>{loginAdmin?.firstname}</span></h3>

          <div className=' relative h-12 flex justify-center items-center max-w-max cursor-pointer' onClick={() => setNotificationToggle((state) => { return !state; })}>
            <IoNotificationsSharp size={30} className=' text-blue-500 ' />
            {
              notificationCounter.length > 0 && (
                <div className=' w-4 h-4 absolute bg-red-600 p-1 rounded-full flex items-center justify-center bottom-2 right-1 '>
                </div>
              )
            }
          </div>

        </div>
      </div>

      {/* NOTIFICATION BOX */}
      {
        isNotificationToggle && (
          <div className=' bg-slate-100 w-96 h-96 max-h-96 overflow-auto absolute rounded shadow-xl top-16 right-5 z-30 flex flex-col border-2 border-[#BEBEBE]'>
            {
              notification.map((data, idx) => (
                <div key={idx} className={`flex items-start p-6 border-b-2 border-b-[#BEBEBE] w-full cursor-pointer ${data.status === "READ" ? "bg-white" : "bg-[#ECF8FE]"} hover:bg-[#f2f2f2] flex gap-4`} onClick={() => readNotification(data)}>
                  <BsCalendar2Check size={35} className=' text-blue-400 ' />
                  <div>
                    <div className='flex items-center gap-2'>
                      <p className='text-sm text-slate-500'>{moment(data.date).format(`LL`)}</p>
                      <p className='text-sm text-slate-500'>•</p>
                      <p className='text-sm text-slate-500'>{moment(data.time, "HH:mm:ss").format('h:mm a')}</p>
                    </div>
                    <p className={`${data.status === "READ" ? "font-normal" : "font-medium"} text-sm text-slate-900 font-medium`}>{data.description}</p>
                  </div>
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