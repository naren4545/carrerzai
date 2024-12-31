// ProfileStart.js
import Image from 'next/image';
import pana from '../../assests/pana.png'
import Link from 'next/link';
export default function ProfileStart() {
  return (
    <section className='py-10'>
    <div className='p-3 py-5 max-w-[1340px] mx-auto'>
    <div className="border-2 border-black rounded-lg p-6 flex flex-col md:flex-row items-center md:gap-6 bg-white ">
      {/* Left Section - Illustration */}
      <div className="w-full md:w-1/2 flex justify-center items-center md:justify-start">
        <Image
          src={pana} // Replace with actual path
          alt="Profile Illustration"
       
          className="object-contain"
        />
      </div>

      {/* Right Section - Text and Button */}
      <div className="w-full md:w-1/2 mt-4 md:mt-0 text-center md:text-left">
        <h2 className="text-[40px] text-xl font-semibold  mb-3">
          Get Started with Your Profile!
        </h2>
        <p className="text-gray-600 mb-4 text-sm lg:text-2xl pb-3">
          Create your profile now to unlock job opportunities tailored to your skills and preferences.
          Start building your career journey today!
        </p>
        <Link href={"/profile"} className="bg-[#FFBA00]  text-white text-base font-semibold py-4 px-7 rounded-md shadow-xl text-2xl">
          Create Your Profile
        </Link>
      </div>
    </div>
    </div>
    </section>
  );
}
