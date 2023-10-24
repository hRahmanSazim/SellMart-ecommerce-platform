import { Flex, Text } from "@mantine/core";
import Link from "next/link";
// import Image from "next/image";
import { query, collection, getDocs, where } from "firebase/firestore";
import { db } from "../firebase/firebase.config";

export default async function UserProductList({ params }) {
  const productsRef = collection(db, "Products");
  // console.log(localStorage.getItem("myUID"));
  const q = query(productsRef, where("userId", "==", params));

  const res = [];
  const querySnapshot = await getDocs(q);
  // console.log(querySnapshot);
  // const posts = querySnapshot.docs;
  querySnapshot.forEach((doc) => {
    //   // let obj = {doc.id:doc.data()}
    //   // doc.data() is never undefined for query doc snapshots
    res.push({
      id: doc.id,
      ...doc.data(),
      created_at: doc.data().created_at.toDate().toDateString(),
    });
  });
  return (
    <Flex w="100%" direction={"column"} mt={"xl"}>
      {res.length > 0 && (
        <Flex mt={"sm"} direction={"column"} w={"100%"}>
          {res.map((obj) => (
            <ul key={obj.id}>
              <Flex direction={"row"} h={"150px"} mb={"1rem"}>
                <Flex>
                  <Flex w={"150px"}>
                    {/* <Image                  // setup images of products here
                      src={obj.cover_photo}
                      alt="post_photo"
                      width={150}
                      height={100}
                    /> */}
                  </Flex>
                  <Flex direction={"column"}>
                    <Flex direction={"row"} justify={"space-between"}>
                      <Link href={`/products/${obj.id}`}>
                        <Text size="1.5rem" pl="1.5rem">
                          Title: {obj.title}
                        </Text>
                      </Link>
                      {/* <Flex direction={"row"} gap={"xs"}>
                        <EditModal obj={obj} />
                        <DeleteModal obj={obj} />
                      </Flex> */}
                    </Flex>

                    <Text w={"500px"} pl={"1.5rem"} lineClamp={3}>
                      {obj.body}
                    </Text>
                    <Text c={"gray"} pl={"1.5rem"} pt={"1rem"}>
                      Posted: {obj.created_at}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </ul>
          ))}
        </Flex>
      )}
      {res.length === 0 && (
        <Flex
          mt={"5rem"}
          direction={"column"}
          justify={"center"}
          align={"center"}
        >
          <Text size="1rem">You currently have no products uploaded!!!</Text>
        </Flex>
      )}
    </Flex>
  );
}
