import React from "react";
import { Flex } from "@mantine/core";
import { auth } from "../firebase/firebase.config";

const Message = ({ message }) => {
  return (
    <>
      {auth.currentUser.displayName !== message.name ? (
        <Flex className="items-center shadow-xl m-4 py-2 px-3 rounded-tl-full rounded-tr-full">
          <p className="absolute mt-[-4rem] text-gray-600 text-xs">
            {message.name}
          </p>
          <p>{message.message}</p>
        </Flex>
      ) : (
        <Flex className="justify-end items-center shadow-xl m-4 py-2 px-3 rounded-tl-full rounded-tr-full">
          <p className="absolute mt-[-4rem] text-gray-600 text-xs">
            {message.name}
          </p>
          <p>{message.message}</p>
        </Flex>
      )}
    </>
  );
};

export default Message;
