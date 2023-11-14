import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import SidebarIcon from './SidebarIcon';
import { NavLink } from 'react-router-dom';
import { AiFillHome, AiFillMessage, AiFillSetting, AiFillSchedule } from 'react-icons/ai';
import { BsCalendarEventFill, BsFillCalendarCheckFill, BsFillCalendar3Fill } from 'react-icons/bs'
import { FaUserAlt, FaUserCog, FaUserMd, FaMoneyBill } from 'react-icons/fa';
import { MdMedicalServices, MdAnnouncement, MdManageAccounts, MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { GiHealthNormal } from "react-icons/gi";
import { FaPowerOff } from 'react-icons/fa';
import logo from '../assets/small-logo.jpg';

function Sidebar({ toggleBar, children }) {
	const params = useLocation();
	const [hover, setHover] = useState({
		active: false,
		value: ""
	});
	const menuItem = [
		{
			path: '/admin/dashboard',
			name: 'Dashboard',
			icon: <SidebarIcon Icon={AiFillHome} />,
		},
		{
			path: `${params.pathname}`,
			name: 'Accounts',
			icon: <SidebarIcon Icon={MdManageAccounts} />,
			value: "ACCOUNTS",
			sublinks: [
				{
					path: '/admin/dashboard/patient',
					name: 'Patient Account',
					icon: <SidebarIcon Icon={FaUserAlt} />
				},
				{
					path: '/admin/dashboard/dentist',
					name: 'Dentist Account',
					icon: <SidebarIcon Icon={FaUserMd} />
				},
				{
					path: '/admin/dashboard/admin',
					name: 'Admin Account',
					icon: <SidebarIcon Icon={FaUserCog} />
				},
			]
		},
		{
			path: `${params.pathname}`,
			name: 'Appointments',
			icon: <SidebarIcon Icon={BsFillCalendar3Fill} />,
			value: "APPOINTMENT",
			sublinks: [
				{
					path: '/admin/dashboard/appointment/calendar',
					name: 'Appointment Calendar',
					icon: <SidebarIcon Icon={BsCalendarEventFill} />
				},
				{
					path: '/admin/dashboard/appointment',
					name: 'Appointment List',
					icon: <SidebarIcon Icon={BsFillCalendarCheckFill} />
				},
			]
		},
		{
			path: '/admin/dashboard/services',
			name: 'Services',
			icon: <SidebarIcon Icon={MdMedicalServices} />
		},
		{
			path: '/admin/dashboard/treatment',
			name: 'Treatment',
			icon: <SidebarIcon Icon={GiHealthNormal} />
		},
		{
			path: '/admin/dashboard/messages',
			name: 'Messages',
			icon: <SidebarIcon Icon={AiFillMessage} />
		},
		{
			path: '/admin/dashboard/schedule',
			name: 'Schedule',
			icon: <SidebarIcon Icon={AiFillSchedule} />
		},
		{
			path: '/admin/dashboard/payment',
			name: 'Payment',
			icon: <SidebarIcon Icon={FaMoneyBill} />
		},
		{
			path: `${params.pathname}`,
			name: 'Settings',
			icon: <SidebarIcon Icon={AiFillSetting} />,
			value: "SETTING",
			sublinks: [
				{
					path: '/admin/dashboard/announcement',
					name: 'Announcement',
					icon: <SidebarIcon Icon={MdAnnouncement} />,
				},
				{
					path: '/admin/dashboard/profile',
					name: 'Profile',
					icon: <SidebarIcon Icon={CgProfile} />
				},
			]
		},

	];

	const handleHover = (val) => {
		switch (val) {
			case "ACCOUNTS":
				setHover({ active: true, value: "ACCOUNTS" })
				break;
			case "APPOINTMENT":
				setHover({ active: true, value: "APPOINTMENT" });
				break;
			case "SETTING":
				setHover({ active: true, value: "SETTING" });
				break;
			default:
				setHover({ active: false, value: "" });
		}
	}
	const removeHover = (val) => {
		switch (val) {
			case "ACCOUNTS":
				setHover({ ...hover, active: false, value: "" })
				break;
			case "APPOINTMENT":
				setHover({ ...hover, active: false, value: "" });
				break;
			case "SETTING":
				setHover({ active: false, value: "" });
				break;
			default:
				setHover({ ...hover, active: false, value: "" });
		}
	}
	return (
		<>
			<div className={`sticky h-screen bg-blue-400 flex flex-col text-white text-center overflow-auto`}>
				<div className={` ${toggleBar ? 'w-20' : 'w-72'} flex justify-center bg-blue-500 p-3 border-gray-300`} >
					<div className={`  mt-4 flex flex-col justify-center items-center `}>
						<img src={logo} alt="Dental logo" className={` ${toggleBar ? "w-16 h-14" : "w-16 h-16"} rounded-full `} />
						<h1 className={`text-md pt-4 mb-1 uppercase font-bold ${toggleBar ? 'hidden' : ''}`}>K.M. Geronimo Dental Clinic</h1>
						<p className={`text-xs ${toggleBar ? 'hidden' : ''}`}>Admin</p>
					</div>

				</div>
				<div className={` ${toggleBar ? 'w-20' : 'w-72'} p-1 relative`}>
					{
						menuItem.map((map, index) => (
							<>
								<NavLink to={map.path} key={map.path} className={`w-full px-5 py-4 flex items-center text-white gap-2 text-center hover:bg-blue-600 ${toggleBar ? 'justify-center flex-col' : ''}`} onClick={() => hover.active ? removeHover(map.value) : handleHover(map.value)}>
									<p>{map.icon}</p>
									<div className={`flex flex-grow items-center justify-between ${toggleBar ? ' text-xs ' : ''}`}>
										<span>{map.name}</span>
										<div className={`${toggleBar ? 'hidden' : 'visible'}`}>
											{
												map.sublinks && (
													map.value === hover.value ? (<MdKeyboardArrowDown size={24}/>)
														: (<MdKeyboardArrowUp size={24} />)
												)
											}
										</div>
									</div>
								</NavLink>
								{
									map.value === hover.value && map.sublinks && (
										<div className={` ${hover ? "visible" : "hidden"} w-full flex flex-col rounded-bl-md rounded-br-md overflow-hidden bg-blue-500`}>
											{
												map.sublinks.map((val, keys) => (
													<NavLink to={val.path} key={val.path} className={`px-4 py-3 flex gap-x-2 hover:bg-blue-700 ${toggleBar ? "flex-col justify-center items-center text-center " : ""} `} onClick={() => removeHover(map.value)}>
														<div>{val.icon}</div>
														<div className={toggleBar ? ' text-xs ' : ''}>{toggleBar && map.value !== "ACCOUNTS" ? val.name.split(" ")[1] : toggleBar && map.value === "ACCOUNTS" ? val.name.split(" ")[0] : val.name}</div>
													</NavLink>
												))
											}
										</div>
									)
								}
							</>
						))

					}
				</div>
				<NavLink to='/' className='flex items-center gap-2 text-white bg-slate-500 hover:bg-red-500 px-6 py-4'>
					<SidebarIcon Icon={FaPowerOff} />
					<div className={`capitalize tracking-wide ${toggleBar ? 'hidden' : ''}`}>Logout</div>
				</NavLink>
			</div>
			<main>{children}</main>
		</>
	);
}

export default Sidebar;