// SkillsInput.tsx
"use client";
import { useState } from "react";
import { useFormContext } from "./FormContext";
import add from '../../../assests/si_add-duotone.svg'
import Image from "next/image";
import remove from '../../../assests/system-uicons_cross-circle.svg'
const SkillsInput: React.FC = () => {
  const { formData, addSkill, removeSkill } = useFormContext();
  const [input, setInput] = useState("");

  const handleAddSkill = () => {
    if (input.trim()) {
      addSkill(input.trim());
      setInput("");
    }
  };

  return (
    <div className="max-w-[950px] mx-auto py-10 lg:px-0 p-4" >
      <h3 className="md:text-4xl text-sm font-medium py-8">Skills Required</h3>
      <div className="relative">
        <input
          type="text"
          placeholder="Search Skills"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
          className="border-2 border-black rounded px-4 py-2 w-full md:h-[80px] h-[50px]"
        />
        <button
          type="button"
          onClick={handleAddSkill}
          className="absolute right-3 top-1/2  transform -translate-y-1/2"
        >
          <Image src={add} alt="Add Skill" className="h-6 w-6 inline" />
        </button>
      </div>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "10px" }} className="pb-6">
        {formData.skills.map((skill) => (
          <div
            key={skill.id}
            className="#A6CBFF px-4 py-3 text-xl pb-6"
            style={{
              display: "flex",
              alignItems: "center",
              background: "#A6CBFF",
              borderRadius: "5px",
             
            }}
          >
            <span>{skill.name}</span>
            <button
              type="button"
              onClick={() => removeSkill(skill.id)}
              className=""
              style={{
                marginLeft: "4px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              <Image src={remove} alt="Remove Skill" className="h-6 w-6 inline" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsInput;
