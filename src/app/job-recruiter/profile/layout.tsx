import React from 'react'
import Profile from './components/Profilenav'
import Header from '@/app/job-recruiter/components/header'
import Footer from '@/app/components/Footer'

export default function layout({ children }: any) {
  return (
    <div>
         <Header/>
      <Profile/>
      {children}
      <Footer/>
    </div>
  )
}
