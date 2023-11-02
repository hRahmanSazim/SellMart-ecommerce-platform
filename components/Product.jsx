import { Text, Button, Flex, Title } from "@mantine/core";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const Product = ({ product }) => {
  return (
    <Flex direction="column" h={"100%"} bg={"#f5f3f4"}>
      <Link style={{ color: "black" }} href={`/products/${product.uid}`}>
        <Image
          // objectFit="contain"
          alt="product_image"
          height={500}
          width={300}
          src={product.thumbnail}
          className="w-full h-80 object-cover"
        />
        <Title order={3}>
          <Text c={"#7209b7"} fw={"bolder"} fz={"xl"}>
            {product.title}
          </Text>
        </Title>
        <Text c={"#0a9396"}>{product.body}</Text>
        <Text c={"#0077b6"}>Category: {product.category}</Text>
        <Flex direction="row" align="center" justify="space-between">
          <Text c={"#9a031e"}>$ {product.price}</Text>
          <Button bg={"#3282B8"} c={"teal"}>
            See Details
          </Button>
        </Flex>
      </Link>
    </Flex>
  );
};

export default Product;
