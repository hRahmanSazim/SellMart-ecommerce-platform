"use client";
import React, { useState, useEffect, useRef } from "react";
import Message from "./Message";
import SendMessage from "./SendMessage";
import { db } from "../firebase/firebase.config";
import { query, collection, orderBy, onSnapshot } from "firebase/firestore";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const scroll = useRef();
  useEffect(() => {
    const q = query(collection(db, "Messages"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  }, []);
  return (
    <>
      {messages &&
        messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      <SendMessage scroll={scroll} />
    </>
  );
};

export default Chat;
