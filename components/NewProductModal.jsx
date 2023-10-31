"use client";
import { useDisclosure } from "@mantine/hooks";
import {
  Modal,
  Button,
  Textarea,
  TextInput,
  Text,
  Autocomplete,
  FileInput,
  rem,
  Flex,
} from "@mantine/core";
import { useState } from "react";
import {
  collection,
  addDoc,
  doc,
  serverTimestamp,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { useRouter } from "next/navigation";
import { PiCurrencyDollarBold } from "react-icons/pi";
import { ImUpload } from "react-icons/im";

function randomNumber(max, min) {
  return String(Math.trunc(Math.random() * (max - min) + min));
}
export default function ProductModal({ params }) {
  const dollarIcon = (
    <PiCurrencyDollarBold style={{ width: rem(22), height: rem(22) }} />
  );
  const router = useRouter();
  // const params = useParams();
  // console.log(params);
  const [opened, { open, close }] = useDisclosure(false);
  //   const [coverphoto, setCoverPhoto] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState();
  const [price, setPrice] = useState(0);
  const [body, setBody] = useState("");
  const productsCollectionRef = collection(db, "Products");
  const handleProduct = async (event) => {
    close();
    event.preventDefault();
    createProduct();
  };
  const createProduct = async () => {
    const userDocRef = doc(db, "users", params);
    const docSnap = await getDoc(userDocRef);
    const data = docSnap.data();
    const docRef = await addDoc(productsCollectionRef, {
      title: title,
      body: body,
      createdAt: serverTimestamp(),
      price: price,
      thumbnail: `https://picsum.photos/${randomNumber(3000, 2700)}/449`,
      user: {
        avatar: `https://www.gravatar.com/avatar/?d=robohash`,
        email: data?.email,
        displayName: `${data.displayName}`,
      },
      category: category,
      userId: params,
    });
    await setDoc(
      doc(db, "Products", docRef.id),
      {
        uid: docRef.id,
      },
      { merge: true }
    );
    router.refresh();
  };
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        c={"#5a189a"}
        size={"50rem"}
        centered
      >
        <Text size="2rem" fw={"bolder"}>
          PRODUCT INFO
        </Text>
        <TextInput
          data-autofocus
          label="Title of your product"
          placeholder="Title here..."
          my="md"
          size="lg"
          onChange={(e) => setTitle(e.target.value)}
        ></TextInput>

        <Textarea
          size="lg"
          radius="xs"
          label="Description"
          description=""
          placeholder="Start writing about your product..."
          autosize
          minRows={2}
          maxRows={6}
          onChange={(e) => setBody(e.target.value)}
        />
        <Autocomplete
          label="Category of your product"
          placeholder="Search"
          data={[
            "Electronics",
            "Furniture",
            "Toys",
            "Home Appliances",
            "Clothing",
          ]}
          size="lg"
          onOptionSubmit={(value) => setCategory(value)}
        />
        <TextInput
          data-autofocus
          label="Price of your product"
          placeholder="Price here:"
          my="md"
          size="lg"
          onChange={(e) => setPrice(e.target.value)}
          leftSection={dollarIcon}
          leftSectionPointerEvents="none"
        ></TextInput>
        <Flex direction="row" align={"center"} gap={"md"}>
          <FileInput
            size="lg"
            variant="filled"
            label="Upload product image"
            withAsterisk
            // placeholder="upload image"
          >
            {/* <Button bg={"#8B85C1"}>
              <ImUpload size={"2rem"} />
            </Button> */}
          </FileInput>
        </Flex>
        <Button onClick={handleProduct} mt={"md"} bg={"#8B85C1"}>
          Upload
        </Button>
      </Modal>
      <Button onClick={open} bg={"#3d348b"}>
        Upload a product
      </Button>
    </>
  );
}
