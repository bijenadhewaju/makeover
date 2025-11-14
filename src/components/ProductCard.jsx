import React from "react";
import { assets } from "../assets/assets";
import { ShoppingCart, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, isMobile = false }) => {
  const discountPercentage = Math.round(
    ((product.price - product.discountedPrice) / product.price) * 100
  );

  // Add-to-cart handler (uses same 'cart' as ProductPage/Cart)
  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const unitPrice = Number(product.discountedPrice ?? product.price ?? 0);
    const qty = 1;
    const cartRaw = localStorage.getItem("cart");
    const cart = cartRaw ? JSON.parse(cartRaw) : [];
    const existingIndex = cart.findIndex(
      (i) =>
        String(i.productId) === String(product.id) && Number(i.unitPrice) === unitPrice
    );
    if (existingIndex > -1) {
      cart[existingIndex].quantity = Number(cart[existingIndex].quantity) + qty;
      cart[existingIndex].total = Number(
        (cart[existingIndex].unitPrice * cart[existingIndex].quantity).toFixed(2)
      );
    } else {
      cart.push({
        productId: product.id,
        name: product.name,
        unitPrice,
        quantity: qty,
        total: Number((unitPrice * qty).toFixed(2)),
        image: product.image || assets.placeholder,
      });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`Added ${qty} × ${product.name} to cart`);
  };

  return (
    <div
      className={`rounded-lg overflow-hidden ${isMobile ? "w-64" : "w-full"}`}
    >
      {/* Product Image  */}
      <div
        className={`relative bg-white border border-gray-200 rounded-lg ${
          isMobile ? "p-2" : "p-4"
        }`}
      >
        {/* clickable image -> routes to /product/:productId */}
        <Link to={`/product/${product.id}`} className="block">
          <img
            src={product.image || assets.placeholder}
            alt={product.name}
            className={`w-full ${isMobile ? "h-48" : "h-80"} object-contain`}
          />
        </Link>

        {/* BEST SELLER Badge */}
        {product.isBestseller && (
          <div
            className={`absolute ${isMobile ? "top-2 left-2" : "top-4 left-4"}`}
          >
            <span className="text-neutral-500 text-xs font-semibold">
              BEST SELLER
            </span>
          </div>
        )}

        {/* Express Delivery */}
        <div
          className={`absolute ${isMobile ? "top-2 right-2" : "top-4 right-4"}`}
        >
          <button className="flex items-center gap-1 text-neutral-500 text-xs font-semibold">
            <ShoppingCart className="w-3 h-3 text-gray-600" />
            {!isMobile && "Express delivery"}
          </button>
        </div>
      </div>

      {/* Product Content */}
      <div className={isMobile ? "p-2" : "p-4"}>
        {/* Product Name (clickable) */}
        <Link to={`/product/${product.id}`} className="block">
          <h3
            className={`font-plus-jakarta-sans font-semibold text-gray-800 mb-2 line-clamp-2 ${
              isMobile ? "text-sm" : ""
            }`}
          >
            {product.name}
          </h3>
        </Link>

        {/* Discount and Rating Row */}
        <div className="flex justify-between items-center mb-2">
          {/* Discount */}
          {discountPercentage > 0 && (
            <span
              className={`text-neutral-500 font-semibold ${
                isMobile ? "text-xs" : "text-sm"
              }`}
            >
              {discountPercentage}% OFF
            </span>
          )}

          {/* Rating */}
          <div className="flex items-center gap-1">
            <span
              className={`text-amber-500 font-semibold ${
                isMobile ? "text-xs" : "text-sm"
              }`}
            >
              {product.rating}★
            </span>
            <span
              className={`text-gray-500 ${isMobile ? "text-xs" : "text-xs"}`}
            >
              ({product.reviews})
            </span>
          </div>
        </div>

        {/* Pricing */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`font-bold text-pink-600 ${
              isMobile ? "text-lg" : "text-xl"
            }`}
          >
            ₹{product.discountedPrice.toLocaleString()}
          </span>

          {product.discountedPrice < product.price && (
            <span
              className={`text-gray-500 line-through ${
                isMobile ? "text-xs" : "text-sm"
              }`}
            >
              ₹{product.price.toLocaleString()}
            </span>
          )}
        </div>

        {/* Add to Cart and Wishlist Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            className={`flex-1 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-md transition duration-200 flex items-center justify-center gap-1 ${
              isMobile ? "py-1 px-2 text-xs" : "py-2 px-4"
            }`}
          >
            <ShoppingCart className={isMobile ? "w-3 h-3" : "w-4 h-4"} />
            Add To Cart
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            className={`bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-md transition duration-200 flex items-center justify-center ${
              isMobile ? "p-1" : "py-2 px-4"
            }`}
          >
            <Heart className={isMobile ? "w-3 h-3" : "w-4 h-4"} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
