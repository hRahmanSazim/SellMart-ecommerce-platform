import React from "react";
// import GoogleButton from "react-google-button";
import { auth } from "../firebase/firebase.config";
import { provider } from "../firebase/firebase.config";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithRedirect,
} from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { Button } from "@mantine/core";
import { serverTimestamp, setDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
const GoogleSignIn = () => {
  const router = useRouter();
  const googleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        const createUser = async () => {
          await setDoc(doc(db, "users", user.uid), {
            displayName: user.displayName,
            email: user.email,
            uid: user.uid,
            avatar: `https://www.gravatar.com/avatar/${user.uid}?d=robohash`,
            createdAt: serverTimestamp(),
          });

          // IdP data available using getAdditionalUserInfo(result)
        };
        createUser();
        router.push("/");
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
    // signInWithRedirect(auth, provider);
  };
  return (
    <Button onClick={googleSignIn}>
      Sign in with <FcGoogle size={"1.5rem"} />
    </Button>
  );
};

export default GoogleSignIn;
