import React from "react";
import { Spinner } from "@mantine/core"; // You can replace this with your preferred UI library or custom styling

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Spinner size="md" color="blue" />{" "}
      {/* Customize the size and color as needed */}
    </div>
  );
};

export default Loader;
