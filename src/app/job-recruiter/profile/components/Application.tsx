"use client"
import React, { use, useEffect } from "react";
import axios from "axios";
    import Cookies from "js-cookie";
    import previewImd from "../../../assests/material-symbols-light_preview-outline.svg"


    import Image from "next/image";
import Link from "next/link";
import { JobApplicationsSkeleton } from "../[applicationId]/components/JobApplicationsSkeleton";
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


const [isLoading, setIsLoading] = React.useState(true);
    const [JobApplications, setJobApplications] =  React.useState<JobApplication[]>([]);
  // Dummy data
  useEffect(() => {
    
    
    const fetchApplication = async () => {
      try {
        setIsLoading(true)
        // Get the token from cookies
        const pintudeToken = Cookies.get("pintude_token");
    
        if (!pintudeToken) {
          setIsLoading(false)
          throw new Error("Authentication token is missing.");
          
        }
    console.log("token",pintudeToken)
        // Make the GET request
        const response = await axios.get("https://www.careerzai.com/v1/job/recruiter/jobs", {
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${pintudeToken}`
            },
          });
    
        console.log("Application Data:", response.data);
    
        setJobApplications(response.data.jobs);
        setIsLoading(false) // Return the data
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setIsLoading(false)
          console.error("Error Response:", error.response?.data || error.message);
          throw new Error(`API Error: ${error.response?.data || error.message}`);
        }
      }
    };
    fetchApplication()
    
  },[])


if(isLoading){

  return (
    <JobApplicationsSkeleton/>
  )

  }




if(!JobApplications.length && !isLoading){

return (
  <div className="max-w-[1118px] mx-auto py-2 p-4 ">
    <div className=" py-3 rounded-xl">
<p className="md:text-2xl text-base text-center">No Job Application Found</p>
      </div>
      </div>
)


}


  return (
    <div className="max-w-[1118px] mx-auto  p-4 ">
      {/* Grid Header */}
      
      <div className="shadow-xl py-3 border-[#FF6700] border-2 rounded-xl md:block hidden">
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
          className="hidden md:grid  grid-cols-3 my-8 mx-4 text-base  lg:text-2xl text-[#FF6700] py-8 px-4 items-center border-b border-gray-300 bg-[#FFEADC] hover:bg-orange-100"
        >
          <div>{app.title}</div>
          <div>{app.numberOfApplicants===0?<span>0</span>:<Link href={`/job-recruiter/profile/${app._id}`}>{app.numberOfApplicants}</Link>}</div>
          
          <div>{app.status==="Published"?"Active":"Closed"}</div>
          
        </div>

      ))}



      </div>


      {JobApplications.map((app, index) => (
          <div
            key={app._id}
            className="grid  md:hidden grid-cols-5 my-8 mx-4 gap-5 md:text-2xl text-[#FF6700] py-8 px-4 items-center border-b border-gray-300 bg-[#FFEADC] hover:bg-orange-100"
          >
            <div className="col-span-3">
              <div className="font-medium text-sm">{app.title}</div>
              <div className="font-medium text-[10px]">No. of Applicants:{app.numberOfApplicants}</div>
            </div>
            <div className="col-span-2">
              <div className="text-right">
                <button type="button" className="text-orange-500">
                  <Image
                    src={previewImd}
                    alt="Bookmark"
                    className="md:w-auto w-5"
                  />
                </button>
              </div>
            </div>
            
            <div className="col-span-3  text-[10px]">
            Change Status: <span className="font-medium">{app.status==="Published"?"Active":"Closed"}</span>
            </div>

            <div className="col-span-2"/>
          </div>
        ))}

      
    </div>
  );
};

export default Application;
