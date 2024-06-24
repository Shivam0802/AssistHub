import React, { useState, useEffect } from 'react';
import { RiExchange2Fill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import TicketList from '../Components/TicketList';
import Navbar from '../Components/Navbar';

const Dashboard = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleCreateTicket = () => {
    console.log('Create Ticket');
    navigate('/createTicket');
  };

  return (
    <>
      <Navbar />
      <div className={`flex flex-col lg:flex-row p-4 ${theme === 'light' ? 'text-gray-900 bg-[#F2F1EB]' : 'text-gray-100 bg-[#040D12]'}`}>
        <div className={`lg:w-[20%] m-4 lg:m-10 lg:ml-20 p-4 rounded-lg shadow-2xl ${theme === 'light' ? 'bg-gray-200 text-black' : 'bg-gray-800 text-white'}`}>
          <div className="relative">
            <div className={`w-full h-36 ${theme === 'light' ? 'bg-[#86003C]' : 'bg-gray-700'} rounded-lg`}></div>
            <div className="w-40 h-38 bg-white rounded-lg p-[0.22rem] absolute top-[4rem] left-[50%] transform -translate-x-1/2">
              <div className={`w-38 h-36 ${theme === 'light' ? 'bg-[#31363F] text-gray-100' : 'bg-gray-900 text-gray-300'} rounded-lg text-[8rem] font-comfortaa text-center`}>
                D
              </div>
            </div>
          </div>
          <div className='mt-24 text-center lg:text-left'>
            <h1 className="text-3xl font-comfortaa font-medium">Name</h1>
            <h2 className="text-2xl font-comfortaa font-medium">Bio</h2>
            <p className="text-[1.5rem] font-comfortaa font-normal mt-1" style={{ lineHeight: '1.12rem' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus et nunc fermentum
              consectetur.
            </p>
          </div>
          <hr className="mt-2" />
          <div className="mt-2 text-center lg:text-left" >
            <h3 className="text-2xl font-comfortaa font-medium">Contact</h3>
            <p className="text-[1.5rem] font-comfortaa font-normal mt-1" style={{ lineHeight: '1.12rem' }}>
              <span className="text-gray-800" style={{color : theme === 'light' ? 'black':'whitesmoke'}}>abc@gmail.com</span>
            </p>
            <p className="text-[1.5rem] font-comfortaa font-normal mt-1" style={{ lineHeight: '1.12rem' }}>
              <span className="text-gray-700" style={{color : theme === 'light' ? 'black':'whitesmoke'}}>Phone:</span>
              <span className="text-gray-800" style={{color : theme === 'light' ? 'black':'whitesmoke'}}> 4567891597</span>
            </p>
          </div>
          <hr className="mt-2" />
          <div className="mt-2 text-center lg:text-left">
            <h3 className="text-2xl font-comfortaa font-medium">Location</h3>
            <p className="text-[1.5rem] font-comfortaa font-normal mt-1" style={{ lineHeight: '1.12rem' }}>
              <span className="text-gray-800" style={{color : theme === 'light' ? 'black':'whitesmoke'}}>123, Lorem Ipsum, Dolor Sit, Amet</span>
            </p>
          </div>
          <div className="mt-10">
            <button onClick={handleCreateTicket} className="text-2xl w-full bg-green-300 text-gray-700 pt-2 rounded-md hover:bg-[#ACE1AF] font-comfortaa font-medium">
              Create Ticket
            </button>
          </div>
          <div className="mt-8 flex flex-row justify-between">
            <h1 className="flex flex-row gap-2 text-3xl font-comfortaa font-normal pl-2">
              <RiExchange2Fill size={25} style={{ color: 'olive' }} />
              Themes
            </h1>
            <label className="relative inline-block h-8 w-14 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-gray-900">
              <input className="peer sr-only" type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} />
              <span className="absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-gray-300 ring-[6px] ring-inset ring-white transition-all peer-checked:start-8 peer-checked:w-2 peer-checked:bg-white peer-checked:ring-transparent"></span>
            </label>
          </div>
        </div>
        <div className={`lg:w-[70%]  m-4 lg:m-10 p-4 rounded-lg shadow-2xl ${theme === 'light' ? 'bg-gray-200 text-black' : 'bg-gray-900 text-white'}`}>
          <h2 className="text-3xl font-semibold mb-8 pl-2">Your Tickets</h2>
          {
            [1, 2, 3].map((item, index) => (
              <TicketList key={index} theme={theme} />
            ))
          }
          <div className='flex justify-end pr-4 mt-10'>
            <button className={`text-2xl text-gray-700 rounded-md hover:text-[#B25068] font-comfortaa font-medium hover:underline ${theme === 'light' ? 'bg-gray-200 text-black' : 'bg-gray-900 text-white'}`}>
              View All Tickets
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;