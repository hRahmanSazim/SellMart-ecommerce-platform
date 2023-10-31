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

const Product = () => {
  const params = useParams();
  const productRef = doc(db, "Products", params.id);
  const [product, setProduct] = useState();
  // const productsRef = collection(db, "Products");
  // const productRef = doc(db, "Products", params.id);
  // // const q = query(productRef, where("userId", "==", params.id));
  // const docSnap = await getDoc(productRef);
  // const product = docSnap.data();

  // if (!docSnap.exists()) {
  //   alert("No such product!");
  // }
  useEffect(() => {
    const getProduct = async () => {
      // const productsRef = collection(db, "Products");
      // const q = query(productRef, where("userId", "==", params.id));
      const docSnap = await getDoc(productRef);
      setProduct(docSnap.data());
    };
    getProduct();
  }, []);
  console.log(product);
  return (
    <Flex w={"100%"} h={"100%"} direction={"column"} p={"lg"}>
      <Flex w={"100%"} direction={"row"} gap={"xl"}>
        <Flex w={"30%"} direction={"column"}>
          <Flex w={"100%"} h={"50%"}>
            <Image src={product?.thumbnail} width={1080} height={400}></Image>
          </Flex>
          <Flex w={"100%"} h={"15%"} justify={"space-between"} py={"md"}>
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
          </Flex>
        </Flex>
        <Flex w={"30%"} direction={"column"} gap={"xl"}>
          <Text size="3rem">Product Details: </Text>
          <Text size="3rem">{product?.body} </Text>
          <Text>Category: {product?.category}</Text>
          <Text>Title: {product?.title}</Text>
          {/* <Text>Reviews:  </Text> */}
          <Text>Price: ${product?.price} </Text>
          <Button bg={"grape"}>
            <Link href="/checkout">Buy this now!</Link>
          </Button>
          {/* <Text>Quantity: </Text> */}
        </Flex>
        <Flex
          w={"30%"}
          direction={"column"}
          px={"xl"}
          bg={"#FAF9F6"}
          justify={"center"}
        >
          <Flex direction={"column"} justify={"flex-start"}>
            <Image
              src={product?.user.avatar}
              width={100}
              height={100}
              alt="seller_image"
            />
            <Text>Owner Details: </Text>
            <Text>Name: {product?.user.displayName}</Text>
            <Text>Time used: </Text>
          </Flex>

          <Space h={"2rem"}> </Space>
          <ChatModal />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Product;
