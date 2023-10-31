"use client";
import React, { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import {
  Modal,
  Button,
  Textarea,
  TextInput,
  Text,
  Autocomplete,
  rem,
} from "@mantine/core";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { useRouter } from "next/navigation";
import { HiOutlinePencil } from "react-icons/hi";
import { PiCurrencyDollarBold } from "react-icons/pi";

const EditProduct = ({ obj }) => {
  const dollarIcon = (
    <PiCurrencyDollarBold style={{ width: rem(22), height: rem(22) }} />
  );
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const productRef = doc(db, "Products", obj.uid);

  const [title, setTitle] = useState(obj.title);
  const [body, setBody] = useState(obj.body);
  const [category, setCategory] = useState(obj.category);
  const [price, setPrice] = useState(obj.price);

  const handleProduct = async (event) => {
    close();
    event.preventDefault();
    editProduct();
  };
  const editProduct = async () => {
    // const q = query(productRef, where("userId", "==", `${obj.uid}`));
    // const res = [];
    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
    //   res.push({
    //     id: doc.id,
    //     ...doc.data(),
    //   });
    // });
    await updateDoc(productRef, {
      title: title,
      body: body,
      category: category,
      price: price,
      createdAt: serverTimestamp(),
    });
    router.refresh();
  };
  return (
    <>
      <Modal opened={opened} onClose={close} c={"blue"} size={"50rem"} centered>
        <Text size="xl" fw={900} ta={"center"}>
          Edit your product details
        </Text>
        <TextInput
          data-autofocus
          label="Change Product Title"
          my="md"
          size="lg"
          defaultValue={obj.title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          size="xl"
          radius="xs"
          label=" Change Product Description"
          description=""
          defaultValue={obj.body}
          autosize
          minRows={2}
          maxRows={6}
          onChange={(e) => setBody(e.target.value)}
        />
        <Autocomplete
          label="Change Product Category"
          placeholder={obj.category}
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
          label="Change Product Price:"
          placeholder={obj.price}
          my="md"
          size="lg"
          onChange={(e) => setPrice(e.target.value)}
          leftSection={dollarIcon}
          leftSectionPointerEvents="none"
        ></TextInput>
        <Button onClick={handleProduct} mt={"md"}>
          Update
        </Button>
      </Modal>
      <Button onClick={open} bg={"violet"}>
        <HiOutlinePencil size="1.5rem"></HiOutlinePencil>
      </Button>
    </>
  );
};

export default EditProduct;
