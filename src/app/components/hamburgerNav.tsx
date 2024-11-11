import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { usePathname } from "next/navigation";

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
        className={`bg-[#00000050] absolute w-full h-full top-0 transition-opacity duration-300 ${
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
            <SidebarItem onclick={toggleSidebar} label="Find Jobs" linkTo="/find-jobs" />
            <SidebarItem onclick={toggleSidebar} label="Find Talent" linkTo="/find-talent" />
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