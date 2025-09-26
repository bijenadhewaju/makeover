import React from "react";
import ProductCard from "./ProductCard";
import { productsData } from '../assets/assets';
import { ArrowRight } from "lucide-react";

const ProductDay = () => {
  // Show only first 5 products
  const displayedProducts = productsData.slice(0, 5);

  return (
    <div className="w-full py-8">
      <div className="max-w-[90%] mx-auto">
        {/* Section Header */}
        <div className="flex h-16 justify-between items-center mb-8">
          {/* Left: Flash Sale Title */}
          <h2 className="font-plus-jakarta-sans font-semibold text-2xl text-gray-700">
            Product Of The Day
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
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mobile Horizontal Scroll  */}
        <div className="md:hidden">
          <div className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            {displayedProducts.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-64">
                <ProductCard product={product} isMobile={true} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDay;