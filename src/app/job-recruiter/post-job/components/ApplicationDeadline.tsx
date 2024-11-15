"use client";
import { useFormContext } from './FormContext';
import type { ChangeEvent } from 'react';

const ApplicationDeadline: React.FC = () => {
  const { formData, setFormData } = useFormContext();

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      applicationDeadline: e.target.value,
    }));
  };

  return (
    <div className="max-w-[950px] mx-auto py-10 lg:px-0 p-4">
      <h3 className="md:text-4xl text-sm font-medium py-8">Application Deadline</h3>
      <label className="block mb-4">
        <input
          type="date"
          value={formData.applicationDeadline}
          onChange={handleDateChange}
          placeholder="e.g. 20 Nov, 2024"
          className="border-2 border-black md:h-[80px] h-[50px] rounded px-4 py-2 w-full"
        />
      </label>
    </div>
  );
};

export default ApplicationDeadline;
