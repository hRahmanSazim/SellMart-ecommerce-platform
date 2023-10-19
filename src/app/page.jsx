// import Image from "next/image";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HomeCarousel from "../../components/HomeCarousel";
import { Flex, Container, Text } from "@mantine/core";
import { SignOut } from "../../firebase/auth/signout";

export default function Home() {
  return (
    <>
      <Header />
      <Container fluid>
        <Flex h={"20rem"}>
          <HomeCarousel />
        </Flex>
        <Flex h={"10rem"}>
          <Flex direction="row" h={"100%"} w={"100%"} justify={"space-between"}>
            <Flex bg={"#FF9248"} w={"15%"}></Flex>
            <Flex bg={"red"} w={"15%"}></Flex>
            <Flex bg={"indigo"} w={"15%"}></Flex>
            <Flex bg={"grape"} w={"15%"}></Flex>
            <Flex bg={"maroon"} w={"15%"}></Flex>
          </Flex>
        </Flex>
      </Container>
      {/* <Footer /> */}
    </>
  );
}
