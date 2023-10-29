"use client";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import Chat from "./Chat";
import { auth } from "../firebase/firebase.config";
import {
  collection,
  doc,
  getDoc,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ChatModal() {
  const messagesRef = collection(db, "Messages");
  const [productOwnerID, setProductOwnerID] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [sellerEmail, setSellerEmail] = useState();
  const [messageDocID, setMessageDocID] = useState();
  const params = useParams();
  const documentID = params.id;

  const [opened, { open, close }] = useDisclosure(false);
  const handleOpen = async () => {
    open();
    if (auth.currentUser !== null) {
      const messageDocRef = await addDoc(messagesRef, {
        seller: {
          displayName: `${firstName} ${lastName}`,
          sellerID: productOwnerID,
          email: sellerEmail,
        },
        buyer: {
          displayName: auth.currentUser.displayName,
          email: auth.currentUser.email,
        },
        createdAt: serverTimestamp(),
      });

      const firstDoc = async (messageDocRef) => {
        // console.log(messageDocID);
        const conversationRef = collection(
          db,
          "Messages",
          messageDocRef.id,
          "Conversation"
        );
        await addDoc(conversationRef, {
          message: "00&$00",
          name: `${firstName} ${lastName}`,
          createdAt: serverTimestamp(),
        });
        setMessageDocID(messageDocRef.id);
      };
      firstDoc(messageDocRef);
    }
  };

  useEffect(() => {
    const getProductOwner = async () => {
      const docRef = doc(db, "Products", documentID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProductOwnerID(docSnap.data().userId);
        setFirstName(docSnap.data().user.firstName);
        setLastName(docSnap.data().user.lastName);
        setSellerEmail(docSnap.data().user.email);
      } else {
        // docSnap.data() will be undefined in this case
        alert("No such Product Owner exists!");
      }
    };

    getProductOwner();
  }, []);
  return (
    <>
      <Modal opened={opened} onClose={close} title="" centered size="90vh">
        {messageDocID ? <Chat messageDocID={messageDocID} /> : null}
      </Modal>

      <Button bg={"maroon"} onClick={handleOpen}>
        Chat with the owner
      </Button>
    </>
  );
}
