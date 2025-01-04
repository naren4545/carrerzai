
import { useEffect, useState } from 'react';
import AchievementsSection from './AchievementsSection';
import CertificationSection from './CertificationSection';
import EducationSection from './EducationSection';
import JobProfileTitle from './JobProfileTitle';
import Languages from './language';
import ProfileCard from './profilrInfo';
import ProjectsSection from './ProjextSection';
import ResumeButtons from './ResumeButtons';
import Skills from './Skills';
import SocialLinksSection from './SocialLinksSection';
import TemplateSelector from './TemplateSelector';
import WorkExperienceSection from './WorkExperienceSection';

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

interface WrapperResumeProps {
  userProfile: UserProfile;
}

const WrapperResume: React.FC<WrapperResumeProps> = ({ userProfile }) => {
console.log(userProfile.resumeUrl)





if (Object.keys(userProfile).length === 0) {
 return <p>Loading</p>
}
    const profile={

        _id: userProfile._id,
  userFirstName:userProfile.userFirstName ,
  userLastName: userProfile.userLastName,
  userEmail: userProfile.userEmail,
  userAddress:userProfile.userAddress,
  userPhoneNumber: userProfile.userPhoneNumber,
 userGender: "Female",
 userQualification:userProfile.education[0].degree
    }




  return (
    <div className="py-10 max-w-[1340px] mx-auto">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-10 px-4">
        <div className='flex flex-col gap-8'>
          <ProfileCard profile={profile} />
          <div className=" bg-white rounded-lg shadow-md ">
          <AchievementsSection achievements={userProfile.Achievements} _id={userProfile._id}/>
          </div>

          <Skills initialSkills={userProfile.skills} _id={userProfile._id}/>

          {/* <Languages/> */}
        </div>
        <div className='grid grid-cols-1 gap-8'>
          {/* Additional content can be added here */}
         {/* <JobProfileTitle /> */}

<div className=" bg-white rounded-lg shadow-md ">


<EducationSection education={userProfile.education} _id={userProfile._id}/>
<hr className="border-black"/>
<WorkExperienceSection workExperiences={userProfile.work} _id={userProfile._id} />
<hr className="border-black"/>
<ProjectsSection projects={userProfile.projects} _id={userProfile._id}/>
<hr className="border-black"/>
<CertificationSection certifications={userProfile.certifications} _id={userProfile._id}/>
<hr className="border-black"/>
<SocialLinksSection socialLinks={userProfile.links} _id={userProfile._id}/>
</div>
        
        </div>
      </div>
      <ResumeButtons url={userProfile.resumeUrl} resumePdfKey={userProfile.resumePdfKey}
selectedResumeTemplate={userProfile.selectedResumeTemplate}/>
      {/* <TemplateSelector resumePdfKey={userProfile.resumePdfKey}
selectedResumeTemplate={userProfile.selectedResumeTemplate}

      /> */}
    </div>

    
  );
};

export default WrapperResume;
