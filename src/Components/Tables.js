import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";

// Modal Component
const Modal = ({ isOpen, onClose, onSave, user }) => {
    const [newRole, setNewRole] = useState(user?.role || 'user');

    useEffect(() => {
        setNewRole(user?.role || 'user');
    }, [user]);

    const handleSave = () => {
        onSave(user.id, newRole);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h2 className="text-xl mb-4 text-gray-800">Update Role</h2>
                <select
                    className="p-2 border rounded w-full text-gray-800"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <div className="flex justify-end mt-4">
                    <button className="mr-2 px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleSave}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export const UserTables = ({ theme }) => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
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

    const handleEditClick = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleSaveRole = async (userId, newRole) => {
        try {
            const userDoc = doc(db, 'users', userId);
            await updateDoc(userDoc, { role: newRole });
            setUsers(users.map(user => user.id === userId ? { ...user, role: newRole } : user));
        } catch (error) {
            console.error('Error updating user: ', error);
        }
    };

    const handleDelete = async (userId) => {
        try {
            await deleteDoc(doc(db, 'users', userId));
            setUsers(users.filter(user => user.id !== userId));
        } catch (error) {
            console.error('Error deleting user: ', error);
        }
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
                                <button className="text-blue-500 hover:text-blue-700" onClick={() => handleEditClick(user)}>
                                    <img src="/Assets/edit.png" alt="Edit" className="w-[1.6rem]" />
                                </button>
                                <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(user.id)}>
                                    <img src="/Assets/delete.png" alt="Delete" className="w-[1.6rem]" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {selectedUser && (
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveRole} user={selectedUser} />
            )}
        </div>
    );
};


/* ******************Tables for Tickets in Admin Dashboard****************** */

export const TicketTables = ({ theme }) => {
    const [tickets, setTickets] = useState([]);
    const [users, setUsers] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [newStatus, setNewStatus] = useState('');
    const isDarkTheme = theme === "dark";

    useEffect(() => {
        const fetchTickets = async () => {
            let ticketList = [];
            try {
                const querySnapshot = await getDocs(collection(db, 'tickets'));
                querySnapshot.forEach((doc) => {
                    ticketList.push({ id: doc.id, ...doc.data() });
                });
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

    const openModal = (ticket) => {
        setSelectedTicket(ticket);
        setNewStatus(ticket.status);
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedTicket(null);
        setNewStatus('');
        setModalOpen(false);
    };

    const handleEditClick = async () => {
        try {
            if (!selectedTicket) return;
            const ticketRef = doc(db, 'tickets', selectedTicket.id);
            await updateDoc(ticketRef, { status: newStatus });
            setTickets(prevTickets => prevTickets.map(ticket => ticket.id === selectedTicket.id ? { ...ticket, status: newStatus } : ticket));
            closeModal();
        } catch (error) {
            console.error('Error updating ticket: ', error);
        }
    };

    const handleDeleteClick = async (ticketId) => {
        try {
            const ticketRef = doc(db, 'tickets', ticketId);
            await deleteDoc(ticketRef);
            setTickets(prevTickets => prevTickets.filter(ticket => ticket.id !== ticketId));
        } catch (error) {
            console.error('Error deleting ticket: ', error);
        }
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
                                        <div className="text-gray-500 text-sm">{ticket.id}</div>
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
                                    <span
                                        className={`px-2 py-1 text-[1rem] rounded-full font-medium ${ticket.status === 'Pending' ? 'bg-yellow-500' : ticket.status === 'Progress' ? 'bg-blue-500' : 'bg-green-500'}`}
                                        style={{ lineHeight: '1.12rem' }}
                                    >
                                        {ticket.status}
                                    </span>
                                </div>
                                <div className="col-span-12 md:col-span-1 flex space-x-4">
                                    <button className="text-blue-500 hover:text-blue-700" onClick={() => openModal(ticket)}>
                                        <img src="/Assets/edit.png" alt="Edit" className="w-[1.6rem]" />
                                    </button>
                                    <button className="text-red-500 hover:text-red-700" onClick={() => handleDeleteClick(ticket.id)}>
                                        <img src="/Assets/delete.png" alt="Delete" className="w-[1.6rem]" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Modal */}
            {selectedTicket && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className={`w-[20rem] p-6 rounded-lg shadow-md ${isDarkTheme ? 'bg-[#24272d] text-white' : 'bg-white text-black'}`}>
                        <h3 className={`text-lg font-medium mb-4 ${isDarkTheme ? 'text-gray-200' : 'text-gray-700'}`}>Update Ticket Status</h3>
                        <div className="mb-4">
                            <label htmlFor="status" className={`block text-sm font-medium ${isDarkTheme ? 'text-gray-200' : 'text-gray-700'}`}>Status</label>
                            <select id="status" name="status" value={newStatus} onChange={(e) => setNewStatus(e.target.value)} className='mt-1 block w-full p-2 border border-gray-600 rounded-md' style={{ color: '#191616' }}>
                                <option value="Pending" style={{ color: '#191616' }}>Pending</option>
                                <option value="Progress" style={{ color: '#191616' }}>Progress</option>
                                <option value="Resolved" style={{ color: '#191616' }}>Resolved</option>
                            </select>
                        </div>
                        <div className="flex justify-end">
                            <button
                                className={`bg-${isDarkTheme ? 'gray-600' : 'blue-500'} text-white font-comfortaa font-normal text-[1.7rem] px-4 pt-[0.65rem] pb-[0.3rem] rounded-md mr-2`}
                                onClick={handleEditClick}
                                style={{ lineHeight: '1.12rem' }}
                            >
                                Save
                            </button>
                            <button
                                className={`bg-gray-200 text-gray-900 font-comfortaa font-normal text-[1.7rem] px-4 pt-[0.65rem] pb-[0.3rem] rounded-md mr-2`}
                                onClick={closeModal}
                                style={{ lineHeight: '1.12rem' }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
