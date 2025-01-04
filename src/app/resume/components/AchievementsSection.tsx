"use client";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import editPen from '../../assests/clarity_edit-line.svg';
import deleteIcon from '../../assests/material-symbols-light_delete-outline.svg';
import InputField from "./ui/InputField";
import Image from "next/image";
import handleResume from "@/utils/resumeUpdate";


interface AchievementCardProps {
  achievement: string;
  onEdit: (achievement: string) => void;
  onDelete: (achievement: string) => void;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement, onEdit, onDelete }) => (
  <div className="flex items-center justify-between rounded-lg p-4 mb-4">
    <p>{achievement}</p>
    <div className="flex items-center space-x-2">
      <button type="button" onClick={() => onEdit(achievement)}>
        <Image src={editPen} alt="Edit Icon" className="w-[20px]" />
      </button>
      <button type="button" onClick={() => onDelete(achievement)}>
        <Image src={deleteIcon} alt="Delete Icon" className="w-[20px]" />
      </button>
    </div>
  </div>
);

interface AchievementsSectionProps {
  achievements: string[];
  _id: string
}

const AchievementsSection: React.FC<AchievementsSectionProps> = ({ achievements,_id }) => {
  const [achievementList, setAchievementList] = useState<string[]>(achievements);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentAchievement, setCurrentAchievement] = useState<string >("");

  const handleAdd = () => {
    setCurrentAchievement("");
    setIsFormOpen(true);
  };

  const handleEdit = (achievement: string) => {
    setCurrentAchievement(achievement);
    setIsFormOpen(true);
  };

  const handleDelete = (achievement: string) => {
    setAchievementList((prev) => {
      const data={Achievements:prev.filter((a) => a !== achievement)}
      handleResume(data,_id)
     return prev.filter((a) => a !== achievement)});
  };

  const handleSave = (achievement: string) => {
    console.log("save")
    if (currentAchievement) {
      console.log("hii")
      setAchievementList((prev) =>{
       const data={Achievements:prev.map((a) => (a === currentAchievement ? achievement : a))}
       handleResume(data,_id)
       return prev.map((a) => (a === currentAchievement ? achievement : a))
    });
    } else {
      setAchievementList((prev) =>{ 
        const data={Achievements:[...prev, achievement]}
        handleResume(data,_id)
        return[...prev, achievement]});
    }
    setIsFormOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Achievements</h2>
        <button type="button" onClick={handleAdd} className="text-orange-500 flex items-center gap-2">
          Add <FaPlus />
        </button>
      </div>
      {achievementList.map((achievement, index) => (
        <AchievementCard
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          key={index}
          achievement={achievement}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
      {isFormOpen && (
        <AchievementForm
          onClose={() => setIsFormOpen(false)}
          onSave={handleSave}
          initialData={currentAchievement}
        />
      )}
    </div>
  );
};

interface AchievementFormProps {
  initialData?: string;
  onSave: (updatedAchievement: string) => void;
  onClose: () => void;
}

const AchievementForm: React.FC<AchievementFormProps> = ({ initialData, onSave, onClose }) => {
  const [formData, setFormData] = useState<string>(initialData || "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-2xl font-semibold mb-4">
          {initialData ? "Edit Achievement" : "Add Achievement"}
        </h3>
        <hr className="border-black mb-6" />
        <form onSubmit={handleSubmit}>
          <InputField
            type="text"
            options={[]}
            label="Achievement"
            name="description"
            placeholder="Enter achievement description"
            value={formData}
            onChange={handleChange}
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {initialData ? "Save Changes" : "Add Achievement"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AchievementsSection;
