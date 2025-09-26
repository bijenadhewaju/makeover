import React from "react";
import { brands } from "../assets/assets";
import { ArrowRight } from "lucide-react";

const BrandSection = () => {
  return (
    <div className="w-full py-8 mt-8">
      <div className="max-w-[90%] mx-auto">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-plus-jakarta-sans font-semibold text-3xl text-gray-700">
            Best Beauty Products
          </h2>
        </div>

        {/* Desktop Grid*/}
        <div className="hidden lg:grid grid-cols-3 gap-6">
          {brands.map((brand) => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>

        {/* Tablet Grid */}
        <div className="hidden md:grid lg:hidden grid-cols-2 gap-6">
          {brands.map((brand) => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden">
          <div className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            {brands.map((brand) => (
              <div key={brand.id} className="flex-shrink-0 w-80">
                <BrandCard brand={brand} isMobile={true} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Brand Card Component with Mobile Support
const BrandCard = ({ brand, isMobile = false }) => {
  return (
    <div className={`bg-purple-100 border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300 ${
      isMobile ? 'w-80' : 'w-full max-w-[381px]'
    }`}>
      
      <div className="relative">
        <img 
          src={brand.image} 
          alt={brand.name}
          className={`w-full ${isMobile ? 'h-40' : 'h-48'} object-cover`}
        />
      </div>

      {/* Brand Content */}
      <div className="p-4"> 
        {/* Discount Badge */}
        <div className="mb-3"> 
          <span className="bg-gray-100 text-gray-700 text-sm ml-4 font-semibold px-3 py-1 rounded">
            {brand.discount}
          </span>
        </div>
        
        {/* Tagline and Arrow Button */}
        <div className="flex justify-between items-center gap-4"> 
          <p className="text-gray-500 text-sm flex-1 ml-4">
            {brand.tagline}
          </p>
          
          <button className="bg-pink-500 hover:bg-pink-600 text-white mr-4 p-2 rounded-full transition duration-200 flex-shrink-0">
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrandSection;