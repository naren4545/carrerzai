'use client'

import { useDualAuth } from '@/context/AuthContext'
import type React from 'react'
import { useState } from 'react'
import { z } from 'zod'
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

type FormData = z.infer<typeof schema>

const ResumeForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    userFirstName: '',
    userLastName: '',
    userEmail: '',
    userAddress: '',
    userPhoneNumber: '',
    skills: [{ skillType: '', skillValues: [''] }],
    work: [{ role: '', company: '', startDate: '', endDate: '', description: '' }],
    education: [{ degree: '', institution: '', startDate: '', completionDate: '' }],
    certifications: [{ description: '', issuedBy: '', url: '' }],
    projects: [{ name: '', description: '', keywords: [''], url: '' }],
    links: [{ network: '', url: '' }],
    Achievements: [''],
  })
  const{isResume,setIsResume}=useDualAuth()
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof FormData, index?: number, subField?: string) => {
    const value = e.target.value
    setFormData((prev) => {
      if (index !== undefined && subField) {
        const newArray = [...prev[field] as any[]]
        newArray[index] = { ...newArray[index], [subField]: value }
        return { ...prev, [field]: newArray }
      } else if (Array.isArray(prev[field])) {
        const newArray = [...prev[field] as any[]]
        newArray[index as number] = value
        return { ...prev, [field]: newArray }
      } else {
        return { ...prev, [field]: value }
      }
    })
  }

  const addArrayItem = (field: keyof FormData) => {
    setFormData((prev) => {
      const newArray = [...(prev[field] as any[] || [])]
      if (field === 'skills') newArray.push({ skillType: '', skillValues: [''] })
      else if (field === 'work') newArray.push({ role: '', company: '', startDate: '', endDate: '', description: '' })
      else if (field === 'education') newArray.push({ degree: '', institution: '', startDate: '', completionDate: '' })
      else if (field === 'certifications') newArray.push({ description: '', issuedBy: '', url: '' })
      else if (field === 'projects') newArray.push({ name: '', description: '', keywords: [''], url: '' })
      else if (field === 'links') newArray.push({ network: '', url: '' })
      else if (field === 'Achievements') newArray.push('')
      return { ...prev, [field]: newArray }
    })
  }

  const removeArrayItem = (field: keyof FormData, index: number) => {
    setFormData((prev) => {
      const newArray = [...(prev[field] as any[])]
      newArray.splice(index, 1)
      return { ...prev, [field]: newArray }
    })
  }

  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const validatedData = schema.parse(formData)
      console.log(validatedData)
      console.log(formData)

      const handleResme=async()=>{
        const pinqueryToken = Cookies.get("pinquery_token");
        try {
          const response = await fetch("https://www.careerzai.com/v1/resume", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${pinqueryToken}`, // Include the Authorization token
            },
            body: JSON.stringify(formData), // Convert the data to a JSON string
          });
      
          if (!response.ok) {
            throw new Error(`Failed to send data: ${response.statusText}`);
          }
      
          const result = await response.json();
          console.log("Data sent successfully:", result);
          setIsResume(true)
          alert('Form submitted successfully!')
        } catch (error:any) {
          console.error("Error sending data:", error.message);
        }
      
      }  

await handleResme()

      setErrors({})
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log("hii")
        const newErrors: Partial<Record<keyof FormData, string>> = {}
        error.errors.forEach((err) => {
          const path = err.path.join('.')
          newErrors[path as keyof FormData] = err.message
        })
        setErrors(newErrors)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-[1300px] my-10 w-full mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">User Resume</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="userFirstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
          <input
            type="text"
            id="userFirstName"
            value={formData.userFirstName}
            onChange={(e) => handleChange(e, 'userFirstName')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.userFirstName && <p className="text-red-500 text-xs mt-1">{errors.userFirstName}</p>}
        </div>
        <div>
          <label htmlFor="userLastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <input
            type="text"
            id="userLastName"
            value={formData.userLastName}
            onChange={(e) => handleChange(e, 'userLastName')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.userLastName && <p className="text-red-500 text-xs mt-1">{errors.userLastName}</p>}
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          id="userEmail"
          value={formData.userEmail}
          onChange={(e) => handleChange(e, 'userEmail')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.userEmail && <p className="text-red-500 text-xs mt-1">{errors.userEmail}</p>}
      </div>

      <div className="mb-6">
        <label htmlFor="userAddress" className="block text-sm font-medium text-gray-700 mb-1">Address (Optional)</label>
        <input
          type="text"
          id="userAddress"
          value={formData.userAddress}
          onChange={(e) => handleChange(e, 'userAddress')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="userPhoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
        <input
          type="tel"
          id="userPhoneNumber"
          value={formData.userPhoneNumber}
          onChange={(e) => handleChange(e, 'userPhoneNumber')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.userPhoneNumber && <p className="text-red-500 text-xs mt-1">{errors.userPhoneNumber}</p>}
      </div>

      {/* Skills */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Skills</h2>
        {formData.skills?.map((skill, index) => (
          <div key={index} className="mb-4 p-4 border border-gray-200 rounded-md">
            <div className="mb-2">
              <label htmlFor={`skillType-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Skill Type</label>
              <input
                type="text"
                id={`skillType-${index}`}
                value={skill.skillType}
                onChange={(e) => handleChange(e, 'skills', index, 'skillType')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {skill.skillValues.map((value, valueIndex) => (
              <div key={valueIndex} className="mb-2">
                <label htmlFor={`skillValue-${index}-${valueIndex}`} className="block text-sm font-medium text-gray-700 mb-1">Skill Value</label>
                <input
                  type="text"
                  id={`skillValue-${index}-${valueIndex}`}
                  value={value}
                  onChange={(e) => {
                    const newSkills = [...formData.skills!]
                    newSkills[index].skillValues[valueIndex] = e.target.value
                    setFormData({ ...formData, skills: newSkills })
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                const newSkills = [...formData.skills!]
                newSkills[index].skillValues.push('')
                setFormData({ ...formData, skills: newSkills })
              }}
              className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Skill Value
            </button>
            <button
              type="button"
              onClick={() => removeArrayItem('skills', index)}
              className="mt-2 ml-2 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Remove Skill
            </button>
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
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Work Experience</h2>
        {formData.work?.map((job, index) => (
          <div key={index} className="mb-4 p-4 border border-gray-200 rounded-md">
            <div className="mb-2">
              <label htmlFor={`role-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <input
                type="text"
                id={`role-${index}`}
                value={job.role}
                onChange={(e) => handleChange(e, 'work', index, 'role')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-2">
              <label htmlFor={`company-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Company</label>
              <input
                type="text"
                id={`company-${index}`}
                value={job.company}
                onChange={(e) => handleChange(e, 'work', index, 'company')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-2">
              <div>
                <label htmlFor={`startDate-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  id={`startDate-${index}`}
                  value={job.startDate}
                  onChange={(e) => handleChange(e, 'work', index, 'startDate')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor={`endDate-${index}`} className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  id={`endDate-${index}`}
                  value={job.endDate}
                  onChange={(e) => handleChange(e, 'work', index, 'endDate')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mb-2">
              <label htmlFor={`description-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                id={`description-${index}`}
                value={job.description}
                onChange={(e) => handleChange(e, 'work', index, 'description')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              ></textarea>
            </div>
            <button
              type="button"
              onClick={() => removeArrayItem('work', index)}
              className="mt-2 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Remove Job
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem('work')}
          className="mt-2 px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Add Job
        </button>
      </div>

      {/* Education */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Education</h2>
        {formData.education?.map((edu, index) => (
          <div key={index} className="mb-4 p-4 border border-gray-200 rounded-md">
            <div className="mb-2">
              <label htmlFor={`degree-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
              <input
                type="text"
                id={`degree-${index}`}
                value={edu.degree}
                onChange={(e) => handleChange(e, 'education', index, 'degree')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-2">
              <label htmlFor={`institution-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
              <input
                type="text"
                id={`institution-${index}`}
                value={edu.institution}
                onChange={(e) => handleChange(e, 'education', index, 'institution')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-2">
              <div>
                <label htmlFor={`eduStartDate-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  id={`eduStartDate-${index}`}
                  value={edu.startDate}
                  onChange={(e) => handleChange(e, 'education', index, 'startDate')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor={`completionDate-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Completion Date</label>
                <input
                  type="date"
                  id={`completionDate-${index}`}
                  value={edu.completionDate}
                  onChange={(e) => handleChange(e, 'education', index, 'completionDate')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => removeArrayItem('education', index)}
              className="mt-2 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Remove Education
            </button>
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
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Certifications</h2>
        {formData.certifications?.map((cert, index) => (
          <div key={index} className="mb-4 p-4 border border-gray-200 rounded-md">
            <div className="mb-2">
              <label htmlFor={`certDescription-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <input
                type="text"
                id={`certDescription-${index}`}
                value={cert.description}
                onChange={(e) => handleChange(e, 'certifications', index, 'description')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-2">
              <label htmlFor={`issuedBy-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Issued By</label>
              <input
                type="text"
                id={`issuedBy-${index}`}
                value={cert.issuedBy}
                onChange={(e) => handleChange(e, 'certifications', index, 'issuedBy')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-2">
              <label htmlFor={`certUrl-${index}`} className="block text-sm font-medium text-gray-700 mb-1">URL</label>
              <input
                type="url"
                id={`certUrl-${index}`}
                value={cert.url}
                onChange={(e) => handleChange(e, 'certifications', index, 'url')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="button"
              onClick={() => removeArrayItem('certifications', index)}
              className="mt-2 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Remove Certification
            </button>
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
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Projects</h2>
        {formData.projects?.map((project, index) => (
          <div key={index} className="mb-4 p-4 border border-gray-200 rounded-md">
            <div className="mb-2">
              <label htmlFor={`projectName-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
              <input
                type="text"
                id={`projectName-${index}`}
                value={project.name}
                onChange={(e) => handleChange(e, 'projects', index, 'name')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-2">
              <label htmlFor={`projectDescription-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                id={`projectDescription-${index}`}
                value={project.description}
                onChange={(e) => handleChange(e, 'projects', index, 'description')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              ></textarea>
            </div>
            <div className="mb-2">
              <label htmlFor={`projectKeywords-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Keywords (comma-separated)</label>
              <input
                type="text"
                id={`projectKeywords-${index}`}
                value={project.keywords.join(', ')}
                onChange={(e) => {
                  const newProjects = [...formData.projects!]
                  newProjects[index].keywords = e.target.value.split(',').map(k => k.trim())
                  setFormData({ ...formData, projects: newProjects })
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-2">
              <label htmlFor={`projectUrl-${index}`} className="block text-sm font-medium text-gray-700 mb-1">URL</label>
              <input
                type="url"
                id={`projectUrl-${index}`}
                value={project.url}
                onChange={(e) => handleChange(e, 'projects', index, 'url')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="button"
              onClick={() => removeArrayItem('projects', index)}
              className="mt-2 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Remove Project
            </button>
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
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Links</h2>
        {formData.links?.map((link, index) => (
          <div key={index} className="mb-4 p-4 border border-gray-200 rounded-md">
            <div className="mb-2">
              <label htmlFor={`network-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Network</label>
              <input
                type="text"
                id={`network-${index}`}
                value={link.network}
                onChange={(e) => handleChange(e, 'links', index, 'network')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-2">
              <label htmlFor={`linkUrl-${index}`} className="block text-sm font-medium text-gray-700 mb-1">URL</label>
              <input
                type="url"
                id={`linkUrl-${index}`}
                value={link.url}
                onChange={(e) => handleChange(e, 'links', index, 'url')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="button"
              onClick={() => removeArrayItem('links', index)}
              className="mt-2 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Remove Link
            </button>
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
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Achievements</h2>
        {formData.Achievements?.map((achievement, index) => (
          <div key={index} className="mb-2">
            <input
              type="text"
              value={achievement}
              onChange={(e) => handleChange(e, 'Achievements', index)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => removeArrayItem('Achievements', index)}
              className="mt-2 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Remove Achievement
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

