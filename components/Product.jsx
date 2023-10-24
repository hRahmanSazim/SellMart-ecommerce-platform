import { Text, Button, Flex, Title } from "@mantine/core";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const Product = ({ product }) => {
  return (
    <Flex direction="column" w={"100%"} h="100%">
      <Link style={{ color: "black" }} href={`/products/${product.id}`}>
        <Image
          height={200}
          width={200}
          src={product.thumbnail}
          alt="pics"
          layout="fixed"
        />
        <Title order={5} size={"1.3rem"}>
          {" "}
          {product.title}{" "}
        </Title>
      </Link>
      <Flex>
        <Text truncate>{product.description}</Text>
      </Flex>
      <Flex direction={"column"} justify={"space-between"}>
        <Flex direction="row" align="center" justify="space-between">
          <Text>${product.Price}</Text>
          <Button>Buy Now</Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Product;
