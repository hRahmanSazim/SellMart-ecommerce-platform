"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Autocomplete, Drawer, Button, Flex, Text, Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { GiHamburgerMenu } from "react-icons/gi";
import { auth } from "../firebase/firebase.config";
import { SignOut } from "../firebase/auth/signout";
import { onAuthStateChanged } from "firebase/auth";

const Header = () => {
  const [authUser, setAuthUser] = useState(null);
  onAuthStateChanged(auth, (user) => {
    setAuthUser(user);
  });
  return (
    <Flex
      h={"10%"}
      w={"100%"}
      direction={"row"}
      bg={"#8B85C1"}
      align={"center"}
    >
      <Flex w={"8%"} pl={"1rem"}>
        <Burger />
      </Flex>
      <Flex w={"92%"} justify={"space-between"} align={"center"}>
        <Link href="/" className="text-3xl font-bold ">
          <Text
            size="3rem"
            // c={"#210B2C"}
          >
            SellMart
          </Text>
        </Link>

        <Autocomplete
          label="Search for products"
          placeholder="Search"
          data={["Chair", "Table", "Shirt", "Jeans"]}
          size="lg"
        />
        <nav>
          <ul className="flex space-x-4 pr-4">
            <li>
              {authUser ? (
                <>
                  <LogoutMenu />
                </>
              ) : (
                <Link href="/signup" className="text-white hover:text-gray-200">
                  Login/SignUp
                </Link>
              )}
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
function LogoutMenu() {
  const [opened, setOpened] = useState(false);
  return (
    <Menu opened={opened} onChange={setOpened}>
      <Menu.Target>
        <Button
          bg={"#FAF9F6"}
          c={"#FB5404"}
        >{`${auth.currentUser.displayName}`}</Button>
      </Menu.Target>
      <Menu.Dropdown bg={"dark"}>
        <Menu.Item bg={"dark"}>
          <SignOut />
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default Header;
