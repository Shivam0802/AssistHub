import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from '../firebase';

const AdminPage = ({ theme }) => {
    const [userCount, setUserCount] = useState(0);
    const [ticketCount, setTicketCount] = useState(0);
    const [previousUserCount, setPreviousUserCount] = useState(0);
    const [previousTicketCount, setPreviousTicketCount] = useState(0);

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const userSnapshot = await getDocs(collection(db, 'users'));
                setUserCount(userSnapshot.size);

                const ticketSnapshot = await getDocs(collection(db, 'tickets'));
                setTicketCount(ticketSnapshot.size);

                const previousUserDoc = await getDoc(doc(db, 'counts', 'previousUserCount'));
                if (previousUserDoc.exists()) {
                    setPreviousUserCount(previousUserDoc.data().count);
                }

                const previousTicketDoc = await getDoc(doc(db, 'counts', 'previousTicketCount'));
                if (previousTicketDoc.exists()) {
                    setPreviousTicketCount(previousTicketDoc.data().count);
                }
            } catch (error) {
                console.error('Error fetching counts: ', error);
            }
        };

        fetchCounts();
    }, []);

    const calculateRise = (current, previous) => {
        if (previous === 0) return 0;
        return ((current - previous) / previous) * 100;
    };

    const userRise = calculateRise(userCount, previousUserCount);
    const ticketRise = calculateRise(ticketCount, previousTicketCount);

    return (
        <>
            <div className={`lg:w-[20%] h-fit m-4 lg:m-10 lg:ml-2 px-4 pt-4 text-black rounded-lg shadow-2xl ${theme === "light" ? "bg-gray-200" : "bg-[#1A2130]  text-white"}`}>
                <div className="flex flex-row justify-between">
                    <p className="font-comfortaa font-medium text-[1.8rem] text-gray-500" style={{ textTransform: 'uppercase' }}>Users</p>
                    <div className="flex flex-row items-center">
                        {userRise >= 0 ? (
                            <>
                                <IoIosArrowUp size={22} style={{ color: theme === 'light' ? 'steelblue' : 'palegoldenrod' }} />
                                <p className="mt-1 font-comfortaa font-normal text-[1.6rem]" style={{ lineHeight: '1.12rem', color: theme === 'light' ? 'steelblue' : 'palegoldenrod' }}>{userRise.toFixed(2)}%</p>
                            </>
                        ) : (
                            <>
                                <IoIosArrowDown size={22} style={{ color: theme === 'light' ? 'red' : 'lightcoral' }} />
                                <p className="mt-1 font-comfortaa font-normal text-[1.6rem]" style={{ lineHeight: '1.12rem', color: theme === 'light' ? 'red' : 'lightcoral' }}>{Math.abs(userRise).toFixed(2)}%</p>
                            </>
                        )}
                    </div>
                </div>
                <div className="mt-4">
                    <p className="font-comfortaa font-normal text-[3rem]" style={{ lineHeight: '1.12rem' }}>{userCount}</p>
                </div>
                <div className="flex flex-row justify-between mt-6">
                    <Link to="/users" className={`${theme === "light" ? "text-gray-900" : "text-white"} hover:text-[#DA7297] font-comfortaa font-normal text-2xl py-2 rounded`} >See All Users</Link>
                    <img src="/Assets/user.png" alt="Users" className="w-10 h-10" />
                </div>
            </div>
            <div className={`lg:w-[20%] h-fit m-4 lg:m-10 lg:ml-2 px-4 pt-4 text-black rounded-lg shadow-2xl ${theme === "light" ? "bg-gray-200" : "bg-[#1A2130]  text-white"}`}>
                <div className="flex flex-row justify-between">
                    <p className="font-comfortaa font-medium text-[1.8rem] text-gray-500" style={{ textTransform: 'uppercase' }}>Tickets</p>
                    <div className="flex flex-row items-center">
                        {ticketRise >= 0 ? (
                            <>
                                <IoIosArrowUp size={22} style={{ color: theme === 'light' ? 'steelblue' : 'palegoldenrod' }} />
                                <p className="mt-1 font-comfortaa font-normal text-[1.6rem]" style={{ lineHeight: '1.12rem', color: theme === 'light' ? 'steelblue' : 'palegoldenrod' }}>{ticketRise.toFixed(2)}%</p>
                            </>
                        ) : (
                            <>
                                <IoIosArrowDown size={22} style={{ color: theme === 'light' ? 'red' : 'lightcoral' }} />
                                <p className="mt-1 font-comfortaa font-normal text-[1.6rem]" style={{ lineHeight: '1.12rem', color: theme === 'light' ? 'red' : 'lightcoral' }}>{Math.abs(ticketRise).toFixed(2)}%</p>
                            </>
                        )}
                    </div>
                </div>
                <div className="mt-4">
                    <p className="font-comfortaa font-normal text-[3rem]" style={{ lineHeight: '1.12rem' }}>{ticketCount}</p>
                </div>
                <div className="flex flex-row justify-between mt-6">
                    <Link to="/tickets" className={`${theme === "light" ? "text-gray-900" : "text-white"} hover:text-[#DA7297] font-comfortaa font-normal text-2xl py-2 rounded`} >View Tickets</Link>
                    <img src="/Assets/ticket.png" alt="Tickets" className="w-10 h-10" />
                </div>
            </div>
        </>
    );
}

export default AdminPage;
