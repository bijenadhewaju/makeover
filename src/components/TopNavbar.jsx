import React from "react";
import { assets } from "../assets/assets";
import { Smartphone, BadgeIndianRupee, ShoppingCart, Zap } from "lucide-react";

const TopNavbar = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-evenly border-b border-gray-200 bg-white">
      
      <div className="flex flex-row items-center gap-8 ml-8 mb-4 md:mb-0">
  {/* Logo & Tagline */}
  <div className="flex items-center gap-3">
    <img
      className="w-[140px] h-[165px] md:w-20 md:h-20"
      src={assets.icon}
      alt="Makeover Me Logo"
    />
    <div className="flex flex-col justify-end">
      <p className="font-plus-jakarta-sans font-normal italic text-sm md:text-sm text-pink-500">
        The Key to a New Me
      </p>
      <p className="font-plus-jakarta-sans font-semibold text-2xl md:text-2xl text-pink-500">
        Makeover Me
      </p>
    </div>
  </div>

  {/* ---- Vertical Divider ---- */}
  <div className="w-px h-12 bg-gray-400"></div>

  {/* ---- Express Delivery & City ---- */}
  <div className="flex flex-col justify-center">
    <div className="flex items-center mb-1">
      <Zap className="text-amber-300 fill-amber-300 mr-2" />
      <span className="font-plus-jakarta-sans text-sm text-gray-500">
        Express delivery to
      </span>
    </div>
    <select className="w-28 py-1 font-plus-jakarta-sans font-semibold text-sm text-gray-800 border-none outline-none focus:ring-0 bg-transparent">
      <option>Select City</option>
      <option>Pokhara</option>
      <option>Kathmandu</option>
      <option>Biratnagar</option>
      <option>Butwal</option>
    </select>
  </div>
</div>


      {/* ---- Download App ---- */}
      <div className="flex items-center  gap-30">
          {/* Download App */}
          <button className="flex items-center gap-2 bg-pink-100 rounded-2xl px-4 py-2 hover:bg-pink-200 transition">
            <Smartphone className="text-gray-600 w-4 h-4" />
            <span className="font-plus-jakarta-sans text-medium font-medium">
              Download App
            </span>
          </button>

          {/* Offers */}
          <a
            href="/"
            className="flex items-center gap-2 text-gray-700 hover:text-pink-600 transition"
          >
            <BadgeIndianRupee className="w-4 h-4 text-gray-500" />
            <span className="font-plus-jakarta-sans text-medium font-medium">
              Offers
            </span>
          </a>

          {/* Cart */}
          <a
            href="/"
            className="flex items-center gap-2 text-gray-700 hover:text-pink-600 transition"
          >
            <ShoppingCart className="w-4 h-4 text-gray-500" />
            <span className="font-plus-jakarta-sans text-medium font-medium">
              Cart
            </span>
          </a>

          {/* User */}
          <div className="flex items-center gap-2">
            <img
              src={assets.user}
              alt="User Avatar"
              className="w-10 h-10 rounded-full object-cover border border-gray-300 shadow-sm"
            />
            <span className="font-plus-jakarta-sans text-medium font-medium text-gray-700">
              Hello, Username
            </span>
          </div>
      </div>
    </div>
  );
};

export default TopNavbar;
