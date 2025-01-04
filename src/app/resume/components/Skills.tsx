"use client";

import type React from "react";
import { useState, type KeyboardEvent } from "react"
import { X, Plus, Edit2, Trash2 } from 'lucide-react';
import handleResume from "@/utils/resumeUpdate";

interface Skill {
  skillType: string;
  skillValues: string[];
  _id?: string|null;
}

interface SkillsProps {
  initialSkills?: Skill[];
  _id: string
}

const Skills: React.FC<SkillsProps> = ({ initialSkills = [] ,_id}) => {
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [showPopup, setShowPopup] = useState(false);
  const [newSkillType, setNewSkillType] = useState("");
  const [newSkillValues, setNewSkillValues] = useState<{ [key: string]: string }>({});
  const [selectedSkillType, setSelectedSkillType] = useState<string | null>(null);
  const [isEditingSkillType, setIsEditingSkillType] = useState(false);
let data;
  const handleAddSkillType = () => {
    if (newSkillType.trim()) {
      data = {skills:[...skills, { skillType: newSkillType.trim(), skillValues: [] }]};

      handleResume(data,_id)
      setSkills([...skills, { skillType: newSkillType.trim(), skillValues: [] }]);
      setNewSkillType("");
      setShowPopup(false);
    }
  };

  const handleAddSkillValue = (skillType: string) => {
    const newValue = newSkillValues[skillType];
    if (newValue?.trim()) {

      data = {skills:skills.map(skill => 
        skill.skillType === skillType 
          ? { ...skill, skillValues: [...skill.skillValues, newValue.trim()] }
          : skill
      )};

      handleResume(data,_id)
      setSkills(skills.map(skill => 
        skill.skillType === skillType 
          ? { ...skill, skillValues: [...skill.skillValues, newValue.trim()] }
          : skill
      ));
      setNewSkillValues({ ...newSkillValues, [skillType]: "" });
    }
  };

  const handleDeleteSkill = (skillType: string, skillValue: string) => {

    data={skills:skills.map(skill => 
      skill.skillType === skillType 
        ? { ...skill, skillValues: skill.skillValues.filter(value => value !== skillValue) }
        : skill
    ).filter(skill => skill.skillValues.length > 0 || skill.skillType === skillType)};

    handleResume(data,_id)
    setSkills(skills.map(skill => 
      skill.skillType === skillType 
        ? { ...skill, skillValues: skill.skillValues.filter(value => value !== skillValue) }
        : skill
    ).filter(skill => skill.skillValues.length > 0 || skill.skillType === skillType));
  };

  const handleDeleteSkillType = (skillType: string) => {

    data={skills:skills.filter(skill => skill.skillType !== skillType)};

    handleResume(data,_id)
    setSkills(skills.filter(skill => skill.skillType !== skillType));
  };

  const handleEditSkillType = (oldSkillType: string, newSkillType: string, e?: React.KeyboardEvent<HTMLInputElement>) => {
    if (newSkillType.trim() && newSkillType !== oldSkillType) {
      console.log("hii")
data={skills:skills.map(skill => 
        skill.skillType === oldSkillType 
          ? { ...skill, skillType: newSkillType.trim() }  
          : skill
      )};

      handleResume(data,_id)

      setSkills(skills.map(skill => 
        skill.skillType === oldSkillType 
          ? { ...skill, skillType: newSkillType.trim() }
          : skill
      ));
    }
    setIsEditingSkillType(false);
    setSelectedSkillType(null);
    if (e) {
      e.preventDefault();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, skillType: string) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkillValue(skillType);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Skills</h3>
        <button
         type="button"
          onClick={() => setShowPopup(true)}
          className="px-4 py-2  text-orange-500  rounded-md  flex items-center"
        >
          <Plus size={18} className="mr-2 text-orange-500 " /> Add Skill Type
        </button>
      </div>

      {skills.map((skill) => (
        <div key={skill.skillType} className="mb-4 p-4 border rounded-lg">
          <div className="flex justify-between items-center mb-2">
            {isEditingSkillType && selectedSkillType === skill.skillType ? (
              <input
                type="text"
                value={newSkillType}
                onChange={(e) => setNewSkillType(e.target.value)}
                onBlur={() => handleEditSkillType(skill.skillType, newSkillType)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleEditSkillType(skill.skillType, newSkillType, e);
                  }
                }}
                className="text-lg font-semibold border-b-2 border-blue-500 focus:outline-none"
                autoFocus
              />
            ) : (
              <h4 className="text-lg font-semibold">{skill.skillType}</h4>
            )}
            <div className="flex gap-2">
              <button
               type="button"
                onClick={() => {
                  setIsEditingSkillType(true);
                  setSelectedSkillType(skill.skillType);
                  setNewSkillType(skill.skillType);
                }}
                className="text-blue-500 hover:text-blue-700"
                aria-label={`Edit ${skill.skillType}`}
              >
                <Edit2 size={18} />
              </button>
              <button
               type="button"
                onClick={() => handleDeleteSkillType(skill.skillType)}
                className="text-red-500 hover:text-red-700"
                aria-label={`Delete ${skill.skillType}`}
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-2">
            {skill.skillValues.map((value, index) => (
              <div
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center"
              >
                {value}
                <button
                 type="button"
                  onClick={() => handleDeleteSkill(skill.skillType, value)}
                  className="ml-2 text-blue-500 hover:text-blue-700"
                  aria-label={`Remove ${value} from ${skill.skillType}`}
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
          <div className="flex sm:flex-row flex-col gap-3 items-center py-4">
            <input
              type="text"
              value={newSkillValues[skill.skillType] || ""}
              onChange={(e) => setNewSkillValues({ ...newSkillValues, [skill.skillType]: e.target.value })}
              onKeyDown={(e) => handleKeyDown(e, skill.skillType)}
              placeholder="Add new skill value"
              className="flex-grow mr-2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={`Add new skill value to ${skill.skillType}`}
            />
            <button
            type="button"
              onClick={() => handleAddSkillValue(skill.skillType)}
              className="px-4 py-2 bg-orange-500   text-white rounded-md hover:bg-orange-600"
            >
              Add
            </button>
          </div>
        </div>
      ))}

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h4 className="text-lg font-semibold mb-4">Add New Skill Type</h4>
            <input
              type="text"
              value={newSkillType}
              onChange={(e) => setNewSkillType(e.target.value)}
              placeholder="Enter skill type"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            <div className="flex justify-end gap-4">
              <button
               type="button"
                onClick={handleAddSkillType}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add
              </button>
              <button
               type="button"
                onClick={() => {
                  setShowPopup(false);
                  setNewSkillType("");
                }}
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

