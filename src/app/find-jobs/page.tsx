
import Header from '../components/Header'
import HeroSection from './component/HeroSection'
import ExploreRoles from './component/ExploreRole'
import JobsGrid from './component/JobsGrid'
import ProfileStart from './component/ProfileStart'
import Footer from '../components/Footer'

export default function page() {
  return (
    <main>
   <Header/>
   <HeroSection/>
   <ExploreRoles/>
   <JobsGrid/>
   <ProfileStart/>
   <Footer/>
    </main>
  )
}