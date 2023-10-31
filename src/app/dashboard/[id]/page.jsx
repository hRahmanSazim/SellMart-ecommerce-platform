"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Center, Flex, Text, Paper, Button } from "@mantine/core";
import { db } from "../../../../firebase/firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { auth } from "../../../../firebase/firebase.config";
import ProductModal from "../../../../components/NewProductModal";
import Link from "next/link";

import UserProductList from "../../../../components/UserProductList";

// import UserPostList from "@/components/UserPostList";
// import NewPostModal from "@/components/NewPostModal";
// import { RiTwitterXFill } from "react-icons/ri";
// import { AiOutlineLinkedin } from "react-icons/ai";

export default function Dashboard() {
  const params = useParams();
  const [user, setUser] = useState();
  // console.log(auth.currentUser);
  useEffect(() => {
    const getData = async () => {
      const userRef = doc(db, "users", `${params.id}`);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.data();
      setUser(userData);
      // console.log(user);
    };
    getData();
  }, []);
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
                      src={user.avatar}
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
                    <Text size="1.5rem">{user.displayName}</Text>
                  </Flex>
                  <Flex mt={"1rem"}>{user.email}</Flex>
                </Flex>
              </Center>
            </Flex>
          </Flex>
          <Flex w={"67%"} h={"100%"} justify={"center"} align={"center"}>
            <Flex w={"90%"} h={"90%"} direction={"column"}>
              <Flex direction={"row"} justify={"space-between"}>
                <Text size="3rem" fw={700}>
                  My Products
                </Text>
                <ProductModal params={params.id} />
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
