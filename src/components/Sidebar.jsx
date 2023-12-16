import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
import { useDispatch, useSelector } from 'react-redux';
import { logoutAdmin } from '../redux/action/AdminAction';

function Sidebar({ toggleBar, children }) {
	const params = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const loginAdmin = useSelector((state) => state.admin.loginAdmin);
	const [hover, setHover] = useState({
		active: false,
		value: ""
	});
	const menuItem = useMemo(()=>
		[
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
					loginAdmin?.role === "ADMIN" && {
						path: '/admin/dashboard/dentist',
						name: 'Dentist Account',
						icon: <SidebarIcon Icon={FaUserMd} />
					},
					loginAdmin?.role === "ADMIN" && {
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
			loginAdmin?.role === "ADMIN" && {
				path: '/admin/dashboard/services',
				name: 'Services',
				icon: <SidebarIcon Icon={MdMedicalServices} />
			},
			{
				path: '/admin/dashboard/treatment',
				name: 'Treatment',
				icon: <SidebarIcon Icon={GiHealthNormal} />
			},
			loginAdmin?.role !== "ADMIN" && {
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
					loginAdmin?.role === "ADMIN" && {
						path: '/admin/dashboard/appointmentFee',
						name: 'Appointment Fee',
						icon: <SidebarIcon Icon={CgProfile} />
					},
				]
			},
	
		],[loginAdmin]);

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

	const logoutHandler = () => {
		dispatch(logoutAdmin());
		localStorage.removeItem("token");
		localStorage.removeItem("adminId")
		navigate("/");
	};

	return (
		<>
			<div className={`${toggleBar ? "w-28" : "w-72"} sticky h-screen bg-blue-400 flex flex-col text-white text-center overflow-auto duration-300 ease-in-out delay-100`}>
				<div className={`lex justify-center bg-blue-500 p-3 border-gray-300 transition-all duration-300 ease-in-out delay-100`} >
					<div className={`  mt-4 flex flex-col justify-center items-center `}>
						<img src={logo} alt="Dental logo" className={` h-16 w-16 rounded-full transition-all duration-300 ease-in-out delay-100`} />
						<h1 className={`text-md pt-4 mb-1 uppercase font-bold ${toggleBar ? 'hidden' : ''} transition-all duration-300 ease-in-out delay-100`}>K.M. Geronimo Dental Clinic</h1>
						<p className={`text-sm ${toggleBar ? 'hidden' : ''}`}>Admin</p>
					</div>

				</div>
				<div className={`  p-1 relative transition-all duration-300 ease-in-out delay-100`}>
					{menuItem.map((map, index) => (
						// Use the index as the key prop for each mapped element
						<div key={index}>
							{map && (
								<NavLink
									to={map.path}
									className={`w-full px-5 py-4 flex items-center text-white gap-2 text-center hover:bg-blue-600 ${toggleBar ? 'justify-center flex-col' : ''} transition-all duration-300 ease-in-out delay-100`}
									onClick={() => (hover.active ? removeHover(map.value) : handleHover(map.value))}
								>
									<p>{map.icon}</p>
									<div className={`flex flex-grow items-center justify-between ${toggleBar ? ' text-xs ' : ''}`}>
										<span>{map.name}</span>
										<div className={`${toggleBar ? 'hidden' : 'visible'}`}>
											{map.sublinks && (
												map.value === hover.value ? (<MdKeyboardArrowDown size={24} />)
													: (<MdKeyboardArrowUp size={24} />)
											)}
										</div>
									</div>
								</NavLink>
							)}
							{map.value === hover.value && map.sublinks && (
								<div className={` ${hover ? 'visible' : 'hidden'} w-full flex flex-col rounded-bl-md rounded-br-md overflow-hidden bg-blue-500`}>
									{map.sublinks.map((val, keys) => (
										// Use the index as the key prop for each mapped sublink
										<div key={keys}>
											{val && (
												<NavLink
													to={val.path}
													className={`px-4 py-3 flex gap-x-2 hover:bg-blue-700 ${toggleBar ? 'flex-col justify-center items-center text-center ' : ''} transition-all duration-300 ease-in-out delay-100`}
													onClick={() => removeHover(map.value)}
												>
													<div>{val.icon}</div>
													<div className={toggleBar ? ' text-xs ' : ''}>
														{toggleBar && map.value !== 'ACCOUNTS' ? val.name.split(' ')[1] : toggleBar && map.value === 'ACCOUNTS' ? val.name.split(' ')[0] : val.name}
													</div>
												</NavLink>
											)}
										</div>
									))}
								</div>
							)}
						</div>
					))}
				</div>
				<div className={`${toggleBar ? "justify-center" : ""} flex items-center gap-2 text-white bg-slate-500 hover:bg-red-500 px-6 py-4`}
					onClick={logoutHandler}
				>
					<SidebarIcon Icon={FaPowerOff} />
					<div className={`capitalize tracking-wide ${toggleBar ? 'hidden' : ''}`}>Logout</div>
				</div>
			</div>
			<main>{children}</main>
		</>
	);
}

export default React.memo(Sidebar);