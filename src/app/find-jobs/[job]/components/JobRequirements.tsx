// JobRequirements.tsx
import React from 'react';
import Image from 'next/image';
import experienceIcon from '../../../assests/uil_suitcase.svg'
import educationIcon from '../../../assests/fluent-mdl2_education.png'
interface JobRequirementsProps {
  experience: string;
  education: string;
  // path to education icon
}

const JobRequirements: React.FC<JobRequirementsProps> = ({ experience, education }) => {
  return (
    <div className="p-6  mx-auto border-b border-black">
      <h2 className="md:text-[32px] text-xl font-medium pt-5 mb-4">Job Requirements</h2>
      <div className="flex md:space-x-8 flex-col md:flex-row justify-between py-8 gap-4">
        {/* Experience Section */}
        <div className="flex items-centen space-x-3">
          <Image src={experienceIcon} alt="Experience Icon"  className="text-gray-500 md:w-auto w-[20px]" />
          <div>
            <p className="md:text-xl text-sm text-gray-500">Experience</p>
            <p className="font-normal md:text-[28px] text-base">{experience}</p>
          </div>
        </div>

        {/* Education Section */}
        <div className="flex items-center space-x-3">
          <Image src={educationIcon} alt="Education Icon" className="text-gray-500 md:w-auto w-[20px]" />
          <div>
            <p className="md:text-xl text-sm text-gray-500">Education</p>
            <p className="font-normal  md:text-[28px] text-base ">{education}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobRequirements;
