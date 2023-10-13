import React from "react";
import { Flex } from "@mantine/core";
import Link from "next/link";
const Footer = () => {
  return (
    <Flex
      h={"10%"}
      w={"100%"}
      direction={"row"}
      bg={"dark"}
      align={"center"}
      justify={"center"}
    >
      <Flex w={"100%"} justify={"space-between"} align={"center"}>
        <nav>
          <ul className="flex space-x-4 pr-4">
            <li>
              <Link href="#" className="text-white hover:text-gray-200">
                Home
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

export default Footer;
