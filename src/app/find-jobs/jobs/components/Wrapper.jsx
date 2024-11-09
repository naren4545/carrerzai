import React from 'react'
import JobList from './JobsSection'
import { JobsProvider } from './UrlContex';
import HeroSection from './HeroSection'
import { Suspense } from "react";
export default function Wrapper() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
      <JobsProvider>
      <HeroSection/>
      <JobList/>
      
      </JobsProvider>
      </Suspense>
    </div>
  )
}
