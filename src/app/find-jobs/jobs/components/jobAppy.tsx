"use client";
import Cookies from "js-cookie";
import axios from "axios";

 
import { useToast } from "@/hooks/use-toast"
import { useState } from "react";


export default function JobAppy({applied,id}:{applied:boolean;id:string}) {
const [appliedJob,setAppliedJob]=useState(applied)
    const { toast } = useToast()
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
        toast({
          variant: "default",
          title: "Appliy job failed",
          description: "please try again",
        });
      }
  
    }

  return (
    <div>
      <button type='button' {...{disabled: appliedJob}} className="bg-blue-600 w-full text-white px-7 py-2 rounded" onClick={handelAppy}>
        {  appliedJob?"Applied":"   Apply"}
          </button>
    </div>
  )
}
