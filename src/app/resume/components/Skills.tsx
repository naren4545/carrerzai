"use client";

import { useState } from "react";

interface Skill {
  skillType: string;
  skillValues: string[];
  _id?: string; // Optional in case the ID isn't always provided
}

interface SkillsProps {
  skills: Skill[];
}

const Skills: React.FC<SkillsProps> = ({ skills: initialSkills }) => {
  const [skills, setSkills] = useState<Skill[]>(initialSkills || []);
  const [showPopup, setShowPopup] = useState(false);
  const [newSkill, setNewSkill] = useState<string>("");
  const [selectedSkillType, setSelectedSkillType] = useState<string>("");

  const handleAddSkill = () => {
    if (newSkill && selectedSkillType) {
      const existingSkill = skills.find(
        (skill) => skill.skillType === selectedSkillType
      );

      if (existingSkill) {
        // Add to existing skillValues if skillType exists
        const updatedSkills = skills.map((skill) =>
          skill.skillType === selectedSkillType
            ? {
                ...skill,
                skillValues: [...skill.skillValues, newSkill],
              }
            : skill
        );
        setSkills(updatedSkills);
      } else {
        // Add a new skillType with the skillValue
        setSkills([
          ...skills,
          { skillType: selectedSkillType, skillValues: [newSkill] },
        ]);
      }
      setNewSkill("");
      setSelectedSkillType("");
      setShowPopup(false);
    }
  };

  const handleDeleteSkill = (skillType: string, skillValue: string) => {
    const updatedSkills = skills
      .map((skill) =>
        skill.skillType === skillType
          ? {
              ...skill,
              skillValues: skill.skillValues.filter((value) => value !== skillValue),
            }
          : skill
      )
      .filter((skill) => skill.skillValues.length > 0); // Remove skillType if no values remain
    setSkills(updatedSkills);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Skills</h3>
        <button
          type="button"
          onClick={() => setShowPopup(true)}
          className="px-4 py-2"
        >
          Add +
        </button>
      </div>
      <div className="mt-4 flex flex-wrap gap-5">
        {skills.map((skill) => (
          <div key={skill.skillType} className="w-full">
            <h4 className="text-lg font-semibold mb-2">{skill.skillType}</h4>
            <div className="flex flex-wrap gap-2">
              {skill.skillValues.map((value, idx) => (
                <div
                  key={`${skill.skillType}-${idx}`}
                  className="bg-[#A6CBFF] rounded px-4 py-2 flex text-xl items-center gap-2"
                >
                  {value}
                  <span
                    className="cursor-pointer text-red-500"
                    onClick={() => handleDeleteSkill(skill.skillType, value)}
                  >
                    x
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96 text-center">
            <h4 className="text-lg font-semibold mb-4">Add Skill</h4>
            <input
              type="text"
              value={selectedSkillType}
              onChange={(e) => setSelectedSkillType(e.target.value)}
              placeholder="Enter skill type"
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
            />
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Enter a new skill"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            <div className="flex justify-center gap-4">
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add
              </button>
              <button
                type="button"
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
