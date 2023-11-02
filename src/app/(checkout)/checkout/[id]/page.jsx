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
  // const [randomNumber, setRandomNumber] = useState(null);
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
  // function getRandomNumber(min, max) {
  //   setRandomNumber(Math.floor(Math.random() * (max - min + 1)) + min);
  //   return randomNumber;
  // }
  const ImageContainer = () => {
    return (
      <div className="container">
        <img src={product?.thumbnail} alt="Your Image" />
        <style jsx>{`
          .container {
            width: 1000px; /* Set the width and height of your container */
            height: 200px;
            overflow: hidden; /* Hide any content that goes outside the container */
            position: relative; /* Create a relative positioning context for the image */
          }

          .container img {
            width: 100%; /* Make the image 100% of the container's width */
            height: auto; /* Maintain the image's aspect ratio */
            position: absolute; /* Position the image absolutely within the container */
            top: 0; /* Position it at the top of the container */
            left: 0; /* Position it at the left of the container */
          }
        `}</style>
      </div>
    );
  };
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
                <Text c={"#3A1078"} size="2rem">
                  SUMMARY
                </Text>
              </Flex>

              <Flex
                w={"100%"}
                h={"74%"}
                direction={"column"}
                justify={"center"}
                gap={"lg"}
                pl={"md"}
              >
                <Flex direction={"row"} w={"100%"} h={"10%"}>
                  <Text>SUBTOTAL: ${product?.price}</Text>
                </Flex>
                <Text>SHIPPING AND HANDLING: $35</Text>
                <Text>TAXES(13%): ${(product?.price * 13) / 100}</Text>
                <Flex justify={"space-evenly"}>
                  <Text size="2rem" c={"#3795BD"}>
                    TOTAL:{" "}
                  </Text>
                  <Text size="2rem" c={"#FB5404"}>
                    $
                    {Number(product?.price) +
                      35 +
                      Number((product?.price * 13) / 100)}
                  </Text>
                </Flex>
              </Flex>
            </Flex>

            <Flex w={"100%"} h="30%" bg={"#FAF9F6"}>
              <Flex
                w={"100%"}
                h={"26%"}
                // bg={"#EEEEEE"}
                // align={"center"}
                pl={"lg"}
                // justify={"center"}
                direction={"column"}
              >
                <Text c={"#005B41"} size="2rem" td={"underline"}>
                  IN YOUR CART
                </Text>
                <Text size="2rem" py={"md"}>
                  {product.title}
                </Text>
                Category: {product.category}
              </Flex>
              <Flex direction={"row"} h={"10%"} w={"40%"}>
                {/* <Image
                src={product?.thumbnail}
                alt="product_thumbnail"
                width="100%"
                height="100%"
                objectFit="contain"
              ></Image> */}
                <ImageContainer />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Checkout;
