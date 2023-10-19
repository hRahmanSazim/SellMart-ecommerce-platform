"use client";
import React, { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../firebase.config";
import { Text } from "@mantine/core";

// const user = auth.currentUser.avatar;
const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);
  onAuthStateChanged(auth, (user) => {
    setAuthUser(user);
    console.log(user);
  });

  return (
    <div>
      {/* {authUser ? <Text>{authUser.email}</Text> : <Text>{`Signed Out`}</Text>} */}
      {authUser ? true : false}
    </div>
  );
};

export default AuthDetails;
