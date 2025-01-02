"use client"
import { useDualAuth } from "@/context/AuthContext";
import Footer from "../components/Footer";
import Header from "../components/Header";
import  ProfileForm  from "./components/ProfileForm";
import WrapperResume from "./components/WrapperResume";
import ResumeForm from "./components/ResumeForm";
import { useEffect, useState } from "react";
import ResumeBuilderSkeleton from "./components/ResumeBuilderSkeleton";
// const userProfile = {
//     _id: "672bce872c01d2e6ce23f3db",
//     userFirstName: "Jossd",
//     userLastName: "Doe",
//     userEmail: "johndoe@example.com",
//     userAddress: "123 Main St, Springfield, IL",
//     userPhoneNumber: "+1-555-123-4567",
//     skills: [
//       {
//         skillType: "Programming Languages",
//         skillValues: ["JavaScript", "TypeScript", "Python"],
//         _id: "6734597b3f2d14c111614d86"
//       },
//       {
//         skillType: "Frameworks",
//         skillValues: ["React", "Node.js", "Express"],
//         _id: "6734597b3f2d14c111614d87"
//       }
//     ],
//     work: [
//       {
//         role: "Software Developer",
//         company: "Tech Solutions Inc.",
//         startDate: "2020-01-01",
//         endDate: "2023-06-30",
//         description: "Developed and maintained web applications using React and Node.js.",
//         _id: "6734597b3f2d14c111614d88"
//       },
//       {
//         role: "Junior Developer",
//         company: "Web Innovators Ltd.",
//         startDate: "2018-06-01",
//         endDate: "2019-12-31",
//         description: "Assisted in developing client-side applications and improving performance.",
//         _id: "6734597b3f2d14c111614d89"
//       }
//     ],
//     education: [
//       {
//         degree: "Bachelor of Science in Computer Science",
//         institution: "University of Illinois",
//         startDate: "2014-09-01",
//         completionDate: "2018-05-15",
//         _id: "6734597b3f2d14c111614d8a"
//       }
//     ],
//     certifications: [
//       {
//         description: "Certified JavaScript Developer",
//         issuedBy: "JavaScript Institute",
//         url: "https://example.com/certifications/js-developer",
//         _id: "6734597b3f2d14c111614d8b"
//       }
//     ],
//     projects: [
//       {
//         name: "Personal Portfolio",
//         description: "A personal portfolio website showcasing projects and skills.",
//         keywords: ["React", "CSS", "JavaScript"],
//         url: "https://johndoe.dev",
//         _id: "6734597b3f2d14c111614d8c"
//       },
//       {
//         name: "E-commerce Platform",
//         description: "An e-commerce platform built with Node.js and Express.",
//         keywords: ["Node.js", "Express", "MongoDB"],
//         url: "https://myecommerce.com",
//         _id: "6734597b3f2d14c111614d8d"
//       }
//     ],
//     links: [
//       {
//         network: "LinkedIn",
//         url: "https://www.linkedin.com/in/johndoe",
//         _id: "6734597b3f2d14c111614d8e"
//       },
//       {
//         network: "GitHub",
//         url: "https://github.com/johndoe",
//         _id: "6734597b3f2d14c111614d8f"
//       }
//     ],
//     achievements: [
//       "Developed a full-stack web application used by over 10,000 users.",
//       "Received Employee of the Year award in 2022."
//     ],
//     createdBy: "670f7ec02921cae3fe9ed7b7",
//     createdAt: "2024-11-06T20:16:07.108Z",
//     updatedAt: "2024-11-13T07:47:07.342Z",
//     __v: 0
//   };
interface Skill {
  skillType: string;
  skillValues: string[];
  _id: string;
}

interface WorkExperience {
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  _id: string;
}

interface Education {
  degree: string;
  institution: string;
  startDate: string;
  completionDate: string;
  _id: string;
}

interface Certification {
  description: string;
  issuedBy: string;
  url: string;
  _id: string;
}

interface Project {
  name: string;
  description: string;
  keywords: string[];
  url: string;
  _id: string;
}

interface Link {
  network: string;
  url: string;
  _id: string;
}

interface UserProfile {
  _id: string;
  Achievements: string[];
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  userAddress: string;
  userPhoneNumber: string;
  skills: Skill[];
  work: WorkExperience[];
  education: Education[];
  certifications: Certification[];
  projects: Project[];
  links: Link[];
  achievements: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  resumePdfKey:any;
  selectedResumeTemplate: string;
  resumeUrl:string;
  __v: number;
}



export default function page() {

  const{isResume,setIsResume}=useDualAuth()

 
const [resume,setResume]=useState<UserProfile | null>(null)

useEffect(()=>{
  const resumeValidate = async () => {
   
    const cookies = document.cookie;

    // Extract the `pinquery_token` cookie value
    const pinqueryToken = cookies
      .split("; ")
      .find((row) => row.startsWith("pinquery_token="))
      ?.split("=")[1]; // Get the value after '='

    console.log(`Token: ${pinqueryToken}`);
    // Safely extract the value if the cookie exists

    if (!pinqueryToken) return;
    // Select the appropriate endpoint based on token presence
    const endpoint = "https://www.careerzai.com/v1/resume/user";

    const res = await fetch(endpoint, {
      headers: {
        "Content-Type": "application/json",
        ...(pinqueryToken && { Authorization: `Bearer ${pinqueryToken}` }), // Attach token if it exists
      },
      // Ensures no caching
    });
    const data = await res.json();
    console.log("Resume data:", data);

    setResume(data.data);
    if (res.status === 200) {
       // Parse the response body
     // Store the resume data in the state
      
    } else {
     console.log("Error fetching resume data");
    }
  };
if(isResume){

resumeValidate()
}

  
},[isResume])

  console.log(resume)
  return (
    <div>
      <Header/>
      {/* <ProfileForm/> */}
{!isResume && <ResumeForm />}

{isResume && resume ?<WrapperResume userProfile={resume}/>:<ResumeBuilderSkeleton/>}
      <Footer/>


    </div>
  )
}
