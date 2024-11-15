"use client";
import Image from 'next/image';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import workIcon from '../../assests/fe_paper-plane.svg';
import editPen from '../../assests/clarity_edit-line.svg';
import deleteIcon from '../../assests/material-symbols-light_delete-outline.svg';
import InputField from './ui/InputField';

interface WorkExperience {
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  _id: string;
}

interface WorkExperienceCardProps {
  work: WorkExperience;
  onEdit: (work: WorkExperience) => void;
  onDelete: (id: string) => void;
}

const WorkExperienceCard: React.FC<WorkExperienceCardProps> = ({ work, onEdit, onDelete }) => {
  const startYear = new Date(work.startDate).toLocaleString('default', { month: 'short', year: 'numeric' });
  const endYear = new Date(work.endDate).toLocaleString('default', { month: 'short', year: 'numeric' });

  return (
    <div className="flex items-start justify-between bg-white rounded-lg p-4 mb-4">
      <div className="flex items-start gap-4">
        <Image src={workIcon} alt="Work Icon" className="" />
        <div>
          <h3 className="text-xl font-medium">{work.role}</h3>
          <p className="text-base">{work.company}</p>
          <div className="flex gap-2 mt-2">
            <span className="bg-blue-100 text-blue-800 py-1 px-2 rounded">
              {startYear} - {endYear}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button type="button" className="text-gray-500" onClick={() => onEdit(work)}>
          <Image src={editPen} alt="Edit Icon" className="w-[20px]" />
        </button>
        <button type="button" className="text-red-500" onClick={() => onDelete(work._id)}>
          <Image src={deleteIcon} alt="Delete Icon" className="w-[20px]" />
        </button>
      </div>
    </div>
  );
};

interface WorkExperienceSectionProps {
  workExperiences: WorkExperience[];
}

const WorkExperienceSection: React.FC<WorkExperienceSectionProps> = ({ workExperiences }) => {
  const [workList, setWorkList] = useState<WorkExperience[]>(workExperiences);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [currentWork, setCurrentWork] = useState<WorkExperience >( {
    role: '',
    company: '',
    startDate: '',
    endDate: '',
    description: '',
    _id: ''
  });

  const handleAdd = () => {
    setCurrentWork( {
      role: '',
      company: '',
      startDate: '',
      endDate: '',
      description: '',
      _id: ''
    });
    setIsFormOpen(true);
  };

  const handleEdit = (work: WorkExperience) => {
    setCurrentWork(work);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setWorkList((prev) => prev.filter((work) => work._id !== id));
  };

  const handleSave = (work: WorkExperience) => {
    if (currentWork) {
      setWorkList((prev) =>
        prev.map((w) => (w._id === currentWork._id ? { ...work, _id: currentWork._id } : w))
      );
    } else {
      setWorkList((prev) => [...prev, { ...work, _id: Date.now().toString() }]);
    }
    setIsFormOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Work Experience</h2>
        <button type="button" onClick={handleAdd} className="text-orange-500 flex items-center gap-2">
          Add <FaPlus />
        </button>
      </div>
      {workList.map((work) => (
        <WorkExperienceCard key={work._id} work={work} onEdit={handleEdit} onDelete={handleDelete} />
      ))}
      {isFormOpen && (
        <WorkExperienceForm onClose={() => setIsFormOpen(false)} onSave={handleSave} initialData={currentWork} />
      )}
    </div>
  );
};

interface WorkExperienceFormProps {
  initialData?: WorkExperience;
  onSave: (updatedWork: WorkExperience) => void;
  onClose: () => void;
}

const WorkExperienceForm: React.FC<WorkExperienceFormProps> = ({ initialData, onSave, onClose }) => {
  const [formData, setFormData] = useState<WorkExperience>({
    role: initialData?.role || '',
    company: initialData?.company || '',
    startDate: initialData?.startDate || '',
    endDate: initialData?.endDate || '',
    description: initialData?.description || '',
    _id: initialData?._id || Date.now().toString(),
  });
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
<div onClick={handleBackdropClick} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 lg:px-0 rounded-2xl shadow-lg w-full h-full overflow-auto max-w-[1092px]" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <h3 className="text-2xl font-semibold mb-4 text-center px-4">
          {initialData ? 'Edit Work Experience' : 'Add Work Experience'}
        </h3>
        <hr className="border-black mb-6" />

        <form onSubmit={handleSubmit} className='px-6 max-w-[997px] mx-auto'>
          <div className="mb-4">
            <InputField
            options={[]}
              label="Job Title"
              name="role"
              placeholder="Enter job title (e.g., Web Developer)"
              value={formData.role}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <InputField
             options={[]}
              label="Company"
              name="company"
              placeholder="Enter company name"
              value={formData.company}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <InputField
            placeholder={""}
             options={[]}
              label="Start Date"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <InputField
            placeholder={""}
             options={[]}
              label="End Date"
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-center space-x-2">
            {/* <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button> */}
            <button type="submit" className="mt-6 py-4  bg-[#FFBA00] text-white text-3xl  px-5 rounded-xl mx-auto">
              {initialData ? 'Save Changes' : 'Add Work Experience'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkExperienceSection;
