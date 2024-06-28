import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export const UserTables = ({ theme }) => {
    const [users, setUsers] = useState([]);
    const isDarkTheme = theme === "dark";

    useEffect(() => {
        const fetchUsers = async () => {
            let list = [];
            try {
                const querySnapshot = await getDocs(collection(db, 'users'));
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    if (data.role === 'user') {
                        list.push({ id: doc.id, ...data });
                    }
                });
                setUsers(list);
            } catch (error) {
                console.error('Error fetching users: ', error);
            }
        };
        fetchUsers();
    }, []);

    const formatDate = (timestamp) => {
        if (!timestamp) return '';
        const date = new Date(timestamp.seconds * 1000);
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options);
    };

    return (
        <div className={`p-2 rounded-lg ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
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
                        <div className="col-span-12 md:col-span-1 font-medium">ACTIONS</div>
                    </div>
                    {users.map((user) => (
                        <div key={user.id} className="grid grid-cols-12 gap-4 p-4 items-center border-b" style={{ borderColor: isDarkTheme ? '#4B5563' : '#E5E7EB' }}>
                            <div className="col-span-12 md:col-span-3 flex items-center">
                                {user.gender === 'male' ? (
                                    <img src='/Assets/man.png' alt="Avatar" className="w-10 h-10 rounded-full mr-4" />
                                ) : (
                                    <img src='/Assets/girl.png' alt="Avatar" className="w-10 h-10 rounded-full mr-4" />
                                )}
                                <div>
                                    <div className="font-medium">{user.name}</div>
                                    <div className="text-gray-500 text-sm">{user.email}</div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-2">{user.contact}</div>
                            <div className="col-span-12 md:col-span-3">
                                <span className="px-2 py-1 text-xs" style={{ color: isDarkTheme ? 'whitesmoke' : 'black' }}>{user.address}</span>
                            </div>
                            <div className="col-span-12 md:col-span-2">{formatDate(user.timestamp)}</div>
                            <div className="col-span-12 md:col-span-1 flex space-x-4">
                                <button className="text-blue-500 hover:text-blue-700">
                                    <img src="/Assets/edit.png" alt="Edit" className="w-[1.6rem]" />
                                </button>
                                <button className="text-red-500 hover:text-red-700">
                                    <img src="/Assets/delete.png" alt="Delete" className="w-[1.6rem]" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};



export const TicketTables = ({ theme }) => {
    const [tickets, setTickets] = useState([]);
    const [users, setUsers] = useState([]);
    const isDarkTheme = theme === "dark";

    useEffect(() => {
        const fetchTickets = async () => {
            let ticketList = [];
            try {
                const querySnapshot = await getDocs(collection(db, 'tickets'));
                querySnapshot.forEach((doc) => {
                    ticketList.push({ id: doc.id, ...doc.data() });
                });
                console.log(ticketList);
                setTickets(ticketList);
            } catch (error) {
                console.error('Error fetching tickets: ', error);
            }
        };

        const fetchUsers = async () => {
            let userList = [];
            try {
                const querySnapshot = await getDocs(collection(db, 'users'));
                querySnapshot.forEach((doc) => {
                    userList.push({ id: doc.id, ...doc.data() });
                });
                setUsers(userList);
            } catch (error) {
                console.error('Error fetching users: ', error);
            }
        };

        fetchTickets();
        fetchUsers();
    }, []);

    const formatDate = (timestamp) => {
        if (!timestamp) return '';
        const date = new Date(timestamp.seconds * 1000);
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options);
    };

    const getUserById = (userId) => {
        return users.find(user => user.id === userId) || {};
    };

    return (
        <div className={`p-2 rounded-lg ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
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
                        <div className="col-span-12 md:col-span-2 font-medium">CATEGORY</div>
                        <div className="col-span-12 md:col-span-3 font-medium">DESCRIPTION</div>
                        <div className="col-span-12 md:col-span-2 font-medium">ISSUE DATE</div>
                        <div className="col-span-12 md:col-span-1 font-medium">STATUS</div>
                        <div className="col-span-12 md:col-span-1 font-medium">ACTIONS</div>
                    </div>
                    {tickets.map((ticket) => {
                        const user = getUserById(ticket.userId);
                        return (
                            <div key={ticket.id} className="grid grid-cols-12 gap-4 p-4 items-center border-b" style={{ borderColor: isDarkTheme ? '#4B5563' : '#E5E7EB' }}>
                                <div className="col-span-12 md:col-span-3 flex items-center">
                                    <img src='/Assets/man.png' alt="Avatar" className="w-10 h-10 rounded-full mr-4" />
                                    <div>
                                        <div className="font-medium">{user.name}</div>
                                        <div className="text-gray-500 text-sm">{user.email}</div>
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-2">{ticket.category}</div>
                                <div className="col-span-12 md:col-span-3">
                                    <span className="py-1 text-xm" style={{ color: isDarkTheme ? 'whitesmoke' : 'black' }}>
                                        {ticket.subject}
                                    </span>
                                </div>
                                <div className="col-span-12 md:col-span-2">{formatDate(ticket.timestamp)}</div>
                                <div className="col-span-12 md:col-span-1 flex space-x-4">
                                    <span className={`px-2 py-1 text-xs bg-green-500 rounded-full text-xs font-medium`}>pending</span>
                                </div>
                                <div className="col-span-12 md:col-span-1 flex space-x-4">
                                    <button className="text-blue-500 hover:text-blue-700">
                                        <img src="/Assets/edit.png" alt="Edit" className="w-[1.6rem]" />
                                    </button>
                                    <button className="text-red-500 hover:text-red-700">
                                        <img src="/Assets/delete.png" alt="Delete" className="w-[1.6rem]" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};