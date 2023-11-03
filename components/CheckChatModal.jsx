"use client";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Text, Paper, Flex } from "@mantine/core";
import CheckChat from "./CheckChat";
import { auth } from "../firebase/firebase.config";
import {
  collection,
  doc,
  getDoc,
  serverTimestamp,
  addDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import Link from "next/link";
import { useEffect, useState } from "react";
import ChatRooms from "./ChatRooms";

export default function CheckChatModal({ productID }) {
  const chatRoomRef = collection(db, "chatroom");
  const [productOwnerID, setProductOwnerID] = useState();
  const [displayName, setDisplayName] = useState();
  const [sellerEmail, setSellerEmail] = useState();
  const [chatID, setChatID] = useState(null);
  const [messagesRef, setMessagesRef] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);
  const handleOpen = async () => {
    open();
    if (auth.currentUser !== null) {
      setChatID(`${productOwnerID}_${auth.currentUser.uid}`);
      await setDoc(
        doc(chatRoomRef, `${productOwnerID}_${auth.currentUser.uid}`),
        {
          seller: {
            displayName: displayName,
            sellerID: productOwnerID,
            email: sellerEmail,
          },
          buyer: {
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            buyerID: auth.currentUser.uid,
          },
          createdAt: serverTimestamp(),
        }
      );
      setMessagesRef(
        collection(
          db,
          "chat",
          `${productOwnerID}_${auth.currentUser.uid}`,
          "messages"
        )
      );

      // const chatDocRef = await addDoc(chatRoomRef, {
      //   seller: {
      //     displayName: `${firstName} ${lastName}`,
      //     sellerID: productOwnerID,
      //     email: sellerEmail,
      //   },
      //   buyer: {
      //     displayName: auth.currentUser.displayName,
      //     email: auth.currentUser.email,
      //     buyerID: auth.currentUser.uid,
      //   },
      //   createdAt: serverTimestamp(),
      // });
      // await setDoc(
      //   doc(db, "chatroom", chatDocRef.id),
      //   {
      //     uid: docRef.id,
      //   },
      //   { merge: true }
      // );

      // console.log(messageDocID);
      // await addDoc(messagesRef, {
      //   message: "As salam u alaikum. How can I help you?",
      //   name: `${firstName} ${lastName}`,
      //   createdAt: serverTimestamp(),
      // });
      //   setMessageDocID(messageDocRef.id);
      // };
    }
  };

  useEffect(() => {
    const getProductOwner = async () => {
      const docRef = doc(db, "Products", productID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProductOwnerID(docSnap.data().userId);
        setDisplayName(docSnap.data().user.displayName);
        setSellerEmail(docSnap.data().user.email);
      } else {
        alert("No such Product Owner exists!");
      }
    };
    if (messagesRef) {
      const firstMessage = async () => {
        await addDoc(messagesRef, {
          message: "As salam u alaikum. How can I help you?",
          name: displayName,
          createdAt: serverTimestamp(),
        });
      };
      firstMessage();
    }
    getProductOwner();
  }, []);
  return (
    <>
      <Modal opened={opened} onClose={close} title="" centered size="90vh">
        {/* <ChatRooms /> */}

        {chatID != null && <CheckChat chatID={chatID} />}

        {/* {chatID ? ( */}
        {/* // ) : (
            //   <Flex direction={"column"} justify={"center"} align={"center"}>
            //     <Text size="1.1rem">
            //       You are not logged in. Please login to chat with the product
            //       owner.
            //     </Text>
            //     <Link href={"/signup"}>
            //       <Button c={"cyan"} bg={"#ffffff"}>
            //         Go to Login Page
            //       </Button>
            //     </Link>
            //   </Flex>
            // )} */}
      </Modal>

      <Button bg={"maroon"} onClick={handleOpen} size="lg">
        Check Messages
      </Button>
    </>
  );
}
