
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
// import firebase from "firebase/compat";

importScripts('https://www.gstatic.com/firebasejs/9.9.3/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.9.3/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.

firebase.initializeApp({
  projectId: 'wtf-pub',
  appId: '1:791303322884:web:d8a49b63278f83a92c2451',
  storageBucket: 'wtf-pub.appspot.com',
  locationId: 'us-central',
  apiKey: 'AIzaSyCtgI_HMRDn5ZFluNnLDEZV6jmM1h15ujk',
  authDomain: 'wtf-pub.firebaseapp.com',
  messagingSenderId: '791303322884',
  measurementId: 'G-YJS1NWM7B5',
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
// const messaging = firebase.messaging();
   const messaging = firebase.messaging()
