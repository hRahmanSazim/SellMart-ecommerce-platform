"use client";
import { useDisclosure } from "@mantine/hooks";
import {
  Modal,
  Button,
  Textarea,
  TextInput,
  Text,
  Autocomplete,
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
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebase.config";
import { v4 as uuidv4 } from "uuid";
import { ImUpload } from "react-icons/im";

export default function UploadProduct({ params }) {
  const dollarIcon = (
    <PiCurrencyDollarBold style={{ width: rem(22), height: rem(22) }} />
  );
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [title, setTitle] = useState("");
  const [uid, setUid] = useState();
  const [category, setCategory] = useState();
  const [price, setPrice] = useState(0);
  const [body, setBody] = useState("");
  const productsCollectionRef = collection(db, "Products");
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrl, setImageUrl] = useState();

  const handleProduct = async (event) => {
    event.preventDefault();
    close();
    await uploadImage();
    await createProduct();
  };
  const uploadImage = async () => {
    if (imageUpload != null) {
      const imageRef = ref(
        storage,
        `products/${params}/${imageUpload.name + uuidv4().slice(4, 8)}`
      );
      uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImageUrl(url);
        });
      });
    }
  };
  const createProduct = async () => {
    const userDocRef = doc(db, "users", params);
    const docSnap = await getDoc(userDocRef);
    const data = docSnap.data();
    if (imageUrl != null) {
      const docRef = await addDoc(productsCollectionRef, {
        title: title,
        body: body,
        createdAt: serverTimestamp(),
        price: price,
        user: {
          avatar: `https://www.gravatar.com/avatar/?d=robohash`,
          email: data.email,
          displayName: data.displayName,
        },
        category: category,
        userId: params,
        thumbnail: imageUrl,
      });
      await setDoc(
        doc(db, "Products", docRef.id),
        {
          uid: docRef.id,
        },
        { merge: true }
      );
      setUid(docRef.id);
      router.refresh();
    }
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
        <Flex direction="row" align={"center"} gap={"md"} pb={"md"}>
          <label htmlFor="input">Upload product thumbnail:</label>
          <input
            type="file"
            onChange={(event) => {
              setImageUpload(event.target.files[0]);
            }}
            className="input"
          />
        </Flex>

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

        <Button onClick={handleProduct} mt={"md"} bg={"#8B85C1"}>
          Upload
        </Button>
      </Modal>
      <Button onClick={open} bg={"#3d348b"}>
        <Text pr={"xs"}>Upload a product </Text>
        <ImUpload size={"1.3rem"} />
      </Button>
    </>
  );
}
