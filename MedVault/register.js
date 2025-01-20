
//   // Import the functions you need from the SDKs you need
//   import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
//   // TODO: Add SDKs for Firebase products that you want to use
//   // https://firebase.google.com/docs/web/setup#available-libraries
//   import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth-compat.js";
//   // Your web app's Firebase configuration
//   const firebaseConfig = {
//     apiKey: "AIzaSyC5JLvPzsgav5U5dv3eLy511WodcTwCxk8",
//     authDomain: "medvault-3ab45.firebaseapp.com",
//     projectId: "medvault-3ab45",
//     storageBucket: "medvault-3ab45.firebasestorage.app",
//     messagingSenderId: "769455123364",
//     appId: "1:769455123364:web:640ec301531a298779af31"
//   };

//   // Initialize Firebase
//   const app = initializeApp(firebaseConfig);

  

//   //submit button
//   const submit= document.getElementById('submit');
//   submit.addEventListener("click",function(event){
// event.preventDefault();

// //inputs
// const email=document.getElementById("email").value;
// const password= document.getElementById('password').value;

// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed up 
//     const user = userCredential.user;
//     alert("Creating Account...")
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     alert(errormessage);
//     // ..
//   });

//   })
