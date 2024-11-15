// components/Header.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "../../assests/CareerZai_Logo.svg";
import Profile from "../../assests/profile.svg";
import search from "../../assests/ic_sharp-search.svg"; // Adjust path as necessary
import { usePathname } from "next/navigation";
import RegisterDropdown from "../../components/RegisterDropdown";
import Hamburger from "../../components/HamBurger";
import Dropdown from "../../components/Dropdown"; // Import Dropdown component
import message from '../../assests/uil_comment-alt-message.svg'
import bell from '../../assests/clarity_notification-line.svg'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
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

  const userData = {
    name: "Tanvi Parab",
    email: "misstanvi.06@gmail.com",
    links: [
      { href: "/profile", label: "Profile",  },
      { href: "/applications", label: "My Application",  },
      { href: "/resume", label: "My Resume",},
      { href: "/saved-jobs", label: "Jobs Saved",},
      { href: "/logout", label: "Logout",   },
      { href: "/help-centre", label: "Help Centre",   },
    ]
  };

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
          <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer"> <Image src={Profile} alt=""/></div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[360px] mr-3 rounded-[10px] ">
      
        <ProfileDropDown name="Narendra" email="narenchavn26@gmail.com"/>
      </DropdownMenuContent>
    </DropdownMenu>
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

        <div className="relative min-w-[160px] justify-between gap-5 flex w-full lg:w-fit px-3">
         
<button type="button">
<Image src={message} alt=""/>

</button>
<button type="button">

<Image src={bell} alt=""/>
</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
