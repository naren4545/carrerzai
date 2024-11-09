// SkillTags.tsx
import React from 'react';

interface SkillTagsProps {
  skills: string[];
}

const SkillTags: React.FC<SkillTagsProps> = ({ skills }) => {
  return (
    <div className="p-6  mx-auto border-b border-black">
      <h2 className="md:text-3xl text-xl font-medium mb-4">Skills Required</h2>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, index) => (
          <span 
            key={index} 
            className="flex-grow bg-blue-200 border-[#0068FF] border text-blue-800 px-4 py-2 rounded-lg text-center font-medium md:text-2xl text-sm"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillTags;
