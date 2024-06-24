import React from "react";
import { Link } from "react-router-dom";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { MdOutlineGraphicEq } from "react-icons/md";
import { PiIntersectThreeBold } from "react-icons/pi";
import { IoTicketSharp } from "react-icons/io5";
import { RiExchange2Fill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";

const AdminSidebar = ({ theme, toggleTheme }) => {
    return (
        <div className={`lg:w-[19%] m-4 lg:m-10 p-4 text-black rounded-lg shadow-2xl ${theme === "light" ? "bg-gray-200" : "bg-[#222831] text-white"}`}>
            <div className="relative">
                <div className={`w-full h-36 ${theme === "light" ? "bg-[#FECDA6]" : "bg-gray-600"} rounded-lg`}></div>
                <div className="w-40 h-38 bg-white rounded-lg p-[0.22rem] absolute top-[4rem] left-[50%] transform -translate-x-1/2">
                    <div className={`w-38 h-36 ${theme === "light" ? "bg-[#31363F]" : "bg-gray-900"} rounded-lg text-[8rem] font-comfortaa text-center ${theme === "light" ? "text-gray-100" : "text-gray-300"}`}>
                        D
                    </div>
                </div>
            </div>
            <div className='mt-24 text-center lg:text-left'>
                <h1 className="text-3xl font-comfortaa font-medium" style={{ color: theme === 'light' ? 'black' : 'white' }}>Name</h1>
            </div>
            <hr className="mb-6 w-full" style={{ borderColor: theme === "light" ? 'black' : 'lightgray' }} />
            <div>
                <div>
                    <Link to="/admin" className="mt-2" style={{ color: theme === 'light' ? 'black' : 'white', lineHeight: '1.12rem' }}>
                        <div className={`px-2 py-2 text-center gap-4 hover:bg-gray-100 rounded-lg flex flex-row items-center cursor-pointer ${theme === "light" ? "" : "hover:bg-gray-700"}`}>
                            <TbLayoutDashboardFilled size={25} style={{ color: 'tomato' }} />
                            <span className="mt-2 text-[1.6rem] font-comfortaa font-normal" style={{ color: theme === 'light' ? 'black' : 'white', lineHeight: '1.12rem' }}>Dashboard</span>
                        </div>
                    </Link>
                </div>
                <br />
                <div>
                    <h1 className="text-xl font-comfortaa font-normal" style={{ color: theme === 'light' ? 'black' : 'white', textTransform: 'uppercase' }}>Menu</h1>
                    <ul className="flex flex-col text-[1.5rem] font-comfortaa text-gray-800 mt-1">
                        <Link to="/users" className="mt-1" style={{ color: theme === 'light' ? 'black' : 'white', lineHeight: '1.22rem' }}>
                            <li className={`flex flex-row items-center px-2 py-[0.5rem] text-center gap-4 hover:bg-gray-100 rounded-lg cursor-pointer ${theme === "light" ? "" : "hover:bg-gray-700"}`}>
                                <FaUsers size={25} style={{ color: 'teal' }} />
                                <span className="mt-1 text-[1.6rem] font-normal" style={{ color: theme === 'light' ? 'black' : 'white', lineHeight: '1.22rem' }}> Users</span>
                            </li>
                        </Link>
                        <Link to="/services" className="mt-1" style={{ color: theme === 'light' ? 'black' : 'white', lineHeight: '1.22rem' }}>
                        <li className={`flex flex-row items-center px-2 py-[0.5rem] text-center gap-4 hover:bg-gray-100 rounded-lg cursor-pointer ${theme === "light" ? "" : "hover:bg-gray-700"}`}>
                            <PiIntersectThreeBold size={25} style={{ color: 'slateblue' }} />
                            <span className="mt-1 text-[1.6rem] font-normal" style={{ color: theme === 'light' ? 'black' : 'white', lineHeight: '1.22rem' }}>Services</span>
                        </li>
                        </Link>
                        <Link to="/tickets" className="mt-1" style={{ color: theme === 'light' ? 'black' : 'white', lineHeight: '1.22rem' }}>
                        <li className={`flex flex-row items-center px-2 py-[0.5rem] text-center gap-4 hover:bg-gray-100 rounded-lg cursor-pointer ${theme === "light" ? "" : "hover:bg-gray-700"}`}>
                            <IoTicketSharp size={25} style={{ color: 'peru' }} />
                            <span className="mt-1 text-[1.6rem] font-normal" style={{ color: theme === 'light' ? 'black' : 'white', lineHeight: '1.22rem' }}>Tickets</span>
                        </li>
                        </Link>
                    </ul>
                </div>
                <br />
                <div>
                    <h1 className="text-xl font-comfortaa font-normal" style={{ color: theme === 'light' ? 'black' : 'white', textTransform: 'uppercase' }}>Useful</h1>
                    <Link to="/graph" className="mt-1" style={{ color: theme === 'light' ? 'black' : 'white', lineHeight: '1.22rem' }}>
                    <div className={`px-2 py-2 text-center gap-4 hover:bg-gray-100 rounded-lg flex flex-row items-center cursor-pointer ${theme === "light" ? "" : "hover:bg-gray-700"}`}>
                        <MdOutlineGraphicEq size={25} style={{ color: 'teal' }} />
                        <span className="mt-2 text-[1.6rem] font-comfortaa font-normal" style={{ color: theme === 'light' ? 'black' : 'white', lineHeight: '1.22rem' }}>Graphs</span>
                    </div>
                    </Link>
                </div>
            </div>
            <br />
            <div className="mt-12 flex flex-row justify-between">
                <h1 className="flex flex-row gap-2 text-3xl font-comfortaa font-normal pl-2" style={{ color: theme === 'light' ? 'black' : 'white' }}>
                    <RiExchange2Fill size={25} style={{ color: 'olive' }} />
                    Themes
                </h1>
                <label className="relative inline-block h-8 w-14 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-gray-900">
                    <input className="peer sr-only" type="checkbox" checked={theme === "dark"} onChange={toggleTheme} />
                    <span className="absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-gray-300 ring-[6px] ring-inset ring-white transition-all peer-checked:start-8 peer-checked:w-2 peer-checked:bg-white peer-checked:ring-transparent"></span>
                </label>
            </div>
        </div>
    );
}

export default AdminSidebar;