import React from "react";

export const userTables = ({ theme }) => {
    const isDarkTheme = theme === "dark";

    return (
        <div className={`p-2 ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
            <div className="flex flex-col md:flex-row justify-between mb-4">
                <h2 className={`text-3xl md:text-5xl font-medium mt-4 font-comfortaa ${isDarkTheme ? 'text-white' : 'text-black'}`} style={{ lineHeight: '1.12rem' }}>Users</h2>
                <div className={`flex items-center flex-row ${isDarkTheme ? 'bg-gray-100' : 'bg-white'} w-full md:w-fit rounded-lg px-2 mt-4 md:mt-0`}>
                    <input type="search" placeholder="Search" className={`w-full md:w-80 p-2 rounded-lg ${isDarkTheme ? 'bg-gray-100 text-black' : 'bg-white text-black'}`} style={{ outline: 'none' }} />
                    <img src="/Assets/search.png" alt="Search" className="w-6 h-6 mt-1" />
                </div>
            </div>
            <div className={`shadow-md rounded-lg ${isDarkTheme ? 'bg-[#121212]' : 'bg-white'}`}>
                <div className="p-2">
                    <div className="grid grid-cols-12 gap-4 p-4 border-b" style={{ borderColor: isDarkTheme ? '#4B5563' : '#E5E7EB' }}>
                        <div className="col-span-12 md:col-span-3 font-medium">NAME</div>
                        <div className="col-span-12 md:col-span-2 font-medium">CONTACT</div>
                        <div className="col-span-12 md:col-span-3 font-medium">ADDRESS</div>
                        <div className="col-span-12 md:col-span-2 font-medium">DATE</div>
                        <div className="col-span-12 md:col-span-2 font-medium">ACTIONS</div>
                    </div>
                    <div className="grid grid-cols-12 gap-4 p-4 items-center border-b" style={{ borderColor: isDarkTheme ? '#4B5563' : '#E5E7EB' }}>
                        <div className="col-span-12 md:col-span-3 flex items-center">
                            <img src='/Assets/man.png' alt="Avatar" className="w-10 h-10 rounded-full mr-4" />
                            <div>
                                <div className="font-medium">John</div>
                                <div className="text-gray-500 text-sm">abc@yopmail.com</div>
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-2">124551235</div>
                        <div className="col-span-12 md:col-span-3">
                            <span className="px-2 py-1 text-xs" style={{ color: isDarkTheme ? 'whitesmoke' : 'black' }}>XYZ</span>
                        </div>
                        <div className="col-span-12 md:col-span-2">20-05-2024</div>
                        <div className="col-span-12 md:col-span-2 flex space-x-4">
                            <button className="text-blue-500 hover:text-blue-700">
                                <img src="/Assets/edit.png" alt="Edit" className="w-[1.6rem]" />
                            </button>
                            <button className="text-red-500 hover:text-red-700">
                                <img src="/Assets/delete.png" alt="Delete" className="w-[1.6rem]" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export const ticketTables = ({ theme }) => {
    const isDarkTheme = theme === "dark";

    return (
        <div className={`p-2 ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
            <div className="flex flex-col md:flex-row justify-between mb-4">
                <h2 className={`text-3xl md:text-5xl font-medium mt-4 font-comfortaa ${isDarkTheme ? 'text-white' : 'text-black'}`} style={{ lineHeight: '1.12rem' }}>Tickets</h2>
                <div className={`flex items-center flex-row ${isDarkTheme ? 'bg-gray-100' : 'bg-white'} w-full md:w-fit rounded-lg px-2 mt-4 md:mt-0`}>
                    <input type="search" placeholder="Search" className={`w-full md:w-80 p-2 rounded-lg ${isDarkTheme ? 'bg-gray-100 text-black' : 'bg-white text-black'}`} style={{ outline: 'none' }} />
                    <img src="/Assets/search.png" alt="Search" className="w-6 h-6 mt-1" />
                </div>
            </div>
            <div className={`shadow-md rounded-lg ${isDarkTheme ? 'bg-[#121212]' : 'bg-white'}`}>
                <div className="p-2">
                    <div className="grid grid-cols-12 gap-4 p-4 border-b" style={{ borderColor: isDarkTheme ? '#4B5563' : '#E5E7EB' }}>
                        <div className="col-span-12 md:col-span-3 font-medium">NAME</div>
                        <div className="col-span-12 md:col-span-2 font-medium">TICKET ID</div>
                        <div className="col-span-12 md:col-span-3 font-medium">DESCRIPTION</div>
                        <div className="col-span-12 md:col-span-2 font-medium">ISSUE DATE</div>
                        <div className="col-span-12 md:col-span-1 font-medium">STATUS</div>
                        <div className="col-span-12 md:col-span-1 font-medium">ACTIONS</div>
                    </div>
                    <div className="grid grid-cols-12 gap-4 p-4 items-center border-b" style={{ borderColor: isDarkTheme ? '#4B5563' : '#E5E7EB' }}>
                        <div className="col-span-12 md:col-span-3 flex items-center">
                            <img src='/Assets/man.png' alt="Avatar" className="w-10 h-10 rounded-full mr-4" />
                            <div>
                                <div className="font-medium">John</div>
                                <div className="text-gray-500 text-sm">abc@yopmail.com</div>
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-2">12STJ235</div>
                        <div className="col-span-12 md:col-span-3">
                            <span className=" py-1 text-xm" style={{ color: isDarkTheme ? 'whitesmoke' : 'black' }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </span>
                        </div>
                        <div className="col-span-12 md:col-span-2">20-05-2024</div>
                        <div className="col-span-12 md:col-span-1 flex space-x-4">
                            <span className={`px-2 py-1 text-xs bg-green-500 rounded-full text-xs font-medium`}>Pending</span>
                        </div>
                        <div className="col-span-12 md:col-span-1 flex space-x-4">
                            <button className="text-red-500 hover:text-red-700">
                                <img src="/Assets/delete.png" alt="Delete" className="w-[1.6rem]" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export const serviceTables = ({ theme }) => {
    const isDarkTheme = theme === "dark";

    return (
        <div className={`p-2 ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
            <div className="flex flex-col md:flex-row justify-between mb-4">
                <h2 className={`text-3xl md:text-5xl font-medium mt-4 font-comfortaa ${isDarkTheme ? 'text-white' : 'text-black'}`} style={{ lineHeight: '1.12rem' }}>Services</h2>
                <div className={`flex items-center flex-row ${isDarkTheme ? 'bg-gray-100' : 'bg-white'} w-full md:w-fit rounded-lg px-2 mt-4 md:mt-0`}>
                    <input type="search" placeholder="Search" className={`w-full md:w-80 p-2 rounded-lg ${isDarkTheme ? 'bg-gray-100 text-black' : 'bg-white text-black'}`} style={{ outline: 'none' }} />
                    <img src="/Assets/search.png" alt="Search" className="w-6 h-6 mt-1" />
                </div>
            </div>
            <div className={`shadow-md rounded-lg ${isDarkTheme ? 'bg-[#121212]' : 'bg-white'}`}>
                <div className="p-2">
                    <div className="grid grid-cols-12 gap-4 p-4 border-b" style={{ borderColor: isDarkTheme ? '#4B5563' : '#E5E7EB' }}>
                        <div className="col-span-12 md:col-span-3 font-medium">NAME</div>
                        <div className="col-span-12 md:col-span-2 font-medium">SERVICE</div>
                        <div className="col-span-12 md:col-span-3 font-medium">TICKET ID</div>
                        <div className="col-span-12 md:col-span-2 font-medium">ISSUE DATE</div>
                        <div className="col-span-12 md:col-span-1 font-medium">STATUS</div>
                        <div className="col-span-12 md:col-span-1 font-medium">ACTIONS</div>
                    </div>
                    <div className="grid grid-cols-12 gap-4 p-4 items-center border-b" style={{ borderColor: isDarkTheme ? '#4B5563' : '#E5E7EB' }}>
                        <div className="col-span-12 md:col-span-3 flex items-center">
                            <img src='/Assets/man.png' alt="Avatar" className="w-10 h-10 rounded-full mr-4" />
                            <div>
                                <div className="font-medium">John</div>
                                <div className="text-gray-500 text-sm">abc@yopmail.com</div>
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-2">Billing</div>
                        <div className="col-span-12 md:col-span-3">
                            <span className=" py-1 text-xm" style={{ color: isDarkTheme ? 'whitesmoke' : 'black' }}>
                                12STJ235
                            </span>
                        </div>
                        <div className="col-span-12 md:col-span-2">20-05-2024</div>
                        <div className="col-span-12 md:col-span-1 flex space-x-4">
                            <span className={`px-2 py-1 text-xs bg-green-500 rounded-full text-xs font-medium`}>Pending</span>
                        </div>
                        <div className="col-span-12 md:col-span-1 flex space-x-4">
                            <button className="text-red-500 hover:text-red-700">
                                <img src="/Assets/delete.png" alt="Delete" className="w-[1.6rem]" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};