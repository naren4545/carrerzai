import Image from 'next/image';
import React from 'react';
import companyImg from '../../../assests/companyImgPlaceholder.svg'
import save from '../../../assests/stash_save-ribbon-solid.svg'
import location from '../../../assests/mdi_location.svg'
import salary from '../../../assests/₹.svg'
import exprience from '../../../assests/exprience.svg'
import timeFill from '../../../assests/mingcute_time-fill.svg'
interface JobCardProps {
  job: {
    title: string;
    company: string;
    location: string;
    salary: { minSalary: number; maxSalary: number };
    createdAt: string;
    typeOfJob: string;
  };
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const timeSincePosted = (date: string) => {
    const timeDiff = Date.now() - new Date(date).getTime();
    const mins = Math.floor(timeDiff / (1000 * 60));
    return `${mins} mins. ago`;
  };

  return (
    <div className="border rounded-lg p-4 shadow-md h-fit bg-white max-w-[905px]">
      <div className="flex justify-between items-center mb-3">
        <div className='flex gap-5'>
        <div>
      <Image src={companyImg} alt=''/>
        </div>
        <div>
          <h3 className="text-[28px] leading-[42px] font-semibold">{job.title}</h3>
          <p className="text-2xl text-gray-500">{job.company}</p>
        </div>
        </div>
        <button className="text-gray-500 hover:text-gray-700">
          <Image src={save} alt="Bookmark" className="" />
        </button>
      </div>

      <hr className="my-2" />

      <div className="flex justify-between items-center py-5 px-3">
        <div className="text-2xl font-normal">
          <div className="flex items-center gap-3 pb-4">
          <div className='w-[40px] '>
            <Image src={location} alt="Home" className=" mr-2" />
            </div>
            {job.location}
          </div>
          <div className="flex items-center mt-2 gap-3 pb-4">
          <div className='w-[40px] '>
            <Image src={salary} alt="Salary" className=" mr-2" />
            </div>
            {`${job.salary?.minSalary}L – ${job.salary?.maxSalary}L/yr`}
          </div>
          <div className="flex items-center mt-2 gap-3 pb-4">
            <div className='w-[40px] '>
            <Image src={exprience} alt="Experience" className=" pr-2" />
            </div>
            {job.typeOfJob}
          </div>
        </div>

        <div className="flex flex-col gap-3 text-2xl">
          <button className="text-blue-600 border border-blue-600 px-7 py-2 rounded mb-2">
            View Details
          </button>
          <button className="bg-blue-600 text-white px-7 py-2 rounded">
            Apply
          </button>
        </div>
      </div>

      <div className="mt-3 text-xl text-[#FF6700] flex items-center gap-5">
       <a href=''  className='flex items-center p-2 rounded-lg border-[#FF6700] border '> <Image src={timeFill} alt="Clock" className="w-4 h-4 mr-2" />
        {timeSincePosted(job.createdAt)}</a> • <span className="ml-1 text-sm">Be an early applicant</span>
      </div>
    </div>
  );
};

export default JobCard;
