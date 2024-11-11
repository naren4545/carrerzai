
import JobsMainContent from './JobsMainContent'
import JobDetails from './JobDetails'
import SkillTags from './SkillTag'
import JobRequirements from './JobRequirements'
import CompanyInfo from './CompanyInfo'
import Buttons from './Buttons'
import BackButon from './BackButon'

export default async function JobRender({ job }: { job: any }) {

    

    // Extract the job parameter from the pathname
    


console.log(job)
  return (
    <div className='p-3'>
        <div className='max-w-[1400px] mx-auto'>

            <BackButon/>
        </div>
        <h1 className='text-center md:text-4xl text-sm py-5 pb-10'>{job.title}</h1>
    <div className='max-w-[1136px] mx-auto border rounded-lg  shadow-md '>
    <JobsMainContent job={job}/>
    <JobDetails openings={2} about='We are seeking a dynamic Associate Director, IT Change Manager to lead 
and oversee strategic IT change initiatives across the organization. In this 
role, you will be responsible for managing the entire change lifecycle, 
ensuring successful adoption and implementation of IT projects, and 
aligning them with business goals.' applicants={3} responsibilities={["dwdwd","dwdwd"]} />
   <SkillTags skills={job.skillTags}/>
   <JobRequirements experience="Any Experience" education="B.Sc. CS or Related Field"/>
   <CompanyInfo website='company’s website if any' name='Company Name' address='Shop No. 12, R-15, Sector 3, Near Gomti Nagar Railway Station, Gomti Nagar, 
Lucknow, Uttar Pradesh, PIN Code: 226010, India' />
<Buttons/>
    </div>
    </div>
  )
}
