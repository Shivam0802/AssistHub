import React, { useState } from 'react';
import { PiDotsThreeOutlineVerticalBold } from "react-icons/pi";

const TicketList = ({ theme }) => {
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

  return (
    <div className="w-full flex flex-row p-4 mb-4 bg-white rounded-lg shadow-md" style={{ background: theme === 'light' ? '#F5F7F8' : '#222831' }}>
      <div className="w-full" style={{ background: theme === 'light' ? '#F5F7F8' : '#222831' }}>
        <ul>
          {[{ id: 1, description: "Description", category: "Category", priority: "Priority", status: "Status", createdAt: "Created at" }].map(ticket => (
            <li key={ticket.id} className="p-2">
              <p className="font-semibold" style={{ color: theme === 'light' ? 'black' : 'whitesmoke' }}>{ticket.description}</p>
              <p style={{ color: theme === 'light' ? 'black' : 'whitesmoke' }}>{ticket.category}</p>
              <p style={{ color: theme === 'light' ? 'black' : 'whitesmoke' }}>{ticket.priority}</p>
              <p style={{ color: theme === 'light' ? 'black' : 'whitesmoke' }}>{ticket.status}</p>
              <p style={{ color: theme === 'light' ? 'black' : 'whitesmoke' }}>{ticket.createdAt}</p>
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
                onMouseEnter={() => handleMouseEnter('update')}
                onMouseLeave={handleMouseLeave}
                style={{ lineHeight: '1.12rem', color: hoveredButton === 'update' && theme === 'light' ? '#ffffff' : theme === 'light' ? 'black' : 'whitesmoke' }}
                role="menuitem"
              >
                Update
              </button>
              <button
                className='block px-4 py-2 text-2xl w-full text-left font-comfortaa font-normal hover:bg-[#2D3250] hover:text-[#F5EEE6]'
                onMouseEnter={() => handleMouseEnter('checkStatus')}
                onMouseLeave={handleMouseLeave}
                style={{ lineHeight: '1.12rem', color: hoveredButton === 'checkStatus' && theme === 'light' ? '#ffffff' : theme === 'light' ? 'black' : 'whitesmoke' }}
                role="menuitem"
              >
                Check Status
              </button>
              <button
                className='block px-4 py-2 text-2xl w-full text-left font-comfortaa font-normal hover:bg-[#2D3250] hover:text-[#F5EEE6]'
                onMouseEnter={() => handleMouseEnter('edit')}
                onMouseLeave={handleMouseLeave}
                style={{ lineHeight: '1.12rem', color: hoveredButton === 'edit' && theme === 'light' ? '#ffffff' : theme === 'light' ? 'black' : 'whitesmoke' }}
                role="menuitem"
              >
                Edit
              </button>
              <button
                className='block px-4 py-2 text-2xl w-full text-left font-comfortaa font-normal hover:bg-[#2D3250] hover:text-[#F5EEE6]'
                onMouseEnter={() => handleMouseEnter('delete')}
                onMouseLeave={handleMouseLeave}
                style={{ lineHeight: '1.12rem', color: hoveredButton === 'delete' && theme === 'light' ? '#ffffff' : theme === 'light' ? 'black' : 'whitesmoke' }}
                role="menuitem"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketList;
