import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { categoryAPI } from "../utils/api";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BottomNavbar = () => {
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollContainerRef = React.useRef(null);

  // Fetch categories from API
  useEffect(() => {
    fetchCategories();
  }, []);

  // Check scroll position for mobile navigation
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const handleScroll = () => {
        setScrollPosition(container.scrollLeft);
        setCanScrollLeft(container.scrollLeft > 0);
        setCanScrollRight(
          container.scrollLeft < container.scrollWidth - container.clientWidth
        );
      };
      
      container.addEventListener('scroll', handleScroll);
      // Initial check
      handleScroll();
      
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const categoriesData = await categoryAPI.getAll();
      // Add static categories if needed
      const allCategories = [
        ...(categoriesData || []),
        // Add any static categories here if needed
      ];
      setCategories(allCategories);
    } catch (err) {
      console.error('Error fetching categories:', err);
      // Fallback to default categories
      setCategories([
        { id: 1, name: "Women", slug: "women" },
        { id: 2, name: "Men", slug: "men" },
        { id: 3, name: "Kids", slug: "kids" },
        { id: 4, name: "Beauty", slug: "beauty" },
        { id: 5, name: "Skincare", slug: "skincare" },
        { id: 6, name: "Makeup", slug: "makeup" },
        { id: 7, name: "Accessories", slug: "accessories" },
        { id: 8, name: "Offers", slug: "offers" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  // Check if a category is active
  const isCategoryActive = (categorySlug) => {
    const path = location.pathname;
    return path.includes(`/products/${categorySlug}`) || 
           (location.search.includes(`category=${categorySlug}`));
  };

  if (loading && categories.length === 0) {
    return (
      <div className="w-full bg-white shadow-sm sticky top-[48px] md:top-[64px] lg:top-[72px] z-40">
        <nav className="font-jakarta-sans font-light text-gray-700 border-b border-gray-100">
          <div className="max-w-[90%] mx-auto py-3">
            <div className="hidden lg:flex items-center justify-between">
              {[...Array(8)].map((_, idx) => (
                <div key={idx} className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
              ))}
            </div>
            <div className="flex lg:hidden items-center justify-center">
              <div className="h-6 bg-gray-200 rounded w-full max-w-md animate-pulse"></div>
            </div>
          </div>
        </nav>
      </div>
    );
  }

  return (
    <div className="w-full bg-white shadow-sm sticky top-[48px] md:top-[64px] lg:top-[72px] z-40">
      <nav className="font-jakarta-sans font-light text-gray-700 border-b border-gray-100">
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex max-w-[90%] mx-auto items-center justify-between py-3 text-[15px]">
          <Link
            to="/products"
            className={`hover:text-pink-600 transition-colors duration-200 whitespace-nowrap ${
              location.pathname === "/products" ? "text-pink-600 font-medium" : ""
            }`}
          >
            All Products
          </Link>
          
          {categories.slice(0, 8).map((category) => (
            <Link
              key={category.id}
              to={`/products/${category.slug || category.name.toLowerCase()}`}
              className={`hover:text-pink-600 transition-colors duration-200 whitespace-nowrap ${
                isCategoryActive(category.slug || category.name.toLowerCase()) 
                  ? "text-pink-600 font-medium" 
                  : ""
              }`}
            >
              {category.name}
            </Link>
          ))}
        </div>

        {/* Mobile & Tablet Navigation - Horizontal scroll with arrows */}
        <div className="relative flex lg:hidden items-center">
          {/* Left scroll button */}
          {canScrollLeft && (
            <button
              onClick={scrollLeft}
              className="absolute left-0 z-10 bg-white/90 backdrop-blur-sm p-2 shadow-sm"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
          )}
          
          {/* Right scroll button */}
          {canScrollRight && (
            <button
              onClick={scrollRight}
              className="absolute right-0 z-10 bg-white/90 backdrop-blur-sm p-2 shadow-sm"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          )}

          {/* Scrollable navigation */}
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-x-auto scrollbar-hide"
          >
            <div className="flex items-center gap-6 px-4 py-3 min-w-max text-sm md:text-[15px]">
              <Link
                to="/products"
                className={`hover:text-pink-600 transition-colors duration-200 whitespace-nowrap ${
                  location.pathname === "/products" 
                    ? "text-pink-600 font-medium border-b-2 border-pink-600" 
                    : ""
                }`}
              >
                All Products
              </Link>
              
              {categories.slice(0, 10).map((category) => (
                <Link
                  key={category.id}
                  to={`/products/${category.slug || category.name.toLowerCase()}`}
                  className={`hover:text-pink-600 transition-colors duration-200 whitespace-nowrap ${
                    isCategoryActive(category.slug || category.name.toLowerCase()) 
                      ? "text-pink-600 font-medium border-b-2 border-pink-600" 
                      : ""
                  }`}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default BottomNavbar;