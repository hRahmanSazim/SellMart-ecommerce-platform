import { Text, Flex } from "@mantine/core";
import React from "react";

const Checkout = () => {
  return (
    <Flex direction={"column"}>
      <Flex justify={"flex-end"} gap={"lg"} pr={"md"}>
        <Text>Live Chat</Text>
        <Text>Site feedback</Text>
        <Text>+880-1733-103038</Text>
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
              <Flex w={"95%"} h={"95%"} bg={"#FFFFFF"}></Flex>
            </Flex>
          </Flex>
          <Flex w={"30%"} direction={"column"} h={"100%"} gap={"lg"}>
            <Flex w={"100%"} h="40%" bg={"#FAF9F6"}>
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
                  IN YOUR CART {"(1)"}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Checkout;
