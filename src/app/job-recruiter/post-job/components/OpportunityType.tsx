"use client";
import { useFormContext } from './FormContext';

const OpportunityType: React.FC = () => {
  const { formData, setFormData } = useFormContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, opportunityType: e.target.value });
  };

  return (
    <div className='max-w-[950px] mx-auto lg:px-0 p-4'>
      <h3 className='md:text-4xl text-sm font-medium py-8'>Opportunity Type</h3>
      <div className="flex space-x-4 pb-10">
        <label  className='md:text-2xl text-sm flex items-center gap-3'>
          <input
            type="radio"
            value="Job"
           className='inline-block  md:w-[30px] md:h-[30px] w-5 h-5'
            checked={formData.opportunityType === 'Job'}
            onChange={handleChange}
          />
          Job
        </label>
        <label  className='md:text-2xl text-sm flex items-center gap-3'>
          <input
            type="radio"
            value="Internship"
            className='inline-block md:w-[30px] md:h-[30px] w-5 h-5'
            checked={formData.opportunityType === 'Internship'}
            onChange={handleChange}
          />
          Internship
        </label>
      </div>
    </div>
  );
};

export default OpportunityType;
