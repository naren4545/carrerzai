// components/Header.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "../assests/CareerZai_Logo.svg";
import search from "../assests/ic_sharp-search.svg"; // Adjust path as necessary
import { usePathname } from "next/navigation";
import RegisterDropdown from "./RegisterDropdown";
import Hamburger from "./HamBurger";
import Dropdown from "./Dropdown"; // Import Dropdown component

const Header: React.FC = () => {
  const pathname = usePathname();

  return (
    <header className="shadow-custom-light  z-50 backdrop-filter backdrop-blur-lg w-full lg:sticky top-0 ">
      {/* Container for max width */}
      <div className="lg:border-b border-[#B6B6B6] px-3 py-3 lg:pt-6 pb-3 w-full">
        {/* Logo and Buttons */}
        <div className="flex flex-row items-center justify-between max-w-[1350px] w-full mx-auto ">
          <div className="flex items-center space-x-2">
            <Hamburger />
            <Image
              src={logo}
              alt="CareerZa Logo"
              className="w-[80px] h-[20px] md:w-auto md:h-auto"
              priority
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col  lg:pt-0  lg:flex-row justify-center gap-4 items-center font-i text-xl font-bold lg:space-x-4">
            <a className="px-3 py-2 hidden lg:block  text-white bg-[#0068FF] rounded-md hover:bg-blue-700">
              Job Seeker Login
            </a>
            <a className="px-3 py-2 hidden lg:block text-white bg-[#0068FF] rounded-md hover:bg-blue-900">
              Recruiter Login
            </a>
            <RegisterDropdown />
          </div>
        </div>
      </div>
      {/* Navigation and Search */}
      <div className="flex justify-between py-4  items-center max-w-[1350px] w-full mx-auto pt-3">
        <nav className="hidden lg:flex gap-8 font-i text-2xl">
          <Link
            href="/"
            className={`hover:text-blue-600 ${
              pathname === "/" ? "text-blue-600 border-b-2 border-blue-600" : ""
            }`}
          >
            Home
          </Link>
          <div className="relative group">
            {/* "Find Jobs" Link with Hover */}
            <Link
              href="/find-jobs"
              className={`hover:text-blue-600 ${
                pathname === "/find-jobs"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : ""
              }`}
            >
              Find Jobs
            </Link>
            {/* Dropdown will appear when hovering over the parent link */}
            <Dropdown />
          </div>
          <Link
            href="/find-talent"
            className={`hover:text-blue-600 ${
              pathname === "/find-talent"
                ? "text-blue-600 border-b-2 border-blue-600"
                : ""
            }`}
          >
            Find Talent
          </Link>
          <Link
            href="/contact"
            className={`hover:text-blue-600 ${
              pathname === "/contact"
                ? "text-blue-600 border-b-2 border-blue-600"
                : ""
            }`}
          >
            Contact
          </Link>
        </nav>

        <div className="relative w-full lg:w-fit px-3">
          <div className="absolute left-4 top-[6px] md:top-[14px] text-gray-400 ">
            <Image alt="" src={search} />
          </div>

          <input
            type="text"
            placeholder="Search for Job, Company or Skill..."
            className=" pl-[37px] lg:inline-block w-full lg:min-w-[405px] md:h-[50px] h-20px[] px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none text-[10px] focus:border-blue-500 placeholder:lg:text-base"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
