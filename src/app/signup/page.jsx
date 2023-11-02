"use client";
import signUp from "../../../firebase/auth/signup";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Flex, Paper, Text, Button, TextInput } from "@mantine/core";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase/firebase.config";
import GoogleSignIn from "../../../components/GoogleSignIn";
import { auth } from "../../../firebase/firebase.config";

export default function Signup() {
  // const [authUser, setAuthUser] = useState(null);

  // onAuthStateChanged(auth, (user) => {
  //   setAuthUser(user);
  // });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // const usersCollectionRef = collection(db, "users");
  const router = useRouter();
  const handleForm = async (event) => {
    try {
      event.preventDefault();
      const fullname = `${firstName} ${lastName}`;
      signUp(email, password, fullname);
      // const { result } = await signUp(email, password, fullname);
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    if (auth.currentUser) {
      const createUser = async () => {
        await setDoc(doc(db, "users", auth.currentUser.uid), {
          displayName: auth.currentUser.displayName,
          email: auth.currentUser.email,
          uid: auth.currentUser.uid,
          avatar: `https://www.gravatar.com/avatar/${auth.currentUser.uid}?d=robohash`,
          createdAt: serverTimestamp(),
        });
      };
      createUser();
      router.push("/");
    }
  }, []);

  return (
    <Flex mih={"100%"} justify="center" align="center" direction="row">
      <Paper shadow={"xl"} radius="lg" withBorder w={"auto"} p={"6rem"}>
        {auth.currentUser === null ? (
          <form onSubmit={handleForm}>
            <Flex direction={"column"} gap="md" justify={"center"} w={"25rem"}>
              <TextInput
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
                required
                type="email"
                name="email"
                id="email"
                placeholder="example@mail.com"
                radius="md"
                variant="filled"
                size="lg"
              />

              <TextInput
                onChange={(e) => setFirstName(e.target.value)}
                label="First Name"
                required
                type="text"
                name="firstName"
                id="firstName"
                placeholder="First Name..."
                radius="md"
                variant="filled"
                size="lg"
              />
              <TextInput
                onChange={(e) => setLastName(e.target.value)}
                label="Last Name"
                required
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last Name..."
                radius="md"
                variant="filled"
                size="lg"
              />

              <TextInput
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
                name="password"
                id="password"
                placeholder="password"
                radius="md"
                variant="filled"
                size="lg"
              />

              <Flex direction="column" gap={"md"} pt={"lg"}>
                <Button type="submit" size="lg" bg={"#8B85C1"} c={"#1F271B"}>
                  Sign up
                </Button>

                <Flex direction="row" justify={"space-between"}>
                  <Text size="xl" pt={"0.3rem"}>
                    Already registered? Login here:
                  </Text>
                  <Button size="md" bg={"#ffcfd2"} c={"#370617"}>
                    <Link href={"/signin"}>Sign in</Link>
                  </Button>
                </Flex>
                <Flex justify={"center"}>
                  <GoogleSignIn />
                </Flex>
              </Flex>
            </Flex>
          </form>
        ) : (
          <Flex
            justify={"center"}
            direction={"column"}
            align={"center"}
            gap={"lg"}
          >
            <Text>You are currently logged in!!</Text>
            <Text>Please logout before trying to sign in!</Text>
            <Link href="/">
              <Button bg={"#EEEEEE"} c={"#FB5404"}>
                Go back to mainpage
              </Button>
            </Link>
          </Flex>
        )}
      </Paper>
    </Flex>
  );
}
