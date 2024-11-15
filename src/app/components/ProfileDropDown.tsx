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
    { href: "/saved-jobs", label: "Jobs Saved", icon: save  },
    { href: "/logout", label: "Logout", icon: logout},
    { href: "/help-centre", label: "Help Centre", icon: help },
  ]
export default function ProfileDropDown({ name, email }: ProfileDropDownProps) {
  return (
    <div className=" bg-white rounded-lg py-5 ">
      <div className="pb-2 px-4 ">
        <h3 className="text-3xl font-medium mb-2">{name}</h3>
        <p className="text-2xl mb-2">{email}</p>
      </div>
      <DropdownMenuSeparator  className="bg-black" />
      <ul className="space-y-6 pt-4">
        {links.map((link, index) => (
          <li key={link.href}>
            <Link href={link.href} className="flex justify-start  px-4 items-center space-x-3 text-2xl hover:text-blue-600">
              <span className=""><Image src={link.icon} alt=""/></span> {/* Use icon dynamically */}
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
