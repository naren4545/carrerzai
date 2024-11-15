// JobTiming.tsx
"use client";

import { useFormContext } from './FormContext';

const JobTiming: React.FC = () => {
  const { formData, setFormData } = useFormContext();

  const handleChange = (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      jobTiming: {
        ...prevData.jobTiming,
        [field]: value,
      },
    }));
  };

  return (
    <div className="max-w-[950px] mx-auto py-10 lg:px-0 p-4">
      <h3 className="md:text-4xl text-sm font-medium py-8">Job Timing</h3>

      {/* Working Days */}
      <div className="grid grid-cols-3 gap-4 mb-6 items-center">
        <p className="md:text-[32px] text-sm text-[#929292]">Working Days:</p>
        <input
          type="text"
          placeholder="e.g. Monday"
          value={formData.jobTiming.workingDays.start}
          onChange={(e) => handleChange('workingDays.start', e.target.value)}
          className="border-2 border-black rounded px-4 py-2 w-full md:h-[80px] h-[50px]"
        />
        <input
          type="text"
          placeholder="e.g. Friday"
          value={formData.jobTiming.workingDays.end}
          onChange={(e) => handleChange('workingDays.end', e.target.value)}
          className="border-2 border-black rounded px-4 py-2 w-full md:h-[80px] h-[50px]"
        />
      </div>

      {/* Working Hours */}
      <div className="grid grid-cols-3 gap-4 mb-6 items-center">
        <p className="md:text-[32px] text-sm text-[#929292]">Working Hours:</p>
        <div className="flex items-center space-x-2 border-2 border-black">
          <input
            type="text"
            placeholder="e.g. 9:00"
            value={formData.jobTiming.workingHours.start}
            onChange={(e) => handleChange('workingHours.start', e.target.value)}
            className=" rounded md:px-4 py-2 w-full md:h-[80px] h-[50px]"
          />
          <select
            value={formData.jobTiming.workingHours.startPeriod}
            onChange={(e) => handleChange('workingHours.startPeriod', e.target.value)}
            className="focus:outline-none rounded md:text-2xl text-sm md:px-4 py-2 md:h-[80px] h-[50px] placeholder:text-xs"
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
        <div className="flex items-center space-x-2 border-2 border-black  md:text-2xl text-sm">
          <input
            type="text"
            placeholder="e.g. 6:00"
            value={formData.jobTiming.workingHours.end}
            onChange={(e) => handleChange('workingHours.end', e.target.value)}
            className=" rounded md:px-4 py-2 w-full md:h-[80px] h-[50px]"
          />
          <select
            value={formData.jobTiming.workingHours.endPeriod}
            onChange={(e) => handleChange('workingHours.endPeriod', e.target.value)}
            className="focus:outline-none rounded md:px-4 py-2 md:h-[80px] h-[50px]  md:text-2xl text-sm placeholder:text-xs"
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default JobTiming;
