// FormContext.tsx
"use client";

import { createContext, useContext, useState, type ReactNode } from "react"

interface Skill {
  id: number;
  name: string;
}

interface Responsibility {
  id: number;
  text: string;
}

interface FormData {
  opportunityType: string;
  jobTitle: string;
  jobDescription: string;
  jobLocation: string;
  jobType: string;
  experience: string;
  employmentType: string;
  ageLimit: string;
  education: string;
  openings: string;
  skills: Skill[];
  responsibilities: Responsibility[];
  jobTiming: {
    workingDays: {
      start: string;
      end: string;
    };
    workingHours: {
      start: string;
      startPeriod: string; // AM or PM
      end: string;
      endPeriod: string;   // AM or PM
    };
  };
  salary: { currency: string; amount: string };
  perks: string[];
  applicationDeadline: string;
   // Add responsibilities to FormData
}

interface FormContextProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  addSkill: (skill: string) => void;
  removeSkill: (id: number) => void;
  addResponsibility: (text: string) => void;
  removeResponsibility: (id: number) => void;
}

const FormContext = createContext<FormContextProps | undefined>(undefined);

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>({
    opportunityType: "Job",
    jobTitle: "",
    jobDescription: "",
    jobLocation: "",
    jobType: "Remote",
    experience: "",
    employmentType: "",
    ageLimit: "",
    education: "",
    openings: "",
    skills: [],
    responsibilities: [], 
    jobTiming: {
        workingDays: { start: '', end: '' },
        workingHours: { start: '', startPeriod: 'AM', end: '', endPeriod: 'PM' },
      },// Initialize responsibilities array
      salary: { currency: '₹', amount: '' },
      perks: [],
      applicationDeadline:""

  });

  const addSkill = (skill: string) => {
    if (skill && !formData.skills.find((s) => s.name.toLowerCase() === skill.toLowerCase())) {
      setFormData((prevData) => ({
        ...prevData,
        skills: [...prevData.skills, { id: Date.now(), name: skill }],
      }));
    }
  };

  const removeSkill = (id: number) => {
    setFormData((prevData) => ({
      ...prevData,
      skills: prevData.skills.filter((skill) => skill.id !== id),
    }));
  };

  const addResponsibility = (text: string) => {
    if (text.trim()) {
      setFormData((prevData) => ({
        ...prevData,
        responsibilities: [...prevData.responsibilities, { id: Date.now(), text }],
      }));
    }
  };

  const removeResponsibility = (id: number) => {
    setFormData((prevData) => ({
      ...prevData,
      responsibilities: prevData.responsibilities.filter((resp) => resp.id !== id),
    }));
  };

  return (
    <FormContext.Provider value={{ formData, setFormData, addSkill, removeSkill, addResponsibility, removeResponsibility }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
