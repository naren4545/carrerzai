import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { usePathname } from "next/navigation";
import Profile from "../assests/profile.svg";

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
import Image from 'next/image';
interface SidebarItemProps {
  label: string;
  linkTo: string;
  onclick: () => void;
  className?: string;
}
interface HamburgerNavProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}
const SidebarItem = ({ label, linkTo, onclick, className }: SidebarItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === linkTo;
  const style = isActive ? " bg-gray-200 text-black" : "";

  return (
    <Link href={linkTo} onClick={onclick}>
      <div
        className={
          `flex items-center space-x-3 cursor-pointer hover:bg-gray-200 hover:text-black rounded-lg p-3 ${style}`
        }
      >
        <span>{label}</span>
      </div>
    </Link>
  );
};

const HamburgerNav: React.FC<HamburgerNavProps> = ({ isOpen, toggleSidebar }) => {
  const [portalRoot, setPortalRoot] = useState<Element | null>(null);

  const { 
    isPinqueryLoggedIn, 
   
    
    pinqueryLogout,
    
    loading
  } = useDualAuth();
const pathname=usePathname()
  const isFindJobPage = pathname === '/find-jobs/jobs' || pathname==='/find-jobs/internships';

console.log(isPinqueryLoggedIn)
  useEffect(() => {
    // Set the portal root element after mounting
    setPortalRoot(document.getElementById("portal-root"));
  }, []);

  const sidebarContent = (
    <>
     {isOpen && <div
        className={`bg-[#00000050] fixed w-full h-full top-0 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 "
        }`}
      />}
      <aside
       className={`p-4 aside-nav bg-white hamburger transition-transform duration-300 ease-in-out transform fixed top-0 left-0 w-64 h-full z-10 shadow-lg ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      style={{ overflowY: "auto" }}
      >
        <div className="relative">
        <div className="flex justify-between">
{isPinqueryLoggedIn===true &&
          <div className="">
              <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer"> <Image src={Profile} alt=""/></div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[290px] mr-3 rounded-[10px] ">
      
        <ProfileDropDown name="Narendra" email="narenchavn26@gmail.com"/>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>}
   
          
            <button
            type='button'
              onClick={toggleSidebar}
              className="text-gray-300 absolute right-5 top-5 hover:text-white focus:outline-none focus:text-white"
            >
              {isOpen ? (
                <FaTimes className="w-6 h-6 text-black absolute top-[-4px]" />
              ) : (
                <FaBars className="w-6 h-6 text-black" />
              )}
            </button>
          </div>
          <nav className="pt-5">
            <SidebarItem onclick={toggleSidebar} label="Home" linkTo="/" />
            <SidebarItem onclick={toggleSidebar} className={`${isFindJobPage??"hidden"}`} label="Find Jobs" linkTo="/find-jobs" />
            <SidebarItem onclick={toggleSidebar} className={`${isFindJobPage?"":"hidden"}`} label="Jobs" linkTo="/find-jobs/jobs" />
            <SidebarItem onclick={toggleSidebar} className={`${isFindJobPage?"":"hidden"}`} label="Internships" linkTo="/find-jobs/internships" />

          
            <SidebarItem onclick={toggleSidebar} className={`${isPinqueryLoggedIn===true && "hidden"}`} label="Find Talent" linkTo="/find-talent" />
            <SidebarItem onclick={toggleSidebar} label="Contact" linkTo="/contact" />
           
          </nav>
        </div>
      </aside>
    </>
  );

  // Render the sidebar content in the portal root if available
  return portalRoot ? createPortal(sidebarContent, portalRoot) : null;
}
export default HamburgerNav;