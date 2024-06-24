import React from "react";
import { IoIosArrowUp } from "react-icons/io";

const AdminPage = ({ theme }) => {
    return (
        <>
            <div className={`lg:w-[20%] h-fit m-4 lg:m-10 lg:ml-2 px-4 pt-4 text-black rounded-lg shadow-2xl ${theme === "light" ? "bg-gray-200" : "bg-[#1A2130]  text-white"}`}>
                <div className="flex flex-row justify-between">
                    <p className="font-comfortaa font-medium text-[1.8rem] text-gray-500" style={{ textTransform: 'uppercase' }}>Users</p>
                    <div className="flex flex-row item-center">
                        <IoIosArrowUp size={22} style={{ color: theme === 'light' ? 'steelblue' : 'palegoldenrod' }} />
                        <p className="mt-1 font-comfortaa font-normal text-[1.6rem]" style={{ lineHeight: '1.12rem', color: theme === 'light' ? 'steelblue' : 'palegoldenrod' }}>10%</p>
                    </div>
                </div>
                <div className="mt-4">
                    <p className="font-comfortaa font-normal text-[3rem]" style={{ lineHeight: '1.12rem' }}>100</p>
                </div>
                <div className="flex flex-row justify-between mt-6">
                    <button className={`${theme === "light" ? "text-gray-900" : "text-white"} hover:text-[#DA7297] font-comfortaa font-normal text-2xl py-2 rounded`} >See All Users</button>
                    <img src="/Assets/user.png" alt="Users" className="w-10 h-10" />
                </div>
            </div>
            <div className={`lg:w-[20%] h-fit m-4 lg:m-10 lg:ml-2 px-4 pt-4 text-black rounded-lg shadow-2xl ${theme === "light" ? "bg-gray-200" : "bg-[#1A2130]  text-white"}`}>
                <div className="flex flex-row justify-between">
                    <p className="font-comfortaa font-medium text-[1.8rem] text-gray-500" style={{ textTransform: 'uppercase' }}>Tickets</p>
                    <div className="flex flex-row item-center">
                        <IoIosArrowUp size={22} style={{ color: theme === 'light' ? 'steelblue' : 'palegoldenrod' }} />
                        <p className="mt-1 font-comfortaa font-normal text-[1.6rem]" style={{ lineHeight: '1.12rem', color: theme === 'light' ? 'steelblue' : 'palegoldenrod' }}>20%</p>
                    </div>
                </div>
                <div className="mt-4">
                    <p className="font-comfortaa font-normal text-[3rem]" style={{ lineHeight: '1.12rem' }}>50</p>
                </div>
                <div className="flex flex-row justify-between mt-6">
                    <button className={`${theme === "light" ? "text-gray-900" : "text-white"} hover:text-[#DA7297] font-comfortaa font-normal text-2xl py-2 rounded`} >Veiw Tickets</button>
                    <img src="/Assets/ticket.png" alt="Users" className="w-10 h-10" />
                </div>
            </div>
        </>
    );
}

export default AdminPage;