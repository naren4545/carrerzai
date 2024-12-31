"use client"

import { useDualAuth } from "@/context/AuthContext";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProfileComponent from "./components/ProfileComponent";
import ProfileForm from "./components/ProfileForm";

async function getProfile() {

    
}
export default  function page() {

const{isProfile,profile,setIsProfile}=useDualAuth()

  
console.log(profile)

  return (
    <main>
    <Header/>
    {isProfile? <ProfileComponent profile={profile}/>:<ProfileForm setisProfile={setIsProfile}/>}
    <Footer/>
      
    </main>
  )
}
