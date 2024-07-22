// signInWithGoogle.js
import { signInWithPopup } from 'firebase/auth';
import { auth, provider, db } from '../firebase'; // Adjust the path if needed
import { setDoc, doc } from 'firebase/firestore';

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    if (user) {
      await setDoc(doc(db, "Users", user.uid), {
        email: user.email,
        firstName: user.displayName.split(' ')[0],
        lastName: user.displayName.split(' ')[1],
        role: "user", // default role, you can adjust as needed
        photo: user.photoURL,
      });
    }

    console.log("User signed in with Google:", user);
    return user;
  } catch (error) {
    console.error("Error signing in with Google:", error.message);
    throw error;
  }
};

export default signInWithGoogle;
