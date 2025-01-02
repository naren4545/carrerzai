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
  
  title: string;
  company: string;
  numberOfApplicants: number;
  _id: number;
  createdAt: string;
  status: string;
  
};


const ApplicationMobileCard = () => {
  const [JobApplications, setJobApplications] = useState<JobApplication[]>([]);
const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchApplication = async () => {
      try {
        setIsLoading(true);
        const pintudeToken = Cookies.get("pintude_token");

        if (!pintudeToken) {
          setIsLoading(false);
          console.error("Authentication token is missing.");
          return;
        }

        const response = await axios.get("https://www.careerzai.com/v1/job/recruiter/jobs", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${pintudeToken}`,
          },
        });

        console.log("Application Data:", response.data);
        setJobApplications(response.data.jobs || []);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        if (axios.isAxiosError(error)) {
          console.error("Error Response:", error.response?.data || error.message);
        } else {
          console.error("Unknown Error:", error);
        }
      }
    };

    fetchApplication();
  }, []);



  if(!JobApplications.length && !isLoading){

    return (
      <div className="max-w-[1118px] mx-auto py-10 p-4 md:block hidden">
        <div className=" py-3 rounded-xl">
    <p className="text-lg text-center">No Job Application Found</p>
          </div>
          </div>
    )
    
    
    }




  return (
    <div className="max-w-[1356px] mx-auto   block md:hidden">
      
      <div className="shadow-xl py-3">
        {JobApplications.map((app, index) => (
          <div
            key={app._id}
            className="grid block md:hidden grid-cols-5 my-8 mx-4 gap-5 md:text-2xl text-[#FF6700] py-8 px-4 items-center border-b border-gray-300 bg-[#FFEADC] hover:bg-orange-100"
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
    </div>
  );
};

export default ApplicationMobileCard;
