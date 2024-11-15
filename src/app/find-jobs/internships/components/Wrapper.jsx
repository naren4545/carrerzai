
import JobList from './JobsSection'

import HeroSection from './HeroSection'
import { Suspense } from "react";


async function fetchData(searchParams) {
  // Assuming there's a search param in the URL you want to fetch data based on
  const location = await searchParams?.location || '';
  const page = await searchParams?.page || '';
  const skilltag = await searchParams?.skilltag || '';
console.log(page+" text")
  const response = await fetch(`https://www.careerzai.com/v1/job/filtered?location=${location}&page=${page}&skilltag=${skilltag}&limit=10`, {
    cache: 'no-store',
  });
  const data = await response.json();

  return data;
}



export default async function Wrapper({searchParams}) {
  let loading = true;


const {jobs,currentPage,totalPages}=await fetchData(searchParams);
 loading = false;

  return (
    <div>
    
     
      <HeroSection/>
      <JobList jobs={jobs} page={currentPage} totalPages={totalPages } loading={loading}/>
      
      
      
    </div>
  )
}
