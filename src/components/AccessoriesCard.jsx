import React from "react";
import { assets } from "../assets/assets";

const AccessoriesCard = ({ product, isMobile = false }) => {
  const discountPercentage =
    product.price && product.discountedPrice
      ? Math.round(((product.price - product.discountedPrice) / product.price) * 100)
      : 0;

  return (
    <div
      className={`flex flex-col items-center   p-4 hover:shadow-md transition duration-200 ${
        isMobile ? "w-32" : "w-40"
      }`}
    >
      {/* Round Image */}
      <img
        src={product.image || assets.placeholder}
        alt={product.name}
        className={`rounded-full object-cover ${
          isMobile ? "w-24 h-24" : "w-32 h-32"
        }`}
      />

      {/* Product Name */}
      <h3
        className={`mt-2 text-center font-semibold text-gray-800 line-clamp-2 ${
          isMobile ? "text-sm" : "text-base"
        }`}
      >
        {product.name}
      </h3>

      {/* Pricing */}
      <div className="flex items-center gap-2 mt-1">
        <span className={`font-bold text-pink-600 ${isMobile ? "text-sm" : "text-base"}`}>
          ₹{product.discountedPrice?.toLocaleString()}
        </span>
        {product.discountedPrice < product.price && (
          <span className={`text-gray-500 line-through ${isMobile ? "text-xs" : "text-sm"}`}>
            ₹{product.price?.toLocaleString()}
          </span>
        )}
      </div>

      {/* Discount Badge */}
      {discountPercentage > 0 && (
        <span
          className={`mt-1 bg-pink-100 text-pink-600 text-xs font-semibold px-2 py-1 rounded-full`}
        >
          {discountPercentage}% OFF
        </span>
      )}
    </div>
  );
};

export default AccessoriesCard;
