"use client";
import { useState, useEffect } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../firebase/firebase.config";
import { v4 as uuidv4 } from "uuid";
import { FileInput, Button } from "@mantine/core";
import { useParams } from "next/navigation";

function ImageUpload({ uid }) {
  console.log(uid);
  const params = useParams();
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const imagesListRef = ref(storage, "images/");
  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(
      storage,
      `users/${params.id}/images/${imageUpload.name + uuidv4().slice(4)}`
    );
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
  };

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);
  //   console.log(imageUrls);
  //   console.log(imageUpload);
  return (
    <>
      {/* <FileInput
        label="Upload files"
        placeholder="Upload files"
        multiple
        // onChange={(event) => {
        //   setImageUpload(event.target.files[0]);
        // }}
        value={imageUpload}
        onChange={setImageUpload}
        // fileInputProps={setImageUpload}
        // clearable
      /> */}
      <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <Button onClick={uploadFile}> Upload Image</Button>
      {/* {imageUrls.map((url) => {
        return <img src={url} />;
      })} */}
    </>
  );
}

export default ImageUpload;
