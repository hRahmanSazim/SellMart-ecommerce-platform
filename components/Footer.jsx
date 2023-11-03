// import Link from "next/link";
// import { Flex } from "@mantine/core";

// const Footer = () => {
//   return (
//     <footer>
//       <Flex direction={"row"}>
//         <div className="footer-content">
//           <div className="footer-section">
//             <h2>About Us</h2>
//             <p>Your eCommerce website's mission and description.</p>
//           </div>

//           <div className="footer-section">
//             <h2>Quick Links</h2>
//             <ul>
//               <li>
//                 <Link href="/products">
//                   <p>Products</p>
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/about">
//                   <p>About</p>
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/contact">
//                   <p>Contact</p>
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           <div className="footer-section">
//             <h2>Contact Us</h2>
//             <p>
//               Email:{" "}
//               <Link href="mailto:info@example.com">info@example.com</Link>
//             </p>
//             <p>
//               Phone: <Link href="tel:+123456789">123-456-789</Link>
//             </p>
//           </div>
//         </div>
//       </Flex>
//     </footer>
//   );
// };

// export default Footer;
import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-dark-6 border-t border-gray-300 dark:border-dark-5 py-8 md:py-12">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 md:px-0">
        <div className="md:max-w-2xl">
          <p className="text-lg font-semibold text-gray-600 dark:text-dark-1 text-center md:text-left">
            Ecommerce platform to empower your retail adventures.
          </p>
        </div>
        <div className="flex flex-wrap justify-center md:justify-end space-x-4 mt-4 md:mt-0">
          {/* Group 1 */}
          <div className="w-36">
            <h2 className="text-lg text-gray-800 dark:text-dark-3 font-bold mb-2">
              About
            </h2>
            <ul>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-dark-1 hover:underline block"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-dark-1 hover:underline block"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-dark-1 hover:underline block"
                >
                  Support
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-dark-1 hover:underline block"
                >
                  Forums
                </a>
              </li>
            </ul>
          </div>

          {/* Group 2 */}
          <div className="w-36">
            <h2 className="text-lg text-gray-800 dark:text-dark-3 font-bold mb-2">
              Project
            </h2>
            <ul>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-dark-1 hover:underline block"
                >
                  Contribute
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-dark-1 hover:underline block"
                >
                  Media assets
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-dark-1 hover:underline block"
                >
                  Changelog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-dark-1 hover:underline block"
                >
                  Releases
                </a>
              </li>
            </ul>
          </div>

          {/* Group 3 */}
          <div className="w-36">
            <h2 className="text-lg text-gray-800 dark:text-dark-3 font-bold mb-2">
              Community
            </h2>
            <ul>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-dark-1 hover:underline block"
                >
                  Join Discord
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-dark-1 hover:underline block"
                >
                  Follow on Twitter
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-dark-1 hover:underline block"
                >
                  Email newsletter
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-dark-1 hover:underline block"
                >
                  GitHub discussions
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
