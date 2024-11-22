"use client";
import { useFormContext } from './FormContext';
import { useState } from 'react';
import add from '../../../assests/si_add-duotone.svg'
import Image from "next/image";
const SalaryAndPerks: React.FC = () => {
  const { formData, setFormData } = useFormContext();
  const [perk, setPerk] = useState('');

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      salary: { ...prev.salary, [name]: value },
    }));
  };

  const handleAddPerk = () => {
    if (perk.trim() !== '') {
      setFormData((prev) => ({
        ...prev,
        perks: [...prev.perks, perk],
      }));
      setPerk('');
    }
  };

  const handleRemovePerk = (removedPerk: string) => {
    setFormData((prev) => ({
      ...prev,
      perks: prev.perks.filter((p) => p !== removedPerk),
    }));
  };

  return (
    <div className="max-w-[950px] mx-auto py-10 lg:px-0 p-4">
      <h3 className="md:text-4xl text-sm font-medium py-8">Salary & Perks</h3>

      <label className="block mb-4">
       
        <p className='md:text-[32px] text-sm text-[#929292] py-8'>   Min  Salary:</p>

        <div className="flex items-center pb-5">
        <p
           
           className="border-2 border-black flex items-center  border-r-0 rounded-l md:h-[80px] h-[50px] px-6 py-2"
         >
          ₹
           
         </p>
          <input
            type="text"
            name="minSalary"
            value={formData.salary.minSalary}
            onChange={handleSalaryChange}
            placeholder="Enter amount"
            className="border-2 border-black md:h-[80px] h-[50px] rounded-r px-4 py-2 w-full"
          />
        </div>



        <p className='md:text-[32px] text-sm text-[#929292] py-8'>   max  Salary:</p>

        <div className="flex items-center">
          <p
           
            className="border-2 border-black flex items-center  border-r-0 rounded-l md:h-[80px] h-[50px] px-6 py-2"
          >
           ₹
            
          </p>
          <input
            type="text"
            name="maxSalary"
            value={formData.salary.maxSalary}
            onChange={handleSalaryChange}
            placeholder="Enter amount"
            className="border-2 border-black md:h-[80px] h-[50px] rounded-r px-4 py-2 w-full"
          />
        </div>
      </label>

      <label className="block mb-4">
<p className='md:text-[32px] text-sm text-[#929292] py-8'>        Perks (Optional):</p>
        <div className="flex items-center border-2 border-black w-full relative">
          <input
            type="text"
            value={perk}
            onChange={(e) => setPerk(e.target.value)}
            placeholder="e.g. Health Insurance"
            className=" md:h-[80px] h-[50px] rounded px-4 py-2 w-full"
          />
          <button
            type="button"
            onClick={handleAddPerk}
            className="text-orange-500 ml-2 absolute right-3 top-1/2 transform -translate-y-1/2"
          >
                   Add +

          </button>
        </div>
      </label>

      <div className="flex flex-wrap gap-2 mt-4">
        {formData.perks.map((perk, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
<div key={index} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-lg">
            {perk}
            <button
              type="button"
              onClick={() => handleRemovePerk(perk)}
              className="ml-2 text-blue-600 font-bold"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalaryAndPerks;
