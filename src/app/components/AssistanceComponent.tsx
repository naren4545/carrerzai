"use client";
import Image from 'next/image';
import  { useState } from 'react';
import image from '../assests/faqimage.png';

interface AssistanceComponentProps {
  selectedOption: string; // Adjust this type based on the actual type (e.g., number, object, etc.)
  setSelectedOption: (option: string) => void; // Adjust the parameter type if necessary
}

const AssistanceComponent: React.FC<AssistanceComponentProps> = ({ selectedOption, setSelectedOption }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown state

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev); // Toggle dropdown visibility
  };

  const handleOptionSelect = (option:any) => {
    setSelectedOption(option); // Update selected option
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  return (
    <div className="max-w-xs mx-auto">
      {/* Dropdown Selection */}
      <div className="border rounded-md shadow-xl mb-4">
        <div className='p-6 border-b text-2xl text-[#FF6700] cursor-pointer' onKeyUp={toggleDropdown}>
          <div className='flex justify-between max-w-[300px] mx-auto cursor-pointer'>
            <p>{selectedOption}</p>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <title>Arrow Icon</title>
              <path d="M7.73551 19.6035L14.652 12.576C14.8037 12.4227 14.8888 12.2157 14.8888 12C14.8888 11.7844 14.8037 11.5774 14.652 11.424L7.73701 4.39654C7.5854 4.24226 7.50045 4.0346 7.50045 3.81829C7.50045 3.60198 7.5854 3.39432 7.73701 3.24004C7.81108 3.16407 7.8996 3.10369 7.99737 3.06246C8.09513 3.02124 8.20016 3 8.30626 3C8.41237 3 8.51739 3.02124 8.61516 3.06246C8.71292 3.10369 8.80145 3.16407 8.87551 3.24004L15.7905 10.266C16.2449 10.7288 16.4995 11.3515 16.4995 12C16.4995 12.6486 16.2449 13.2713 15.7905 13.734L8.87551 20.76C8.80142 20.8362 8.71281 20.8968 8.6149 20.9382C8.517 20.9795 8.4118 21.0009 8.30551 21.0009C8.19923 21.0009 8.09403 20.9795 7.99612 20.9382C7.89822 20.8968 7.8096 20.8362 7.73551 20.76C7.5839 20.6058 7.49895 20.3981 7.49895 20.1818C7.49895 19.9655 7.5839 19.7578 7.73551 19.6035Z" fill="#FF6700"/>
            </svg>
          </div>
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="border-t border-gray-200 bg-white ">
            <div className="flex flex-col">
              <button
              type='button'
                onClick={() => handleOptionSelect("Job Seekers")}
                className="text-left  hover:bg-gray-100 p-6 border-b text-2xl"
              >
                Job Seekers
              </button>
              <button
              type='button'
                onClick={() => handleOptionSelect("Job Recruiters")}
                className="text-left  hover:bg-gray-100 p-6 border-b text-2xl"
              >
                Job Recruiters
              </button>
            </div>
          </div>
        )}
      </div>

     


      {/* Assistance Card */}
      <div className=" border-[0.5px] rounded-md border-black p-6 text-center">
        <div className="flex justify-center mb-4">
          <Image src={image} alt="Assistance Image" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">Need Further Assistance?</h3>
        <p className="text-sm text-gray-600 mt-2">
          If you still have questions or need personalized help, we're here to assist you. Contact our support team for
          quick and friendly service.
        </p>
        <button type='button' className="mt-4 px-6 py-2 bg-yellow-500 text-white font-semibold rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400">
          Contact Now
        </button>
      </div>
    </div>
  );
}

export default AssistanceComponent;
