"use client"

import { useDualAuth } from "@/context/AuthContext";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProfileComponent from "./components/ProfileComponent";
import ProfileForm from "./components/ProfileForm";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import ProfileSkeleton from "./components/ProfileSkeleton";
interface Profile {
  _id: string;
  name: string;

  email: string;
  location: string;
  userPhoneNumber: string;
  gender: string;
  
education: string;
  DOB: string;
}

interface ProfileCardProps {
  profile: Profile;
}
async function getProfile() {

    
}
export default  function page() {

const{isProfile,setIsProfile}=useDualAuth()
const [profile,setProfile]=useState<Profile | null>(null)
  const[loading,setLoading]=useState<boolean>(false)
useEffect(() => {

  const ProfileValidate = async (pinqueryToken: any) => {
   
setLoading(true)
    console.log(`Token: ${pinqueryToken}`);
    // Safely extract the value if the cookie exists

    if (!pinqueryToken){
      setLoading(false);

      return;
    } 
    // Select the appropriate endpoint based on token presence
    const endpoint = "https://www.careerzai.com/v1/profile";

    // Fetch the data with or without the token
    const res = await fetch(endpoint, {
      headers: {
        "Content-Type": "application/json",
        ...(pinqueryToken && { Authorization: `Bearer ${pinqueryToken}` }), // Attach token if it exists
      },
      cache: "no-store", // Ensures no caching
    });

    if (!res.ok) {
     
      
      return;
    }

    const data = await res.json();

    console.log(data);
setProfile(data);
   setLoading(false);
  };
  const pinqueryToken = Cookies.get("pinquery_token");


ProfileValidate(pinqueryToken);

}, []);



  return (
    <main>
    <Header/>
    {!isProfile && <ProfileForm setisProfile={setIsProfile}/>}
    {loading && <ProfileSkeleton/>}
    {isProfile && profile && <ProfileComponent profile={profile}/>}
    <Footer/>
      
    </main>
  )
}
