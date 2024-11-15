"use client";

import  { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface DualAuthContextType {
  isPinqueryLoggedIn: boolean;
  isPintudeLoggedIn: boolean;
  loading: boolean;
  pinqueryLogin: (token: string) => void;
  pintudeLogin: (token: string) => void;
  pinqueryLogout: () => void;
  pintudeLogout: () => void;
}

const DualAuthContext = createContext<DualAuthContextType | undefined>(undefined);

export const DualAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPinqueryLoggedIn, setIsPinqueryLoggedIn] = useState(false);
  const [isPintudeLoggedIn, setIsPintudeLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state
  const router = useRouter();

  useEffect(() => {
    const pinqueryToken = Cookies.get("pinquery_token");
    const pintudeToken = Cookies.get("pintude_token");

    if (pinqueryToken) {
      validateAndSetPinqueryToken(pinqueryToken);
    } else if (pintudeToken) {
      validateAndSetPintudeToken(pintudeToken);
    } else {
      setLoading(false); // No token, so loading is complete
    }
  }, []);

  const validateAndSetPinqueryToken = (token: string) => {
    try {
      const pinquerySecret = process.env.NEXT_PUBLIC_PINQUERY_JWT_SECRET;
      if (!pinquerySecret) {
        console.error('Pinquery JWT secret is not defined in environment variables');
        handleInvalidPinqueryToken();
        setLoading(false); // Set loading to false if validation fails
        return;
      }

      jwt.verify(token, pinquerySecret);
      Cookies.set('pinquery_token', token);
      Cookies.remove('pintude_token');

      const decodedToken = jwtDecode<{ exp: number }>(token);
      if (Date.now() >= decodedToken.exp * 1000) {
        console.log('Pinquery token has expired');
        handleInvalidPinqueryToken();
      } else {
        setIsPinqueryLoggedIn(true);
      }
    } catch (error) {
      console.error('Error in validateAndSetPinqueryToken:', error);
      handleInvalidPinqueryToken();
    } finally {
      setLoading(false); // Ensure loading is set to false after validation
    }
  };

  const validateAndSetPintudeToken = (token: string) => {
    try {
      const pintudeSecret = process.env.NEXT_PUBLIC_PINTUDE_JWT_SECRET;
      if (!pintudeSecret) {
        console.error('Pintude JWT secret is not defined in environment variables');
        handleInvalidPintudeToken();
        setLoading(false);
        return;
      }

      jwt.verify(token, pintudeSecret);
      Cookies.set('pintude_token', token);
      Cookies.remove('pinquery_token');

      const decodedToken = jwtDecode<{ exp: number }>(token);
      if (Date.now() >= decodedToken.exp * 1000) {
        console.log('Pintude token has expired');
        handleInvalidPintudeToken();
      } else {
        setIsPintudeLoggedIn(true);
      }
    } catch (error) {
      console.error('Error in validateAndSetPintudeToken:', error);
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

  return (
    <DualAuthContext.Provider 
      value={{ 
        isPinqueryLoggedIn, 
        isPintudeLoggedIn, 
        loading, 
        pinqueryLogin, 
        pintudeLogin, 
        pinqueryLogout, 
        pintudeLogout 
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
