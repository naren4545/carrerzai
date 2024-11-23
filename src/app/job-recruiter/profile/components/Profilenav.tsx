// pages/profile.js
"use client";

import Link from "next/link";





 




export default  function Profile() {
  

  return (
    <div className="max-w-[1118px]  mx-auto py-10 px-4">
      <h1 className="text-center text-5xl font-semibold mb-10">Profile</h1>

      <div className="flex    text-4xl font-medium">
        <div className="border-b-2 border-[#14140F]"><Link href={"/"} className="inline-block px-5 ]">Edit Profile</Link></div>
        <Link href="/job-recruiter/profile/" className="text-orange-600 inline-block px-5 font-semibold border-b-2 border-orange-600 pb-1">
          Job Posted
        </Link>
        <Link href={"/"} className="inline-block px-5 border-b-2 border-[#14140F]">Draft Jobs</Link>
      <div className="flex-grow border-b-2 border-[#14140F]"/>
      </div>

      
    </div>
  );
}
