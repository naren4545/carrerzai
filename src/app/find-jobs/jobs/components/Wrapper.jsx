import React from 'react'
import JobList from './JobsSection'
import { JobsProvider } from './UrlContex';
import HeroSection from './HeroSection'
export default function Wrapper() {
  return (
    <div><JobsProvider>
      <HeroSection/>
      <JobList/>
      
      </JobsProvider>
    </div>
  )
}
