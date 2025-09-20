import React from 'react';
import { categories } from '../assets/assets';

const ProductCategories = () => {
  return (
    <section className="w-full py-16 px-4 flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="group flex flex-col items-center text-center transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
            <div className="relative w-28 h-28 mb-10 flex items-center justify-center">
              <img
                src={cat.Image}
                alt={cat.category}
                className="max-w-full max-h-full object-contain transform group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h3 className="font-semibold text-lg mb-2 text-gray-800 group-hover:text-pink-600 transition-colors duration-300">
              {cat.category}
            </h3>
            <span className="text-red-500 font-medium text-sm">{cat.offer}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductCategories;
