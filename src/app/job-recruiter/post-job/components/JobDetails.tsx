"use client";
import { useFormContext } from './FormContext';

const JobDetails: React.FC = () => {
  const { formData, setFormData } = useFormContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className='max-w-[950px] mx-auto py-10 lg:px-0 p-4'>
      <h3 className='md:text-4xl text-sm font-medium py-8'>About Job Role</h3>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className='flex items-center'><p className='md:text-[32px] text-sm text-[#929292]'>Job Title:</p></div>
        <div className='col-span-2'>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            className="border-2 border-black rounded px-4 py-2 w-full md:h-[80px] h-[50px]"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className='flex items-center'><p className='md:text-[32px] text-sm text-[#929292]'>Job Description:</p></div>
        <div className='col-span-2'>
          <textarea
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
            className="border-2 border-black rounded px-4 py-2 w-full md:h-[80px] h-[50px]"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className='flex items-center'><p className='md:text-[32px] text-sm text-[#929292]'>Job Location:</p></div>
        <div className='col-span-2'>
          <input
            type="text"
            name="jobLocation"
            value={formData.jobLocation}
            onChange={handleChange}
            className="border-2 border-black rounded px-4 py-2 w-full md:h-[80px] h-[50px]"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className='flex items-center'><p className='md:text-[32px] text-sm text-[#929292]'>Job Type:</p></div>
        <div className='col-span-2'>
          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            className="border-2 border-black rounded px-4 py-2 w-full md:h-[80px] h-[50px]"
          >
            <option value="Remote">Remote</option>
            <option value="On-site">On-site</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
