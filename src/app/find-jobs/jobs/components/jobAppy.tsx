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
          title: "Applied Successfully",
          description: "Friday, February 10, 2023 at 5:57 PM",
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

  return (
    <div>
      <button type='button' {...{disabled: appliedJob}} className="bg-blue-600 w-full text-white px-7 py-2 rounded" onClick={handelAppy}>
        {  appliedJob?"Applied":"   Apply"}
          </button>
    </div>
  )
}
