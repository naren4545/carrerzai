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

// const firebaseConfig = {
//   apiKey: "AIzaSyCMdbpf26a8YvDdtKZUQ0rZxY_nS-pzyiM",
//   authDomain: "careerzai.firebaseapp.com",
//   projectId: "careerzai",
//   storageBucket: "careerzai.firebasestorage.app",
//   messagingSenderId: "1086371326888",
//   appId: "1:1086371326888:web:17f369b79b562fa938cb9d",
//   measurementId: "G-65V0B0X1Y3"
// };

// firebase.initializeApp(firebaseConfig);

// Retrieve Firebase Messaging object
const messaging = firebase.messaging();

// Handle push events
self.addEventListener('push', (event) => {
  console.log('[firebase-messaging-sw.js] Push event received.');
  
  const data = event.data.json();
  console.log(data);

  const options = {
    title:data.data?.title,
    body: data.data?.body,
    icon: data.data?.icon  ,
    image: data.data?.image ?? "",
    data: data.data?.url ?? "https://www.careerzai.com",  // Ensure data.url is taken from the correct field
    actions: [
      { action: 'open', title: 'Open Website' }
    ],
    vibrate: [200, 100, 200, 100, 200, 100, 200],
    badge: "",
    renotify: true,
    requireInteraction: true,
    tag: 'unique-tag'  // Ensure consistent tag to avoid duplicate notifications
  };

  event.waitUntil(
    self.registration.showNotification(data.data?.title, options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', function(event) {
  console.log('[firebase-messaging-sw.js] Notification click received.');
  event.notification.close();

  const notificationData = event.notification.data;
  event.waitUntil(
    clients.openWindow(notificationData) // Open the URL in the browser
  );
});
