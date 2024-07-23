import { signInWithPopup } from 'firebase/auth';
import { auth, provider, db } from '../firebase';
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
        role: "user",
        photo: user.photoURL,
      });
    }
    return user;
  } catch (error) {
    console.error("Error signing in with Google:", error.message);
    throw error;
  }
};

export default signInWithGoogle;
