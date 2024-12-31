// Import Firebase scripts for messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Firebase configuration object
firebase.initializeApp({
  apiKey: "AIzaSyCMdbpf26a8YvDdtKZUQ0rZxY_nS-pzyiM",
  authDomain: "careerzai.firebaseapp.com",
  projectId: "careerzai",
  storageBucket: "careerzai.firebasestorage.app",
  messagingSenderId: "1086371326888",
  appId: "1:1086371326888:web:17f369b79b562fa938cb9d",
  measurementId: "G-65V0B0X1Y3"
});

// Retrieve Firebase Messaging object
const messaging = firebase.messaging();

// Handle push events
self.addEventListener('push', (event) => {
  console.log('[firebase-messaging-sw.js] Push event received.');

  const data = event.data.json();
  console.log("Data:", data);

  const notificationTitle = data?.notification.title || 'Default title';
  const notificationBody = data?.notification.body || 'Default body';
  const notificationIcon = data.data?.icon || 'imgplaceholder.png';
  const notificationImage = data.data?.image || 'imgplaceholder.png';
  const notificationUrl = data.data?.url || 'https://www.careerzai.com';

  const options = {
    body: notificationBody ,
    icon: notificationIcon ?? 'imgplaceholder.png',
    image: notificationImage ?? "imgplaceholder.png",  // Ensure data.image is taken from the correct field
    data: { url: notificationUrl } ?? "https://www.careerzai.com",  // Ensure data.url is taken from the correct field
    actions: [ 
      { action: 'open', title: 'Open Website' }
    ],
    vibrate: [200, 100, 200, 100, 200, 100, 200],
    badge: "imgplaceholder.png",
    renotify: true,
    requireInteraction: true,
    tag: 'unique-tag'  // Ensure consistent tag to avoid duplicate notifications
  };

  event.waitUntil(
    self.registration.showNotification(notificationTitle, options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', function(event) {
  console.log('[firebase-messaging-sw.js] Notification click received.');
  event.notification.close();

  const notificationData = event.notification.data;
  event.waitUntil(
    clients.openWindow(notificationData.url) // Open the URL in the browser
  );
});