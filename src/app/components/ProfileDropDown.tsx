// src/components/ProfileDropDown.tsx

import Link from "next/link";
import account from '../assests/material-symbols-light_manage-accounts-outline.svg'
import application from '../assests/quill_paper.svg'
import cv from '../assests/pepicons-pencil_cv.svg'
import save from '../assests/stash_save-ribbon-solid.svg'
import logout from '../assests/hugeicons_logout-05.svg'
import help from '../assests/streamline_help-chat-2.svg'
import Image from "next/image";
import {
   
    DropdownMenuSeparator,
    
  } from "@/components/ui/dropdown-menu"
import { useDualAuth } from "@/context/AuthContext";
interface ProfileLink {
  href: string;
  label: string;
   // Replace with the actual icon component or an <img> tag
}

interface ProfileDropDownProps {
  name: string;
  email: string;
  
}
const links=[
    { href: "/profile", label: "Profile", icon: account },
    { href: "/applications", label: "My Application", icon: application },
    { href: "/resume", label: "My Resume", icon: cv },
    { href: "/find-jobs/bookmarks", label: "Jobs Saved", icon: save  },
    { href: "/logout", label: "Logout", icon: logout},
    { href: "/help-centre", label: "Help Centre", icon: help },
  ]
export default function ProfileDropDown({ name, email }: ProfileDropDownProps) {


  const { 
    isPinqueryLoggedIn, 
   
    pinqueryLogout
   
    
    
  } = useDualAuth();
  return (
    <div className=" bg-white rounded-lg py-5 ">
      <div className="pb-2 px-4 ">
        <h3 className="md:text-3xl text-xl font-medium mb-2">{name}</h3>
        <p className="md:text-2xl text-base mb-2">{email}</p>
      </div>
      <DropdownMenuSeparator  className="bg-black" />
      <ul className="space-y-6 pt-4">
        {links.map((link, index) => (
          // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
<li key={link.href} onClick={link.href === "/logout" ? pinqueryLogout : () => {}}>
            <Link href={link.href} className="flex justify-start  px-4 items-center space-x-3 md:text-2xl text-base hover:text-blue-600">
              <span className=""><Image src={link.icon} alt=""/></span> {/* Use icon dynamically */}
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
