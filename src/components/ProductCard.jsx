import React from "react";
import { assets } from "../assets/assets";
import { ShoppingCart, Heart } from "lucide-react";

const ProductCard = ({ product, isMobile = false }) => {
  return (
    <div className={`rounded-lg overflow-hidden ${isMobile ? 'w-64' : 'w-full'}`}>
      {/* Product Image  */}
      <div className={`relative bg-white border border-gray-200 rounded-lg ${isMobile ? 'p-2' : 'p-4'}`}>
        <img 
          src={product.image || assets.placeholder} 
          alt={product.name}
          className={`w-full ${isMobile ? 'h-48' : 'h-80'} object-contain`} 
        />
        
        {/* BEST SELLER Badge */}
        {product.isBestseller && (
          <div className={`absolute ${isMobile ? 'top-2 left-2' : 'top-4 left-4'}`}>
            <span className="text-neutral-500 text-xs font-semibold">
              BEST SELLER
            </span>
          </div>
        )}
        
        {/* Express Delivery */}
        <div className={`absolute ${isMobile ? 'top-2 right-2' : 'top-4 right-4'}`}>
          <button className="flex items-center gap-1 text-neutral-500 text-xs font-semibold">
            <ShoppingCart className="w-3 h-3 text-gray-600" />
            {!isMobile && "Express delivery"}
          </button>
        </div>
      </div>

      {/* Product Content */}
      <div className={isMobile ? 'p-2' : 'p-4'}>
        {/* Product Name */}
        <h3 className={`font-plus-jakarta-sans font-semibold text-gray-800 mb-2 line-clamp-2 ${isMobile ? 'text-sm' : ''}`}>
          {product.name}
        </h3>
        
        {/* Discount and Rating Row */}
        <div className="flex justify-between items-center mb-2">
          {/* Discount */}
          <span className={`text-neutral-500 font-semibold ${isMobile ? 'text-xs' : 'text-sm'}`}>
            {product.discount}% OFF
          </span>
          
          {/* Rating */}
          <div className="flex items-center gap-1">
            <span className={`text-amber-500 font-semibold ${isMobile ? 'text-xs' : 'text-sm'}`}>
              {product.rating}★
            </span>
            <span className={`text-gray-500 ${isMobile ? 'text-xs' : 'text-xs'}`}>
              ({product.reviews})
            </span>
          </div>
        </div>
        
        {/* Pricing */}
        <div className="flex items-center gap-2 mb-3">
          <span className={`font-bold text-pink-600 ${isMobile ? 'text-lg' : 'text-xl'}`}>
            ₹{product.price.toLocaleString()}
          </span>
          <span className={`text-gray-500 line-through ${isMobile ? 'text-xs' : 'text-sm'}`}>
            ₹{product.originalPrice.toLocaleString()}
          </span>
        </div>
        
        {/* Add to Cart and Wishlist Buttons */}
        <div className="flex gap-2">
          <button className={`flex-1 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-md transition duration-200 flex items-center justify-center gap-1 ${
            isMobile ? 'py-1 px-2 text-xs' : 'py-2 px-4'
          }`}>
            <ShoppingCart className={isMobile ? "w-3 h-3" : "w-4 h-4"} />
            Add To Cart
          </button>
          <button className={`bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-md transition duration-200 flex items-center justify-center ${
            isMobile ? 'p-1' : 'py-2 px-4'
          }`}>
            <Heart className={isMobile ? "w-3 h-3" : "w-4 h-4"} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;