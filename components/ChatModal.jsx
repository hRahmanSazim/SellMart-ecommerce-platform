"use client";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Text, Center, Flex } from "@mantine/core";
import Chat from "./Chat";
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

export default function ChatModal({ productID }) {
  const chatRef = collection(db, "chat");
  const chatRoomRef = collection(db, "chatroom");
  const [productOwnerID, setProductOwnerID] = useState(null);
  const [ownerAvatar, setOwnerAvatar] = useState();
  const [visitorAvatar, setVisitorAvatar] = useState();
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
          sentFrom: {
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            senderID: auth.currentUser.uid,
          },
          sentTo: {
            displayName: displayName,
            sellerID: productOwnerID,
            email: sellerEmail,
          },
          createdAt: serverTimestamp(),
        }
      );
      await setDoc(doc(chatRef, `${productOwnerID}_${auth.currentUser.uid}`), {
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
      });
      setMessagesRef(
        collection(
          db,
          "chat",
          `${productOwnerID}_${auth.currentUser.uid}`,
          "messages"
        )
      );

      // const chatDocRef = await addDoc(chatRef, {
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
  }, [messagesRef]);

  useEffect(() => {
    const getProductOwner = async () => {
      const docRef = doc(db, "Products", productID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProductOwnerID(docSnap.data().userId);
        setDisplayName(docSnap.data().user.displayName);
        setSellerEmail(docSnap.data().user.email);
        setOwnerAvatar(docSnap.data().user.avatar);
      } else {
        alert("No such Product Owner exists!");
      }
    };
    getProductOwner();
    if (auth.currentUser) {
      const getVisitor = async () => {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setVisitorAvatar(userSnap.data().avatar);
        }
      };
      getVisitor();
    }
  }, []);
  return (
    <>
      <Modal opened={opened} onClose={close} title="" centered size="90vh">
        {chatID ? (
          <Chat chatID={chatID} />
        ) : (
          <Flex direction={"column"} justify={"center"} align={"center"}>
            <Text size="1.1rem">
              You are not logged in. Please login to chat with the product
              owner.
            </Text>
            <Link href={"/signup"}>
              <Button c={"cyan"} bg={"#ffffff"}>
                Go to Login Page
              </Button>
            </Link>
          </Flex>
        )}
      </Modal>

      <Button bg={"maroon"} onClick={handleOpen} size="lg">
        Chat with the owner
      </Button>
    </>
  );
}
