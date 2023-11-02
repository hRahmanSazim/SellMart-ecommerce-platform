"use client";
import { Text, Flex } from "@mantine/core";
import React from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Image from "next/image";
import { db } from "../../../../../firebase/firebase.config";

const Checkout = () => {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [randomNumber, setRandomNumber] = useState(null);
  useEffect(() => {
    const getProduct = async () => {
      const docRef = doc(db, "Products", params.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProduct(docSnap.data());
      } else {
        alert("No such document!");
      }
    };
    getProduct();
  }, []);
  function getRandomNumber(min, max) {
    setRandomNumber(Math.floor(Math.random() * (max - min + 1)) + min);
    return randomNumber;
  }
  return (
    <Flex direction={"column"}>
      <Flex justify={"flex-end"} gap={"lg"} pr={"md"}>
        <Text>Live Chat</Text>
        <Text>Site feedback</Text>
        <Text>+880-1755-775577</Text>
      </Flex>
      <Flex
        w={"100%"}
        h={"100vh"}
        justify={"center"}
        align={"center"}
        direction={"row"}
      >
        <Flex
          w={"90%"}
          h={"90%"}
          direction={"row"}
          gap={"md"}
          justify={"center"}
        >
          <Flex w={"60%"} direction={"column"} h={"100%"}>
            <Flex w={"100%"} h={"8%"} bg={"#333333"} align={"center"} pl={"lg"}>
              <Text c={"white"} size="2rem">
                SHIPPING
              </Text>
            </Flex>
            <Flex
              w={"100%"}
              h={"92%"}
              bg={"#EEEEEE"}
              justify={"center"}
              align={"center"}
            >
              <Flex w={"95%"} h={"95%"} bg={"#FFFFFF"}>
                <Image
                  src={
                    "https://firebasestorage.googleapis.com/v0/b/sellmart-c4770.appspot.com/o/Screen%20Shot%202023-11-03%20at%2012.59.34%20AM.png?alt=media&token=29279e7e-fddc-40af-869c-052f8a48a8ba"
                  }
                  alt="shipping_thumbnail"
                  width={1000}
                  height={310}
                ></Image>
              </Flex>
            </Flex>
          </Flex>
          <Flex w={"30%"} direction={"column"} h={"100%"} gap={"lg"}>
            <Flex w={"100%"} h="40%" bg={"#FAF9F6"} direction={"column"}>
              <Flex
                w={"100%"}
                h={"26%"}
                bg={"#EEEEEE"}
                align={"center"}
                pl={"lg"}
              >
                <Text c={"#333333"} size="2rem">
                  SUMMARY
                </Text>
              </Flex>
              {randomNumber != null &&
                product !=
                  null(
                    <Flex
                      w={"100%"}
                      h={"74%"}
                      direction={"column"}
                      justify={"center"}
                      gap={"lg"}
                    >
                      <Text c={"teal"}>
                        SUBTOTAL:$
                        <Text>{product?.price}</Text>
                      </Text>
                      <Text>SHIPPING AND HANDLING:$ {randomNumber}</Text>
                      <Text>
                        TAXES: $ {(product?.price * randomNumber) / 100}
                      </Text>
                      <Flex justify={"space-around"}>
                        <Text size="2rem">TOTAL: </Text>
                        <Text size="2rem" c={"#FB5404"}>
                          $
                          {product?.price +
                            randomNumber +
                            (product?.price * randomNumber) / 100}
                        </Text>
                      </Flex>
                    </Flex>
                  )}
            </Flex>

            <Flex w={"100%"} h="30%" bg={"#FAF9F6"}>
              <Flex
                w={"100%"}
                h={"26%"}
                bg={"#EEEEEE"}
                align={"center"}
                pl={"lg"}
              >
                <Text c={"#333333"} size="2rem">
                  IN YOUR CART <Text c={"grape"}>(1)</Text>
                </Text>
              </Flex>
            </Flex>
            <Flex direction={"row"}>
              <Image
                src={product?.thumbnail}
                alt="product_thumbnail"
                width={500}
                height={500}
              ></Image>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Checkout;
