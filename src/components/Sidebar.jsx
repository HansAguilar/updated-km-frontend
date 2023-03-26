import React from 'react';
import SidebarIcon from './SidebarIcon';
import { NavLink } from 'react-router-dom';
import { AiFillHome, AiFillMessage, AiOutlineSchedule } from 'react-icons/ai';
import { FaUserAlt, FaUserCog, FaUserMd} from 'react-icons/fa';
import { MdSchedule, MdOutlineMedicalServices } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { RiLogoutBoxFill } from 'react-icons/ri';
import logo from '../assets/small-logo.jpg';

function Sidebar({toggleBar, children}) {
    const menuItem =[
        {
            path: '/admin/dashboard',
            name: 'Dashboard',
            icon: <SidebarIcon Icon={AiFillHome} />,
        },
        {
            path: '/admin/dashboard/patient',
            name: 'Patient',
            icon: <SidebarIcon Icon={FaUserAlt} />
        },
        {
            path: '/admin/dashboard/dentist',
            name: 'Dentist',
            icon: <SidebarIcon Icon={FaUserMd} />
        },
        {
            path: '/admin/dashboard/admin',
            name: 'Admin',
            icon: <SidebarIcon Icon={FaUserCog} />
        },
        {
            path: '/admin/dashboard/schedule',
            name: 'Schedule',
            icon: <SidebarIcon Icon={MdSchedule} />
        },
        {
            path: '/admin/dashboard/appointments',
            name: 'Appointments',
            icon: <SidebarIcon Icon={AiOutlineSchedule} />
        },
        {
            path: '/admin/dashboard/services',
            name: 'Services',
            icon: <SidebarIcon Icon={MdOutlineMedicalServices} />
        },
        {
            path: '/admin/dashboard/messages',
            name: 'Messages',
            icon: <SidebarIcon Icon={AiFillMessage} />
        },
        {
            path: '/admin/dashboard/profile',
            name: 'Profile',
            icon: <SidebarIcon Icon={CgProfile} />
        },
    ];
    return (
        <>
            <div className={`relative h-screen bg-cyan-600 flex flex-col  text-white text-center ${toggleBar ? 'w-20' : 'w-72'} `}>
                <div className=' w-full bg-cyan-700 p-3 border-gray-300' >
                    <div className='mt-4 flex flex-col justify-center items-center '>
                        <img src={logo} alt="Dental logo" className=' w-16 h-16 rounded-full ' />
                        <h1 className={`text-md pt-4 mb-1 uppercase font-bold ${toggleBar ? 'hidden' : ''}`}>K.M. Geronimo Dental Clinic</h1>
                    </div>
                    <p className={`text-xs ${toggleBar ? 'hidden' : ''}`}>Admin</p>
                </div>
                <div className='p-1'>
                {
                    menuItem.map((map,index)=>(
                        <NavLink to={map.path} key={index} className={`w-auto mb-2 px-5 py-4 rounded-lg flex items-center text-white gap-x-2 text-left hover:bg-cyan-700 hover:shadow-md ${toggleBar ? 'justify-center flex-col' : ''}`}>
                            <div>{map.icon}</div>
                            <div className={toggleBar ? ' text-xs ' : ''}>{map.name}</div>
                        </NavLink>
                    ))
                }
                </div>
                <div className=' absolute bottom-0 w-full '>
                    <NavLink to='/' className='w-auto px-5 py-4 flex items-center text-white gap-x-2 text-left bg-cyan-700 hover:shadow-md '>
                            <div><SidebarIcon Icon={RiLogoutBoxFill} /></div>
                            <div className={`capitalize tracking-wide ${toggleBar ? 'hidden' : ''}`}>Logout</div>
                    </NavLink> 
                </div>
            </div>
            <main>{children}</main>
        </>
    );
}

export default Sidebar;