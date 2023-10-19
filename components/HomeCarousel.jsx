"use client";
import { Carousel } from "@mantine/carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";

const HomeCarousel = () => {
  const autoplay = useRef(Autoplay({ delay: 2000 }));
  return (
    <Carousel
      height="100%"
      slideSize={{ base: "100%", sm: "50%", md: "33.333333%" }}
      slideGap={{ base: 0, sm: "xs" }}
      align="start"
      plugins={[autoplay.current]}
      // onMouseEnter={autoplay.current.stop}
      // onMouseLeave={autoplay.current.reset}
      py={"sm"}
      loop
    >
      <Carousel.Slide>
        <Image
          src={"https://picsum.photos/250/350"}
          width={1080}
          height={400}
          alt="pic"
        ></Image>
      </Carousel.Slide>
      <Carousel.Slide>
        <Image
          src={"https://picsum.photos/350/450"}
          width={1080}
          height={400}
          alt="pic2"
        ></Image>
      </Carousel.Slide>
      <Carousel.Slide>
        <Image
          src={"https://picsum.photos/360/460"}
          width={1080}
          height={400}
          alt="pic3"
        ></Image>
      </Carousel.Slide>
    </Carousel>
  );
};

export default HomeCarousel;
