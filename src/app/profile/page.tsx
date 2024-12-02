import Footer from "../components/Footer";
import Header from "../components/Header";
import ProfileComponent from "./components/ProfileComponent";
import { cookies } from "next/headers";
async function getProfile() {

    
}
export default async function page() {



    const cookieStore = await cookies(); // No need to use await, it's synchronous
    const cookie = cookieStore.get("pinquery_token"); // Get the cookie object
  
    const pinqueryToken = cookie?.value; // Safely extract the value if the cookie exists
  
    console.log(`Token: ${pinqueryToken}`);
  
    // Select the appropriate endpoint based on token presence
    const endpoint = "https://www.careerzai.com/v1/profile"
      
  
    // Fetch the data with or without the token
    const res = await fetch(endpoint, {
      headers: {
        "Content-Type": "application/json",
        ...(pinqueryToken && { Authorization: `Bearer ${pinqueryToken}` }), // Attach token if it exists
      },
      cache: "no-store", // Ensures no caching
    });
  
    if (!res.ok) {
      throw new Error(`Error fetching data: ${res.statusText}`);
    }
  
    const data = await res.json();


console.log(data)

const profile={

    _id: data.resume._id,
    DOB:data.DOB,
userFirstName:data.resume.userFirstName ,
userLastName: data.resume.userLastName,
userEmail: data.resume.userEmail,
userAddress:data.resume.userAddress,
userPhoneNumber: data.resume.userPhoneNumber,
userGender: "Female",
userQualification:data.resume.education[0].degree
}


  return (
    <main>
    <Header/>
    <ProfileComponent profile={profile}/>
    <Footer/>
      
    </main>
  )
}
