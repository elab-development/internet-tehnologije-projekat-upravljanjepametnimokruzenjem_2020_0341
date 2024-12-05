// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: 'smarthome-35a7e.firebaseapp.com',
  projectId: 'smarthome-35a7e',
  storageBucket: 'smarthome-35a7e.appspot.com',
  messagingSenderId: '572459539455',
  appId: '1:572459539455:web:867cd5546cfa3958f965ca',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);