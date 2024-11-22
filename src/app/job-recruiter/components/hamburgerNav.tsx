import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,

  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ProfileDropDown from "./ProfileDropDown";
import Profile from "../../assests/profile.svg";
import Image from 'next/image';
interface SidebarItemProps {
  label: string;
  linkTo: string;
  onclick: () => void;
}
interface HamburgerNavProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}
const SidebarItem = ({ label, linkTo, onclick }: SidebarItemProps) => {
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
console.log(isOpen)
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
        className={`p-4 aside-nav bg-white hamburger transition-transform duration-300 ease-in-out transform fixed w-64 h-full z-10 md:z-auto top-0 shadow-lg ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="relative">
          <div className="flex justify-between">

<div>
<DropdownMenu >
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer"> <Image src={Profile} alt=""/></div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[240px] mr-3 rounded-[10px] ">
      
        <ProfileDropDown name="Narendra" email="narenchavn26@gmail.com"/>
      </DropdownMenuContent>
    </DropdownMenu>
</div>

            <button
            type='button'
              onClick={toggleSidebar}
              className="text-gray-300  hover:text-white focus:outline-none focus:text-white"
            >
              {isOpen ? (
                <FaTimes className="w-6 h-6 text-black absolute top-[-4px]" />
              ) : (
                <FaBars className="w-6 h-6 text-black" />
              )}
            </button>
          </div>
          <nav className="pt-5">
            <SidebarItem onclick={toggleSidebar} label="Home" linkTo="/job-recruiter" />
            <SidebarItem onclick={toggleSidebar} label="Post Jobs" linkTo="/job-recruiter/post-job" />
            <SidebarItem onclick={toggleSidebar} label="Search Candidate" linkTo="/job-recruiter/" />
            <SidebarItem onclick={toggleSidebar} label="Contact" linkTo="/job-recruiter/Contact" />
           
          </nav>
        </div>
      </aside>
    </>
  );

  // Render the sidebar content in the portal root if available
  return portalRoot ? createPortal(sidebarContent, portalRoot) : null;
}
export default HamburgerNav;