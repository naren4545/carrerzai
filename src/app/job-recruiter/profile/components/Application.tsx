"use client"
import React, { use, useEffect } from "react";
import axios from "axios";
    import Cookies from "js-cookie";
    import previewImd from "../../../assests/material-symbols-light_preview-outline.svg"


    import Image from "next/image";
import Link from "next/link";
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
     
        title: string;
        company: string;
        numberOfApplicants:number;
        _id:number
        status: string;
    };
const Application = () => {



    const [JobApplications, setJobApplications] =  React.useState<JobApplication[]>([]);
  // Dummy data
  useEffect(() => {
    
    
    const fetchApplication = async () => {
      try {
        // Get the token from cookies
        const pintudeToken = Cookies.get("pintude_token");
    
        if (!pintudeToken) {
          throw new Error("Authentication token is missing.");
        }
    
        // Make the GET request
        const response = await axios.get("https://www.careerzai.com/v1/job/recruiter/jobs", {
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${pintudeToken}`
            },
          });
    
        console.log("Application Data:", response.data);
    
        setJobApplications(response.data.jobs); // Return the data
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
    <div className="max-w-[1118px] mx-auto py-10 p-4 md:block hidden">
      {/* Grid Header */}
      
      <div className="shadow-xl py-3 border-[#FF6700] border-2 rounded-xl">
      <div className="grid py-10 grid-cols-3 lg:text-[32px] lg:leading-10 text-xl  text-left font-semibold px-4 border-b border-[#FF6700]">
        <div>Job Title</div>
        <div>No. of Applicants</div>
        
        <div>Status</div>
        
      </div>

      {/* Grid Body */}
      {JobApplications.map((app, index) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          key={index}
          className="grid grid-cols-3 my-8 mx-4 text-base  lg:text-2xl text-[#FF6700] py-8 px-4 items-center border-b border-gray-300 bg-[#FFEADC] hover:bg-orange-100"
        >
          <div>{app.title}</div>
          <div><Link href={`/job-recruiter/profile/${app._id}`}>{app.numberOfApplicants}</Link></div>
          
          <div>{app.status==="Published"?"Active":"Closed"}</div>
          
        </div>

      ))}
      </div>
    </div>
  );
};

export default Application;
