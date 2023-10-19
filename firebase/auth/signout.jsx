"use client";
import { signOut } from "firebase/auth";
import { Button } from "@mantine/core";
import { auth } from "../firebase.config";
export const SignOut = () => {
  const signout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <Button bg={"dark"} onClick={signout}>
      Sign Out
    </Button>
  );
};
