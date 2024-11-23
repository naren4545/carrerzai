import React from 'react'
import Header from '../../components/header'
import Footer from '@/app/components/Footer'
import Wrapper from './components/Wrapper'
import Profile from '../components/Profilenav'
export default function page() {
  return (
    <main>
      
   <Header/>
   <Profile/>
   <Wrapper/>
   <Footer/>
    </main>
  )
}
