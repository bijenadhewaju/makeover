import React from 'react'
import AccessoriesCard from "./AccessoriesCard";
import { productsData } from '../assets/assets';
import { ArrowRight } from "lucide-react";

const Accessories = () => {
  const displayedProducts = productsData
  .filter((product) => product.category.includes("accessories"))
  .slice(0, 5);


  return (
    <div className="w-full py-8">
      <div className="max-w-[90%] mx-auto">
        {/* Section Header */}
        <div className="flex h- justify-between items-center mb-8">
          {/* Left: Flash Sale Title */}
          <h2 className="font-plus-jakarta-sans font-semibold text-3xl text-gray-700">
             Accessiories for you
          </h2>
          
          
          {/* Right: Explore All Link */}
          <a 
            href="/products"
            className="flex items-center gap-2 text-pink-500 hover:text-pink-600 transition duration-200 font-medium"
          >
            Explore All
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-10">
          {displayedProducts.map((product) => (
            <AccessoriesCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mobile Horizontal Scroll  */}
        <div className="md:hidden">
          <div className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide mb-5">
            {displayedProducts.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-64">
                <AccessoriesCard product={product} isMobile={true} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accessories