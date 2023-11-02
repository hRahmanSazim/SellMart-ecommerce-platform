// import Image from "next/image";
import Footer from "../../components/Footer";
import Products from "./products/page";
import Header from "../../components/Header";
import HomeCarousel from "../../components/HomeCarousel";
import { Flex, Container, Text } from "@mantine/core";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <Container fluid className="min-h-screen" pb={"xl"}>
        <Flex h={"20%"}>
          <HomeCarousel />
        </Flex>
        <Flex h={"10rem"}>
          <Flex direction="row" h={"100%"} w={"100%"} justify={"space-between"}>
            <Flex
              w={"15%"}
              justify={"center"}
              align={"center"}
              className="border-8"
            >
              <Link href={"/products/category/ELECTRONICS"}>
                <Text>ELECTRONICS</Text>
              </Link>
            </Flex>
            <Flex
              w={"15%"}
              justify={"center"}
              align={"center"}
              className="border-8"
            >
              <Link href={"/products/category/FURNITURE"}>
                <Text>FURNITURE</Text>
              </Link>
            </Flex>
            <Flex
              w={"15%"}
              justify={"center"}
              align={"center"}
              className="border-8"
            >
              <Link href={"/products/category/TOYS"}>
                <Text>TOYS</Text>
              </Link>
            </Flex>
            <Flex
              w={"15%"}
              justify={"center"}
              align={"center"}
              className="border-8"
            >
              <Link href={"/products/category/HOME APPLIANCES"}>
                <Text>HOME APPLIANCES</Text>
              </Link>
            </Flex>
            <Flex
              w={"15%"}
              justify={"center"}
              align={"center"}
              className="border-8"
            >
              <Text>CLOTHING</Text>
            </Flex>
          </Flex>
        </Flex>
        {/* <Flex justify={"center"}> */}
        {/* cool colors:= #3FC1C9 c={"#3F72AF"} */}
        <Text
          size="4rem"
          fw={800}
          ta="center"
          pt={"xl"}
          variant="gradient"
          gradient={{ from: "violet", to: "cyan", deg: 180 }}
        >
          Latest Products
        </Text>
        <hr className="h-1 w-2/3 mx-auto rounded my-8 bg-gray-200 border-0 dark:bg-gray-700" />
        <Products />
      </Container>
      <Footer />
    </>
  );
}
