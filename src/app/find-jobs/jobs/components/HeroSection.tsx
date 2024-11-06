import React from 'react';
import search from '../../../assests/ic_sharp-search (1).svg'
import location from '../../../assests/ei_location.svg'
import Image from 'next/image';
const SearchBar: React.FC = () => {
  return (
    <div className='bg-[#0068FF] py-10'>
    <div className='py-10  '>
    <div className="flex  w-full max-w-[1100px] mx-auto items-center border border-gray-300 rounded-lg overflow-hidden">
      {/* Job Title Search */}
      <div className="flex items-center h-full bg-white py-3 px-3 w-[40%] border-r border-gray-300">
        <Image  src={search} alt="Search Icon"  />
        <input
          type="text"
          placeholder="Search job title, company or skill"
          className="w-full p-3 text-sm text-gray-700 placeholder-[#B6B6B6] focus:outline-none placeholder:text-xl"
        />
      </div>

      {/* Location Search */}
      <div className="flex px-3 h-full bg-white py-3 items-center w-[40%]">
        <Image  src={location} alt="Location Icon"  />
        <input
          type="text"
          placeholder="Search location or Remote"
          className="w-full p-3  text-sm text-gray-700 placeholder-[#B6B6B6] focus:outline-none placeholder:text-xl"
        />
      </div>

      {/* Browse Jobs Button */}
      <button className="bg-[#FFBA00] py-5 inline-block h-full w-[20%] text-white text-xl font-semibold px-3 ">
        Browse Jobs
      </button>
    </div>
    </div>
    </div>
  );
};

export default SearchBar;
