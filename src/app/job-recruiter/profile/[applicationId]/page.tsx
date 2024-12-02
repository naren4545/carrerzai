import React from 'react'
import Header from '../../components/header'
import Footer from '@/app/components/Footer'
import Wrapper from './components/Wrapper'
import Profile from '../components/Profilenav'
import Application from './components/ApplicationMobile'
export default function page() {
  return (
    <main>
      
   <Header/>
   <Profile/>
   <Wrapper/>
   <Application/>
   <Footer/>
    </main>
  )
}
