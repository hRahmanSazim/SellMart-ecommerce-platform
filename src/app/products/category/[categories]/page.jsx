"use client";
import React, { useState, useEffect } from "react";
import { db } from "../../../../../firebase/firebase.config";
import { query, where, collection, getDocs } from "firebase/firestore";
import { useParams } from "next/navigation";
import Product from "../../../../../components/Product";
import { SimpleGrid, Container, Text, Loader, Flex } from "@mantine/core"; // Import the Loader component from your library

const Categories = () => {
  const params = useParams();
  const productsCollectionRef = collection(db, "Products");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize the loading state

  useEffect(() => {
    const getProducts = async () => {
      try {
        const q = query(
          productsCollectionRef,
          where("category", "==", params.categories)
        );

        const querySnapshot = await getDocs(q);
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setProducts(items);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false); // Make sure to set loading to false in case of an error
      }
    };
    getProducts();
  }, [params.categories]);

  return (
    <Container style={{ width: "100%" }} py={"xl"}>
      <Flex direction={"row"} pb={"xl"} gap={"xl"} style={{ flex: "1" }}>
        <Text size="3.5rem">All products in category: </Text>
        <Text
          size="3.5rem"
          variant="gradient"
          gradient={{ from: "violet", to: "orange", deg: 180 }}
        >
          {`${params.categories}`}{" "}
        </Text>
      </Flex>

      {loading ? ( // Check the loading state
        <Loader size="md" /> // Display a loading indicator while data is being fetched
      ) : products.length > 0 ? (
        <SimpleGrid cols={4} gutter="xl">
          {products.map((product) => (
            <Product product={product} key={product.id} />
          ))}
        </SimpleGrid>
      ) : (
        <Text>Sorry!! No products in this category</Text>
      )}
    </Container>
  );
};

export default Categories;
