/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "www.google.com",
      "images.unsplash.com",
      "i.dummyjson.com",
      "random.imagecdn.app",
      "picsum.photos",
      "robohash.org",
      "freelogopng.com",
      "img.freepik.com",
      "plus.unsplash.com",
      "www.target.com",
      "upload.wikimedia.org",
      "www.gravatar.com",
      "i.ibb.co",
    ],
    disableStaticImages: true,
  },
};

module.exports = nextConfig;
