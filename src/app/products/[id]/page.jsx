"use client";
import { Flex, Text, Space, Button } from "@mantine/core";
import React from "react";
import Image from "next/image";
import ChatModal from "../../../../components/ChatModal";
import { useParams } from "next/navigation";
import { db } from "../../../../firebase/firebase.config";
import { getDoc, doc } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { setDoc } from "firebase/firestore";
import { auth } from "../../../../firebase/firebase.config";
import CheckChatModal from "../../../../components/CheckChatModal";

const Product = () => {
  const params = useParams();
  const productRef = doc(db, "Products", params.id);
  const [product, setProduct] = useState(null);
  const [user, setUser] = useState(null);
  const [daysUsed, setDaysUsed] = useState();
  const [hoursUsed, setHoursUsed] = useState();
  const [day, setDay] = useState();
  const [hour, setHour] = useState();
  // const productsRef = collection(db , "Products");
  // const productRef = doc(db, "Products", params.id);
  // // const q = query(productRef, where("userId", "==", params.id));
  // const docSnap = await getDoc(productRef);
  // const product = docSnap.data();

  // if (!docSnap.exists()) {
  //   alert("No such product!");
  // }
  useEffect(() => {
    if (product) {
      const userRef = doc(db, "users", product.userId);
      const getUser = async () => {
        // const productsRef = collection(db, "Products");
        // const q = query(productRef, where("userId", "==", params.id));
        const docSnap = await getDoc(userRef);
        setUser(docSnap.data());
      };
      getUser();
      itemUsedTime();
    }
  }, [product]);
  useEffect(() => {
    if (user) {
      const updateAvatar = async () => {
        await setDoc(
          productRef,
          {
            user: {
              avatar: user.avatar,
            },
          },
          { merge: true }
        );
      };
      updateAvatar();
    }
  }, [user]);
  useEffect(() => {
    const getProduct = async () => {
      // const productsRef = collection(db, "Products");
      // const q = query(productRef, where("userId", "==", params.id));
      const docSnap = await getDoc(productRef);
      setProduct(docSnap.data());
    };
    getProduct();
  }, []);

  const itemUsedTime = () => {
    const productDate = product.createdAt.toDate();
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - productDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hoursDifference = Math.floor(
      timeDifference / 3600000 - daysDifference * 24
    );
    daysDifference == 1 ? setDay("day") : setDay("days");
    hoursDifference == 1 ? setHour("hour") : setHour("hours");
    setDaysUsed(daysDifference);
    setHoursUsed(hoursDifference);
  };
  return (
    <Flex w={"100%"} h={"100%"} direction={"column"} p={"lg"}>
      <Flex w={"100%"} direction={"row"} gap={"xl"}>
        <Flex w={"30%"} direction={"column"}>
          <Flex w={"100%"} h={"50%"}>
            <Image
              src={product?.thumbnail}
              width={1080}
              height={400}
              alt="thumbnail"
            ></Image>
          </Flex>
          {/* <Flex w={"100%"} h={"15%"} justify={"space-between"} py={"md"}>
            <Flex w={"15%"} bg={"cyan"}>
              t
            </Flex>
            <Flex w={"15%"} bg={"violet"}>
              e
            </Flex>
            <Flex w={"15%"} bg={"blue"}>
              s
            </Flex>
            <Flex w={"15%"} bg={"orange"}>
              t
            </Flex>
          </Flex> */}
        </Flex>
        <Flex w={"30%"} direction={"column"} gap={"xl"}>
          <Text
            size="3rem"
            variant="gradient"
            gradient={{ from: "blue", to: "green", deg: 180 }}
          >
            Product Details:{" "}
          </Text>
          <Text size="3rem">{product?.body} </Text>
          <Text size="1.3rem" c={"cyan"}>
            Category: {product?.category}
          </Text>
          <Text size="1.3rem" c={"teal"}>
            Title: {product?.title}
          </Text>
          {/* <Text>Reviews:  </Text> */}
          <Text size="1.3rem" c={"maroon"}>
            Price: ${product?.price}{" "}
          </Text>
          <Link href={`/checkout/${params.id}`}>
            <Button bg={"grape"} size="xl">
              Buy this now!
            </Button>
          </Link>
          {/* <Text>Quantity: </Text> */}
        </Flex>
        <Flex
          w={"30%"}
          direction={"column"}
          px={"xl"}
          bg={"#FAF9F6"}
          justify={"flex-start"}
        >
          <Flex direction={"column"} justify={"flex-start"} gap={"lg"}>
            <Flex direction={"row"}></Flex>
            <Text
              size="3rem"
              pb={"lg"}
              variant="gradient"
              gradient={{ from: "blue", to: "red", deg: 180 }}
            >
              Owner Details:{" "}
            </Text>
            <Image
              src={product?.user.avatar}
              width={100}
              height={100}
              alt="seller_image"
              style={{
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
            <Text size="1.5rem">
              {" "}
              Name: <Text c={"#6a994e"}>{product?.user.displayName}</Text>
            </Text>
            <Text size="1.5rem">
              Time used:
              <Text c={"#00b4d8"}>
                {daysUsed} {day} {hoursUsed} {hour}
              </Text>
            </Text>
          </Flex>

          <Space h={"2rem"}> </Space>
          {auth.currentUser && product?.userId === auth.currentUser.uid ? (
            <CheckChatModal productID={params.id} />
          ) : (
            <ChatModal productID={params.id} />
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Product;
