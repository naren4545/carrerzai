"use client";
import { useState } from 'react';
import { useFormContext } from './FormContext';

const JobRequirement: React.FC = () => {
  const { formData, setFormData } = useFormContext();
  const [isExperienced, setIsExperienced] = useState(false);
  const [minExperience, setMinExperience] = useState(0);
  const [maxExperience, setMaxExperience] = useState(5);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'minExperience') {
      setMinExperience(Number(value));
      setFormData({
        ...formData,
        experience: { minExperience: Number(value), maxExperience: maxExperience }
      });
      return;
    }

    if (name === 'maxExperience') {
      setMaxExperience(Number(value));
      setFormData({
        ...formData,
        experience: { minExperience: minExperience, maxExperience: Number(value) }
      });
      return;
    }

    if (name === 'experience') {
      if (value === 'Fresher') {
        setIsExperienced(false);
        setFormData({ ...formData, experience: { minExperience: 0, maxExperience: 100 } });
      } else if (value === 'Experienced Person') {
        setIsExperienced(true);
        setFormData({ ...formData, experience: { minExperience, maxExperience } });
      }
      return;
    }

    // Update other fields directly
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className='max-w-[950px] mx-auto py-10 lg:px-0 p-4'>
      <h3 className='md:text-4xl text-sm font-medium py-8'>Job Requirement</h3>

      {/* Experience Selection */}
      <div className="grid grid-cols-1 gap-4 pb-6">
        <div className='flex items-center'><p className='md:text-[32px] text-sm text-[#929292]'>Experience:</p></div>
        <div className='flex items-center gap-4 pb-4'>
          <label className='flex items-center md:text-2xl text-sm font-medium'>
            <input
              type="radio"
              name="experience"
              value="Fresher"
              checked={!isExperienced}
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
              checked={isExperienced}
              onChange={handleChange}
              className="mr-2 md:w-[30px] md:h-[30px] w-5 h-5"
            />
            Experienced Person
          </label>
        </div>
      </div>

      {/* Min and Max Experience Fields for Experienced Person */}
      {isExperienced && (
        <div className="grid grid-cols-1 gap-4 pb-6">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className='flex items-center'><p className='md:text-[32px] text-sm text-[#929292]'>Min Experience:</p></div>
            <div className='col-span-2'>
              <input
                type="number"
                name="minExperience"
                value={minExperience}
                onChange={handleChange}
                className="border-2 border-black rounded px-4 py-2 w-full md:h-[80px] h-[50px]"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className='flex items-center'><p className='md:text-[32px] text-sm text-[#929292]'>Max Experience:</p></div>
            <div className='col-span-2'>
              <input
                type="number"
                name="maxExperience"
                value={maxExperience}
                onChange={handleChange}
                className="border-2 border-black rounded px-4 py-2 w-full md:h-[80px] h-[50px]"
              />
            </div>
          </div>
        </div>
      )}

      {/* Employment Type Selection */}
      <div className="grid grid-cols-1 gap-4 pb-6">
        <div className='flex items-center'><p className='md:text-[32px] text-sm text-[#929292]'>Employment Type:</p></div>
        <div className='flex items-center gap-4 pb-4'>
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

      {/* Age Limit */}
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

      {/* Education */}
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

      {/* No of Openings */}
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
