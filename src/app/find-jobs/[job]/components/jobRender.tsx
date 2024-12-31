
import JobsMainContent from './JobsMainContent'
import JobDetails from './JobDetails'
import SkillTags from './SkillTag'
import JobRequirements from './JobRequirements'
import CompanyInfo from './CompanyInfo'
import Buttons from './Buttons'
import BackButon from './BackButon'

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
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
    <JobDetails openings={job.openings} about={job.description} applicants={job.numberOfApplicants} responsibilities={job.keyResponsibilities} views={job.numberOfViews} />
   <SkillTags skills={job.skillTags}/>
   <JobRequirements experience={job.experience} education={job.requirements}/>
   <CompanyInfo website={job.companyWebsite} name={job.company} address={job.location} />
<Buttons id={job._id} applied={job.applied}/>
    </div>
    </div>
  )
}
