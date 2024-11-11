
"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import SearchIcon from "../assests/searchjobsearchicon.svg";
import LocationIcon from "../assests/weui_location-outlined.svg";
import CategoryIcon from "../assests/categoryjobsearch.svg";

const SearchJob: React.FC = () => {
  const [job, setJob] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    // This runs only on the client
    // Place any client-specific logic here
  }, []);

  const handleSearch = () => {
    console.log({ job, location, category });
  };

  return (
    <section className="bg-blue-600 py-16">
      <div className="max-w-[1350px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
        <div className="text-white text-center lg:text-left">
          <h1 className="md:text-[40px] text-xl  md:leading-[60px] font-semibold">
            Discover Your Dream Career
          </h1>
          <p className="md:text-2xl text-sm font-normal max-w-[442px]">
            Find the perfect role to match your skills and passion
          </p>
        </div>

        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-8 shadow-lg space-y-4">
          <div className="flex items-center gap-2 bg-white rounded-md px-4 py-2">
            <Image src={SearchIcon} alt="Search Icon" width="24" height="24" />
            <input
              type="text"
              placeholder="Job, Companies or Skill..."
              value={job}
              onChange={(e) => setJob(e.target.value)}
              className="w-full focus:outline-none h-[67px]"
            />
          </div>

          <div className="flex items-center gap-2 bg-white rounded-md px-4 py-2">
            <Image src={LocationIcon} alt="Location Icon" width="24" height="24" />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full focus:outline-none h-[67px]"
            />
          </div>

          <div className="flex items-center gap-2 bg-white rounded-md px-4 py-2">
            <Image src={CategoryIcon} alt="Category Icon" width="24" height="24" />
            <input
              type="text"
              placeholder="Category/Industry"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full focus:outline-none h-[67px]"
            />
          </div>

          <div className="text-center">
            <button
            type="button"
              onClick={handleSearch}
              className="py-3 px-5 mx-auto bg-[#FFBA00] shadow-lg text-white font-semibold rounded-md hover:bg-yellow-600 transition"
            >
              Search Jobs
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchJob;
