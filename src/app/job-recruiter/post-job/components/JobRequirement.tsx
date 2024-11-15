"use client";
import { useFormContext } from './FormContext';

const JobRequirement: React.FC = () => {
  const { formData, setFormData } = useFormContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value });
  };

  return (
    <div className='max-w-[950px] mx-auto py-10  lg:px-0 p-4'>
      <h3 className='md:text-4xl text-sm font-medium py-8'>Job Requirement</h3>

      <div className="grid grid-cols-1 gap-4 pb-6">
        <div className='flex items-center'><p className='md:text-[32px] text-sm text-[#929292]'>Experience:</p></div>
        <div className=' flex items-center gap-4 pb-4'>
          <label className='flex items-center md:text-2xl text-sm font-medium'>
            <input
              type="radio"
              name="experience"
              value="Fresher"
              
              checked={formData.experience === 'Fresher'}
              onChange={handleChange}
              className="mr-2 md:w-[30px] md:h-[30px] w-5 h-5"
            />
            Fresher
          </label>
          <label className='flex items-center md:text-2xl text-sm font-medium'>
            <input
              type="radio"
              name="experience"
              value="Experienced Person"
              checked={formData.experience === 'Experienced Person'}
              onChange={handleChange}
              className="mr-2 md:w-[30px] md:h-[30px] w-5 h-5"
            />
            Experienced Person
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 pb-6">
        <div className='flex items-center'><p className='md:text-[32px] text-sm text-[#929292]'>Employment Type:</p></div>
        <div className=' flex items-center gap-4 pb-4'>
          <label className='flex items-center md:text-2xl text-sm font-medium'>
            <input
              type="radio"
              name="employmentType"
              value="Full-Time"
              checked={formData.employmentType === 'Full-Time'}

              onChange={handleChange}
               className="mr-2 md:w-[30px] md:h-[30px] w-5 h-5"
            />
            Full-Time
          </label>
          <label className='flex items-center md:text-2xl text-sm font-medium'>
            <input
              type="radio"
              name="employmentType"
              value="Part-Time"
              checked={formData.employmentType === 'Part-Time'}
              onChange={handleChange}
               className="mr-2 md:w-[30px] md:h-[30px] w-5 h-5"
            />
            Part-Time
          </label>
          <label className='flex items-center md:text-2xl text-sm font-medium'>
            <input
              type="radio"
              name="employmentType"
              value="Contract"
              checked={formData.employmentType === 'Contract'}
              onChange={handleChange}
               className="mr-2 md:w-[30px] md:h-[30px] w-5 h-5"
            />
            Contract
          </label>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className='flex items-center'><p className='md:text-[32px] text-sm text-[#929292]'>Age Limit:</p></div>
        <div className='col-span-2'>
          <input
            type="text"
            name="ageLimit"
            value={formData.ageLimit}
            onChange={handleChange}
            className="border-2 border-black rounded px-4 py-2 w-full md:h-[80px] h-[50px]"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className='flex items-center'><p className='md:text-[32px] text-sm text-[#929292]'>Education:</p></div>
        <div className='col-span-2'>
          <input
            type="text"
            name="education"
            value={formData.education}
            onChange={handleChange}
            className="border-2 border-black rounded px-4 py-2 w-full md:h-[80px] h-[50px]"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className='flex items-center'><p className='md:text-[32px] text-sm text-[#929292]'>No of Openings:</p></div>
        <div className='col-span-2'>
          <input
            type="text"
            name="openings"
            placeholder="e.g. 2"
            value={formData.openings}
            onChange={handleChange}
            className="border-2 border-black rounded px-4 py-2 w-full md:h-[80px] h-[50px]"
          />
        </div>
      </div>
    </div>
  );
};

export default JobRequirement;
