"use client";
// import React, { useEffect, useState } from "react";
// import { Container } from "@mantine/core";
// import { db, auth } from "../firebase/firebase.config";
// import { collection, query, where, getDocs } from "firebase/firestore";

// const ChatRooms = () => {
//   //   const q = query(
//   //     collection(db, "chatroom"),
//   //     where(sentTo.sellerID, "==", auth.currentUser.uid)
//   //   );
//   //   const querySnapshot = await getDocs(q);
//   useEffect(() => {
//     const getChatRoom = async () => {
//       const q = query(
//         collection(db, "chatroom"),
//         where(sentTo.sellerID, "==", auth.currentUser.uid)
//       );
//       const querySnapshot = await getDocs(q);
//     };
//   }, []);
//   return (
//     <Container size="xs">
//       <ul></ul>
//     </Container>
//   );
// };

// export default ChatRooms;
import React, { useEffect, useState } from "react";
import { Flex, Text } from "@mantine/core"; // Import Text from Mantine
import { db, auth } from "../firebase/firebase.config";
import { collection, query, where, getDocs } from "firebase/firestore";

const ChatRooms = () => {
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    const getChatRooms = async () => {
      const q = query(
        collection(db, "chatroom"),
        where("sentTo.sellerID", "==", auth.currentUser.uid)
      );

      const querySnapshot = await getDocs(q);
      const rooms = [];

      querySnapshot.forEach((doc) => {
        rooms.push({ id: doc.id, data: doc.data() });
      });

      setChatRooms(rooms);
    };

    getChatRooms();
  }, []);

  return (
    <Flex size="xs" direction={"column"}>
      <ul>
        {chatRooms.map((room) => (
          <li key={room.id}>
            <Text size="xl">{room.data.name}</Text>
            {/* You can display other chat room data here */}
          </li>
        ))}
      </ul>
    </Flex>
  );
};

export default ChatRooms;
