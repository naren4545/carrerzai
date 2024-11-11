// src/components/RedirectIfJobSeeker.tsx


import { redirect } from "next/navigation";



export default function RedirectIfJobSeeker( jobSekker:boolean) {
  if (jobSekker) {
    redirect("/job-seekers"); // Server-side redirect in the App Router
  }

  
}
