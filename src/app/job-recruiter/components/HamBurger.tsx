"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import HamburgerNav from "./hamburgerNav";

// SidebarItem component with TypeScript props
interface SidebarItemProps {
  label: string;
  linkTo: string;
  onclick: () => void;
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

const Hamburger = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [portalRoot, setPortalRoot] = useState<Element | null>(null);

  useEffect(() => {
    setPortalRoot(document.getElementById("portal-root"));
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const sidebarContent = (
    <div className="flex lg:hidden">
      <div className="lg:hidden p-4 ">
        <button
        type="button"
          onClick={toggleSidebar}
          className="text-black hover:text-white focus:outline-none focus:text-white"
        >
          {isOpen ? (
            <FaBars className="w-6 h-6 text-black" />
          ) : (
            <FaBars className="w-6 h-6 text-black" />
          )}
        </button>
      </div>
     <HamburgerNav isOpen={isOpen} toggleSidebar={toggleSidebar}/>
    </div>
  );

  return sidebarContent
};

export default Hamburger;
