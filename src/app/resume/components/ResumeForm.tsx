'use client'

import { useState } from 'react'
import { useDualAuth } from '@/context/AuthContext'
import { z } from 'zod'
import { TagInput } from './tag-input'
import Cookies from "js-cookie";
const schema = z.object({
  userFirstName: z.string().min(1, "First name must not be empty"),
  userLastName: z.string().min(1, "Last name must not be empty"),
  userEmail: z.string().email("Invalid email address"),
  userAddress: z.string().min(1, "Address must not be empty").optional(),
  userPhoneNumber: z.string().min(1, "Phone number must not be empty"),
  skills: z
    .array(
      z.object({
        skillType: z.string().min(1, "Skill type must not be empty"),
        skillValues: z.array(z.string().min(1, "Skill value must not be empty")),
      })
    )
    .optional(),
  work: z
    .array(
      z.object({
        role: z.string().min(1, "Role must not be empty"),
        company: z.string().min(1, "Company must not be empty"),
        startDate: z.string(),
        endDate: z.string(),
        description: z.string().min(1, "Description must not be empty"),
      })
    )
    .optional(),
  education: z
    .array(
      z.object({
        degree: z.string().min(1, "Degree must not be empty"),
        institution: z.string().min(1, "Institution must not be empty"),
        startDate: z.string(),
        completionDate: z.string(),
      })
    )
    .optional(),
  certifications: z
    .array(
      z.object({
        description: z.string().min(1, "Description must not be empty"),
        issuedBy: z.string().min(1, "Issued by must not be empty"),
        url: z.string().url("Invalid URL"),
      })
    )
    .optional(),
  projects: z
    .array(
      z.object({
        name: z.string().min(1, "Project name must not be empty"),
        description: z.string().min(1, "Description must not be empty"),
        keywords: z.array(z.string().min(1, "Keyword must not be empty")),
        url: z.string().url("Invalid URL"),
      })
    )
    .optional(),
  links: z
    .array(
      z.object({
        network: z.string().min(1, "Network name must not be empty"),
        url: z.string().url("Invalid URL"),
      })
    )
    .optional(),
  Achievements: z.array(z.string().min(1, "Achievement must not be empty")).optional(),
})

type FormData = z.infer<typeof schema>;

const ResumeForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    userFirstName: '',
    userLastName: '',
    userEmail: '',
    userAddress: '',
    userPhoneNumber: '',
    skills: [],
    work: [],
    education: [],
    certifications: [],
    projects: [],
    links: [],
    Achievements: [],
  });
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});

 
  

  const { setIsResume } = useDualAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const pinqueryToken = Cookies.get("pinquery_token");
    const result = schema.safeParse(formData);
    if (result.success) {
      console.log('Form data:', result.data);
      try {
        const response = await fetch('https://www.careerzai.com/v1/resume', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${pinqueryToken}`,
          },
          body: JSON.stringify(result.data),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Success:', data);
        setIsResume(true)
        alert('Form submitted successfully!');
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      setErrors(result.error.flatten().fieldErrors);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof FormData, index?: number, subField?: string) => {
    if(field==="Achievements"){
      setFormData(prev => ({ ...prev, Achievements:prev.Achievements?.map((a,i) => (i === index ? e.target.value : a)) }));
      return
    }
    
    if (index === undefined || subField === undefined) {
      setFormData(prev => ({ ...prev, [field]: e.target.value }));
    } else {
      setFormData(prev => {
        const newArray = [...prev[field] as any[]];
        newArray[index] = { ...newArray[index], [subField]: e.target.value };
        return { ...prev, [field]: newArray };
      });
    }
  };

  const addArrayItem = (field: string) => {
    setFormData(prev => {
      if (field === 'skills') {
        return { ...prev, skills: [...(prev.skills || []), { skillType: '', skillValues: [] }] };
      } else if (field === 'work') {
        return { ...prev, work: [...(prev.work || []), { role: '', company: '', startDate: '', endDate: '', description: '' }] };
      } else if (field === 'education') {
        return { ...prev, education: [...(prev.education || []), { degree: '', institution: '', startDate: '', completionDate: '' }] };
      } else if (field === 'certifications') {
        return { ...prev, certifications: [...(prev.certifications || []), { description: '', issuedBy: '', url: '' }] };
      } else if (field === 'projects') {
        return { ...prev, projects: [...(prev.projects || []), { name: '', description: '', keywords: [], url: '' }] };
      } else if (field === 'links') {
        return { ...prev, links: [...(prev.links || []), { network: '', url: '' }] };
      } else if (field === 'Achievements') {
        return { ...prev, Achievements: [...(prev.Achievements || ["",]), ''] };
      }
      return prev;
    });
  };

  const removeArrayItem = (field: keyof FormData, index: number) => {
    setFormData(prev => {
      const newArray = [...prev[field] as any[]];
      newArray.splice(index, 1);
      return { ...prev, [field]: newArray };
    });
  };
console.log(formData.Achievements);
  return (
    <form onSubmit={handleSubmit} className="max-w-[1300px] my-10 w-full mx-auto p-6 bg-white shadow-lg rounded-lg space-y-8">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">User Resume</h1>

      {/* Personal Information */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="userFirstName" className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              id="userFirstName"
              type="text"
              value={formData.userFirstName}
              onChange={(e) => handleChange(e, 'userFirstName')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.userFirstName && <p className="text-red-500 text-xs">{errors.userFirstName}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="userLastName" className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              id="userLastName"
              type="text"
              value={formData.userLastName}
              onChange={(e) => handleChange(e, 'userLastName')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.userLastName && <p className="text-red-500 text-xs">{errors.userLastName}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="userEmail"
              type="email"
              value={formData.userEmail}
              onChange={(e) => handleChange(e, 'userEmail')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.userEmail && <p className="text-red-500 text-xs">{errors.userEmail}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="userAddress" className="block text-sm font-medium text-gray-700">Address</label>
            <input
              id="userAddress"
              type="text"
              value={formData.userAddress}
              onChange={(e) => handleChange(e, 'userAddress')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.userAddress && <p className="text-red-500 text-xs">{errors.userAddress}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="userPhoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              id="userPhoneNumber"
              type="tel"
              value={formData.userPhoneNumber}
              onChange={(e) => handleChange(e, 'userPhoneNumber')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.userPhoneNumber && <p className="text-red-500 text-xs">{errors.userPhoneNumber}</p>}
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Skills</h2>
        {formData.skills?.map((skill, skillIndex) => (
          <div key={skillIndex} className="mb-4 p-4 border border-gray-200 rounded-md transition-all duration-300 ease-in-out">
            <div className="mb-2">
              <label htmlFor={`skillType-${skillIndex}`} className="block text-sm font-medium text-gray-700">Skill Type</label>
              <input
                id={`skillType-${skillIndex}`}
                type="text"
                value={skill.skillType}
                onChange={(e) => handleChange(e, 'skills', skillIndex, 'skillType')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Skill Values</label>
              <TagInput
                tags={skill.skillValues}
                onTagsChange={(newTags) => {
                  const newSkills = [...formData.skills!];
                  newSkills[skillIndex].skillValues = newTags;
                  setFormData({ ...formData, skills: newSkills });
                }}
              />
            </div>
            <div className="mt-2 flex justify-end">
              <button
                type="button"
                onClick={() => removeArrayItem('skills', skillIndex)}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Remove Skill
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem('skills')}
          className="mt-2 px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Add Skill
        </button>
      </div>

      {/* Work Experience */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Work Experience</h2>
        {formData.work?.map((work, index) => (
          <div key={index} className="mb-4 p-4 border border-gray-200 rounded-md transition-all duration-300 ease-in-out">
            <div className="space-y-2">
              <label htmlFor={`role-${index}`} className="block text-sm font-medium text-gray-700">Role</label>
              <input
                id={`role-${index}`}
                type="text"
                value={work.role}
                onChange={(e) => handleChange(e, 'work', index, 'role')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor={`company-${index}`} className="block text-sm font-medium text-gray-700">Company</label>
              <input
                id={`company-${index}`}
                type="text"
                value={work.company}
                onChange={(e) => handleChange(e, 'work', index, 'company')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor={`startDate-${index}`} className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  id={`startDate-${index}`}
                  type="date"
                  value={work.startDate}
                  onChange={(e) => handleChange(e, 'work', index, 'startDate')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor={`endDate-${index}`} className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                  id={`endDate-${index}`}
                  type="date"
                  value={work.endDate}
                  onChange={(e) => handleChange(e, 'work', index, 'endDate')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor={`description-${index}`} className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                id={`description-${index}`}
                value={work.description}
                onChange={(e) => handleChange(e, 'work', index, 'description')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mt-2 flex justify-end">
              <button
                type="button"
                onClick={() => removeArrayItem('work', index)}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Remove Work Experience
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem('work')}
          className="mt-2 px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Add Work Experience
        </button>
      </div>

      {/* Education */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Education</h2>
        {formData.education?.map((edu, index) => (
          <div key={index} className="mb-4 p-4 border border-gray-200 rounded-md transition-all duration-300 ease-in-out">
            <div className="space-y-2">
              <label htmlFor={`degree-${index}`} className="block text-sm font-medium text-gray-700">Degree</label>
              <input
                id={`degree-${index}`}
                type="text"
                value={edu.degree}
                onChange={(e) => handleChange(e, 'education', index, 'degree')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor={`institution-${index}`} className="block text-sm font-medium text-gray-700">Institution</label>
              <input
                id={`institution-${index}`}
                type="text"
                value={edu.institution}
                onChange={(e) => handleChange(e, 'education', index, 'institution')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor={`eduStartDate-${index}`} className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  id={`eduStartDate-${index}`}
                  type="date"
                  value={edu.startDate}
                  onChange={(e) => handleChange(e, 'education', index, 'startDate')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor={`completionDate-${index}`} className="block text-sm font-medium text-gray-700">Completion Date</label>
                <input
                  id={`completionDate-${index}`}
                  type="date"
                  value={edu.completionDate}
                  onChange={(e) => handleChange(e, 'education', index, 'completionDate')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mt-2 flex justify-end">
              <button
                type="button"
                onClick={() => removeArrayItem('education', index)}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Remove Education
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem('education')}
          className="mt-2 px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Add Education
        </button>
      </div>

      {/* Certifications */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Certifications</h2>
        {formData.certifications?.map((cert, index) => (
          <div key={index} className="mb-4 p-4 border border-gray-200 rounded-md transition-all duration-300 ease-in-out">
            <div className="space-y-2">
              <label htmlFor={`certDescription-${index}`} className="block text-sm font-medium text-gray-700">Description</label>
              <input
                id={`certDescription-${index}`}
                type="text"
                value={cert.description}
                onChange={(e) => handleChange(e, 'certifications', index, 'description')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor={`issuedBy-${index}`} className="block text-sm font-medium text-gray-700">Issued By</label>
              <input
                id={`issuedBy-${index}`}
                type="text"
                value={cert.issuedBy}
                onChange={(e) => handleChange(e, 'certifications', index, 'issuedBy')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor={`certUrl-${index}`} className="block text-sm font-medium text-gray-700">URL</label>
              <input
                id={`certUrl-${index}`}
                type="url"
                value={cert.url}
                onChange={(e) => handleChange(e, 'certifications', index, 'url')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mt-2 flex justify-end">
              <button
                type="button"
                onClick={() => removeArrayItem('certifications', index)}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Remove Certification
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem('certifications')}
          className="mt-2 px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Add Certification
        </button>
      </div>

      {/* Projects */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Projects</h2>
        {formData.projects?.map((project, index) => (
          <div key={index} className="mb-4 p-4 border border-gray-200 rounded-md transition-all duration-300 ease-in-out">
            <div className="space-y-2">
              <label htmlFor={`projectName-${index}`} className="block text-sm font-medium text-gray-700">Project Name</label>
              <input
                id={`projectName-${index}`}
                type="text"
                value={project.name}
                onChange={(e) => handleChange(e, 'projects', index, 'name')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor={`projectDescription-${index}`} className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                id={`projectDescription-${index}`}
                value={project.description}
                onChange={(e) => handleChange(e, 'projects', index, 'description')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Keywords</label>
              <TagInput
                tags={project.keywords}
                onTagsChange={(newTags) => {
                  const newProjects = [...formData.projects!];
                  newProjects[index].keywords = newTags;
                  setFormData({ ...formData, projects: newProjects });
                }}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor={`projectUrl-${index}`} className="block text-sm font-medium text-gray-700">URL</label>
              <input
                id={`projectUrl-${index}`}
                type="url"
                value={project.url}
                onChange={(e) => handleChange(e, 'projects', index, 'url')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mt-2 flex justify-end">
              <button
                type="button"
                onClick={() => removeArrayItem('projects', index)}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Remove Project
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem('projects')}
          className="mt-2 px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Add Project
        </button>
      </div>

      {/* Links */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Links</h2>
        {formData.links?.map((link, index) => (
          <div key={index} className="mb-4 p-4 border border-gray-200 rounded-md transition-all duration-300 ease-in-out">
            <div className="space-y-2">
              <label htmlFor={`network-${index}`} className="block text-sm font-medium text-gray-700">Network</label>
              <input
                id={`network-${index}`}
                type="text"
                value={link.network}
                onChange={(e) => handleChange(e, 'links', index, 'network')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor={`linkUrl-${index}`} className="block text-sm font-medium text-gray-700">URL</label>
              <input
                id={`linkUrl-${index}`}
                type="url"
                value={link.url}
                onChange={(e) => handleChange(e, 'links', index, 'url')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mt-2 flex justify-end">
              <button
                type="button"
                onClick={() => removeArrayItem('links', index)}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Remove Link
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem('links')}
          className="mt-2 px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Add Link
        </button>
      </div>

      {/* Achievements */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Achievements</h2>
        {formData.Achievements?.map((achievement, index) => (
          <div key={index} className="mb-2 flex items-center space-x-2">
            <input
              type="text"
              value={achievement}
              onChange={(e) => handleChange(e, 'Achievements', index)}
              placeholder="Enter achievement"
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => removeArrayItem('Achievements', index)}
              className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem('Achievements')}
          className="mt-2 px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Add Achievement
        </button>
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </form>
  )
}

export default ResumeForm

