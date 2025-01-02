"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import previewImd from "@/app/assests/material-symbols-light_preview-outline.svg";
import Image from "next/image";

const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day} - ${month} - ${year}`;
};

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


const ApplicationMobileCard = ({id}: {id: string}) => {
  const [JobApplications, setJobApplications] = useState<JobApplication[]>([]);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const pintudeToken = Cookies.get("pintude_token");

        if (!pintudeToken) {
          console.error("Authentication token is missing.");
          return;
        }

        const response = await axios.get(`https://www.careerzai.com/v1/application/job/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${pintudeToken}`,
          },
        });

        console.log("Application Data:", response.data);
        setJobApplications(response.data || []);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Error Response:", error.response?.data || error.message);
        } else {
          console.error("Unknown Error:", error);
        }
      }
    };

    fetchApplication();
  }, [id]);
console.log("hii")
  return (
    <div className="max-w-[1356px] mx-auto block md:hidden ">
      
      <div className="shadow-xl py-3 block md:hidden">
        {JobApplications.map((app) => (
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
    </div>
  );
};

export default ApplicationMobileCard;
