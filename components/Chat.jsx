"use client";
import React, { useState, useEffect } from "react";
import Message from "./Message";
import SendMessage from "./SendMessage";
import { db } from "../firebase/firebase.config";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";
import { auth } from "../firebase/firebase.config";
import { Flex, Text } from "@mantine/core";

const Chat = ({ chatID }) => {
  const [messages, setMessages] = useState([]);

  // const scroll = useRef();
  useEffect(() => {
    if (auth.currentUser === null) {
      alert("You cannot chat without logging in!!");
      return;
    }
    const q = query(
      collection(db, "chat", chatID, "messages"),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    // const p = query(collection(db, "Products"), where("UUID", "==", ))
    return () => unsubscribe();
  }, []);
  return (
    <>
      {auth.currentUser !== null ? (
        <>
          {messages &&
            messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
          <SendMessage chatID={chatID} />
        </>
      ) : (
        <Flex justify={"center"}>
          <Text>
            "You are not currently logged in. Please login to chat with the
            product owner"
          </Text>
        </Flex>
      )}
    </>
  );
};

export default Chat;
