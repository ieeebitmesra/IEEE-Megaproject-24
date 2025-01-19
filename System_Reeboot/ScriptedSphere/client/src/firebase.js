// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "scriptedsphere.firebaseapp.com",
  projectId: "scriptedsphere",
  storageBucket: "scriptedsphere.firebasestorage.app",
  messagingSenderId: "315631888258",
  appId: "1:315631888258:web:581e0d230d2981bb4c119b",
  measurementId: "G-Z03F6NJCVL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);


// import { initializeApp } from "firebase/app";

const firebaseConfig2 = {
  apiKey:"AIzaSyBrQqZ-ZShEzsp2pQRjuFUqZeeNiH_I_A4",
  authDomain: "estateconnect-e3548.firebaseapp.com",
  projectId: "estateconnect-e3548",
  storageBucket: "estateconnect-e3548.appspot.com",
  messagingSenderId: "679140514782",
  appId: "1:679140514782:web:5d0417138e56775b6f5b4f",
  measurementId: "G-8RJ9GMJLGL"
};

export const app2 = initializeApp(firebaseConfig2, "secondaryApp");