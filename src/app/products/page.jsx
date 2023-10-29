"use client";
import {
  SimpleGrid,
  Container,
  Space,
  Autocomplete,
  Flex,
  Button,
} from "@mantine/core";
import Product from "../../../components/Product";
import { db } from "../../../firebase/firebase.config";
import { collection, query, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
const productsCollectionRef = collection(db, "Products");
const Products = () => {
  const [products, setProducts] = useState([]);
  //   const unsub = onSnapshot(doc(productsCollectionRef), (doc) => {
  //     console.log("Current data: ", doc.data());
  // });
  // useEffect(() => {
  //   async function fetchData() {
  //     const res = await fetch("https://dummyjson.com/products/");
  //     const data = await res.json();
  //     setProducts(data.products);
  //   }
  //   fetchData();
  // }, []);

  // const items = [];

  useEffect(() => {
    const q = query(productsCollectionRef);
    const unsub = onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
        // console.log(doc.data());
      });
      setProducts(items);
    });
    return () => unsub();
  }, []);
  // const [query, setQuery] = useState();
  // const handleSearch = (e) => {
  //   setQuery(e.target.value);
  // };
  // const filteredItems = products.filter((product) => {
  //   product.title.toLocaleLowerCase().indexOf(query.toLocaleLowerCase() !== -1);
  // });

  return (
    <Container style={{ width: "100%" }} pt={"xl"}>
      <Flex direction={"row"} w={"100%"} h={"10%"} gap={"xs"}>
        <form></form>
        <Autocomplete
          data={[...products.map((product) => product.title)]}
          w={"50%"}
          label="Search here for products"
        />
        <Flex justify={"flex-end"} direction={"column"}>
          <Button h={"58%"} bg={"#210B2C"}>
            <BiSearchAlt size={"1.2rem"} />
          </Button>
        </Flex>
      </Flex>
      <Space h="xl" />
      <SimpleGrid cols={4} spacing={64} verticalSpacing="xl" h={200}>
        {products.map((product) => (
          <Product product={product}></Product>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Products;
