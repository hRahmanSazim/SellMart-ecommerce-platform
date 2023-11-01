"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Center, Flex, Text, Paper, Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { auth, db } from "../../../../firebase/firebase.config";
import Link from "next/link";
import UserProductList from "../../../../components/UserProductList";
import UploadProduct from "../../../../components/UploadProduct";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../../../../firebase/firebase.config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { PiUserSwitchFill } from "react-icons/pi";

export default function Dashboard() {
  const router = useRouter();
  const params = useParams();
  const [user, setUser] = useState();
  const [imageUpload, setImageUpload] = useState();
  const [imageUrl, setImageUrl] = useState();
  const userRef = doc(db, "users", `${params.id}`);
  const [showAvatarBtn, setShowAvatarBtn] = useState(false);
  useEffect(() => {
    const getData = async () => {
      const userSnap = await getDoc(userRef);
      const userData = userSnap.data();
      setUser(userData);
    };
    getData();
  }, []);
  useEffect(() => {
    const change = async () => {
      if (imageUrl) {
        await changeAvatar();
      }
    };
    change();
  }, [imageUrl]);

  const uploadImage = async () => {
    if (imageUpload != null) {
      const imageRef = ref(
        storage,
        `users/${params.id}/${imageUpload.name + uuidv4().slice(4, 8)}`
      );
      uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImageUrl(url);
        });
      });
    }
  };
  const changeAvatar = async () => {
    await setDoc(
      userRef,
      {
        avatar: imageUrl,
      },
      { merge: true }
    );
    router.refresh();
  };
  const handleAvatar = async (event) => {
    event.preventDefault();
    await uploadImage();
  };
  const showChangebutton = () => {
    setShowAvatarBtn(!showAvatarBtn);
  };
  return (
    <Flex w={"100%"} h={"100vh"} justify={"center"} align={"center"}>
      {auth.currentUser !== null ? (
        <Flex w={"80%"} h={"80%"}>
          <Flex w={"33%"} h={"100%"} justify={"center"} align={"center"}>
            <Flex h={"55%"} w={"50%"} direction={"column"}>
              <Flex h={"60%"} w={"100%"}>
                <Paper shadow="xl" withBorder radius={"xl"}>
                  {user && user.avatar ? (
                    <Image
                      alt="user_image"
                      src={user?.avatar}
                      width={260}
                      height={250}
                    />
                  ) : (
                    <Flex>No avatar available</Flex>
                  )}
                </Paper>
              </Flex>
              <Center>
                <Flex direction={"column"} m={"lg"}>
                  <Flex direction={"row"} justify={"center"} align={"center"}>
                    <Text size="1.5rem" c={"#6A2C70"}>
                      {user?.displayName}
                    </Text>
                  </Flex>
                  <Flex mt={"1rem"} c={"#3F72AF"}>
                    {user?.email}
                  </Flex>
                </Flex>
              </Center>

              <Flex direction="column" align={"center"} pb={"md"}>
                {!showAvatarBtn && (
                  <Button
                    onClick={showChangebutton}
                    bg={"#810CA8"}
                    // c={"#6B728E"}
                    radius={"xl"}
                    pr={"xs"}
                  >
                    <Text size="1.2rem" pr={"xs"}>
                      Change
                    </Text>
                    <PiUserSwitchFill size={"xl"} />
                  </Button>
                )}

                {showAvatarBtn && (
                  <Flex gap={"md"}>
                    <label htmlFor="input" color="#1F6E8C">
                      Change Avatar:
                    </label>
                    <input
                      type="file"
                      onChange={(event) => {
                        setImageUpload(event.target.files[0]);
                      }}
                      className="input"
                    />
                  </Flex>
                )}
              </Flex>
              {imageUpload && (
                <Button
                  onClick={handleAvatar}
                  size="1.5rem"
                  c={"#EFE1D1"}
                  bg={"#451952"}
                  radius={"xl"}
                >
                  Upload
                </Button>
              )}
            </Flex>
          </Flex>
          <Flex w={"67%"} h={"100%"} justify={"center"} align={"center"}>
            <Flex w={"95%"} h={"90%"} direction={"column"}>
              <Flex direction={"row"} justify={"space-between"}>
                <Text
                  size="3rem"
                  fw={700}
                  variant="gradient"
                  gradient={{ from: "violet", to: "red", deg: 180 }}
                >
                  My Products
                </Text>
                <UploadProduct params={params.id} />
              </Flex>

              <Flex w={"100%"} h={"100%"}>
                <UserProductList params={params.id} />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      ) : (
        <Flex
          justify={"center"}
          direction={"column"}
          align={"center"}
          gap={"lg"}
        >
          <Text>You are not currently logged in!!</Text>
          <Link href="/">
            <Button bg={"#EEEEEE"} c={"#FB5404"}>
              Go back to mainpage
            </Button>
          </Link>
        </Flex>
      )}
    </Flex>
  );
}
