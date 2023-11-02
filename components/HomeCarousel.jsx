"use client";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Image } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { db } from "../firebase/firebase.config";
import { getDocs, getDoc, collection, doc, query } from "firebase/firestore";
import { useEffect, useState } from "react";

const HomeCarousel = () => {
  const [images, setImages] = useState();
  const [slides, setSlides] = useState();
  useEffect(() => {
    const getProductImages = async () => {
      const q = query(collection(db, "Products"));

      const querySnapshot = await getDocs(q);
      const res = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        res.push(doc.data().thumbnail);
      });
      setImages(res);
    };
    getProductImages();
  }, []);
  // const images = [
  //   "https://picsum.photos/200/300",
  //   "https://picsum.photos/400/500",
  //   "https://picsum.photos/900/1000",
  //   "https://picsum.photos/1100/2000",
  //   "https://picsum.photos/1300/2100",
  //   "https://picsum.photos/1300/2200",
  // ];
  // return (
  //   <Carousel
  //     height="100%"
  //     slideSize={{ base: "100%", sm: "50%", md: "33.333333%" }}
  //     slideGap={{ base: 0, sm: "xs" }}
  //     align="start"
  //     plugins={[autoplay.current]}
  //     onMouseEnter={autoplay.current.stop}
  //     onMouseLeave={autoplay.current.reset}
  //     withIndicators
  //     py={"sm"}
  //     loop
  //   >
  //     <Carousel.Slide>
  //       <Image
  //         src={"https://picsum.photos/250/350"}
  //         width={1080}
  //         height={400}
  //         alt="pic"
  //       ></Image>
  //     </Carousel.Slide>
  //     <Carousel.Slide>
  //       <Image
  //         src={"https://picsum.photos/350/450"}
  //         width={1080}
  //         height={400}
  //         alt="pic2"
  //       ></Image>
  //     </Carousel.Slide>
  //     <Carousel.Slide>
  //       <Image
  //         src={"https://picsum.photos/360/460"}
  //         width={1080}
  //         height={400}
  //         alt="pic3"
  //       ></Image>
  //     </Carousel.Slide>
  //   </Carousel>
  // );
  useEffect(() => {
    if (images) {
      const slides = images.map((url) => (
        <Carousel.Slide key={url}>
          <Image src={url} width={1080} height={400} alt="test" />
        </Carousel.Slide>
      ));
      setSlides(slides);
    }
  }, [images]);

  return (
    <Carousel
      withIndicators
      // height="100%"
      // slideSize={{ base: "100%", sm: "50%", md: "33.333333%" }}
      // slideGap={{ base: 0, sm: "xs" }}
      // plugins={[autoplay.current]}
      // py={"sm"}
      height={400}
      slideSize={{ base: "100%", sm: "50%", md: "33.333333%" }}
      slideGap={{ base: 0, sm: "xs" }}
      align="start"
      py={"sm"}
    >
      {slides}
    </Carousel>
  );
};

export default HomeCarousel;

// const images = [
//   "https://res.cloudinary.com/ifeomaimoh/image/upload/v1652345767/demo_image2.jpg",
//   "https://res.cloudinary.com/ifeomaimoh/image/upload/v1652366604/demo_image5.jpg",
//   "https://res.cloudinary.com/ifeomaimoh/image/upload/v1652345874/demo_image1.jpg",
// ];
// const images = [
//   "https://picsum.photos/200/300",
//   "https://picsum.photos/400/500",
//   "https://picsum.photos/900/1000",
//   "https://picsum.photos/1100/2000",
//   "https://picsum.photos/1300/2100",
//   "https://picsum.photos/1300/2200",
// ];
// const HomeCarousel = () => {
//   const slides = images.map((url) => (
//     <Carousel.Slide key={url}>
//       <Image src={url} width={1080} height={400} alt="test" />
//     </Carousel.Slide>
//   ));
//   return (
//     <Carousel useKeyboardArrows={true} autoPlay interval="1000" infiniteLoop>
//       {slides}
//     </Carousel>
//   );
// };
// export default HomeCarousel;
