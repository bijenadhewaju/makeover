import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { productAPI, authAPI, cartAPI } from "../utils/api";
import { ImageOff, ShoppingCart, LogIn, X, Check, AlertCircle } from "lucide-react";

const ProductPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showCartNotification, setShowCartNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("success");

  useEffect(() => {
    if (slug) {
      fetchProduct(slug);
    }
  }, [slug]);

  const fetchProduct = async (productSlug) => {
    try {
      setLoading(true);
      setError(null);
      const data = await productAPI.getBySlug(productSlug);
      setProduct(data);
    } catch (err) {
      console.error('Error fetching product:', err);
      setError('Product not found or failed to load.');
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  const cleanImageUrl = (url) => {
    if (!url || url === "string" || url.includes("string")) {
      return null;
    }
    return url;
  };

  const getValidImages = () => {
    if (!product) return [];
    
    const validImages = [];
    
    if (product.preview) {
      const cleaned = cleanImageUrl(product.preview);
      if (cleaned) validImages.push(cleaned);
    }
    
    if (Array.isArray(product.images)) {
      product.images.forEach(img => {
        if (img?.image) {
          const cleaned = cleanImageUrl(img.image);
          if (cleaned) validImages.push(cleaned);
        }
      });
    }
    
    return validImages;
  };

  const showCartSuccess = (message) => {
    setNotificationMessage(message);
    setNotificationType("success");
    setShowCartNotification(true);
    setTimeout(() => setShowCartNotification(false), 2000);
  };

  const showErrorMessage = (message) => {
    setNotificationMessage(message);
    setNotificationType("error");
    setShowCartNotification(true);
    setTimeout(() => setShowCartNotification(false), 3000);
  };

  const addToCart = async () => {
    // Check if user is logged in
    if (!authAPI.isAuthenticated()) {
      setShowLoginPopup(true);
      return;
    }
    
    if (product.stock <= 0) {
      showErrorMessage("This product is out of stock");
      return;
    }
    
    setIsAddingToCart(true);
    
    try {
      await cartAPI.addItem(product.id, quantity);
      showCartSuccess(`Added ${quantity} × "${product.name}" to cart!`);
    } catch (error) {
      console.error('Failed to add to cart:', error);
      showErrorMessage(error.message || 'Failed to add to cart');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleImageError = (e) => {
    e.target.style.display = 'none';
    const placeholderDiv = e.target.parentNode.querySelector('.image-placeholder');
    if (placeholderDiv) {
      placeholderDiv.classList.remove('hidden');
    }
  };

  const handleThumbnailError = (e) => {
    e.target.src = assets.placeholder;
  };

  const unitPrice = parseFloat(product?.unit_price) || 0;
  const total = unitPrice * Math.max(1, Number(quantity));

  const getRatingSummary = () => {
    if (product && typeof product.rating === "number") {
      return {
        avg: product.rating,
        rounded: Math.round(product.rating * 2) / 2,
        count: 0,
      };
    }
    return null;
  };

  const ratingSummary = getRatingSummary();

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

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto pt-32 px-4 w-full mt-4 min-h-screen">
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
          <span className="text-gray-800 truncate max-w-xs">Loading...</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="space-y-4 animate-pulse">
            <div className="rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-6 flex items-center justify-center aspect-square bg-gray-200"></div>
            <div className="flex gap-3">
              {[...Array(4)].map((_, idx) => (
                <div key={idx} className="w-20 h-20 lg:w-24 lg:h-24 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="h-10 bg-gray-200 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-6xl mx-auto pt-40 px-4 w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {error || "Product Not Found"}
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

  const images = getValidImages();
  const hasImages = images.length > 0;
  const currentImage = hasImages ? images[currentImageIndex] : null;

  return (
    <>
      {/* Login Popup (Top Right) */}
      {showLoginPopup && (
        <div className="fixed top-4 right-4 z-[9999]">
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
                    src={images[0] || assets.placeholder}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-lg border border-gray-200"
                    onError={(e) => e.target.src = assets.placeholder}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">{product.name}</h4>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-sm font-bold text-pink-600">
                        ₹{unitPrice.toLocaleString()}
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
                            id: product.id,
                            name: product.name,
                            image: images[0],
                            price: unitPrice,
                            quantity: quantity
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
      {showCartNotification && (
        <div className={`fixed top-4 right-4 z-[9998] rounded-lg border p-4 shadow-lg animate-slide-in ${
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
              onClick={() => setShowCartNotification(false)}
              className="text-gray-400 hover:text-gray-600 ml-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto pt-32 px-4 w-full mt-4 min-h-screen">
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
          {product.category && (
            <>
              <button
                onClick={() => navigate(`/products?category=${product.category.slug}`)}
                className="hover:text-pink-500 transition-colors"
              >
                {product.category.name}
              </button>
              <span className="mx-2">/</span>
            </>
          )}
          <span className="text-gray-800 truncate max-w-xs">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="space-y-4">
            <div className="rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-6 flex items-center justify-center aspect-square bg-gray-50">
              {hasImages && currentImage ? (
                <>
                  <div className="hidden image-placeholder flex-col items-center justify-center text-gray-400">
                    <ImageOff className="w-16 h-16 mb-4" />
                    <span className="text-lg">No image</span>
                  </div>
                  
                  <img
                    src={currentImage}
                    alt={product.name}
                    className="w-full h-full max-h-[70vh] object-contain rounded-lg"
                    onError={handleImageError}
                  />
                </>
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-400">
                  <ImageOff className="w-16 h-16 mb-4" />
                  <span className="text-lg">No image</span>
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`flex-shrink-0 rounded-xl overflow-hidden transition-all duration-200 ${
                      idx === currentImageIndex
                        ? "ring-3 ring-pink-500 scale-105"
                        : "ring-1 ring-gray-200 hover:ring-2 hover:ring-pink-300"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${idx + 1}`}
                      className="w-20 h-20 lg:w-24 lg:h-24 object-cover"
                      onError={handleThumbnailError}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                {product.name}
              </h1>

              {product.category && (
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-gray-500">Category:</span>
                  <span className="text-sm text-pink-500 font-medium">
                    {product.category.name}
                  </span>
                </div>
              )}

              {ratingSummary && product.rating > 0 && (
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1">
                    {renderStars(ratingSummary.avg)}
                    <span className="ml-2 text-lg font-semibold text-gray-900">
                      {ratingSummary.avg.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-600">
                    {product.rating > 0 ? "Rated" : "No ratings yet"}
                  </span>
                </div>
              )}

              <div className="flex flex-wrap gap-2 mb-4">
                {product.is_featured && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded">
                    Featured
                  </span>
                )}
                {product.is_flash_sale && (
                  <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded">
                    Flash Sale
                  </span>
                )}
                {product.is_best_seller && (
                  <span className="px-2 py-1 bg-purple-100 text-purple-600 text-xs font-semibold rounded">
                    Best Seller
                  </span>
                )}
                {product.is_product_of_the_day && (
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-600 text-xs font-semibold rounded">
                    Product of the Day
                  </span>
                )}
              </div>
            </div>

            <div className="rounded-2xl p-6 border border-pink-100">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-3xl font-bold text-pink-600">
                  ₹{unitPrice.toLocaleString()}
                </span>
              </div>
              <p className="text-gray-500 font-medium text-sm">
                Inclusive of all taxes • Free shipping
              </p>
              {product.stock > 0 ? (
                <p className="text-green-600 text-sm mt-2">
                  In Stock: {product.stock} items available
                </p>
              ) : (
                <p className="text-red-600 text-sm mt-2">Out of Stock</p>
              )}
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed text-lg">
                {product.description || "No description available."}
              </p>
            </div>

            <div className="space-y-4 p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <label className="text-md font-semibold text-gray-900">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={product.stock <= 0}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                    disabled={product.stock <= 0 || quantity >= product.stock}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <span className="text-md font-semibold text-gray-900">Total</span>
                <span className="text-lg font-bold text-pink-600">
                  ₹{total.toLocaleString()}
                </span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={addToCart}
                  disabled={product.stock <= 0 || isAddingToCart}
                  className="flex-1 bg-pink-500 hover:bg-pink-600 text-white py-4 px-6 rounded-xl font-semibold text-md transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isAddingToCart ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Adding...
                    </div>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                    </>
                  )}
                </button>
                <button 
                  disabled={product.stock <= 0}
                  className="flex-1 border-2 border-pink-500 text-pink-500 hover:bg-pink-50 py-4 px-6 rounded-xl font-semibold text-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;