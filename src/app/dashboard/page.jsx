import React from "react";

import Image from "next/image";
import { Center, Flex, Text, Paper } from "@mantine/core";
import { db } from "@/firebase/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import UserPostList from "@/components/UserPostList";
import NewPostModal from "@/components/NewPostModal";
import { RiTwitterXFill } from "react-icons/ri";
import { AiOutlineLinkedin } from "react-icons/ai";

export default async function Dashboard() {
  const userRef = doc(db, "users", `${params.id}`);
  const userSnap = await getDoc(userRef);
  const userData = userSnap.data();
  return (
    <Flex w={"100%"} h={"100vh"} justify={"center"} align={"center"}>
      <Flex w={"80%"} h={"80%"}>
        <Flex w={"33%"} h={"100%"} justify={"center"} align={"center"}>
          <Flex h={"55%"} w={"50%"} direction={"column"}>
            <Flex h={"60%"} w={"100%"}>
              <Paper shadow="xl" withBorder radius={"xl"}>
                <Image
                  alt="user_image"
                  src={`${userData?.avatar}`}
                  width={260}
                  height={250}
                ></Image>
              </Paper>
            </Flex>
            <Center>
              <Flex direction={"column"} m={"lg"}>
                <Flex direction={"row"} justify={"center"} align={"center"}>
                  <Text size="1.5rem">
                    {userData?.firstName.toUpperCase()}{" "}
                    {userData?.lastName.toUpperCase()}
                  </Text>
                </Flex>
                <Flex mt={"1rem"}>{userData?.email}</Flex>
                <Flex direction={"row"} mt={"sm"} justify={"center"}>
                  <Flex>
                    <RiTwitterXFill size="1.4rem"></RiTwitterXFill>
                  </Flex>
                  <Flex>
                    <AiOutlineLinkedin size="1.5rem"></AiOutlineLinkedin>
                  </Flex>
                </Flex>
              </Flex>
            </Center>
          </Flex>
        </Flex>
        <Flex w={"67%"} h={"100%"} justify={"center"} align={"center"}>
          <Flex w={"90%"} h={"90%"} direction={"column"}>
            <Flex direction={"row"} justify={"space-between"}>
              <Text size="3rem" fw={700}>
                My Posts
              </Text>
              <NewPostModal />
            </Flex>
            <Flex w={"100%"} h={"100%"}>
              <UserPostList params={params} />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
