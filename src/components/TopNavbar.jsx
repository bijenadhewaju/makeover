import React, { useState } from "react";
import { assets } from "../assets/assets";
import {
  Smartphone,
  BadgeIndianRupee,
  ShoppingCart,
  Zap,
  Menu,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const TopNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="w-full bg-white border-b border-gray-200">
      {/* Centered Container */}
      <div className="max-w-[90%] mx-auto flex items-center justify-between py-2 md:py-3 relative">
        {/* Left Section */}
        <div className="flex items-center gap-2 md:gap-4">
          <NavLink to="/">
            <img
              className="w-[100px] h-[120px] md:w-16 md:h-16"
              src={assets.icon}
              alt="Makeover Me Logo"
            />
          </NavLink>

          <div className="flex flex-col justify-center">
            <p className="font-plus-jakarta-sans italic text-sm md:text-sm text-pink-500">
              The Key to a New Me
            </p>
            <p className="font-plus-jakarta-sans font-semibold text-xl md:text-xl text-pink-500">
              Makeover Me
            </p>
          </div>
        </div>

        {/* Hamburger Menu */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1 rounded-md hover:bg-gray-100 transition"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Right Section */}
        <div
          className={`
            md:flex md:flex-row md:items-center md:gap-4
            ${
              mobileMenuOpen
                ? "flex flex-col items-center gap-2 absolute top-full left-1/2 -translate-x-1/2 w-full md:w-auto bg-white px-4 py-3 shadow-lg rounded-md"
                : "hidden md:flex md:flex-row md:relative"
            }
          `}
        >
          {/* Express Delivery */}
          <div className="flex items-center gap-1 md:gap-2 whitespace-nowrap">
            <Zap className="text-amber-300 fill-amber-300 w-4 h-4 md:w-4 md:h-4" />
            <span className="font-plus-jakarta-sans text-sm md:text-md text-gray-500">
              Express delivery to
            </span>
            <select className="w-24 md:w-28 py-0.5 md:py-1 text-sm md:text-md font-semibold text-gray-800 border-none outline-none focus:ring-0 bg-transparent">
              <option>Select City</option>
              <option>Pokhara</option>
              <option>Kathmandu</option>
              <option>Biratnagar</option>
              <option>Butwal</option>
            </select>
          </div>

          {/* Buttons */}
          <button className="flex items-center gap-1 md:gap-2 bg-pink-100 rounded-2xl px-3 py-1 md:px-3 md:py-1.5 hover:bg-pink-200 transition text-sm md:text-md font-medium whitespace-nowrap">
            <Smartphone className="text-gray-600 w-4 h-4" />
            Download App
          </button>

          <a
            href="/"
            className="flex items-center gap-1 md:gap-2 text-gray-700 hover:text-pink-600 transition text-sm md:text-md font-medium whitespace-nowrap"
          >
            <BadgeIndianRupee className="w-4 h-4 text-gray-500" />
            Offers
          </a>

          <a
            href="/cart"
            className="flex items-center gap-1 md:gap-2 text-gray-700 hover:text-pink-600 transition text-sm md:text-md font-medium whitespace-nowrap"
          >
            <ShoppingCart className="w-4 h-4 text-gray-500" />
            Cart
          </a>

          {/* User */}
          <div className="flex items-center gap-1 md:gap-2 whitespace-nowrap">
            <img
              src={assets.user}
              alt="User Avatar"
              className="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover border border-gray-300 shadow-sm"
            />
            <span className="font-plus-jakarta-sans text-sm md:text-md font-medium text-gray-700">
              Hello, Username
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
