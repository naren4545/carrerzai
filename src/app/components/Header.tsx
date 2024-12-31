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
import Profile from "../assests/profile.svg";
import NotificationMessageComp from "./NotificationMessageComp";
import { useDualAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ProfileDropDown from "./ProfileDropDown";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import NotificationPermission from "@/components/NotificationPermission";


const Header: React.FC =  () => {
  const pathname = usePathname();
  const { 
    isPinqueryLoggedIn, 
   isProfile,
   
   loading
    
    
  } = useDualAuth();

  // Check if the current pathname is '/find-job/jobs'
  const isFindJobPage = pathname === '/find-jobs/jobs' || pathname==='/find-jobs/internships';
const isLogin=  isPinqueryLoggedIn



if( loading){

  return <div/>;
}
console.log(isLogin, isProfile)
 
  return (
    <header className="shadow-custom-light  z-50 backdrop-filter backdrop-blur-lg w-full lg:sticky top-0 ">
      {/* Container for max width */}
{isLogin && isProfile && <NotificationPermission/>}
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
           {!isLogin?(<> <a href="/" className="px-3 py-2 hidden lg:block  text-white bg-[#0068FF] rounded-md hover:bg-blue-700">
              Job Seeker Login
            </a>
            <a href="/" className="px-3 py-2 hidden lg:block text-white bg-[#0068FF] rounded-md hover:bg-blue-900">
              Recruiter Login
            </a>
            <RegisterDropdown /></>):( <>
            <div className="md:block hidden">
              <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer"> <Image src={Profile} alt=""/></div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[360px] mr-3 rounded-[10px] ">
      
        <ProfileDropDown name="Narendra" email="narenchavn26@gmail.com"/>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
    <div className="md:hidden block">
    <NotificationMessageComp/>
      </div>
            
            </>)}
          </div>
        </div>
      </div>
      {/* Navigation and Search */}
      <div className={`flex justify-between   items-center max-w-[1350px] w-full mx-auto  ${isLogin?"py-0 pt-0 md:py-4 md:pt-3":"py-4"}`}>
        <nav className="hidden lg:flex gap-8 font-i text-2xl">
          <Link
            href="/"
            className={`hover:text-blue-600 ${
              pathname === "/" ? "text-blue-600 border-b-2 border-blue-600" : ""
            }`}
          >
            Home
          </Link>
          <div className={`relative group ${isFindJobPage ? "hidden" : ""}`}>
            {/* "Find Jobs" Link with Hover */}


            <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger><Link
              href="/find-jobs"
              className={`hover:text-blue-600 text-2xl ${
                pathname === "/find-jobs"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : ""
              }`}
            >
              Find Jobs
            </Link></NavigationMenuTrigger>
          <NavigationMenuContent>
          <Dropdown />
          </NavigationMenuContent>
          </NavigationMenuItem>
          </NavigationMenuList>
          </NavigationMenu>










            
            {/* Dropdown will appear when hovering over the parent link */}
            {/* <Dropdown /> */}
          </div>
          <Link
            href="/find-talent"
            className={`hover:text-blue-600 ${isFindJobPage || isLogin ? "hidden" : ""} ${
              pathname === "/find-talent"
                ? "text-blue-600 border-b-2 border-blue-600"
                : ""
            }`}
          >
            Find Talent
          </Link>

          <Link
            href="/find-jobs/jobs"
            className={`hover:text-blue-600 ${isFindJobPage ? "" : "hidden"} ${
              pathname === "/find-jobs/jobs"
                ? "text-blue-600 border-b-2 border-blue-600"
                : ""
            }`}
          >
            Jobs
          </Link>

          <Link
            href="/find-jobs/internships"
            className={`hover:text-blue-600 ${isFindJobPage ? "" : "hidden"} ${
              pathname === "/find-jobs/internships"
                ? "text-blue-600 border-b-2 border-blue-600"
                : ""
            }`}
          >
           Internships
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
          {!isLogin?(<><div className="absolute left-4 top-[6px] md:top-[14px] text-gray-400 ">
            <Image alt="" src={search} />
          </div>

          <input
            type="text"
            placeholder="Search for Job, Company or Skill..."
            className=" pl-[37px] lg:inline-block w-full lg:min-w-[405px] md:h-[50px] h-20px[] px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none text-[10px] focus:border-blue-500 placeholder:lg:text-base"
          /></>):(<div className="md:block hidden"><NotificationMessageComp/></div>)}
        </div>
      </div>
    </header>
  );
};

export default Header;
