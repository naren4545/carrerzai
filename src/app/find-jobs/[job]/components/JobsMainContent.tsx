import Image from 'next/image';

import companyImg from '../../../assests/companyImgPlaceholder.svg'
import save from '../../../assests/stash_save-ribbon-solid.svg'
import location from '../../../assests/mdi_location.svg'
import salary from '../../../assests/₹.svg'
import exprience from '../../../assests/exprience.svg'
import timeFill from '../../../assests/mingcute_time-fill.svg'

interface JobCardProps {
  job: {
    _id:string
    title: string;
    company: string;
    location: string;
    salary: { minSalary: number; maxSalary: number };
    createdAt: string;
    typeOfJob: string;
  };
}

const JobsMainContent: React.FC<JobCardProps> = ({ job }) => {
  const timeSincePosted = (date: string) => {
    const timeDiff = Date.now() - new Date(date).getTime();
    const mins = Math.floor(timeDiff / (1000 * 60));
    return `${mins} mins. ago`;
  };

  return (
   
    <div className="  pb-7 p-7  h-fit bg-white border-b border-black ">
      <div className="flex justify-between items-center mb-3">
        <div className='flex gap-5'>
        <div>
      <Image src={companyImg}  className="md:w-auto w-[36px]" alt=''/>
        </div>
        <div>
          <h3 className="md:text-[28px] text-sm md:leading-[42px] font-semibold">{job.title}</h3>
          <p className="md:text-2xl text-sm text-gray-500">{job.company}</p>
        </div>
        </div>
        <button type='button' className="text-gray-500 hover:text-gray-700">
          <Image src={save} alt="Bookmark" className="" />
        </button>
      </div>

      <hr className="my-2" />

      <div className="flex justify-between md:flex-row flex-col md:items-center py-5 px-3">
        <div className="md:text-2xl text-sm font-normal">
          <div className="flex items-center gap-3 pb-4">
          <div className='w-[40px] '>
            <Image src={location}  alt="Home" className=" mr-2 md:w-auto w-[20px]" />
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

      
      </div>

      <div className="mt-3 md:text-xl text-[10px] text-[#FF6700] flex items-center gap-5">
       <a href=''  className='flex items-center p-2 rounded-lg border-[#FF6700] border '> <Image src={timeFill} alt="Clock" className="w-4 h-4 mr-2" />
        {timeSincePosted(job.createdAt)}</a> • <span className="ml-1 md:text-sm text-[10px]">Be an early applicant</span>
      </div>
    </div>
    
  );
};

export default JobsMainContent;
