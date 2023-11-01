"use client";
import { Flex, Text } from "@mantine/core";
import Link from "next/link";
import Image from "next/image";
import { query, collection, getDocs, where } from "firebase/firestore";
import { auth, db } from "../firebase/firebase.config";
import { useEffect, useState } from "react";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";

export default function UserProductList({ params }) {
  const productsRef = collection(db, "Products");
  const [res, setRes] = useState([]);
  const q = query(productsRef, where("userId", "==", params));
  useEffect(() => {
    const getProducts = async () => {
      const querySnapshot = await getDocs(q);
      const products = [];
      querySnapshot.forEach((doc) => {
        products.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate().toDateString(),
        });
      });
      setRes(products);
    };
    getProducts();
  }, []);
  return (
    <Flex w="100%" direction={"column"} mt={"xl"}>
      {auth.currentUser.uid === params ? (
        res.length > 0 ? (
          <Flex mt={"sm"} direction={"column"} w={"100%"}>
            {res.map((obj) => (
              <ul key={obj.id}>
                <Flex
                  direction={"row"}
                  h={"150px"}
                  mb={"1rem"}
                  justify={"space-between"}
                  bg={"#F8F6F4"}
                >
                  <Flex gap={"xs"}>
                    <Flex w={"150px"}>
                      <Image
                        src={obj.thumbnail}
                        alt="post_photo"
                        width={150}
                        height={100}
                      />
                    </Flex>
                    <Flex direction={"column"} justify={"space-between"}>
                      <Flex direction={"row"} justify={"space-between"}>
                        <Link href={`/products/${obj.id}`}>
                          <Text size="2rem" c={"#240046"}>
                            {obj.title}
                          </Text>
                        </Link>
                      </Flex>
                      <Flex direction={"column"} justify={"space-between"}>
                        <Text w={"500px"} lineClamp={3}>
                          {obj.body}
                        </Text>
                        <Text c={"#ff5400"}>
                          {"$"}
                          {obj.price}
                        </Text>
                        <Text c={"#219ebc"} pt={"1rem"}>
                          Posted: {obj.createdAt}
                        </Text>
                      </Flex>
                    </Flex>
                    <Flex direction={"row"} gap={"xs"}>
                      <EditProduct obj={obj} />
                      <DeleteProduct obj={obj} />
                    </Flex>
                  </Flex>
                </Flex>
              </ul>
            ))}
          </Flex>
        ) : (
          <Flex
            mt={"5rem"}
            direction={"column"}
            justify={"center"}
            align={"center"}
          >
            <Text size="1rem">You currently have no products uploaded!!!</Text>
          </Flex>
        )
      ) : (
        <Flex
          mt={"5rem"}
          direction={"column"}
          justify={"center"}
          align={"center"}
        >
          <Text size="1rem">
            You are not authorized to view this user's dashboard
          </Text>
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
