import ApplicationDeadline from "./ApplicationDeadline";
import { FormProvider } from "./FormContext";
import JobDetails from "./JobDetails";
import JobRequirement from "./JobRequirement";
import JobTiming from "./JobTiming";
import OpportunityType from "./OpportunityType";
import ResponsibilitiesInput from "./ResponsibilitiesInput";
import SalaryAndPerks from "./SalaryAndPerks";
import SkillsInput from "./SkillsInput";


export default function WrapperPostJob(){
  return (
    <section className="py-10">
      <div className=" py-1 max-w-[1340px] mx-auto  p-4">
        <div className="text-center ">
        <h1 className="md:text-5xl text-xl md:leading-[72px] font-semibold">Post Internship / Job</h1>
         
          </div>

          <FormProvider>
<div className=" shadow-xl   rounded-xl max-w-[1118px] mx-auto">
  
            <OpportunityType/>
            <hr className="border-black"/>
            <JobDetails/>
            <hr className="border-black"/>
            <JobRequirement/>
            <hr className="border-black"/>
            <SkillsInput/>
            <hr className="border-black"/>
            <ResponsibilitiesInput/>
            <hr className="border-black"/>
            <JobTiming/>
            <hr className="border-black"/>
            <SalaryAndPerks/>
            <hr className="border-black"/>
            <ApplicationDeadline/>
            </div>
            
          </FormProvider>
          </div>
    </section>
  )
}
