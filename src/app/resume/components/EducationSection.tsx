"use client";
import Image from "next/image";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import educationImg from "../../assests/education.svg";
import educationlinefrom from "../../assests/educationLine.svg";
import editPen from "../../assests/clarity_edit-line.svg";
import deleteIcon from "../../assests/material-symbols-light_delete-outline.svg";
import InputField from "./ui/InputField";
import Cookies from "js-cookie";
import { on } from "events";
interface Education {
  degree: string;
  institution: string;
  startDate: string;
  completionDate: string;
  _id: string;
}

interface EducationCardProps {
  education: Education;
  onEdit: (education: Education) => void;
  onDelete: (id: string) => void;
}
const handleResume = async (formData: any,id:string) => {
  const pinqueryToken = Cookies.get("pinquery_token");
  try {
    const response = await fetch(
      `https://www.careerzai.com/v1/resume/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${pinqueryToken}`, // Include the Authorization token
        },
        body: JSON.stringify(formData), // Convert the data to a JSON string
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to send data: ${response.statusText}`);
    }

    const result = await response.json();
    console.log("Data sent successfully:", result);
  } catch (error: any) {
    console.error("Error sending data:", error.message);
  }
};

const EducationCard: React.FC<EducationCardProps> = ({
  education,
  onEdit,
  onDelete,
}) => {
  const startYear = new Date(education.startDate).getFullYear();
  const completionYear = new Date(education.completionDate).getFullYear();
  return (
    <div className="flex items-start justify-between bg-white  rounded-lg p-4 mb-4 ">
      <div className="flex items-start gap-4">
        <div>
          <Image
            src={educationImg}
            alt="Education Icon"
            className="h-12 w-12 pb-2"
          />
          <Image
            src={educationlinefrom}
            alt="Education Icon"
            className="h-12 w-12"
          />
        </div>
        <div>
          <h3 className="text-xl font-medium">{education.degree}</h3>
          <p className=" text-base">{education.institution}</p>
          <div className="flex gap-2 mt-2">
            <span className="bg-blue-100 text-blue-800 py-1 px-2 rounded">
              {startYear} - {completionYear}{" "}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button
          type="button"
          className="text-gray-500 cursor-pointer"
          onClick={() => onEdit(education)}
        >
          <Image src={editPen} alt="Edit Icon" className="md:w-auto w-[20px]" />
        </button>
        <button
          type="button"
          className="text-red-500 cursor-pointer"
          onClick={() => onDelete(education._id)}
        >
          <Image
            src={deleteIcon}
            alt="delete Icon"
            className="md:w-auto w-[20px]"
          />
        </button>
      </div>
    </div>
  );
};

interface EducationSectionProps {
  education: Education[];
  _id:string
}

const EducationSection: React.FC<EducationSectionProps> = ({ education,_id }) => {
  const [educationList, setEducationList] = useState<Education[]>(education);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [currentEducation, setCurrentEducation] = useState<Education>({
    degree: "",
    institution: "",
    startDate: "",
    completionDate: "",
    _id: "",
  });

  const handleAdd = () => {
    setCurrentEducation({
      degree: "",
      institution: "",
      startDate: "",
      completionDate: "",
      _id: "",
    });
    setIsFormOpen(true);
  };

  const handleEdit = (education: Education) => {
    setCurrentEducation(education);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setEducationList((prev) => prev.filter((edu) => edu._id !== id));
  };

  const handleSave = async(education: Education) => {
    // biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
    let data={education:{}};
    if (currentEducation._id) {
      console.log("hii")
      setEducationList((prev) => {
        data.education = prev.map((edu) =>
          edu._id === currentEducation._id
            ? { ...education, _id: currentEducation._id }
            : edu
        );
        return prev.map((edu) =>
          edu._id === currentEducation._id
            ? { ...education, _id: currentEducation._id }
            : edu
        );
      });
    } else {
      setEducationList((prev) =>{ 
        
        data.education=[
          ...prev,
          { ...education, _id: Date.now().toString() },
        ]
        return [
        ...prev,
        { ...education, _id: Date.now().toString() },
      ]});
    }
console.log(data)

   await handleResume(data,_id);
    setIsFormOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Education</h2>
        <button
          type="button"
          onClick={handleAdd}
          className="text-orange-500 flex items-center gap-2"
        >
          Add <FaPlus />
        </button>
      </div>
      {educationList.map((education) => (
        <EducationCard
          key={education._id}
          education={education}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
      {isFormOpen && (
        <EducationForm
          onClose={() => setIsFormOpen(false)}
          onSave={handleSave}
          isEditing={Boolean(currentEducation._id)}
          initialData={currentEducation}
        />
      )}
    </div>
  );
};

interface EducationFormProps {
  initialData?: {
    degree: string;
    institution: string;
    startDate: string;
    completionDate: string;
    _id?: string;
  };
  isEditing: boolean;
  onSave: (updatedEducation: {
    degree: string;
    institution: string;
    startDate: string;
    completionDate: string;
    _id: string;
  }) => void;
  onClose: () => void;
}

const EducationForm: React.FC<EducationFormProps> = ({
  initialData,
  onSave,
  onClose,
  isEditing,
}) => {
  const [formData, setFormData] = useState({
    degree: initialData?.degree || "",
    institution: initialData?.institution || "",
    startDate: initialData?.startDate || "",
    completionDate: initialData?.completionDate || "",
    _id: initialData?._id || Date.now().toString(),
  });
  console.log(isEditing, "isEditing");
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSave(formData);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 flex items-center justify-center py-4 bg-black bg-opacity-50 z-50"
    >
      <div
        className="bg-white py-6 rounded-2xl shadow-lg w-full h-full overflow-auto max-w-[1092px]"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <h3 className="text-3xl font-semibold text-center mb-6">
          {initialData ? "Edit Education" : "Add Education"}
        </h3>
        <hr className="border-black mb-6" />

        <form onSubmit={handleSubmit} className="px-5">
          <div className="mb-4">
            <InputField
              options={[]}
              label="Degree"
              name="degree"
              placeholder="Enter degree (e.g., Bachelor of Science)"
              value={formData.degree}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <InputField
              label="Institution"
              options={[]}
              name="institution"
              placeholder="Enter institution name"
              value={formData.institution}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <InputField
              options={[]}
              label="Start Year"
              name="startDate"
              type="date"
              placeholder={"Enter start year"}
              value={formData.startDate}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <InputField
              options={[]}
              label="Completion Year"
              placeholder="Enter completion year"
              name="completionDate"
              type="date"
              value={formData.completionDate}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={handleSubmit}
              type="submit"
              className="mt-6 py-4  bg-[#FFBA00] text-white text-3xl  px-5 rounded-xl "
            >
              {initialData ? "Save Changes" : "Add Education"}
            </button>
            <button type="button"               className="mt-6 py-4  bg-[#FFBA00] text-white text-3xl  px-5 rounded-xl mx-auto"
 onClick={onClose}>close</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EducationSection;
