"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname

export default function Profile() {
  const pathname = usePathname(); // Get the current route

  return (
    <div className="max-w-[1118px] mx-auto md:py-10 py-4 px-4">
      <h1 className="text-center md:text-5xl text-sm font-semibold py-10">Profile</h1>

      <div className="flex text-sm md:text-4xl font-medium">
        {/* Profile Tab */}
        <div
          className={`inline-block px-5 ${
            pathname === "/job-recruiter/profile/business-profile"
              ? "border-b-2 border-orange-600 text-orange-600"
              : "border-b-2 border-[#14140F]"
          }`}
        >
          <Link href="/job-recruiter/profile/business-profile">Profile</Link>
        </div>

        {/* Job Posted Tab */}
        <div
          className={`inline-block px-5 ${
            pathname === "/job-recruiter/profile"
              ? "border-b-2 border-orange-600 text-orange-600"
              : "border-b-2 border-[#14140F]"
          }`}
        >
          <Link href="/job-recruiter/profile/">Job Posted</Link>
        </div>

        {/* Spacer */}
        <div className="flex-grow border-b-2 border-[#14140F]" />
      </div>
    </div>
  );
}
