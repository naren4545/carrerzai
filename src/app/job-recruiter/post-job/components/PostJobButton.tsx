"use client";

import { useFormContext } from './FormContext';
import Cookies from "js-cookie";
import axios from "axios";

export default function PostJobButton() {
  const { formData } = useFormContext();
  const pintudeToken = Cookies.get("pintude_token");
  console.log(pintudeToken || '');

  // Transform formData to match the API's required format
  const transformFormData = () => {
    return {
      title: formData.jobTitle,
      description: formData.jobDescription,
      company: "Tech Company", // You can set this dynamically or hardcode
      location: formData.jobLocation,
      JobType: formData.jobType,
      perks: formData.perks,
      typeOfJob: formData.opportunityType,
      salary: {
        minSalary: Number(formData.salary.minSalary),
        maxSalary:Number(formData.salary.maxSalary) , // Adjust if you have min/max input
      },
      experience: {
        minExperience: formData.experience.minExperience,
        maxExperience: formData.experience.maxExperience,
      },
      maxAge:Number(formData.ageLimit),
      openings: Number(formData.openings),
      keyResponsibilities: formData.responsibilities.map(responsibility => responsibility.text),
      requirements: formData.education || "Not specified",
      skillTags: formData.skills.map(skill => skill.name),
      industry: "Technology", // Set dynamically if needed
    };
   
  };
console.log(transformFormData())
  // Function to post job
  const postJob = async () => {
    try {
      const response = await axios.post(
        'https://www.careerzai.com/v1/job/',
        transformFormData(),
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${pintudeToken}`
          }
        }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`API Error: ${error.response?.data || error.message}`);
      }
      throw error;
    }
  };

  // Handle Post Job button click
  const handlePostJob = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const jobData = transformFormData();

    try {
      const result = await postJob();
      console.log('Job posted successfully:', result);
    } catch (error) {
      console.error('Error posting job:');
    }
  };

  return (
    <div className="py-10 max-w-[1340px] mx-auto">
      <button
        type="submit"
        onClick={handlePostJob}
        className="bg-blue-600 md:min-w-[250px] min-w-[127px] text-white px-7 py-2 rounded"
      >
        Post a Job
      </button>
    </div>
  );
}