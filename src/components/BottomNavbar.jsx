import React from "react";

const BottomNavbar = () => {
  const categories = [
    "Women",
    "Men",
    "Kids",
    "Beauty Products",
    "Skincare",
    "Hairstyles",
    "Plus",
    "Offers"
  ];

  return (
    <div className="w-full bg-white shadow-sm sticky top-[48px] md:top-[64px] lg:top-[72px] z-40">
      <nav className="font-jakarta-sans font-light text-gray-700 border-b border-gray-100">
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex max-w-[90%] mx-auto items-center justify-between py-3 text-[15px]">
          {categories.map((category, idx) => (
            <a
              key={idx}
             href={`/products/${category}`}
              className="hover:text-pink-600 transition-colors duration-200 whitespace-nowrap"
            >
              {category}
            </a>
          ))}
        </div>

        {/* Mobile & Tablet Navigation - Horizontal scroll */}
        <div className="flex md:flex lg:hidden overflow-x-auto scrollbar-hide">
          <div className="flex max-w-[90%] mx-automax-w-[90%] mx-auto items-center gap-6 px-4 py-2 min-w-max text-xs sm:text-sm md:text-[15px]">
            {categories.map((category, idx) => (
              <a
                key={idx}
                href={`/products/${category}`}
                className="hover:text-pink-600 transition-colors duration-200 whitespace-nowrap"
              >
                {category}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default BottomNavbar;
