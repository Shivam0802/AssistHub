import React, { useState } from 'react';
import { PiDotsThreeOutlineVerticalBold } from "react-icons/pi";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const TicketList = ({ theme, ticket }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseEnter = (buttonId) => {
    setHoveredButton(buttonId);
  };

  const handleMouseLeave = () => {
    setHoveredButton(null);
  };

  const handleCheckStatus = async () => {
    try {
      const ticketStatus = await fetchTicketStatus();
      toast.info(`Ticket status: ${ticketStatus}`, {
        position: toast.position,
        autoClose: 3000,
      });
    } catch (error) {
      console.error('Error fetching ticket status:', error);
      toast.error('Failed to fetch ticket status. Please try again later.', {
        position: toast.position,
        autoClose: 3000,
      });
    }
  };

  const fetchTicketStatus = async () => {
    try {
      const ticketId = ticket.id;
      const ticketRef = doc(db, 'tickets', ticketId);
      const docSnap = await getDoc(ticketRef);

      if (docSnap.exists()) {
        const ticketData = docSnap.data();
        return ticketData.status;
      } else {
        throw new Error('Ticket not found');
      }
    } catch (error) {
      console.error('Error fetching ticket:', error);
      throw error;
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp.seconds * 1000);
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };

  return (
    <div className={`w-[33.52rem] flex flex-row rounded-lg shadow-md p-[1rem] mb-4 ${theme === 'light' ? 'bg-white' : 'bg-[#1f2430]'}`}>
      <div className={`w-full bg-${theme === 'light' ? 'white' : 'bg-[#1f2430]'} rounded-lg p-2`}>
        <ul>
          {[ticket].map(ticket => (
            <li key={ticket.id} className="p-2">
              <p className={`font-medium font-comfortaa text-[2rem] ${theme === 'light' ? 'text-[#824D74]' : 'text-[#A8CD9F]'}`} style={{ lineHeight: '1.3rem' }}>
                {ticket.subject}
              </p>
              <p className={`font-normal font-comfortaa text-[1.4rem] ${theme === 'light' ? 'text-black' : 'text-white'}`} style={{ lineHeight: '1.3rem' }}>
                <strong style={{ color: theme === 'light' ? '#135D66' : '#DBAFA0' }}>Description: </strong>{ticket.issue}
              </p>
              <p className={`font-normal font-comfortaa text-[1.4rem] ${theme === 'light' ? 'text-black' : 'text-white'}`} style={{ lineHeight: '1.3rem' }}>
                <strong style={{ color: theme === 'light' ? '#135D66' : '#DBAFA0' }}>Category: </strong>{ticket.category}
              </p>
              <p className={`font-normal font-comfortaa text-[1.4rem] ${theme === 'light' ? 'text-black' : 'text-white'}`} style={{ lineHeight: '1.3rem' }}>
                <strong style={{ color: theme === 'light' ? '#135D66' : '#DBAFA0' }}>Priority: </strong>{ticket.priority}
              </p>
              <p className={`font-normal font-comfortaa text-[1.4rem] ${theme === 'light' ? 'text-black' : 'text-white'}`} style={{ lineHeight: '1.3rem' }}>
                <strong style={{ color: theme === 'light' ? '#135D66' : '#DBAFA0' }}>Date Created: </strong>{formatDate(ticket.timestamp)}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="relative text-left">
        <button
          onClick={toggleDropdown}
          className="inline-flex justify-center w-full rounded-full p-2 text-sm font-medium hover:bg-gray-500 focus:outline-none"
          style={{ color: theme === 'light' ? 'black' : 'whitesmoke' }}
        >
          <PiDotsThreeOutlineVerticalBold size={20} />
        </button>

        {isOpen && (
          <div
            className="origin-top-right absolute right-0 mt-1 w-[10rem] rounded-md ring-1 ring-black ring-opacity-5"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            style={{ background: theme === 'light' ? '#F5F7F8' : '#373A3B' }}
          >
            <div className="py-1" role="none">
              <button
                className='block px-4 py-2 text-2xl w-full text-left font-comfortaa font-normal hover:bg-[#2D3250] hover:text-[#F5EEE6]'
                onMouseEnter={() => handleMouseEnter('checkStatus')}
                onMouseLeave={handleMouseLeave}
                style={{ lineHeight: '1.12rem', color: hoveredButton === 'checkStatus' && theme === 'light' ? '#ffffff' : theme === 'light' ? 'black' : 'whitesmoke' }}
                onClick={handleCheckStatus}
                role="menuitem"
              >
                Check Status
              </button>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default TicketList;
