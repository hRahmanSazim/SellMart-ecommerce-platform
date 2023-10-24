import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase.config";

export default function signUp(email, password, fullname) {
  // let result = null;
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      updateProfile(auth.currentUser, {
        displayName: fullname,
      });
    })
    .catch((error) => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      console.error(error);
    });
}
