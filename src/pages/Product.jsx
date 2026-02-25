import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";
import { productAPI, categoryAPI } from "../utils/api";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

const Product = () => {
  const { categoryRoute } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [pageSize] = useState(12); // Products per page

  // Fetch categories from API on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Parse URL parameters on component mount and URL changes
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    
    // Get search query from URL
    const query = searchParams.get('q') || '';
    setSearchQuery(query);
    
    // Get page from URL
    const page = parseInt(searchParams.get('page')) || 1;
    setCurrentPage(page);
    
    // Get other filters from URL if they exist
    const urlCategory = searchParams.get('category') || '';
    const urlPriceRange = searchParams.get('price') || '';
    const urlSort = searchParams.get('sort') || 'default';
    
    // Update states from URL params
    if (urlCategory) setCategory(urlCategory);
    if (urlPriceRange) setPriceRange(urlPriceRange);
    if (urlSort) setSortOrder(urlSort);
  }, [location.search, categoryRoute]);

  // Update category state when URL param changes
  useEffect(() => {
    if (categoryRoute) {
      setCategory(categoryRoute.toLowerCase());
      // Update URL to include category
      updateURL({ category: categoryRoute.toLowerCase(), page: 1 });
    } else {
      setCategory("");
    }
  }, [categoryRoute]);

  // Fetch products based on filters and pagination
  useEffect(() => {
    fetchProducts();
  }, [category, priceRange, searchQuery, currentPage]);

  // Fetch all categories from API
  const fetchCategories = async () => {
    try {
      setCategoriesLoading(true);
      const categoriesData = await categoryAPI.getAll();
      setCategories(categoriesData || []);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setCategories([]);
    } finally {
      setCategoriesLoading(false);
    }
  };

  // Function to update URL with current filters
  const updateURL = (newParams = {}) => {
    const searchParams = new URLSearchParams(location.search);
    
    // Update or add new parameters
    Object.entries(newParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.set(key, value);
      } else {
        searchParams.delete(key);
      }
    });
    
    // Navigate to new URL with updated params
    const newPath = categoryRoute 
      ? `/products/${categoryRoute}?${searchParams.toString()}`
      : `/products?${searchParams.toString()}`;
    
    navigate(newPath, { replace: true });
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {
        page: currentPage,
        page_size: pageSize
      };
      
      // Add category filter - use slug
      if (category) {
        const categoryObj = categories.find(cat => 
          cat.slug?.toLowerCase() === category.toLowerCase() || 
          cat.name?.toLowerCase() === category.toLowerCase()
        );
        
        if (categoryObj) {
          params.category = categoryObj.slug || categoryObj.id;
        } else {
          params.category = category;
        }
      }
      
      // Add price filter
      if (priceRange) {
        const [min, max] = priceRange.split("-");
        params.min_price = min;
        params.max_price = max;
      }
      
      // Add search query
      if (searchQuery.trim()) {
        params.search = searchQuery.trim();
      }
      
      console.log('Fetching products with params:', params);
      const response = await productAPI.getAll(params);
      
      // Handle pagination response
      if (response.results) {
        setProducts(response.results);
        setTotalProducts(response.count || response.results.length);
        setTotalPages(Math.ceil((response.count || response.results.length) / pageSize));
      } else {
        // If no pagination data, assume it's a regular array
        setProducts(response || []);
        setTotalProducts(response?.length || 0);
        setTotalPages(1);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Please try again later.');
      setProducts([]);
      setTotalProducts(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Apply sorting
    if (sortOrder === "low-to-high") {
      list.sort((a, b) => parseFloat(a.unit_price || 0) - parseFloat(b.unit_price || 0));
    } else if (sortOrder === "high-to-low") {
      list.sort((a, b) => parseFloat(b.unit_price || 0) - parseFloat(a.unit_price || 0));
    } else if (sortOrder === "newest") {
      // Assuming products have a created_at field
      list.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
    } else if (sortOrder === "best-selling") {
      // Assuming products have a sales_count or is_best_seller field
      list.sort((a, b) => {
        const aSales = a.sales_count || (a.is_best_seller ? 1 : 0);
        const bSales = b.sales_count || (b.is_best_seller ? 1 : 0);
        return bSales - aSales;
      });
    }

    return list;
  }, [products, sortOrder]);

  const handleCategoryChange = (value) => {
    setCategory(value);
    setCurrentPage(1); // Reset to first page when category changes
    if (value) {
      const selectedCategory = categories.find(cat => 
        cat.slug === value || cat.id === value
      );
      const categorySlug = selectedCategory?.slug || value;
      
      updateURL({ 
        category: categorySlug,
        page: 1
      });
    } else {
      updateURL({ 
        category: null,
        page: 1
      });
    }
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
    setCurrentPage(1); // Reset to first page when price changes
    updateURL({ 
      price: value,
      page: 1
    });
  };

  const handleSortChange = (value) => {
    setSortOrder(value);
    updateURL({ sort: value });
  };

  const handleClearFilters = () => {
    setCategory("");
    setPriceRange("");
    setSortOrder("default");
    setSearchQuery("");
    setCurrentPage(1);
    navigate("/products");
  };

  // Pagination handlers
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    updateURL({ page });
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page, last page, and pages around current page
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust if we're at the beginning or end
      if (currentPage <= 3) {
        startPage = 2;
        endPage = 4;
      } else if (currentPage >= totalPages - 2) {
        startPage = totalPages - 3;
        endPage = totalPages - 1;
      }
      
      pages.push(1);
      
      if (startPage > 2) {
        pages.push('...');
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  // Show search query in header if present
  const getHeaderText = () => {
    if (searchQuery) {
      return `Search Results for "${searchQuery}"`;
    } else if (category) {
      const categoryObj = categories.find(cat => 
        cat.slug === category || cat.id === category
      );
      return categoryObj ? `${categoryObj.name} Products` : `${category} Products`;
    } else {
      return "All Products";
    }
  };

  // Get current category name for display
  const getCurrentCategoryName = () => {
    if (category) {
      const categoryObj = categories.find(cat => 
        cat.slug === category || cat.id === category
      );
      return categoryObj ? categoryObj.name : category;
    }
    return "";
  };

  if (loading || categoriesLoading) {
    return (
      <div className="max-w-[90%] mx-auto pt-56 px-4 w-full">
        <div className="mb-12">
          <div className="max-w-[90%] mx-auto w-full h-70 bg-gray-200 animate-pulse rounded-lg"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Filters skeleton */}
          <div className="lg:col-span-1 p-4 space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i}>
                  <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
                  <div className="h-10 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Products skeleton */}
          <div className="lg:col-span-2 p-4">
            <div className="flex justify-between mb-8">
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              <div className="h-10 bg-gray-200 rounded w-32"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 rounded-lg h-64 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[90%] mx-auto pt-56 px-4 w-full">
      {/* Banner */}
      <div className="mb-12">
        <img
          src={assets.banner || "/default-banner.jpg"}
          alt="Banner"
          className="max-w-[90%] mx-auto w-full h-70 shadow-md bg-pink-400"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Filters */}
        <div className="lg:col-span-1 p-4">
          <h2 className="text-2xl font-semibold mb-6 text-gray-600">Filters</h2>

          <div className="space-y-4">
            {/* Category */}
            <div>
              <h3 className="text-lg font-medium text-gray-500 mb-2">Category</h3>
              <select
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full border-b-2 border-gray-500 p-2 focus:outline-none focus:border-pink-500 bg-transparent"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.slug || cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div>
              <h3 className="text-lg font-medium text-gray-500 mb-2">Price Range</h3>
              <select
                value={priceRange}
                onChange={(e) => handlePriceChange(e.target.value)}
                className="w-full border-b-2 border-gray-500 p-2 focus:outline-none focus:border-pink-500 bg-transparent"
              >
                <option value="">All Prices</option>
                <option value="0-1500">Rs. 0 - Rs. 1500</option>
                <option value="1500-3000">Rs. 1500 - Rs. 3000</option>
                <option value="3000-5000">Rs. 3000 - Rs. 5000</option>
                <option value="5000-999999">Rs. 5000+</option>
              </select>
            </div>

            <div className="pt-4">
              <button
                onClick={handleClearFilters}
                className="text-sm text-pink-600 hover:underline"
              >
                Clear all filters
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-2 p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
            <div>
              <h2 className="text-2xl font-semibold text-gray-500">
                {getHeaderText()}
              </h2>
              {totalProducts > 0 && (
                <p className="text-sm text-gray-400 mt-1">
                  Showing {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, totalProducts)} of {totalProducts} products
                  {getCurrentCategoryName() && ` in ${getCurrentCategoryName()}`}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <label className="text-sm text-gray-600">Sort by:</label>
              <select
                value={sortOrder}
                onChange={(e) => handleSortChange(e.target.value)}
                className="mb-0 border-b-2 border-gray-400 p-2 focus:outline-none focus:border-pink-500 bg-transparent"
              >
                <option value="default">Default</option>
                <option value="low-to-high">Price: Low to High</option>
                <option value="high-to-low">Price: High to Low</option>
                <option value="newest">Newest First</option>
                <option value="best-selling">Best Selling</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="text-center py-8 text-red-500">
              {error}
              <button 
                onClick={fetchProducts}
                className="ml-4 text-pink-500 hover:text-pink-600"
              >
                Retry
              </button>
            </div>
          )}

          {!error && filteredProducts.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              {searchQuery ? (
                <div>
                  <p className="mb-4">No products found for "{searchQuery}"</p>
                  <button
                    onClick={handleClearFilters}
                    className="text-pink-500 hover:text-pink-600"
                  >
                    Clear search
                  </button>
                </div>
              ) : (
                <div>
                  <p className="mb-4">No products found matching your filters.</p>
                  <button
                    onClick={handleClearFilters}
                    className="text-pink-500 hover:text-pink-600"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-500">
                Page {currentPage} of {totalPages}
              </div>
              
              <div className="flex items-center gap-1">
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-lg ${
                    currentPage === 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                {/* Page Numbers */}
                {getPageNumbers().map((page, index) => (
                  page === '...' ? (
                    <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
                      <MoreHorizontal className="w-5 h-5" />
                    </span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 rounded-lg font-medium ${
                        currentPage === page
                          ? 'bg-pink-500 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  )
                ))}
                
                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-lg ${
                    currentPage === totalPages
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              
              <div className="text-sm text-gray-500">
                {pageSize} products per page
              </div>
            </div>
          )}

          {/* Show "Back to All Products" if searching or filtered */}
          {(searchQuery || category || priceRange) && filteredProducts.length > 0 && (
            <div className="mt-8 text-center">
              <button
                onClick={handleClearFilters}
                className="text-pink-500 hover:text-pink-600 font-medium"
              >
                ← Back to All Products
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;