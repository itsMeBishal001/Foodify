// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAYPsYtCx0MSjRbwcVOhngyNxSTFvF9WA",
  authDomain: "foodify-f54b2.firebaseapp.com",
  projectId: "foodify-f54b2",
  storageBucket: "foodify-f54b2.appspot.com",
  messagingSenderId: "200566959492",
  appId: "1:200566959492:web:36c07330077fe02c0581d1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
export default app;