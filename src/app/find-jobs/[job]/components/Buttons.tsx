
"use client";
import Cookies from "js-cookie";
import axios from "axios";

 
import { useToast } from "@/hooks/use-toast"

import { Button } from "@/components/ui/button"
import { ToastAction } from "@/components/ui/toast"
import { useState } from "react";
export default function Buttons({id,applied}:{id:string;applied:boolean}) {
  const { toast } = useToast()
  const [appliedJob,setAppliedJob]=useState(applied)
  async function  handelAppy ()  {
    const pinqueryToken = Cookies.get("pinquery_token");
    console.log(pinqueryToken)

    if(!pinqueryToken){ 
      
      toast({
        variant: "destructive",
        title: "Login Required",
        description: "please login to apply jobs",
      });
      return
    }


    try {
     const response = await axios.post(
        `https://www.careerzai.com/v1/application/${id}`,
        {}, // Empty body as no data is required
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${pinqueryToken}`, // Token added to the Authorization header
          },
        }
      );


      toast({
        variant: "default",
        title: "Application Submitted Successfully",
        description: "Your job application has been received and is under review.",
      });
setAppliedJob(true)
      return response.data;
      








     












    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`API Error: ${error.response?.data || error.message}`);
      }
      throw error;
    }

  }

  return (  <div className='p-6 py-16'>
      <div className="flex flex-row justify-center  gap-3 md:text-2xl text-sm">
         
          <button onClick={handelAppy} disabled={appliedJob} type='button' className="bg-blue-600 md:min-w-[250px] min-w-[127px] text-white px-7 py-2 rounded">
          {  appliedJob ? "Applied" : "Apply Now"}
          </button>
        </div>
    </div>
  )
}
