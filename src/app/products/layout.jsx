import React from "react";
import Header from "../../../components/Header";

const ProductsLayout = ({ children }) => {
  return (
    <section>
      <Header />
      {children}
    </section>
  );
};

export default ProductsLayout;
