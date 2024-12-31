'use client';

import { useEffect } from 'react';
import { requestNotificationPermission } from '../lib/notifications';
import {  useDualAuth } from '@/context/AuthContext'; 
export default function NotificationPermission() {
  const {isPinqueryLoggedIn } = useDualAuth(); 

  useEffect(() => {
    const askPermission = async () => {
      if (isPinqueryLoggedIn ) { // Check if user is logged in
        const result = await requestNotificationPermission();
        if (result) {
          console.log('Notification permission granted. FCM token:', result);
        }
      }
    };

    askPermission();
  }, [isPinqueryLoggedIn]); // Add isLoggedIn to the dependency array

  return null; // This component doesn't render anything
}