"use client";
import React, { useState, useEffect } from "react";
import { db } from "../../../../../firebase/firebase.config";
import { query, where, collection, getDocs } from "firebase/firestore";
import { useParams } from "next/navigation";
import Product from "../../../../../components/Product";
import { SimpleGrid, Container, Text } from "@mantine/core";
const Categories = () => {
  const params = useParams();
  const productsCollectionRef = collection(db, "Products");
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
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
    };
    getProducts();
  }, []);
  return (
    <Container style={{ width: "100%" }} pt={"xl"}>
      <SimpleGrid cols={8} verticalSpacing="xl">
        {products != null ? (
          products.map((product) => <Product product={product}></Product>)
        ) : (
          <Text>Sorry!! No products in this category</Text>
        )}
      </SimpleGrid>
    </Container>
  );
};

export default Categories;
