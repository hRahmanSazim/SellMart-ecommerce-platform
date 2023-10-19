import { Button, Flex, Text, Space } from "@mantine/core";
import React from "react";
import Image from "next/image";
import ChatModal from "../../../../components/ChatModal";

const Product = () => {
  return (
    <Flex w={"100%"} h={"100%"} direction={"column"} p={"lg"}>
      <Flex w={"100%"} direction={"row"} gap={"xl"}>
        <Flex w={"30%"} direction={"column"}>
          <Flex w={"100%"} h={"50%"}>
            <Image
              src={"https://picsum.photos/250/350"}
              width={1080}
              height={400}
            ></Image>
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
        <Flex w={"30%"} direction={"column"}>
          <Text>Product Details: </Text>
          <Text>Category: </Text>
          <Text>Title: </Text>
          <Text>Reviews: </Text>
          <Text>Price: </Text>
          <Text>Quantity: </Text>
        </Flex>
        <Flex
          w={"30%"}
          direction={"column"}
          px={"xl"}
          bg={"#FAF9F6"}
          justify={"center"}
        >
          <Flex direction={"column"} justify={"flex-start"}>
            <Text>Owner Details: </Text>
            <Text>Name: </Text>
            <Text>Time used: </Text>
          </Flex>

          <Space h={"2rem"}> </Space>
          {/* <Button bg={"maroon"}> Chat with the owner</Button> */}
          <ChatModal />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Product;
