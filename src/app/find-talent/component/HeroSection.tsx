import Image from 'next/image'

import bannerImg from '../../assests/herosectinbg.png'
import topright from '../../assests/top-right.svg'
export default function HeroSection() {
  return (
    <section>
    <div className='relative min-h-[450px]'>


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


      <div className='image hidden lg:block relative z-[-1]'>
      <Image src={bannerImg} className='w-full' alt="banner"/>
</div>

<div className='lg:absolute top-0 left-0 h-full px-2  w-full min-h-[450px] flex justify-center items-center'>
<div className='text-center'>
<h1 className='font-py font-semibold lg:text-6xl text-5xl relative pb-4 max-w-[889px] mx-auto lg:leading-[76px]'>Find the Perfect Talent 
for Your Team! </h1>
<p className='pb-6 max-w-[636px] mx-auto font-py text-2x  font-normal'>Whether you're seeking the perfect job or the ideal candidate, 
<strong className='font-semibold text-[#FF6700]'>Careerzai</strong> connects job seekers with top employers and 
helps businesses find the right talent.</p>

<div className="flex lg:flex-row flex-col justify-center gap-4 font-p text-xl font-bold space-x-4">
            <a className="px-3 py-5 min-w-[250px ]  text-white bg-[#0068FF] rounded-md hover:bg-blue-700">
            Browse Opportunities
            </a>
            <a className="px-3 min-w-[250px] py-5 text-[#0068FF] bg-white border-[#0068FF] border rounded-md hover:bg-blue-900">
            Hire Now
            </a>
          </div>
</div>
      </div>
    </div>
    </section>
  )
}
