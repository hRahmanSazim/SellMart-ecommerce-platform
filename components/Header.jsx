"use client";
import Link from "next/link";
import React from "react";
import { Autocomplete, Drawer, Button, Flex, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
  return (
    <Flex h={"10%"} w={"100%"} direction={"row"} bg={"gray"} align={"center"}>
      <Flex w={"8%"} pl={"1rem"}>
        <Burger />
      </Flex>
      <Flex w={"92%"} justify={"space-between"} align={"center"}>
        <Link href="#" className="text-3xl font-bold text-red-900">
          <Text fs="italic" size="2rem">
            SellMart
          </Text>
        </Link>

        <Autocomplete
          label="Search for products"
          placeholder="Search"
          data={["Chair", "Table", "Shirt", "Jeans"]}
        />
        <nav>
          <ul className="flex space-x-4 pr-4">
            <li>
              <Link href="#" className="text-white hover:text-gray-200">
                Home
              </Link>
            </li>
            <li>
              <Link href="#" className="text-white hover:text-gray-200">
                Login/SignUp
              </Link>
            </li>
            <li>
              <Link href="#" className="text-white hover:text-gray-200">
                About
              </Link>
            </li>
            <li>
              <Link href="#" className="text-white hover:text-gray-200">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </Flex>
    </Flex>
  );
};
function Burger() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        title="Categories"
        position="left"
        size="10%"
      >
        {/* Drawer content */}
      </Drawer>

      <Button onClick={open} bg={"dark"}>
        <GiHamburgerMenu />
      </Button>
    </>
  );
}

export default Header;
