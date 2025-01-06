   
import Footer from "../components/Footer";
import Header from "../components/Header";

import JobApplications from "./components/Applications";




export default async function page() {

  return (
    <main>
      <Header/>

      <JobApplications />
      
      <Footer/>
    </main>
  )
}
