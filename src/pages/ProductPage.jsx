import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productsData, assets } from "../assets/assets";

const ProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const product = productsData.find((p) => String(p.id) === String(productId));
  if (!product) {
    return (
      <div className="max-w-6xl mx-auto pt-40 px-4 w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Product Not Found
          </h2>
          <button
            onClick={() => navigate("/")}
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  // Normalize images array and current image index
  const images =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : [product.image || assets.dress];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Quantity and cart state
  const [quantity, setQuantity] = useState(1);

  // Compute prices
  const unitPrice = Number(product.discountedPrice ?? product.price ?? 0);
  const originalPrice = Number(product.price ?? unitPrice);
  const discountPercent =
    originalPrice > 0
      ? Math.round(((originalPrice - unitPrice) / originalPrice) * 100)
      : 0;

  const subtotal = unitPrice * Math.max(1, Number(quantity));
  const total = subtotal;

  const addToCart = () => {
    const cartRaw = localStorage.getItem("cart");
    const cart = cartRaw ? JSON.parse(cartRaw) : [];
    const existingIndex = cart.findIndex(
      (i) =>
        String(i.productId) === String(product.id) && i.unitPrice === unitPrice
    );
    if (existingIndex > -1) {
      cart[existingIndex].quantity += Number(quantity);
      cart[existingIndex].total = Number(
        (cart[existingIndex].unitPrice * cart[existingIndex].quantity).toFixed(
          2
        )
      );
    } else {
      cart.push({
        productId: product.id,
        name: product.name,
        unitPrice,
        quantity: Number(quantity),
        total: Number(total.toFixed(2)),
        image: product.image || assets.dress,
      });
    }
    localStorage.setItem("cart", JSON.stringify(cart));

    // Enhanced notification
    const notification = document.createElement("div");
    notification.className =
      "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300";
    notification.innerHTML = `
			<div class="flex items-center gap-3">
				<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
					<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
				</svg>
				<span>Added ${quantity} × "${product.name}" to cart</span>
			</div>
		`;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.remove("translate-x-full");
      notification.classList.add("translate-x-0");
    }, 100);

    setTimeout(() => {
      notification.classList.remove("translate-x-0");
      notification.classList.add("translate-x-full");
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  };

  // Helper: derive average rating and stars
  const getRatingSummary = () => {
    if (Array.isArray(product.reviews) && product.reviews.length > 0) {
      const avg =
        product.reviews.reduce((s, r) => s + (r.rating || 0), 0) /
        product.reviews.length;
      const rounded = Math.round(avg * 2) / 2;
      return { avg, rounded, count: product.reviews.length };
    }
    if (typeof product.rating === "number") {
      return {
        avg: product.rating,
        rounded: Math.round(product.rating * 2) / 2,
        count: 0,
      };
    }
    return null;
  };

  const ratingSummary = getRatingSummary();

  // Render stars with half-star support
  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => {
      const starValue = index + 1;
      const isFullStar = starValue <= Math.floor(rating);
      const isHalfStar = !isFullStar && starValue - 0.5 <= rating;

      return (
        <span
          key={index}
          className={`text-xl ${
            isFullStar
              ? "text-pink-400"
              : isHalfStar
              ? "text-pink-400"
              : "text-gray-300"
          }`}
        >
          {isHalfStar ? "★" : "★"}
        </span>
      );
    });
  };

  return (
    <div className="max-w-6xl mx-auto pt-32 px-4 w-full mt-4 min-h-screen">
      {/* Breadcrumb */}
      <nav className="flex mb-6 text-sm text-gray-500">
        <button
          onClick={() => navigate("/")}
          className="hover:text-pink-500 transition-colors"
        >
          Home
        </button>
        <span className="mx-2">/</span>
        <button
          onClick={() => navigate("/products")}
          className="hover:text-pink-500 transition-colors"
        >
          Products
        </button>
        <span className="mx-2">/</span>
        <span className="text-gray-800 truncate max-w-xs">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Image Section */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className=" rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-6 flex items-center justify-center aspect-square">
            <img
              src={images[currentImageIndex] || assets.dress}
              alt={product.name}
              className="w-full h-full max-h-[70vh] object-contain rounded-lg"
            />
          </div>

          {/* Image Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`flex-shrink-0 rounded-xl overflow-hidden transition-all duration-200 ${
                    idx === currentImageIndex
                      ? "ring-3 ring-pink-500 scale-105"
                      : "ring-1 ring-gray-200 hover:ring-2 hover:ring-pink-300"
                  }`}
                  aria-label={`Show image ${idx + 1}`}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    className="w-20 h-20 lg:w-24 lg:h-24 object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details Section */}
        <div className="space-y-6">
          {/* Product Header */}
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              {product.name}
            </h1>

            {/* Rating */}
            {ratingSummary && (
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {renderStars(ratingSummary.avg)}
                  <span className="ml-2 text-lg font-semibold text-gray-900">
                    {ratingSummary.avg.toFixed(1)}
                  </span>
                </div>
                <span className="text-gray-500">•</span>
                <span className="text-gray-600">
                  {ratingSummary.count} reviews
                </span>
              </div>
            )}
          </div>

          {/* Price Section */}
          <div className=" rounded-2xl p-6 border border-pink-100">
            <div className="flex items-center gap-4 mb-2">
              <span className="text-3xl font-bold text-pink-600">
                ₹{unitPrice.toLocaleString()}
              </span>
              {discountPercent > 0 && (
                <>
                  <span className="text-xl text-gray-500 line-through">
                    ₹{originalPrice.toLocaleString()}
                  </span>
                  <span className=" text-pink-500 px-3 py-1 rounded-full text-sm font-semibold">
                    {discountPercent}% OFF
                  </span>
                </>
              )}
            </div>
            <p className="text-gray-500 font-medium text-sm">
              Inclusive of all taxes • Free shipping
            </p>
          </div>

          {/* Description */}
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed text-lg">
              {product.description}
            </p>
          </div>

          {/* Features/Benefits */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <svg
                className="w-5 h-5 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Free Shipping
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <svg
                className="w-5 h-5 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Easy Returns
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <svg
                className="w-5 h-5 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Authentic Product
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <svg
                className="w-5 h-5 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Warranty Included
            </div>
          </div>

          {/* Add to Cart Section */}
          <div className="space-y-4  p-6 border border-gray-200">
            {/* Quantity Selector */}
            <div className="flex items-center justify-between">
              <label className="text-md font-semibold text-gray-900">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 12H4"
                    />
                  </svg>
                </button>
                <span className="text-md font-semibold w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Total Price */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <span className="text-md font-semibold text-gray-900">Total</span>
              <span className="text-lg font-bold text-pink-600">
                ₹{total.toLocaleString()}
              </span>
            </div>
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={addToCart}
                className="flex-1 bg-pink-500 hover:bg-pink-600 text-white py-4 px-6 rounded-xl font-semibold text-md transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Add to Cart
              </button>
              <button className="flex-1 border-2 border-pink-500 text-pink-500 hover:bg-pink-50 py-4 px-6 rounded-xl font-semibold text-md transition-all duration-200">
                Buy Now
              </button>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
