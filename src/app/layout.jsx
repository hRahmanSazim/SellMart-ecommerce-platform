import "./globals.css";
import { Lato } from "next/font/google";
import "@mantine/core/styles.css";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import "@mantine/carousel/styles.css";
// import Footer from "../../components/Footer";

const lato = Lato({ subsets: ["latin"], weight: "700" });

export const metadata = {
  title: "SellMart",
  description: "An ecommerce platform to sell and buy products.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={lato.className}>
        <MantineProvider>
          {children}
          {/* <Footer /> */}
        </MantineProvider>
      </body>
    </html>
  );
}
