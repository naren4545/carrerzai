import React from 'react';
import search from '../../assests/ic_sharp-search (1).svg'
import location from '../../assests/ei_location.svg'
import Image from 'next/image';
const SearchBar: React.FC = () => {
  return (
    <div className="flex lg:flex-row flex-col py-3 px-3 w-full max-w-[1100px] items-center lg:border border-gray-300 rounded-lg overflow-hidden">
      {/* Job Title Search */}
      <div className="flex items-center h-full  lg:w-[40%] w-full lg:border-r  border-gray-300">
        <Image  src={search} alt="Search Icon"  />
        <input
          type="text"
          placeholder="Search job title, company or skill"
          className="w-full p-3 text-sm text-gray-700 placeholder-[#B6B6B6] focus:outline-none placeholder:text-xl"
        />
      </div>

      {/* Location Search */}
      <div className="flex  h-full py-3 items-center border-t  lg:w-[40%] w-full">
        <Image  src={location} alt="Location Icon"  />
        <input
          type="text"
          placeholder="Search location or Remote"
          className="w-full p-3  text-sm text-gray-700 placeholder-[#B6B6B6] focus:outline-none placeholder:text-xl"
        />
      </div>

      {/* Browse Jobs Button */}
      <button className="bg-blue-500 py-5 inline-block h-full lg:w-[20%]  w-full text-white text-xl font-semibold px-3 ">
        Browse Jobs
      </button>
    </div>
  );
};

export default SearchBar;
