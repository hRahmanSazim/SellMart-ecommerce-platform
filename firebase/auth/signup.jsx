import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";

export default async function signUp(email, password) {
  let result = null;

  result = createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      console.log(user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });

  return { result };
}
