"use client"
import React from 'react'

export default function BackButon() {

    
        const goBack = () => {
          if (typeof window !== 'undefined' && window.history.length > 1) {
            window.history.back(); // Navigate to the previous page
          } else {
            window.location.href = '/'; // Fallback if no history, redirect to homepage or another default page
          }
        };
  
  return (
    <div className='py-1'>
      <button onClick={goBack} className=" hover:underline text-xs md:text-3xl">
      <svg width="15" className='inline-block mr-3' height="29" viewBox="0 0 15 29" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.1189 2.25112L2.9763 13.5727C2.73192 13.8197 2.59485 14.1531 2.59485 14.5006C2.59485 14.8481 2.73192 15.1816 2.9763 15.4286L14.1165 26.7501C14.3607 26.9987 14.4976 27.3332 14.4976 27.6817C14.4976 28.0302 14.3607 28.3647 14.1165 28.6133C13.9971 28.7357 13.8545 28.833 13.697 28.8994C13.5395 28.9658 13.3703 29 13.1994 29C13.0285 29 12.8593 28.9658 12.7018 28.8994C12.5443 28.833 12.4016 28.7357 12.2823 28.6133L1.14216 17.2942C0.410131 16.5486 0 15.5455 0 14.5006C0 13.4558 0.410131 12.4526 1.14216 11.7071L12.2823 0.387956C12.4017 0.265191 12.5444 0.167605 12.7022 0.100969C12.8599 0.0343329 13.0294 0 13.2006 0C13.3718 0 13.5413 0.0343329 13.699 0.100969C13.8568 0.167605 13.9995 0.265191 14.1189 0.387956C14.3631 0.636511 14.5 0.971054 14.5 1.31954C14.5 1.66802 14.3631 2.00256 14.1189 2.25112Z" fill="#14140F"/>
</svg>
 Back to All Jobs
    </button>
    </div>
  )
}
