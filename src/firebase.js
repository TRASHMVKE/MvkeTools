// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTPexP7RqOIWy8Y_PMAlKXioR0fGOdkJE",
  authDomain: "mvketools.firebaseapp.com",
  projectId: "mvketools",
  storageBucket: "mvketools.appspot.com",
  messagingSenderId: "951825691705",
  appId: "1:951825691705:web:30c4bdd010d941ed35c9e8"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export default firebase;