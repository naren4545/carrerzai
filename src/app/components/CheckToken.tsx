"use client"
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDualAuth } from "@/context/AuthContext";

export default function CheckToken() {
  const router = useRouter();
    const searchParams = useSearchParams();
    const { 
        isPinqueryLoggedIn, 
        isPintudeLoggedIn, 
        pinqueryLogin,
        pintudeLogin,
        pinqueryLogout,
        pintudeLogout 
      } = useDualAuth();
    
    useEffect(() => {
        const pinqueryToken = searchParams.get("pinquery_token");
        const pintudeToken = searchParams.get("pintude_token");
        console.log("hii")
        if (pinqueryToken) {
          pinqueryLogin(pinqueryToken);
    
          // Remove pinquery token from the URL after login
          const newSearchParams = new URLSearchParams(searchParams.toString());
          newSearchParams.delete("pinquery_token");
          
          const newUrl = `${window.location.pathname}${
            newSearchParams.toString() ? `?${newSearchParams.toString()}` : ''
          }`;
          window.history.replaceState(null, "", newUrl);
        }
    
        if (pintudeToken) {
          pintudeLogin(pintudeToken);
    
          // Remove pintude token from the URL after login
          const newSearchParams = new URLSearchParams(searchParams.toString());
          newSearchParams.delete("pintude_token");
          
          const newUrl = `${window.location.pathname}${
            newSearchParams.toString() ? `?${newSearchParams.toString()}` : ''
          }`;
          window.history.replaceState(null, "", newUrl);
          console.log("hii pintude")
         
         
        }
      }, [searchParams, pinqueryLogin, pintudeLogin]);
      
      return<></>
}
