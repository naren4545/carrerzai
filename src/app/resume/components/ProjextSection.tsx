"use client";
import Image from 'next/image';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import ProjectIcon from '../../assests/fe_paper-plane.svg';
import editPen from '../../assests/clarity_edit-line.svg';
import deleteIcon from '../../assests/material-symbols-light_delete-outline.svg';
import InputField from './ui/InputField';
import handleResume from '@/utils/resumeUpdate';
import { date } from 'zod';

interface Project {
  name: string;
  description: string;
  keywords: string[];
  url: string;
  _id: string|null;
}

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string|null) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onEdit, onDelete }) => {
  return (
    <div className="flex items-start justify-between bg-white rounded-lg p-4 mb-4 overflow-hidden">
      <div className="flex items-start gap-4">
        <Image src={ProjectIcon} alt="Project Icon" className="" />
        <div>
          <h3 className="text-xl font-medium">{project.name}</h3>
          <p className="text-base">{project.description}</p>
          <div className="flex gap-2 mt-2 flex-wrap">
            {project.keywords.map((keyword, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
<span key={index} className="bg-gray-100 text-gray-800 py-1 px-2 rounded">
                {keyword}
              </span>
            ))}
          </div>
          <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 mt-2 block">
            Visit Project
          </a>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button type="button" className="text-gray-500" onClick={() => onEdit(project)}>
          <Image src={editPen} alt="Edit Icon" className="w-[20px]" />
        </button>
        <button type="button" className="text-red-500" onClick={() => onDelete(project._id)}>
          <Image src={deleteIcon} alt="Delete Icon" className="w-[20px]" />
        </button>
      </div>
    </div>
  );
};

interface ProjectsSectionProps {
  projects: Project[];
  _id: string
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects,_id }) => {
  const [projectList, setProjectList] = useState<Project[]>(projects);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [currentProject, setCurrentProject] = useState<Project>({
    name: "",
    description: "",
    keywords: [],
    url: "",
    _id: ""
  });

  const handleAdd = () => {
    setCurrentProject({
      name: "",
      description: "",
      keywords: [],
      url: "",
      _id: ""
    });
    setIsFormOpen(true);
  };

  const handleEdit = (project: Project) => {
    setCurrentProject(project);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string|null) => {
    setProjectList((prev) =>{ 
      const data={project:prev.filter((project) => project._id !== id)}
      handleResume(data,_id)
      return data.project
    });
  };

  const handleSave = async(project: Project) => {
    if (currentProject._id) {
      setProjectList((prev) =>{
const data={projects:prev.map((p) => (p._id === currentProject._id ? { ...project, _id: currentProject._id } : p))}
handleResume(data,_id)
      return data.projects
    });
    } else {

      const data={projects:[...projectList, { ...project, _id: null }]}
      const res=await handleResume(data,_id)
      setProjectList(res.projects);
    }
    setIsFormOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Projects</h2>
        <button type="button" onClick={handleAdd} className="text-orange-500 flex items-center gap-2">
          Add <FaPlus />
        </button>
      </div>
      {projectList.map((project) => (
        <ProjectCard key={project._id} project={project} onEdit={handleEdit} onDelete={handleDelete} />
      ))}
      {isFormOpen && (
        <ProjectForm onClose={() => setIsFormOpen(false)} onSave={handleSave} initialData={currentProject} />
      )}
    </div>
  );
};

interface ProjectFormProps {
  initialData?: Project;
  onSave: (updatedProject: Project) => void;
  onClose: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ initialData, onSave, onClose }) => {
  const [formData, setFormData] = useState<Project>({
    name: initialData?.name || '',
    description: initialData?.description || '',
    keywords: initialData?.keywords || [],
    url: initialData?.url || '',
    _id: initialData?._id || Date.now().toString(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };



  const handleKeywordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      keywords: value.split(',').map((keyword) => keyword.trim()), // Split and trim each keyword
    }));
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

  type NewType = any;

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
<div onClick={handleBackdropClick} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full h-full overflow-auto max-w-[1092px]" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <h3 className="text-2xl font-semibold mb-4">
          {initialData ? 'Edit Project' : 'Add Project'}
        </h3>
        <hr className="border-black mb-6" />

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <InputField
            options={[]}
              label="Project Name"
              name="name"
              placeholder="Enter project name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <InputField
            options={[]}
              label="Description"
              name="description"
              placeholder="Enter project description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <InputField
              label="Keywords"
              options={[]}
              name="keywords"
              placeholder="Enter keywords separated by commas"
              value={formData.keywords.join(', ')}
              onChange={handleKeywordsChange}
            />
          </div>
          <div className="mb-4">
            <InputField
            options={[]}
              label="Project URL"
              name="url"
              placeholder="Enter project URL"
              value={formData.url}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button type="submit" onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              {initialData ? 'Save Changes' : 'Add Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectsSection;
