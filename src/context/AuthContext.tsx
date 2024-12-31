"use client";

import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { usePathname, useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface DualAuthContextType {
  isPinqueryLoggedIn: boolean;
  isPintudeLoggedIn: boolean;
  loading: boolean;
  pinqueryLogin: (token: string) => void;
  pintudeLogin: (token: string) => void;
  pinqueryLogout: () => void;
  pintudeLogout: () => void;
  setIsProfile: (isProfile: boolean) => void;
  isProfile: boolean;
  profile: any;
  resume: any;
  setProfile: (profile: any) => void;
  setIsResume: (isResume: boolean) => void;
  isResume: boolean;
}

const DualAuthContext = createContext<DualAuthContextType | undefined>(
  undefined
);

export const DualAuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isPinqueryLoggedIn, setIsPinqueryLoggedIn] = useState(false);
  const [isPintudeLoggedIn, setIsPintudeLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state

  const [isProfile, setIsProfile] = useState(true);
  const [isResume, setIsResume] = useState(true);
  const [profile, setProfile] = useState({});
  const [resume, setResume] = useState({});
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchData = async() => {
      try {
        let pinqueryToken = await Cookies.get("pinquery_token");
       let pintudeToken = Cookies.get("pintude_token");

 // Retry if tokens are not immediately available
 const maxRetries = 5; // Number of retries
 let retries = 0;

 while (!pinqueryToken && !pintudeToken && retries < maxRetries) {
   await new Promise((resolve) => setTimeout(resolve, 500)); // Wait 500ms before retry
   pinqueryToken = Cookies.get("pinquery_token");
   pintudeToken = Cookies.get("pintude_token");
   retries++;
 }



        if (pinqueryToken) {
         await validateAndSetPinqueryToken(pinqueryToken);
          await ProfileValidate(pinqueryToken);
          // Assuming this is also async
          // Call the async function here
        } else if (pintudeToken) {
          validateAndSetPintudeToken(pintudeToken); // Assuming this is also async
        } else {
          console.log("No token found");
        }
      } catch (error: any) {
        console.error("Error:", error.message);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchData(); // Call the inner async function
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  // useEffect(() => {
  //   async function fetchData() {
  //     await ProfileValidate();
  //   }
  //   console.log("isProfile", isProfile);
  //   fetchData();
  // }, []);

  useEffect(() => {
    async function fetchData() {
      await resumeValidate();
    }
    fetchData();
  }, [isProfile]);

  const resumeValidate = async () => {
    if (isProfile === false) return;
    const cookies = document.cookie;

    // Extract the `pinquery_token` cookie value
    const pinqueryToken = cookies
      .split("; ")
      .find((row) => row.startsWith("pinquery_token="))
      ?.split("=")[1]; // Get the value after '='

    console.log(`Token: ${pinqueryToken}`);
    // Safely extract the value if the cookie exists

    if (!pinqueryToken) return;
    // Select the appropriate endpoint based on token presence
    const endpoint = "https://www.careerzai.com/v1/resume/user";

    const res = await fetch(endpoint, {
      headers: {
        "Content-Type": "application/json",
        ...(pinqueryToken && { Authorization: `Bearer ${pinqueryToken}` }), // Attach token if it exists
      },
      cache: "no-store", // Ensures no caching
    });
    const data = await res.json();
    console.log("Resume data:", data);
    if (res.status === 200) {
       // Parse the response body
      setIsResume(true);
      setResume(data.data); // Store the resume data in the state
      
    } else {
      setIsResume(false);
      router.push("/resume");
    }
  };

  const ProfileValidate = async (pinqueryToken: string) => {
   

    console.log(`Token: ${pinqueryToken}`);
    // Safely extract the value if the cookie exists

    if (!pinqueryToken) return;
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
      setIsProfile(false);
      console.log("hii from profile");
      router.push("/profile");
      return;
    }

    const data = await res.json();

    console.log(data);

    setIsProfile(true);
    setProfile(data);
  };

  const validateAndSetPinqueryToken = (token: string) => {
    try {
      const pinquerySecret = process.env.NEXT_PUBLIC_PINQUERY_JWT_SECRET;
      if (!pinquerySecret) {
        console.error(
          "Pinquery JWT secret is not defined in environment variables"
        );
        handleInvalidPinqueryToken();
        setLoading(false); // Set loading to false if validation fails
        return;
      }

      jwt.verify(token, pinquerySecret);
      Cookies.set("pinquery_token", token);
      Cookies.remove("pintude_token");

      const decodedToken = jwtDecode<{ exp: number }>(token);
      if (Date.now() >= decodedToken.exp * 1000) {
        console.log("Pinquery token has expired");
        handleInvalidPinqueryToken();
      } else {
        setIsPinqueryLoggedIn(true);
      }
    } catch (error) {
      console.error("Error in validateAndSetPinqueryToken:", error);
      handleInvalidPinqueryToken();
    } finally {
      setLoading(false); // Ensure loading is set to false after validation
    }
  };

  const validateAndSetPintudeToken = (token: string) => {
    try {
      const pintudeSecret = process.env.NEXT_PUBLIC_PINTUDE_JWT_SECRET;
      if (!pintudeSecret) {
        console.error(
          "Pintude JWT secret is not defined in environment variables"
        );
        handleInvalidPintudeToken();
        setLoading(false);
        return;
      }

      jwt.verify(token, pintudeSecret);
      Cookies.set("pintude_token", token);
      Cookies.remove("pinquery_token");

      const decodedToken = jwtDecode<{ exp: number }>(token);
      if (Date.now() >= decodedToken.exp * 1000) {
        console.log("Pintude token has expired");
        handleInvalidPintudeToken();
      } else {
        console.log("Pintude token is valid");
        setIsPintudeLoggedIn(() => {
          return true;
        });
        setTimeout(() => {
          if (!pathname.includes("/job-recruiter")) {
            router.push("/job-recruiter");
          }
        }, 100);
      }
    } catch (error) {
      console.error("Error in validateAndSetPintudeToken:", error);
      handleInvalidPintudeToken();
    } finally {
      setLoading(false);
    }
  };

  const handleInvalidPinqueryToken = () => {
    Cookies.remove("pinquery_token");
    setIsPinqueryLoggedIn(false);
    router.push("/");
  };

  const handleInvalidPintudeToken = () => {
    Cookies.remove("pintude_token");
    setIsPintudeLoggedIn(false);
    router.push("/");
  };

  const pinqueryLogin = (token: string) => {
    validateAndSetPinqueryToken(token);
  };

  const pintudeLogin = (token: string) => {
    validateAndSetPintudeToken(token);
  };

  const pinqueryLogout = () => {
    handleInvalidPinqueryToken();
  };

  const pintudeLogout = () => {
    handleInvalidPintudeToken();
  };
  console.log(isProfile);
  return (
    <DualAuthContext.Provider
      value={{
        isPinqueryLoggedIn,
        isPintudeLoggedIn,
        loading,
        pinqueryLogin,
        pintudeLogin,
        pinqueryLogout,
        pintudeLogout,
        setIsProfile,
        isProfile,
        profile,
        setProfile,
        setIsResume,
        isResume,
        resume
      }}
    >
      {children}
    </DualAuthContext.Provider>
  );
};

export const useDualAuth = () => {
  const context = useContext(DualAuthContext);
  if (!context) {
    throw new Error("useDualAuth must be used within a DualAuthProvider");
  }
  return context;
};
