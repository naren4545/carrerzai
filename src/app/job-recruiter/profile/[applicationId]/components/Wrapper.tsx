"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import img from "@/app/assests/carbon_data-view-alt.svg";
import StatusDropdown from "./StatusDropdown";
import { JobApplicationsSkeleton } from "./JobApplicationsSkeleton";
import previewImd from "@/app/assests/material-symbols-light_preview-outline.svg";

type JobApplication = {
    _id: number;
  jobId: {
    title: string;
    company: string;
  };
  createdAt: string;
  status: string;
  resumeId: {
    userFirstName: string;
    userLastName: string;
    resumeUrl: string;
  };
};

const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);

  // Get the day, month, and year
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  // Format as "DD - MM - YYYY"
  return `${day} - ${month} - ${year}`;
};

const Wrapper = ({id}:{id:string}) => {
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);
const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const pintudeToken = Cookies.get("pintude_token");

        if (!pintudeToken) {
          throw new Error("Authentication token is missing.");
        }
setLoading(true)
        const response = await axios.get(
          `https://www.careerzai.com/v1/application/job/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${pintudeToken}`,
            },
          }
        );

        console.log("Application Data:", response.data);

        // Assuming the response contains a `data` array
        setJobApplications(response.data);
        setLoading(false)
      } catch (error) {

        setLoading(false)
        if (axios.isAxiosError(error)) {
          console.error(
            "Error Response:",
            error.response?.data || error.message
          );
          throw new Error(
            `API Error: ${error.response?.data || error.message}`
          );
        }
      }
    };

    fetchApplications();
  }, [id]);





  return (
    <div className="max-w-[1118px] mx-auto  p-4 ">
      {/* Grid Header */}
     {
      loading ? <JobApplicationsSkeleton/>:<><div className="shadow-xl py-3 border-black border-2 rounded-xl md:block hidden">
      <div className="grid py-10 grid-cols-4 place-items-center lg:text-2xl lg:leading-10 text-xl text-left font-semibold px-4 border-b border-black">
        <div className="col-span-1">Applicant's Name</div>
        <div>View Profile</div>
        <div>Applied Date</div>
        <div>Change Status</div>
      </div>

      {/* Grid Body */}
      {jobApplications.map((app, index) => (
        <div
        
          key={app._id}
          className="grid grid-cols-4 my-8  text-base place-items-center lg:text-2xl text-[#FF6700] py-8 px-4 items-center  bg-[#FFEADC] hover:bg-orange-100"
        >
          <div>
            {app.resumeId?.userFirstName} {app.resumeId?.userLastName}
          </div>
          <div>
            <a href={app.resumeId?.resumeUrl} target="_blank" rel="noopener noreferrer">
            <Image src={img} alt="View Profile" width={24} height={24} />
            </a>
          </div>
          <div>{formatDate(app.createdAt)}</div>
          <div> <StatusDropdown initialStatus={app.status} itemId={app._id}/></div>
        </div>
      ))}
    </div>
    


    <div className="shadow-xl py-3 block md:hidden">
        {jobApplications.map((app) => (
          <div
            key={app._id}
            className="grid  md:hidden grid-cols-5 my-8 mx-4 gap-5 md:text-2xl text-[#FF6700] py-8 px-4 items-center border-b border-gray-300 bg-[#FFEADC] hover:bg-orange-100"
          >
            <div className="col-span-3">
              <div className="font-medium text-sm">{app.resumeId?.userFirstName} {app.resumeId?.userLastName}</div>
              <div className="font-medium text-[10px]">View Application: </div>
              <div className="col-span-3  text-[10px]">
            Applied Date: <span className="font-medium">{formatDate(app.createdAt)}</span>
            </div>
            </div>
            <div className="col-span-2">
              <div className="text-right">
                <button type="button" className="text-orange-500">
                 <a href={app.resumeId?.resumeUrl} target="_blank" rel="noopener noreferrer"><Image
                    src={previewImd}
                    alt="Bookmark"
                    className="md:w-auto w-5"
                  /></a> 
                </button>
              </div>
            </div>
            
           

            <div className="col-span-2"/>
          </div>
        ))}
      </div>
    </>
     }
      
    </div>
  );
};

export default Wrapper;
