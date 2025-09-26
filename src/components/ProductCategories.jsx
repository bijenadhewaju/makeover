import React from 'react';
import { categories } from '../assets/assets';

const ProductCategories = () => {
  return (
    <section className="w-full py-8 md:py-12 lg:py-16">
      <div className="max-w-[90%] mx-auto">
        
        {/* Desktop*/}
        <div className="hidden lg:block">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-4 xl:gap-6 min-w-max items-center justify-between">
              {categories.map((cat, idx) => (
                <div
                  key={idx}
                  className="group flex flex-col items-center text-center transform hover:-translate-y-1 transition-all duration-300 cursor-pointer flex-shrink-0"
                >
                  <div className="relative w-20 h-20 xl:w-24 xl:h-24 mb-3 flex items-center justify-center">
                    <img
                      src={cat.Image}
                      alt={cat.category}
                      className="max-w-full max-h-full object-contain transform group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-semibold text-sm xl:text-base mb-1 text-gray-800 group-hover:text-pink-600 transition-colors duration-300 whitespace-nowrap">
                    {cat.category}
                  </h3>
                  <span className="text-red-500 font-medium text-xs">{cat.offer}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tablet Grid */}
        <div className="hidden md:grid lg:hidden grid-cols-4 gap-3">
          {categories.slice(0, 8).map((cat, idx) => (
            <div
              key={idx}
              className="group flex flex-col items-center text-center transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <div className="relative w-16 h-16 mb-2 flex items-center justify-center">
                <img
                  src={cat.Image}
                  alt={cat.category}
                  className="max-w-full max-h-full object-contain transform group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="font-semibold text-xs mb-1 text-gray-800 group-hover:text-pink-600 transition-colors duration-300">
                {cat.category}
              </h3>
              <span className="text-red-500 font-medium text-xs">{cat.offer}</span>
            </div>
          ))}
        </div>

        {/* Mobile Scrollable */}
        <div className="md:hidden overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 pb-2 min-w-max px-1">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                className="group flex flex-col items-center text-center transform hover:-translate-y-1 transition-all duration-300 cursor-pointer flex-shrink-0 w-20"
              >
                <div className="relative w-14 h-14 mb-2 flex items-center justify-center">
                  <img
                    src={cat.Image}
                    alt={cat.category}
                    className="max-w-full max-h-full object-contain transform group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-semibold text-xs mb-1 text-gray-800 group-hover:text-pink-600 transition-colors duration-300 text-center leading-tight">
                  {cat.category}
                </h3>
                <span className="text-red-500 font-medium text-xs">{cat.offer}</span>
              </div>
            ))}
          </div>
        </div>

        {/* View All Button for Mobile/Tablet */}
        <div className="lg:hidden flex justify-center mt-4">
          <button className="bg-pink-100 hover:bg-pink-200 text-pink-600 font-medium text-sm px-6 py-2 rounded-full transition-colors duration-300">
            View All Categories
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
