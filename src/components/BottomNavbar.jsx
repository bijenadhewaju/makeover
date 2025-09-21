import React from "react";

const BottomNavbar = () => {
  return (
    <nav className="font-jakarta-sans font-light text-[15px] w-full flex items-center justify-center gap-15 py-3 text-gray-700 border-b bg-white border-gray-100 pb-20 mb-20">
      <a href="#" className="hover:text-pink-600">
        Women
      </a>
      <a href="#" className="hover:text-pink-600">
        Men
      </a>
      <a href="#" className="hover:text-pink-600">
        Kids
      </a>
      <a href="#" className="hover:text-pink-600">
        Beauty Products
      </a>
      <a href="#" className="hover:text-pink-600">
        Hairstyles
      </a>
      <a href="#" className="hover:text-pink-600">
        PLUS
      </a>
      <a href="#" className="hover:text-pink-600">
        Offers
      </a>
    </nav>
  );
};

export default BottomNavbar;
