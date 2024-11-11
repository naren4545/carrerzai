import Header from "../../components/Header";
import JobRender from "./components/jobRender";
import Footer from "../../components/Footer";
import ProTipsSection from "@/app/components/ProTips";

interface JobPageProps {
    params: any;
  }
  
  const JobPage =async ({ params }: JobPageProps) => {
    const { job } = params;
    const res=await fetch(`https://www.careerzai.com/v1/job/${job}`)
    const data=await res.json()
    return (
        <>
        <Header/>
      <div className="py-10">
        
        <JobRender job={data}/>
      </div>
      <ProTipsSection/>
      <Footer/>
      </>
    );
  };
  
  export default JobPage;