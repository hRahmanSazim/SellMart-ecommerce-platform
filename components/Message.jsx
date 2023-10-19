import React from "react";
import { Flex } from "@mantine/core";
const Message = ({ message }) => {
  return (
    <Flex className="items-center shadow-xl m-4 py-2 px-3 rounded-tl-full rounded-tr-full">
      <p className="absolute mt-[-4rem] text-gray-600 text-xs">
        {message.name}
      </p>
      <p>{message.message}</p>
    </Flex>
  );
};

export default Message;
