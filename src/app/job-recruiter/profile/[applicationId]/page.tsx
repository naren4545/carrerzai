"use client"
import Header from '../../components/header'
import Footer from '@/app/components/Footer'
import Wrapper from './components/Wrapper'
import Profile from '../components/Profilenav'
import Application from './components/ApplicationMobile'
import { useRouter } from 'next/router'
import { usePathname } from 'next/navigation'
export default function page() {
  const pathname = usePathname();

  // Extract 'applicationId' from the pathname
  const parts = pathname.split('/');
  const applicationId = parts[parts.length - 1]; 
  return (
    <main>
      
   <Header/>
   <Profile/>
   <Wrapper id={applicationId}/>
   <Application id={applicationId}/>
   <Footer/>
    </main>
  )
}
