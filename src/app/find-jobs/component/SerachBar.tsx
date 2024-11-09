"use client"

import React, { useRef } from 'react';
import search from '../../assests/ic_sharp-search (1).svg';
import location from '../../assests/ei_location.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  jobs: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ jobs }) => {
  const router = useRouter();
  const skillRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    const skill = skillRef.current?.value || '';
    const location = locationRef.current?.value || '';
    
    // Redirect to the new route with query parameters
    router.push(`/find-jobs/jobs?location=${encodeURIComponent(location)}${skill?"&skilltag="+encodeURIComponent(skill):""}`);
  };

  return (
    <div className='px-3'>
    <div className="flex lg:flex-row flex-col   w-full max-w-[1100px] mx-auto items-center lg:border  lg:border-gray-300 rounded-lg overflow-hidden bg-white border border-black">
      {/* Job Title Search */}
      <div className="flex items-center h-full pl-3 lg:w-[40%] w-full lg:border-r lg:border-0  rounded-lg lg:border-gray-300">
        <Image src={search} alt="Search Icon" />
        <input
          ref={skillRef}
          type="text"
          placeholder="Search job title, company or skill"
          className="w-full p-3 py-6 text-sm text-gray-700 placeholder-[#B6B6B6] focus:outline-none placeholder:text-xl"
        />
      </div>

      {/* Location Search */}
      <div className="flex h-full py-3 items-center border-t border-black pl-3 lg:w-[40%] w-full lg:border-0 ">
        <Image src={location} alt="Location Icon" />
        <input
          ref={locationRef}
          type="text"
          placeholder="Search location or Remote"
          className="w-full p-3 text-sm text-gray-700 rounded-lg placeholder-[#B6B6B6] focus:outline-none placeholder:text-xl"
        />
      </div>

      {/* Browse Jobs Button */}
      <button
        onClick={handleSearch}
        className="bg-blue-500 md:inline-block py-5 hidden h-full lg:w-[20%] w-full text-white text-xl font-semibold px-3"
      >
        Browse Jobs
      </button>
    </div>
    <div className='pt-7 text-center'>
    <button
        onClick={handleSearch}
        className="bg-blue-500 md:hidden inline-block py-3  h-full lg:w-[20%] md:w-full w-fit rounded-lg text-white text-sm font-semibold px-3"
      >
        Browse Jobs
      </button>
      </div>
    </div>
  );
};

export default SearchBar;
