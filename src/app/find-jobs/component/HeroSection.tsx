import Image from "next/image";
import React from "react";
import bannerImg from "../../assests/herosectinbg.png";
import smileImg from "../../assests/czsmile.svg";
import SearchBar from "./SerachBar";
import topright from '../../assests/top-right.svg'
export default function HeroSection() {
  return (
    <section>
      <div className="relative py-10">
      <div className="absolute top-0 right-0 lg:hidden z-[-1]">
        <Image
          src={topright} // Change to your image path
          alt="Top Right Overlay"
          className="object-cover w-[100px] md:w-fit" // Use object-cover to maintain aspect ratio
        />
      </div>
      {/* Bottom Left Image */}
      <div className="absolute bottom-0 left-0 lg:hidden z-[-1]">
        <Image
          src={topright} // Change to your image path
          alt="Bottom Left Overlay"
          className="object-cover w-[100px] md:w-fit" // Use object-cover to maintain aspect ratio
        />
      </div>

      <div className='image lg:block hidden relative z-[-1]'>
<Image src={bannerImg} className='w-full' alt="banner"/>
</div>

        <div className=" lg:absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
          <div className="text-center">
            <h1 className="font-py gap-3 flex justify-center font-semibold text-4xl lg:text-6xl relative pb-4 max-w-[889px] mx-auto leading-[76px]">
           <span> Find Your Next Job</span> <Image className="inline lg:w-auto w-[38px]" src={smileImg} alt=""/>
            </h1>
            <p className="pb-6 max-w-[714px] mx-auto font-py text-2xl  font-normal">
            Explore thousands of job opportunities tailored to your skills and location.
 Filter by experience, distance, and more to find the perfect match and 
start your career journey now!
            </p>

           
          </div>
          <div className="pt-6 px-3 w-full max-w-[1100px]">
          <SearchBar/>
          </div>
        </div>
      </div>
    </section>
  );
}
