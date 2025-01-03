"use client"
import React, { use, useEffect } from "react";
import axios from "axios";
    import Cookies from "js-cookie";
    import previewImd from "../../assests/material-symbols-light_preview-outline.svg"
import Image from "next/image";






const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
  
    // Get the day, month, and year
    const day = String(date.getDate()).padStart(2, '0'); // Pad single digit days with a leading 0
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so add 1
    const year = date.getFullYear();
  
    // Format as "DD - MM - YYYY"
    return `${day} - ${month} - ${year}`;
  };

type JobApplication = {
  jobId: {
    title: string;
    company: string;
  };
  createdAt: string;
  status: string;
};

const ApplicationMobileCard = () => {
  const [JobApplications, setJobApplications] = React.useState<JobApplication[]>([]);
  // Dummy data
  useEffect(() => {
    
    
    const fetchApplication = async () => {
      try {
        // Get the token from cookies
        const pinqueryToken = Cookies.get("pinquery_token");
    
        if (!pinqueryToken) {
          throw new Error("Authentication token is missing.");
        }
    
        // Make the GET request
        const response = await axios.get("https://www.careerzai.com/v1/application", {
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${pinqueryToken}`
          },
        });
    
        console.log("Application Data:", response.data);
    
        setJobApplications(response.data.applications); // Return the data
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Error Response:", error.response?.data || error.message);
          throw new Error(`API Error: ${error.response?.data || error.message}`);
        }
      }
    };
    fetchApplication()
    
  },[])




  return (
    <div className="max-w-[1356px] mx-auto py-10 p-4  block md:hidden">
      {/* Grid Header */}
      <h1 className="text-sm font-normal text-center">My Applications</h1>
      <div className="shadow-xl py-8">
      {/* <div className="grid py-10 grid-cols-5 md:text-[32px] md:leading-10 text-left font-semibold px-4 border-b border-black">
        <div>Job Title</div>
        <div>Company</div>
        <div>Applied Date</div>
        <div>Status</div>
        <div className="text-center">Preview</div>
      </div> */}

      {/* Grid Body */}
      {JobApplications.map((app, index) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          key={index}
          className="grid grid-cols-5 my-8 mx-4 gap-5 md:text-2xl text-[#FF6700] py-8 px-4 items-center border-b border-gray-300 bg-[#FFEADC] hover:bg-orange-100"
        >
            <div className="col-span-3">
            <div className="font-medium text-sm">{app.jobId.title}</div>
            <div className="font-medium text-[10px]">{app.jobId.company}</div>
            </div>
          <div className="col-span-2"><div className="text-right">
            <button type="button" className="text-orange-500">
              <Image src={previewImd} alt="Bookmark" className="md:w-auto w-5" />
            </button>
          </div></div>
          
          <div className="col-span-3 text-[10px]">Applied Date: <span className="font-medium">{formatDate(app.createdAt)}</span></div>
          <div className="col-span-2 text-right text-[10px]">Status: <span className="font-medium">{app.status}</span></div>
          
        </div>

      ))}
      </div>
    </div>
  );
};

export default ApplicationMobileCard;
