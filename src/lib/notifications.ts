"use client";
import { getMessaging, getToken, type Messaging } from 'firebase/messaging';
import { initializeApp } from 'firebase/app';
import Cookies from 'js-cookie';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

let app: ReturnType<typeof initializeApp>;
let messaging: Messaging;

if (typeof window !== 'undefined') {
  app = initializeApp(firebaseConfig);
  messaging = getMessaging(app);
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export async function requestNotificationPermission(): Promise<string | null> {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const permission = await Notification.requestPermission();
    console.log('Notification permission:', permission);
    if (permission === 'granted') {
      console.log('Notification permission granted');
      const fcmToken = await getToken(messaging, { 
        vapidKey: 'BOjxc-RrFJ6ddm-vq6N4jkL0Nc4jbikEpc8IAISFi4I6k2QSEmcxaVDxUC3cBUxHUQerMJelMR9AmMrnFfvpbD0' 
      });
      await sendFCMTokenToServer(fcmToken);
      console.log('FCM token:', fcmToken);
      return fcmToken;
    }
     else {
      console.log('Notification permission denied');
      return null;
    }
   
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return null;
  }
}

async function sendFCMTokenToServer(fcmToken: string): Promise<void> {
  try {
    const token = Cookies.get('pinquery_token');
    console.log("fcmToken", fcmToken);
    const response = await fetch(`${BASE_URL}/v1/profile/save-fcm-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ fcmToken, device: 'web' }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to save FCM token');
    }
    console.log('FCM token saved successfully');
  } catch (error) {
    console.error('Error saving FCM token:', error);
  }
}