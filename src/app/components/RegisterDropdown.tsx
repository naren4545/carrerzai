"use client"; // for using hooks in Next.js (if applicable)

import { useState } from 'react';

const RegisterDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left  lg:hidden">
      {/* Button */}
      <button
      type='button'
        onClick={toggleDropdown}
        className="inline-flex justify-center items-center gap-2 w-full px-4 py-2 text-[10px] font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 "
      >
        Register
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <title>Arrow Icon</title>
<path d="M0.386884 2.2341L3.7707 5.61792C3.89157 5.73904 4.03514 5.83513 4.19319 5.90069C4.35124 5.96625 4.52067 6 4.69178 6C4.86289 6 5.03232 5.96625 5.19037 5.90069C5.34842 5.83513 5.49199 5.73904 5.61286 5.61792L8.99668 2.2341C9.8067 1.41101 9.23185 0 8.06907 0L1.31449 0C0.13865 0 -0.436208 1.41101 0.386884 2.2341Z" fill="white"/>
</svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute z-10 right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-all ease-in duration-300">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <a
              href="/"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              style={{ fontSize: '10px' }}
              role="menuitem"
            >
              Job Seeker Login
            </a>
            <a
              href="/"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              style={{ fontSize: '10px' }}
              role="menuitem"
            >
              Recruiter Login
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterDropdown;
