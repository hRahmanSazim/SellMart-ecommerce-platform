"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Autocomplete, Drawer, Button, Flex, Text, Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { GiHamburgerMenu } from "react-icons/gi";
import { auth, db } from "../firebase/firebase.config";
import { SignOut } from "../firebase/auth/signout";
import { onAuthStateChanged } from "firebase/auth";
import { MdShoppingCartCheckout } from "react-icons/md";
import { TbShoppingBagSearch } from "react-icons/tb";
import Dashboard from "./Dashboard";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const [authUser, setAuthUser] = useState(null);
  const productsRef = collection(db, "Products");
  const [productTitles, setProductTitles] = useState();
  const [arrayWithUID, setArrayWithUID] = useState();
  onAuthStateChanged(auth, (user) => {
    setAuthUser(user);
  });
  useEffect(() => {
    const getProducts = async () => {
      const querySnapshot = await getDocs(productsRef);
      const products = [];
      const titles = [];
      const Uids = [];
      querySnapshot.forEach((doc) => {
        products.push(doc.data());
        titles.push(doc.data().title);
        Uids.push(doc.data().uid);
      });
      setProductTitles(titles);
      const titleWithUid = {};
      titles.forEach((element, index) => {
        titleWithUid[element] = Uids[index];
      });
      setArrayWithUID(titleWithUid);
    };
    getProducts();
  }, []);

  const handleSearch = (value) => {
    const productRoute = arrayWithUID[value];
    router.push(`/products/${productRoute}`);
  };
  return (
    <Flex
      h={"15%"}
      w={"100%"}
      direction={"row"}
      // bg={"#8B85C1"}
      // bg={"#FAF9F6"}
      bg={"#f0f0f0"}
      align={"center"}
    >
      <Flex w={"30%"} pl={"1rem"} align={"center"}>
        {/* <Flex pr={"xl"}>
          <Burger />
        </Flex> */}
        {/* <Image */}
        {/* // src={"https://i.ibb.co/yBcwJVk/logo1.png"} */}
        {/* // // width={300}
        // // height={200}
        // // object-fit="contain" // fill={true} */}
        {/* // ></Image> */}
        <Flex gap={"sm"} align={"center"} justify={"center"}>
          {/* <BsShop size={"15%"} /> */}
          <MdShoppingCartCheckout size={"16%"} color="coral" />
          <Link
            href="/"
            // className="text-3xl font-bold bg-gradient-to-r from-gray-600 via-purple-700 to-gray-600 inline-block text-transparent bg-clip-text"
          >
            <Text size="3rem" c={"#210B2C"}>
              $ellMart
            </Text>
          </Link>
        </Flex>
      </Flex>
      <Flex w={"92%"} justify={"space-between"} align={"center"}>
        <Flex w={"92%"} gap={"sm"}>
          <Autocomplete
            label=""
            placeholder="Search for products"
            data={productTitles}
            // size="lg"
            w={"65%"}
            limit={10}
            onOptionSubmit={(value) => handleSearch(value)}
            // onChange={(val) => {
            //   setSearchItem(val);
            // }}
            // value={searchItem}
            // onOptionSubmit={s}
          />
          <Button bg={"coral"}>
            <TbShoppingBagSearch size={"1.35rem"} />
          </Button>
        </Flex>
        <nav>
          <ul className="flex space-x-4 pr-4">
            <li>
              {authUser != null ? (
                <LogoutMenu />
              ) : (
                <Link href="/signup" className="text-black hover:text-gray-700">
                  Login/SignUp
                </Link>
              )}
            </li>
            <li>
              <Link href="#" className="text-black hover:text-gray-700">
                About
              </Link>
            </li>
            <li>
              <Link href="#" className="text-black hover:text-gray-700">
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
          bg={"black"}
          // c={"#FB5404"}
          c={"wheat"}
        >{`${auth.currentUser.displayName}`}</Button>
      </Menu.Target>
      <Menu.Dropdown bg={"dark"}>
        <Menu.Item bg={"white"}>
          <Dashboard />
        </Menu.Item>
        <Menu.Item bg={"dark"}>
          <SignOut />
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default Header;
