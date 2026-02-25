import React, { useState } from "react";
import { assets } from "../assets/assets";
import { ShoppingCart, Heart, ImageOff, Check, AlertCircle, LogIn, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI, cartAPI } from '../utils/api';

const ProductCard = ({ product, isMobile = false }) => {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("success");
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const productId = product.id;
  const productSlug = product.slug;
  const productName = product.name;
  
  const getProductImage = () => {
    if (product.preview && product.preview !== "string") return product.preview;
    if (product.image && product.image !== "string") return product.image;
    
    if (Array.isArray(product.images) && product.images.length > 0) {
      const firstImage = product.images[0];
      if (firstImage?.image && firstImage.image !== "string") {
        return firstImage.image;
      }
    }
    
    return assets.placeholder;
  };

  const productImage = getProductImage();
  const productPrice = parseFloat(product.unit_price) || 0;
  const productRating = product.rating || 0;
  const isPlaceholder = productImage === assets.placeholder;

  const showCartSuccess = (message) => {
    setNotificationMessage(message);
    setNotificationType("success");
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const showErrorMessage = (message) => {
    setNotificationMessage(message);
    setNotificationType("error");
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (!authAPI.isAuthenticated()) {
      // Show login popup instead of redirecting immediately
      setShowLoginPopup(true);
      return;
    }
    
    if (product.stock <= 0) {
      showErrorMessage("This product is out of stock");
      return;
    }
    
    setIsAddingToCart(true);
    
    try {
      await cartAPI.addItem(productId, 1);
      showCartSuccess(`${productName} added to cart!`);
    } catch (error) {
      console.error('Failed to add to cart:', error);
      showErrorMessage(error.message || 'Failed to add to cart');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleImageError = (e) => {
    e.target.src = assets.placeholder;
    e.target.onerror = null;
  };

  return (
    <div className="relative">
      {/* Login Popup (Top Right) */}
      {showLoginPopup && (
        <div className=" top-4 right-4 z-[9999]">
          <div className="relative">
            {/* Semi-transparent backdrop for popup only */}
            <div 
              className="fixed inset-0 "
              onClick={() => setShowLoginPopup(false)}
            ></div>
            
            {/* Popup container */}
            <div className="relative z-50 bg-white rounded-xl shadow-2xl border border-gray-200 w-80 animate-slide-in-right">
              {/* Header with close button */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                    <LogIn className="w-4 h-4 text-pink-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Login Required</h3>
                    <p className="text-xs text-gray-500">Continue shopping with login</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowLoginPopup(false)}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Product Info */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <img
                    src={productImage}
                    alt={productName}
                    className="w-12 h-12 object-cover rounded-lg border border-gray-200"
                    onError={handleImageError}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">{productName}</h4>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-sm font-bold text-pink-600">
                        ₹{productPrice.toLocaleString()}
                      </span>
                      {product.stock > 0 && product.stock < 10 && (
                        <span className="text-xs text-orange-500">
                          Only {product.stock} left
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Message */}
              <div className="p-4">
                <p className="text-sm text-gray-600 mb-4">
                  Login to add this item to your cart and continue shopping
                </p>
                
                {/* Action Buttons */}
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setShowLoginPopup(false);
                      navigate('/login', { 
                        state: { 
                          from: window.location.pathname,
                          product: {
                            id: productId,
                            name: productName,
                            image: productImage,
                            price: productPrice
                          }
                        } 
                      });
                    }}
                    className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Login to Continue
                  </button>
                  <button
                    onClick={() => setShowLoginPopup(false)}
                    className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2.5 px-4 rounded-lg transition-colors"
                  >
                    Continue as Guest
                  </button>
                </div>
                
                {/* Signup Link */}
                <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                  <p className="text-xs text-gray-500">
                    New to Makeover Me?{' '}
                    <button
                      onClick={() => {
                        setShowLoginPopup(false);
                        navigate('/signup');
                      }}
                      className="text-pink-500 hover:text-pink-600 font-semibold"
                    >
                      Create an account
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Small Cart Success Notification */}
      {showNotification && (
        <div className={` top-4 right-4 z-[9998] rounded-lg border p-4 shadow-lg animate-slide-in ${
          notificationType === 'success' 
            ? 'bg-green-50 border-green-200 text-green-800' 
            : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          <div className="flex items-center gap-3">
            {notificationType === 'success' ? (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">{notificationMessage}</p>
                  <p className="text-xs text-green-600 mt-0.5">Added to cart successfully!</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">{notificationMessage}</p>
                </div>
              </div>
            )}
            <button
              onClick={() => setShowNotification(false)}
              className="text-gray-400 hover:text-gray-600 ml-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div
        className={`rounded-lg overflow-hidden ${isMobile ? "w-64" : "w-full"} group hover:shadow-lg transition-shadow duration-300`}
      >
        <div
          className={`relative bg-white border border-gray-200 rounded-lg ${
            isMobile ? "p-2" : "p-4"
          }`}
        >
          <Link to={`/product/${productSlug}`} className="block">
            <div className={`relative ${isMobile ? "h-48" : "h-80"} flex items-center justify-center bg-gray-50`}>
              {isPlaceholder ? (
                <div className="flex flex-col items-center justify-center text-gray-400">
                  <ImageOff className={`${isMobile ? "w-12 h-12" : "w-16 h-16"} mb-2`} />
                  <span className="text-sm">No image</span>
                </div>
              ) : (
                <img
                  src={productImage}
                  alt={productName}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  onError={handleImageError}
                  loading="lazy"
                />
              )}
            </div>
          </Link>

          {product.is_best_seller && (
            <div className={`absolute ${isMobile ? "top-2 left-2" : "top-4 left-4"}`}>
              <span className="px-2 py-1 bg-blue-400 text-white text-xs font-semibold rounded">
                BEST SELLER
              </span>
            </div>
          )}

          {product.is_flash_sale && (
            <div className={`absolute ${isMobile ? "top-2 left-2" : "top-4 left-4"}`}>
              <span className="px-2 py-1 bg-pink-500 text-white text-xs font-semibold rounded">
                FLASH SALE
              </span>
            </div>
          )}

          <div className={`absolute ${isMobile ? "top-2 right-2" : "top-4 right-4"}`}>
            <button className="flex items-center gap-1 text-neutral-500 text-xs font-semibold">
              <ShoppingCart className="w-3 h-3 text-gray-600" />
              {!isMobile && "Express delivery"}
            </button>
          </div>
        </div>

        <div className={isMobile ? "p-2" : "p-4"}>
          <Link to={`/product/${productSlug}`} className="block">
            <h3
              className={`font-plus-jakarta-sans font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-pink-600 transition-colors ${
                isMobile ? "text-sm" : ""
              }`}
            >
              {productName}
            </h3>
          </Link>

          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-1">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-sm ${
                      star <= Math.floor(productRating)
                        ? "text-amber-500"
                        : star - 0.5 <= productRating
                        ? "text-amber-500"
                        : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span
                className={`text-amber-500 font-semibold ml-1 ${
                  isMobile ? "text-xs" : "text-sm"
                }`}
              >
                {productRating.toFixed(1)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <span
              className={`font-bold text-pink-600 ${
                isMobile ? "text-lg" : "text-xl"
              }`}
            >
              ₹{productPrice.toLocaleString()}
            </span>

            {product.stock > 0 && product.stock < 10 && (
              <span className="text-xs text-orange-500 font-medium">
                Only {product.stock} left
              </span>
            )}
            
            {product.stock === 0 && (
              <span className="text-xs text-red-500 font-medium">
                Out of stock
              </span>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0 || isAddingToCart}
              className={`flex-1 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-md transition duration-200 flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed ${
                isMobile ? "py-1 px-2 text-xs" : "py-2 px-4"
              }`}
            >
              {isAddingToCart ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Adding...
                </div>
              ) : (
                <>
                  <ShoppingCart className={isMobile ? "w-3 h-3" : "w-4 h-4"} />
                  {product.stock > 0 ? 'Add To Cart' : 'Out of Stock'}
                </>
              )}
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
    </div>
  );
};

export default ProductCard;