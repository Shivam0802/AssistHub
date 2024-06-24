import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='flex flex-wrap items-center justify-between h-[6rem] bg-[#1B1B1B] px-4 md:px-8'>
            <div className='p-2'>
                <img src='/Assets/Logo1.png' alt='logo' className='w-40 md:w-60' />
            </div>
            <div className='flex items-center'>
                <Link to='/' className='font-comfortaa font-medium text-[22px] md:text-2xl px-4 md:px-6 pt-[0.25rem] text-gray-900 bg-[#FFFED3] rounded-md'>
                    Login
                </Link>
            </div>
        </div>
    );
}

export default Navbar;
