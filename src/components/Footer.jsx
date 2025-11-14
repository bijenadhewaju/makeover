import React from "react";
import { assets } from "../assets/assets";
import { Linkedin, Instagram, Facebook, Twitch } from "lucide-react";

const Footer = () => {
  const categories = [
    "Women",
    "Men",
    "Kids",
    "Beauty Products",
    "Skincare",
    "Hairstyles",
    "Plus",
    "Offers",
  ];
  const supportLinks = [
    "Help Center",
    "Contact Us",
    "Shipping & Returns",
    "Order Tracking",
    "FAQs",
    "Contact Us",
    "Feedback",
    "Report a Problem",
  ];

  return (
    <footer className="w-full py-8 bg-pink-100 bottom-0">
      <div className="max-w-[90%] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/*  Icon section */}

          <div className="flex flex-col gap-2 md:gap-4">
            <img
              className="w-20 h-20 md:w-50 md:h-50 items-center"
              src={assets.icon}
              alt="Makeover Me Logo"
            />
            <div className="justify-center items-center ">
              <p className="font-plus-jakarta-sans italic text-lg md:text-2xl text-pink-500">
                The Key to a New Me
              </p>
              <p className="font-plus-jakarta-sans font-semibold text-xl md:text-3xl items-center text-pink-500">
                Makeover Me
              </p>
              <p className="font-plus-jakarta-sans text-sm text-justify md:text-md text-gray-500">
                "Makeover Me" is a unique e-commerce platform aimed at
                revolutionizing the way people experience personal
                transformations. It offers a seamless and interactive online
                space where users can explore various beauty, fashion, and
                wellness services tailored to their individual needs.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2  gap-12 md:gap-8 md:grid-cols-2">
          {/*  Categories Section */}
          <div className="flex flex-col gap-2 md:gap-4">
            <div className="font-plus-jakarta-sans text-sm md:text-xl mt-20 text-pink-500">
              MM Categories
            </div>
            <div className="flex flex-col max-w-[90%] text-gray-500 py-3 text-[15px]">
              {categories.map((category, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="hover:text-pink-600 transition-colors duration-200 whitespace-nowrap"
                >
                  {category}
                </a>
              ))}
            </div>
          </div>

          {/*  Support Section */}

          <div className="flex flex-col gap-2 md:gap-4">
            <div className="font-plus-jakarta-sans text-sm md:text-xl mt-20 text-pink-500">
              MM Categories
            </div>
            <div className="flex flex-col max-w-[90%] text-gray-500 py-3 text-md">
              {supportLinks.map((link, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="hover:text-pink-600 transition-colors duration-200 whitespace-nowrap"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
          </div>

          {/* Social Media Section */}
          <div className="flex flex-col gap-2 md:gap-4">
            <div className="font-plus-jakarta-sans text-sm md:text-xl mt-20 text-pink-500">
              Follow Us
            </div>
            <div className="flex flex-col max-w-[90%] text-gray-500 py-3 text-[15px]">
              <form className="flex flex-row">
                <input
                  type="email"
                  className="text-dark block border border-gray-300 bg-gray-50  rounded-l-md p-2.5  text-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter your email"
                  required
                />
                <button className=" bg-pink-500 text-white rounded-r-md px-4 py-2">
                  Subscribe
                </button>
              </form>
            </div>
            <div  className=" flex flex-row gap-3 text-gray-700 py-3 text-[20px] ">
              <Linkedin className="h-5 w-5" />
              <Instagram className="h-5 w-5" />
              <Facebook className="h-5 w-5" />
              <Twitch className="h-5 w-5" />
            </div>
          </div>
        </div>
        <div>
          {/*  Copyright Section */}
          <div className="border-t border-gray-300 py-4 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Makeover Me. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
