"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import img from "@/app/assests/carbon_data-view-alt.svg";
import StatusDropdown from "./StatusDropdown";
import { JobApplicationsSkeleton } from "./JobApplicationsSkeleton";

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
    <div className="max-w-[1118px] mx-auto py-10 p-4 md:block hidden">
      {/* Grid Header */}
     {
      loading ? <JobApplicationsSkeleton/>:<div className="shadow-xl py-3 border-black border-2 rounded-xl">
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
            <Image src={img} alt="View Profile" width={24} height={24} />
          </div>
          <div>{formatDate(app.createdAt)}</div>
          <div> <StatusDropdown initialStatus={app.status} itemId={app._id}/></div>
        </div>
      ))}
    </div>
     }
      
    </div>
  );
};

export default Wrapper;
