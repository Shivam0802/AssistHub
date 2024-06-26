import React, { useContext, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Link } from 'react-router-dom';

const Navbar = ({ theme }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const { currentUser } = useContext(AuthContext);

    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.href = '/';
    };

    return (
        <div className='flex flex-wrap items-center justify-between h-[6rem] bg-[#1B1B1B] px-4 md:px-8 relative'>
            <div className='p-2'>
                <img src='/Assets/Logo1.png' alt='logo' className='w-32 md:w-40 lg:w-60' />
            </div>
            <div className='flex items-center'>
                {currentUser ? (
                    <div className="relative inline-block text-left">
                        <div>
                            <button
                                type="button"
                                className="inline-flex justify-center w-full rounded-md focus:outline-none hover:shadow-2xl cursor-pointer"
                                id="menu-button"
                                aria-expanded="true"
                                aria-haspopup="true"
                                onClick={toggleDropdown}
                            >
                                <img src="/Assets/Guy.png" alt="Profile" className="w-8 md:w-10 lg:w-12 rounded-full" />
                            </button>
                        </div>
                        {isOpen && (
                            <div
                                className={`origin-top-right absolute right-0 mt-2 w-40 md:w-52 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 ${theme === 'light' ? 'bg-white' : 'bg-[#212225]'}`}
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="menu-button"
                            >
                                <div className="py-1" role="none">
                                    <div className={`flex flex-row gap-1 px-2 py-[0.3rem] m-2 rounded-lg ${theme === 'light' ? 'hover:bg-[#F5F7F8]' : 'hover:bg-[#31363F]'}`}>
                                        <img src="/Assets/update.png" alt="Update" className="w-6 md:w-8 h-6 md:h-8 rounded-full" />
                                        <a
                                            href="#"
                                            className="text-gray-700 block px-2 pt-2 text-base md:text-[1.5rem] lg:text-[1.5rem] font-normal font-comfortaa"
                                            style={{ color: theme === 'light' ? 'grey' : 'whitesmoke', lineHeight: '1.12rem' }}
                                            role="menuitem"
                                            id="menu-item-0"
                                        >
                                            Update Profile
                                        </a>
                                    </div>
                                    <div className={`flex flex-row gap-1 px-2 py-[0.3rem] m-2 rounded-lg ${theme === 'light' ? 'hover:bg-[#F5F7F8]' : 'hover:bg-[#31363F]'}`}>
                                        <img src="/Assets/delete.png" alt="Delete" className="w-6 md:w-8 h-6 md:h-8 rounded-full" />
                                        <a
                                            href="#"
                                            className="text-gray-700 block px-2 pt-2 text-base md:text-[1.5rem] lg:text-[1.5rem] font-normal font-comfortaa"
                                            style={{ color: theme === 'light' ? 'grey' : 'whitesmoke', lineHeight: '1.12rem' }}
                                            role="menuitem"
                                            id="menu-item-1"
                                        >
                                            Delete Profile
                                        </a>
                                    </div>
                                    <div className={`flex flex-row gap-1 px-2 py-[0.3rem] m-2 rounded-lg ${theme === 'light' ? 'hover:bg-[#F5F7F8]' : 'hover:bg-[#31363F]'}`}>
                                        <img src="/Assets/logout.png" alt="Update" className="w-6 md:w-8 h-6 md:h-8 rounded-full" />
                                        <button
                                            onClick={handleLogout}
                                            className="text-gray-700 block px-2 pt-2 text-base md:text-[1.5rem] lg:text-[1.5rem] font-normal font-comfortaa"
                                            style={{ color: theme === 'light' ? 'grey' : 'whitesmoke', lineHeight: '1.12rem' }}
                                            role="menuitem"
                                            id="menu-item-0"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link to='/' className='text-white font-comfortaa text-base md:text-xl'>Login</Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;

