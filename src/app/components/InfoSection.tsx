// components/InfoSection.tsx
import Image from 'next/image';

import pdr from '../assests/pdrinfosec.svg';

const InfoSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="mx-auto">
        <h2 className="md:text-4xl text-xl font-semibold mb-4 text-center">Unlock Your Potential with Careerzai</h2>
        <p className="mb-12 md:text-2xl text-sm max-w-[917px] mx-auto text-center">
          Whether you're looking for your next career move or the ideal candidate, our 
          platform provides the tools and resources you need to succeed.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 transition-all ease-in-out duration-200">
          {/* Job Seekers Card */}
          <div className="bg-white rounded-lg p-8 shadow-md border hover:bg-[#FFF5D9] border-gray-200">
            <h3 className="md:text-[32px] text-xl font-bold text-[#FF6700] transition-all ease-in-out duration-200 mb-2 max-w-[537px] mx-auto">Job Seekers?</h3>
            <p className=" md:text-2xl text-sm font-light italic mb-6 max-w-[537px] mx-auto">Empowering Your Career Journey</p>
            
            {/* Job Seeker Features */}
            <ul className="space-y-4 text-left max-w-[537px] mx-auto">
  <li className="flex items-center max-w-[537px]">
    <Image src={pdr} className="w-[63px] md:w-fit" alt="Job Seekers Feature" />
    <div className="ml-4">
      <h4 className="md:text-xl font-medium text-base">Personalized Job Recommendations</h4>
      <p className="text-gray-600 md:text-base text-xs leading-4">Get job suggestions that match your skills, experience, and career interests.</p>
    </div>
  </li>
  <li className="flex items-center max-w-[537px]">
    <Image src={pdr} className="w-[63px] md:w-fit" alt="Job Seekers Feature" />
    <div className="ml-4">
      <h4 className="md:text-xl font-medium text-base">Apply Quickly and Easily</h4>
      <p className="text-gray-600 md:text-base text-xs leading-4">Submit applications with just a few clicks, saving time in your job search.</p>
    </div>
  </li>
  <li className="flex items-center max-w-[537px]">
    <Image src={pdr} className="w-[63px] md:w-fit" alt="Job Seekers Feature" />
    <div className="ml-4">
      <h4 className="md:text-xl font-medium text-base">Access to Top Employers</h4>
      <p className="text-gray-600  md:text-base text-xs leading-4">Discover job openings from leading companies and local businesses.</p>
    </div>
  </li>
  <li className="flex items-center max-w-[537px]">
    <Image src={pdr} className="w-[63px] md:w-fit" alt="Job Seekers Feature" />
    <div className="ml-4">
      <h4 className="md:text-xl font-medium text-base">Track Your Applications</h4>
      <p className="text-gray-600 md:text-base text-xs leading-4">Keep tabs on your applications and get updates directly from recruiters.</p>
    </div>
  </li>
</ul>



            {/* Buttons */}
            <div className="flex mt-6 gap-5 max-w-[537px] mx-auto">
              <button className="px-4 md:text-xl text-sm py-4 md:min-w-[184px] min-w-[130px] border-[#0068FF] border  text-[#0068FF] font-semibold rounded-md">Learn More</button>
              <button className="px-4 md:text-xl text-sm py-4 bg-blue-700 md:min-w-[184px] min-w-[130px] text-white font-semibold rounded-md">Signup</button>
            </div>
          </div>

          {/* Finding Talent Card */}
          <div className="bg-white rounded-lg p-8 hover:bg-[#FFF5D9] transition-all ease-in-out duration-200 shadow-md border border-gray-200">
            <h3 className="text-[32px] font-bold text-[#FF6700] mb-2 max-w-[537px] mx-auto">Finding Talent?</h3>
            <p className="text-2xl font-light italic mb-6 max-w-[537px] mx-auto">Effortless Hiring, Exceptional Talent</p>

            {/* Finding Talent Features */}
            <ul className="space-y-4 text-left max-w-[537px] mx-auto">
  <li className="flex items-center max-w-[537px]">
    <Image src={pdr} className="w-[63px] md:w-fit" alt="Job Seekers Feature" />
    <div className="ml-4">
      <h4 className="md:text-xl font-medium text-base">Post Jobs Effortlessly</h4>
      <p className="text-gray-600 md:text-base text-xs leading-4">Create job listings quickly with a user-friendly interface.</p>
    </div>
  </li>
  <li className="flex items-center max-w-[537px]">
    <Image src={pdr} className="w-[63px] md:w-fit" alt="Job Seekers Feature" />
    <div className="ml-4">
      <h4 className="md:text-xl font-medium text-base">Find Qualified Candidates</h4>
      <p className="text-gray-600 md:text-base text-xs leading-4">Access a diverse talent pool and filter candidates based on skills and experience.</p>
    </div>
  </li>
  <li className="flex items-center max-w-[537px]">
    <Image src={pdr} className="w-[63px] md:w-fit" alt="Job Seekers Feature" />
    <div className="ml-4">
      <h4 className="md:text-xl font-medium text-base">Streamlined Hiring Process</h4>
      <p className="text-gray-600 md:text-base text-xs leading-4">Manage applications and communicate with potential hires in one place.</p>
    </div>
  </li>
  <li className="flex items-center max-w-[537px]">
    <Image src={pdr} className="w-[63px] md:w-fit" alt="Job Seekers Feature" />
    <div className="ml-4">
      <h4 className="md:text-xl font-medium text-base">Build Your Company's Brand</h4>
      <p className="text-gray-600 md:text-base text-xs leading-4">Showcase your organization to attract the best talent and stand out from competitors.</p>
    </div>
  </li>
</ul>




            {/* Buttons */}
            <div className="flex mt-6 gap-5 max-w-[537px] mx-auto text-center">
              <a className="px-4 md:text-xl text-sm py-4 md:min-w-[184px] min-w-[130px] border-[#0068FF] border  text-[#0068FF] font-semibold rounded-md">Learn More</a>
              <a className="px-4 md:text-xl text-sm py-4 bg-blue-700 md:min-w-[184px] min-w-[130px] text-white font-semibold rounded-md">Signup</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
