
import AchievementsSection from './AchievementsSection';
import CertificationSection from './CertificationSection';
import EducationSection from './EducationSection';
import JobProfileTitle from './JobProfileTitle';
import Languages from './language';
import ProfileCard from './profilrInfo';
import ProjectsSection from './ProjextSection';
import Skills from './Skills';
import SocialLinksSection from './SocialLinksSection';
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
  __v: number;
}

interface WrapperResumeProps {
  userProfile: UserProfile;
}

const WrapperResume: React.FC<WrapperResumeProps> = ({ userProfile }) => {

    const profile={

        _id: userProfile._id,
  userFirstName:userProfile.userFirstName ,
  userLastName: userProfile.userLastName,
  userEmail: userProfile.userEmail,
  userAddress:userProfile.userAddress,
  userPhoneNumber: userProfile.userPhoneNumber,
 userGender: "Female",
    
    }
  return (
    <div className="py-10 max-w-[1340px] mx-auto">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-10 px-4">
        <div className='flex flex-col gap-8'>
          <ProfileCard profile={profile} />
          <div className=" bg-white rounded-lg shadow-md ">
          <AchievementsSection achievements={userProfile.achievements}/>
          </div>

          <Skills/>

          <Languages/>
        </div>
        <div className='grid grid-cols-1 gap-8'>
          {/* Additional content can be added here */}
         <JobProfileTitle />

<div className=" bg-white rounded-lg shadow-md ">


<EducationSection education={userProfile.education}/>
<hr className="border-black"/>
<WorkExperienceSection workExperiences={userProfile.work} />
<hr className="border-black"/>
<ProjectsSection projects={userProfile.projects}/>
<hr className="border-black"/>
<CertificationSection certifications={userProfile.certifications}/>
<hr className="border-black"/>
<SocialLinksSection socialLinks={userProfile.links}/>
</div>
        
        </div>
      </div>
    </div>
  );
};

export default WrapperResume;
