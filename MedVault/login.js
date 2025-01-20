import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  FacebookAuthProvider 
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5JLvPzsgav5U5dv3eLy511WodcTwCxk8",
  authDomain: "medvault-3ab45.firebaseapp.com",
  projectId: "medvault-3ab45",
  storageBucket: "medvault-3ab45.firebasestorage.app",
  messagingSenderId: "769455123364",
  appId: "1:769455123364:web:640ec301531a298779af31",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider(); // Google Auth provider
const facebookProvider = new FacebookAuthProvider(); // Facebook Auth provider

// Login with Email/Password
const loginButton = document.getElementById("login-button");
loginButton.addEventListener("click", (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Login successful!");
      // Redirect to a dashboard or home page
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
});

// Login with Google
const googleButton = document.getElementById("google-button");
googleButton.addEventListener("click", () => {
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      const user = result.user;
      alert(`Welcome ${user.displayName}!`);
      // Redirect to a dashboard or home page
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
});

// Login with Facebook
const facebookButton = document.getElementById("facebook-button");
facebookButton.addEventListener("click", () => {
  signInWithPopup(auth, facebookProvider)
    .then((result) => {
      const user = result.user;
      alert(`Welcome ${user.displayName}!`);
      // Redirect to a dashboard or home page
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
});
