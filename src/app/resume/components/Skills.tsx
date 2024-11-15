"use client"
import { useState } from 'react';

const Skills = () => {
  const [skills, setSkills] = useState([
    'Computer Network',
    'Azure',
    'SQL',
    'Data Analysis',
    'Software Testing',
  ]);
  const [showPopup, setShowPopup] = useState(false);
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill('');
      setShowPopup(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Skills</h3>
        <button
        type='button'
          onClick={() => setShowPopup(true)}
          className="px-4 py-2 "
        >
          Add +
        </button>
      </div>
      <div className="mt-4 flex flex-wrap gap-5">
        {skills.map((skill, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
<div key={index} className="bg-[#A6CBFF]   rounded  px-4 py-2 flex text-xl items-center gap-2">
            {skill}
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
<span
              className="cursor-pointer text-red-500"
              onClick={() => setSkills(skills.filter(s => s !== skill))}
            >
              x
            </span>
          </div>
        ))}
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96 text-center">
            <h4 className="text-lg font-semibold mb-4">Add Skill</h4>
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Enter a new skill"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            <div className="flex justify-center gap-4">
              <button
              type='button'
                onClick={handleAddSkill}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add
              </button>
              <button
              type='button'
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Skills;
